"use server"

import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"

// Initialize the Neon SQL client with error handling
function createSqlClient() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    console.error("DATABASE_URL environment variable is not set")
    throw new Error("Database connection not configured. Please set DATABASE_URL environment variable.")
  }

  return neon(databaseUrl)
}

export async function registerUser(prevState: any, formData: FormData) {
  console.log("Register user action called")

  // Handle case where formData might be null
  if (!formData) {
    console.error("Form data is null or undefined")
    return {
      error: "Form data is required",
    }
  }

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  console.log("Received form data:", { name, email, password: "***" })

  // Basic validation
  if (!name || !email || !password || !confirmPassword) {
    return {
      error: "All fields are required",
    }
  }

  if (!email.includes("@")) {
    return {
      error: "Please enter a valid email address",
    }
  }

  if (password.length < 8) {
    return {
      error: "Password must be at least 8 characters long",
    }
  }

  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match",
    }
  }

  // Password strength validation
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
    return {
      error:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }
  }

  try {
    console.log("Attempting to hash password and insert user into database...")

    const sql = createSqlClient()

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Insert user into database
    const result = await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
      RETURNING id, name, email, created_at
    `

    console.log("Database insert successful:", result)

    // Return success state
    return {
      success: true,
      message: "Registration successful!",
      user: result[0],
    }
  } catch (error: any) {
    console.error("Database error:", error)

    // Handle database connection errors specifically
    if (error.message?.includes("Database connection not configured")) {
      return {
        error: "Service temporarily unavailable. Please try again later.",
      }
    }

    // Handle duplicate email error
    if (error.message?.includes("duplicate key")) {
      return {
        error: "This email is already registered",
      }
    }

    return {
      error: "Registration failed. Please try again.",
    }
  }
}
