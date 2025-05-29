import { getCurrentUser } from "@/app/actions/auth"
import { Phone } from "lucide-react"
import Link from "next/link"
import { UserNav } from "./user-nav"

export default async function Header() {
  const user = await getCurrentUser()

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Phone className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-900">CallAI</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
            How It Works
          </Link>
          <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
            Pricing
          </Link>

          <UserNav user={user} />
        </nav>
      </div>
    </header>
  )
}
