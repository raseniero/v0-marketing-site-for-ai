import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Clock, Brain, Shield, Users, Zap, CheckCircle, Star } from "lucide-react"
import Link from "next/link"
import { getCurrentUser } from "./actions/auth"
import { MainNav } from "@/components/main-nav"
import { AuthWrapper } from "@/components/auth-wrapper"
import { WelcomeBanner } from "@/components/welcome-banner"

export default async function HomePage() {
  const user = await getCurrentUser()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Phone className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">CallAI</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <MainNav />
            <AuthWrapper />
          </nav>
        </div>
      </header>

      {/* Welcome Banner for logged-in users */}
      {user && <WelcomeBanner user={user} />}

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            🎉 Now Available Nationwide
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your AI Assistant is Just a <span className="text-blue-600">Phone Call Away</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            No apps to download. No screens to stare at. Simply call our number and get instant help from an advanced AI
            assistant that understands you perfectly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="text-lg px-8 py-4">
              <Phone className="mr-2 h-5 w-5" />
              Call Now: (555) 123-AI-HELP
            </Button>
            {user ? (
              <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
                <Link href="/register">Get Early Access</Link>
              </Button>
            )}
          </div>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              24/7 Available
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              No Setup Required
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Works on Any Phone
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose CallAI?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of AI assistance through the simplicity of a phone call
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Phone className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Universal Access</CardTitle>
                <CardDescription>
                  Works with any phone - landline, mobile, or payphone. No smartphone required.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Clock className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>24/7 Availability</CardTitle>
                <CardDescription>
                  Your AI assistant never sleeps. Get help anytime, anywhere, day or night.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Brain className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Advanced AI</CardTitle>
                <CardDescription>
                  Powered by cutting-edge language models that understand context and nuance.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Shield className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>Privacy First</CardTitle>
                <CardDescription>
                  Your conversations are encrypted and never stored. Complete privacy guaranteed.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Users className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Multi-Language</CardTitle>
                <CardDescription>Communicate in over 50 languages with natural conversation flow.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Zap className="h-12 w-12 text-yellow-600 mb-4" />
                <CardTitle>Instant Response</CardTitle>
                <CardDescription>Get immediate answers without waiting in queues or navigating menus.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Getting AI assistance is as simple as making a phone call</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Dial Our Number</h3>
              <p className="text-gray-600">Simply call (555) 123-AI-HELP from any phone, anywhere in the world.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Talking</h3>
              <p className="text-gray-600">
                Speak naturally about what you need help with. No commands or keywords required.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Instant Help</h3>
              <p className="text-gray-600">
                Receive intelligent, helpful responses in real-time through natural conversation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Perfect For Every Situation</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Questions</CardTitle>
                <CardDescription>Weather, facts, calculations, translations, and general knowledge</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Business Help</CardTitle>
                <CardDescription>Email drafting, scheduling, research, and professional advice</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Learning Support</CardTitle>
                <CardDescription>Homework help, explanations, tutoring, and skill development</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Daily Tasks</CardTitle>
                <CardDescription>Cooking tips, travel planning, shopping lists, and life advice</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Pay only for what you use, with no hidden fees or subscriptions</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Pay Per Call</CardTitle>
                <CardDescription>Perfect for occasional use</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">
                  $0.99<span className="text-lg text-gray-500">/minute</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    No monthly fees
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    First minute free
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    All features included
                  </li>
                </ul>
                <Button className="w-full mt-6">Start Calling</Button>
              </CardContent>
            </Card>

            <Card className="border-blue-200 relative">
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">Most Popular</Badge>
              <CardHeader>
                <CardTitle>Monthly Plan</CardTitle>
                <CardDescription>Best value for regular users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">
                  $29<span className="text-lg text-gray-500">/month</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    60 minutes included
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    $0.49/minute after
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Priority support
                  </li>
                </ul>
                <Button className="w-full mt-6">Choose Plan</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business</CardTitle>
                <CardDescription>For teams and organizations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">
                  $99<span className="text-lg text-gray-500">/month</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    300 minutes included
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Multiple phone numbers
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Analytics dashboard
                  </li>
                </ul>
                <Button className="w-full mt-6">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Finally, an AI I can use while driving! No need to pull over to type on my phone."
                </p>
                <div className="font-semibold">Sarah M.</div>
                <div className="text-sm text-gray-500">Sales Manager</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Perfect for my elderly parents who struggle with smartphones but need quick help."
                </p>
                <div className="font-semibold">Michael R.</div>
                <div className="text-sm text-gray-500">Software Engineer</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "The convenience is unmatched. I use it for quick translations when traveling."
                </p>
                <div className="font-semibold">Elena K.</div>
                <div className="text-sm text-gray-500">Travel Blogger</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Experience the Future?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have discovered the simplicity and power of phone-based AI assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              <Phone className="mr-2 h-5 w-5" />
              Call (555) 123-AI-HELP
            </Button>
            {user ? (
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-blue-600"
                asChild
              >
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-blue-600"
                asChild
              >
                <Link href="/register">Join Waitlist</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Phone className="h-6 w-6" />
                <span className="text-xl font-bold">CallAI</span>
              </div>
              <p className="text-gray-400">Your AI assistant is just a phone call away.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    API
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Status
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CallAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
