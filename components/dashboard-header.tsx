"use client"

import { Button } from "@/components/ui/button"
import { Phone, LogOut } from "lucide-react"
import Link from "next/link"
import { signOut } from "@/app/actions/auth"

type User = {
  id: string | number
  name: string
  email: string
}

export function DashboardHeader({ user }: { user: User }) {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Phone className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">CallAI</span>
        </Link>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Welcome, {user.name}</span>
          <form action={signOut}>
            <Button variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </form>
        </div>
      </div>
    </header>
  )
}
