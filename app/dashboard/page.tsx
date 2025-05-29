import { getCurrentUser } from "../actions/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, User, Settings, Clock, Star } from "lucide-react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { DashboardSignOutButton } from "@/components/dashboard-sign-out-button"

export default async function DashboardPage() {
  const user = await getCurrentUser()

  // Redirect to login if not authenticated
  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Phone className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">CallAI</span>
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user.name}</span>
            <DashboardSignOutButton />
          </div>
        </div>
      </header>

      {/* Rest of the dashboard content remains the same */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Your CallAI Dashboard</h1>
            <p className="text-xl text-gray-600">Manage your AI phone assistant experience</p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardHeader className="text-center">
                <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Make a Call</CardTitle>
                <CardDescription>Connect with your AI assistant now</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-4">(555) 123-AI-HELP</div>
                <Button className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <User className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Account Settings</CardTitle>
                <CardDescription>Manage your profile and preferences</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-xl">Call History</CardTitle>
                <CardDescription>View your recent AI conversations</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button variant="outline" className="w-full">
                  <Clock className="h-4 w-4 mr-2" />
                  View History
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Account Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Your CallAI account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p className="text-lg">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-lg">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Account Status</label>
                  <p className="text-lg text-green-600 font-medium">Active</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage Statistics</CardTitle>
                <CardDescription>Your CallAI usage this month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Calls</span>
                  <span className="text-2xl font-bold">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Minutes Used</span>
                  <span className="text-2xl font-bold">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Satisfaction</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-gray-300" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Getting Started */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Getting Started with CallAI</CardTitle>
              <CardDescription>Make the most of your AI phone assistant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-blue-600">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Make Your First Call</h3>
                  <p className="text-sm text-gray-600">Dial (555) 123-AI-HELP and start talking to your AI assistant</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-green-600">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Explore Features</h3>
                  <p className="text-sm text-gray-600">Ask questions, get help with tasks, or have a conversation</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-purple-600">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Customize Settings</h3>
                  <p className="text-sm text-gray-600">Adjust your preferences for the best experience</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
