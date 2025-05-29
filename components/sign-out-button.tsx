"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "@/app/actions/auth"
import { LogOut } from "lucide-react"

export function SignOutButton() {
  return (
    <form action={signOut}>
      <Button variant="outline" size="sm">
        <LogOut className="h-4 w-4 mr-2" />
        Sign Out
      </Button>
    </form>
  )
}
