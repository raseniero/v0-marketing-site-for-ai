import { getCurrentUser } from "@/app/actions/auth"
import { AuthButtons } from "./auth-buttons"
import { Suspense } from "react"

async function AuthContent() {
  try {
    const user = await getCurrentUser()
    return <AuthButtons user={user} />
  } catch (error) {
    console.error("Error in AuthContent:", error)
    // Fallback to logged-out state if there's an error
    return <AuthButtons user={null} />
  }
}

export function AuthWrapper() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center space-x-4">
          <div className="h-9 w-16 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-9 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
      }
    >
      <AuthContent />
    </Suspense>
  )
}
