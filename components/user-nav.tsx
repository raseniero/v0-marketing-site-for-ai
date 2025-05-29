"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { signOut } from "@/app/actions/auth"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

type User = {
  id: string | number
  name: string
  email: string
} | null

export function UserNav({ user }: { user: User }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleSignOut = async () => {
    startTransition(async () => {
      await signOut()
      router.push("/")
      router.refresh()
    })
  }

  return (
    <>
      {user ? (
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
            Dashboard
          </Link>
          <span className="text-gray-600">Hi, {user.name}</span>
          <Button variant="outline" size="sm" onClick={handleSignOut} disabled={isPending}>
            {isPending ? "Signing Out..." : "Sign Out"}
          </Button>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <Button variant="outline" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      )}
    </>
  )
}
