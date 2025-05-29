"use client"

import Link from "next/link"

export function MainNav() {
  return (
    <>
      <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
        Features
      </Link>
      <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
        How It Works
      </Link>
      <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
        Pricing
      </Link>
    </>
  )
}
