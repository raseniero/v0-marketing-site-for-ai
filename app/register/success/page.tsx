import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Phone className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">CallAI</span>
          </Link>
        </div>
      </header>

      {/* Success Message */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-md">
          <Card className="shadow-xl text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-3xl font-bold text-green-600">Welcome to CallAI!</CardTitle>
              <CardDescription className="text-lg">Your registration was successful</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600">
                Thank you for joining CallAI! We'll send you updates about our launch and early access opportunities.
              </p>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-blue-800 font-medium mb-2">Ready to try CallAI?</p>
                <p className="text-blue-700 text-sm">Call our demo line to experience the future of AI assistance:</p>
                <p className="text-blue-900 font-bold text-lg mt-2">(555) 123-AI-HELP</p>
              </div>

              <div className="flex flex-col gap-3">
                <Button asChild className="w-full">
                  <Link href="/">
                    <Phone className="mr-2 h-4 w-4" />
                    Try Demo Call
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
