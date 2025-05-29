"use server"

import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"

// Initialize the Neon SQL client with error handling
function createSqlClient() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    console.error("DATABASE_URL environment variable is not set")
    throw new Error("Database connection not configured. Please set DATABASE_URL environment variable.")
  }

  return neon(databaseUrl)
}

// Generate a random session token
function generateSessionToken() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export async function signIn(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const remember = formData.get("remember-me") === "on"

  // Basic validation
  if (!email || !password) {
    return {
      error: "Email and password are required",
    }
  }

  try {
    const sql = createSqlClient()

    // Find user by email
    const users = await sql`SELECT * FROM users WHERE email = ${email} LIMIT 1`

    if (users.length === 0) {
      return {
        error: "Invalid email or password",
      }
    }

    const user = users[0]

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return {
        error: "Invalid email or password",
      }
    }

    // Generate session token
    const sessionToken = generateSessionToken()

    // Store session in database
    await sql`
      INSERT INTO sessions (user_id, token, expires_at)
      VALUES (${user.id}, ${sessionToken}, ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)})
    `

    // Set session cookie
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60, // 30 days or 24 hours
      path: "/",
    }

    cookies().set("session_token", sessionToken, cookieOptions)

    // Return success instead of redirecting
    return {
      success: true,
      message: "Sign in successful! Redirecting...",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    }
  } catch (error: any) {
    console.error("Authentication error:", error)

    // Handle database connection errors specifically
    if (error.message?.includes("Database connection not configured")) {
      return {
        error: "Service temporarily unavailable. Please try again later.",
      }
    }

    return {
      error: "An error occurred during sign in. Please try again.",
    }
  }
}

export async function signOut() {
  try {
    // Get session token
    const sessionToken = cookies().get("session_token")?.value

    if (sessionToken) {
      try {
        const sql = createSqlClient()
        // Delete session from database
        await sql`DELETE FROM sessions WHERE token = ${sessionToken}`
      } catch (error) {
        console.error("Error deleting session:", error)
        // Continue with cookie deletion even if database operation fails
      }
    }

    // Delete session cookie
    cookies().delete("session_token")

    return {
      success: true,
      message: "Signed out successfully",
    }
  } catch (error) {
    console.error("Error during sign out:", error)
    return {
      error: "Error signing out",
    }
  }
}

export async function getCurrentUser() {
  try {
    const sessionToken = cookies().get("session_token")?.value

    if (!sessionToken) {
      return null
    }

    const sql = createSqlClient()

    // Find session
    const sessions = await sql`
      SELECT s.*, u.id as user_id, u.name, u.email
      FROM sessions s
      JOIN users u ON s.user_id = u.id
      WHERE s.token = ${sessionToken}
      AND s.expires_at > NOW()
      LIMIT 1
    `

    if (sessions.length === 0) {
      return null
    }

    const session = sessions[0]

    return {
      id: session.user_id,
      name: session.name,
      email: session.email,
    }
  } catch (error: any) {
    console.error("Error getting current user:", error)

    // If database is not available, return null (user appears logged out)
    if (error.message?.includes("Database connection not configured")) {
      console.warn("Database not available, treating user as logged out")
    }

    return null
  }
}
