"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "@/app/actions/auth"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

export function DashboardSignOutButton() {
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
    <Button variant="outline" size="sm" onClick={handleSignOut} disabled={isPending}>
      <LogOut className="h-4 w-4 mr-2" />
      {isPending ? "Signing Out..." : "Sign Out"}
    </Button>
  )
}
