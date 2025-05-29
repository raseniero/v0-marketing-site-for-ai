import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

// Initialize the Neon SQL client with error handling
function createSqlClient() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    console.error("DATABASE_URL environment variable is not set")
    throw new Error("Database connection not configured. Please set DATABASE_URL environment variable.")
  }

  return neon(databaseUrl)
}

export async function GET() {
  try {
    const sql = createSqlClient()

    // Query the database for all users
    const users = await sql`SELECT * FROM users ORDER BY created_at DESC LIMIT 10`

    // Return the users as JSON
    return NextResponse.json({ users })
  } catch (error: any) {
    console.error("Error fetching users:", error)

    // Handle database connection errors specifically
    if (error.message?.includes("Database connection not configured")) {
      return NextResponse.json({ error: "Database service temporarily unavailable" }, { status: 503 })
    }

    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}
