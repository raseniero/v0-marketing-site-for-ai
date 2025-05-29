import { neon } from "@neondatabase/serverless"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { ArrowLeft, AlertTriangle } from "lucide-react"

// Initialize the Neon SQL client with error handling
function createSqlClient() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    console.error("DATABASE_URL environment variable is not set")
    throw new Error("Database connection not configured. Please set DATABASE_URL environment variable.")
  }

  return neon(databaseUrl)
}

export default async function AdminPage() {
  let users: any[] = []
  let error: string | null = null

  try {
    const sql = createSqlClient()
    // Fetch users from the database
    users = await sql`SELECT * FROM users ORDER BY created_at DESC`
  } catch (err: any) {
    console.error("Error fetching users:", err)
    error = err.message?.includes("Database connection not configured")
      ? "Database connection not configured. Please set up your DATABASE_URL environment variable."
      : "Failed to fetch users from database."
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white p-4">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-8">
          <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 w-fit">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
            <CardDescription>View all registered users</CardDescription>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <div className="text-red-600 font-medium mb-2">Database Error</div>
                <div className="text-gray-600">{error}</div>
                <div className="mt-4 text-sm text-gray-500">
                  Please check your environment variables and database configuration.
                </div>
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No users have registered yet.</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Password</TableHead>
                    <TableHead>Registered At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user: any) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-mono">{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="text-gray-500">{user.password ? "••••••••" : "Not set"}</TableCell>
                      <TableCell>{new Date(user.created_at).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
