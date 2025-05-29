import { AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function DatabaseErrorFallback() {
  return (
    <Card className="border-yellow-200 bg-yellow-50">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <CardTitle className="text-yellow-800">Database Unavailable</CardTitle>
        </div>
        <CardDescription className="text-yellow-700">
          The database connection is not configured. Some features may not work properly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-yellow-700">
          To enable full functionality, please configure your DATABASE_URL environment variable.
        </p>
      </CardContent>
    </Card>
  )
}
