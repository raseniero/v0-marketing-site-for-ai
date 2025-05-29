"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone, ArrowLeft, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { signIn } from "../actions/auth"

export default function LoginPage() {
  const [state, action, isPending] = useActionState(signIn, undefined)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  // Handle successful login
  useEffect(() => {
    if (state?.success) {
      // Show success message briefly, then redirect
      const timer = setTimeout(() => {
        router.push("/")
        router.refresh() // Refresh to update auth state
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [state?.success, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Phone className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">CallAI</span>
          </Link>
          <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Login Form */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-md">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
              <CardDescription className="text-lg">Sign in to your CallAI account</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={action} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    required
                    className="h-12"
                    disabled={isPending || state?.success}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                      className="h-12 pr-10"
                      disabled={isPending || state?.success}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      disabled={isPending || state?.success}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      disabled={isPending || state?.success}
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me for 30 days
                    </label>
                  </div>
                  <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>

                {state?.error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                    {state.error}
                  </div>
                )}

                {state?.success && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
                    {state.message}
                  </div>
                )}

                <Button type="submit" className="w-full h-12 text-lg" disabled={isPending || state?.success}>
                  {state?.success ? "Redirecting..." : isPending ? "Signing In..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-blue-600 hover:underline font-medium">
                    Create one here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
