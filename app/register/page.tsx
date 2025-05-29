"use client"

import { useActionState, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone, ArrowLeft, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { registerUser } from "../actions/register-user"

export default function RegisterPage() {
  const [state, action, isPending] = useActionState(registerUser, undefined)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  // Handle successful registration
  useEffect(() => {
    if (state?.success) {
      // Redirect to success page after successful registration
      router.push("/register/success")
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

      {/* Registration Form */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-md">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Create Your Account</CardTitle>
              <CardDescription className="text-lg">
                Join CallAI and get early access to your AI phone assistant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={action} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      required
                      className="h-12 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Must be at least 8 characters with uppercase, lowercase, number, and special character
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      required
                      className="h-12 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
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

                <Button type="submit" className="w-full h-12 text-lg" disabled={isPending}>
                  {isPending ? "Creating Account..." : "Create Account"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-600 hover:underline font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>

              <div className="mt-4 text-center text-xs text-gray-500">
                <p>
                  By creating an account, you agree to our{" "}
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="mt-8 text-center">
            <h3 className="text-lg font-semibold mb-4">What you'll get:</h3>
            <div className="space-y-2 text-gray-600">
              <p>✓ Early access to CallAI</p>
              <p>✓ Special launch pricing</p>
              <p>✓ Priority customer support</p>
              <p>✓ Product updates and news</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
