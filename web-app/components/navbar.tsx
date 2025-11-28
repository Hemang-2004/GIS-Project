"use client"

import Link from "next/link"
import NereusLogo from "./nereus-logo"

export default function Navbar() {
  return (
    <nav className="glass-navbar sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <NereusLogo size={44} animated={true} />
          <div className="flex flex-col">
            <span className="font-bold text-xl bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
              NEREUS
            </span>
            <span className="text-[10px] text-cyan-600/70 font-medium tracking-wider -mt-1">WATER INTELLIGENCE</span>
          </div>
        </Link>

        <div className="flex items-center gap-8">
          <a href="#features" className="text-gray-700 hover:text-cyan-600 transition-all font-medium relative group">
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-teal-500 transition-all group-hover:w-full" />
          </a>
          <a href="#pricing" className="text-gray-700 hover:text-cyan-600 transition-all font-medium relative group">
            Pricing
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-teal-500 transition-all group-hover:w-full" />
          </a>
          <a href="#" className="text-gray-700 hover:text-cyan-600 transition-all font-medium relative group">
            Docs
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-teal-500 transition-all group-hover:w-full" />
          </a>
          <Link href="/dashboard" className="btn-glow px-5 py-2.5 text-white font-semibold rounded-xl text-sm">
            Launch App
          </Link>
        </div>
      </div>
    </nav>
  )
}
