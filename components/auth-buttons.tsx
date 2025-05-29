"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { signOut } from "@/app/actions/auth"
import { LucideUser } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

type UserType = {
  id: string | number
  name: string
  email: string
} | null

export function AuthButtons({ user }: { user: UserType }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleSignOut = async () => {
    startTransition(async () => {
      await signOut()
      router.push("/")
      router.refresh()
    })
  }

  if (user) {
    return (
      <div className="flex items-center space-x-4">
        <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
          Dashboard
        </Link>
        <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
          <LucideUser className="h-4 w-4 text-green-600" />
          <span className="text-green-700 font-medium">Welcome, {user.name}!</span>
        </div>
        <Button variant="outline" size="sm" onClick={handleSignOut} disabled={isPending}>
          {isPending ? "Signing Out..." : "Sign Out"}
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-4">
      <Button variant="outline" asChild>
        <Link href="/login">Sign In</Link>
      </Button>
      <Button asChild>
        <Link href="/register">Get Started</Link>
      </Button>
    </div>
  )
}
