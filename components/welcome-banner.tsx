"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Phone, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

type User = {
  id: string | number
  name: string
  email: string
}

export function WelcomeBanner({ user }: { user: User }) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <CheckCircle className="h-6 w-6 text-green-200" />
            <div>
              <h3 className="font-semibold text-lg">Welcome back, {user.name}! 🎉</h3>
              <p className="text-green-100">You're successfully signed in to CallAI. Ready to make your first call?</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="secondary" size="sm" className="bg-white text-blue-600 hover:bg-gray-100">
              <Phone className="h-4 w-4 mr-2" />
              Call (555) 123-AI-HELP
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-white text-white hover:bg-white hover:text-blue-600"
              asChild
            >
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-white hover:text-gray-200 p-1"
              aria-label="Close banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
