"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import NereusLogo from "./nereus-logo"
import BubbleBackground from "./bubble-background"
import { LayoutDashboard, MessageSquare, FileDown, ChevronDown } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  selectedDataset: string
  onDatasetChange: (id: string) => void
}

export default function DashboardLayout({ children, selectedDataset, onDatasetChange }: DashboardLayoutProps) {
  const pathname = usePathname()

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: "Ask Nereus", href: "/ask-nereus", icon: <MessageSquare className="w-5 h-5" /> },
    { label: "Export Report", href: "/export-report", icon: <FileDown className="w-5 h-5" /> },
  ]

  return (
    <div className="min-h-screen water-gradient relative overflow-hidden">
      <BubbleBackground />

      {/* Top Navigation - Glossy */}
      <nav className="glass-navbar sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <NereusLogo size={40} animated={true} />
            <div className="flex flex-col">
              <span className="font-bold text-lg bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                NEREUS
              </span>
              <span className="text-[9px] text-cyan-600/60 font-medium tracking-wider -mt-1">ANALYZER</span>
            </div>
          </Link>

          {/* Navigation Tabs */}
          <div className="flex gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 font-medium ${
                  pathname === item.href ? "btn-glow text-white" : "text-gray-700 hover:bg-white/50 glass-effect"
                }`}
              >
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-4">
            {/* Dataset Selector */}
            <div className="relative">
              <select
                value={selectedDataset}
                onChange={(e) => onDatasetChange(e.target.value)}
                className="appearance-none glass-effect px-4 py-2.5 pr-10 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium text-gray-700 cursor-pointer"
              >
                <option value="1">Dataset 1</option>
                <option value="2">Dataset 2</option>
                <option value="3">Dataset 3</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* User Avatar */}
            <div className="flex items-center gap-3 pl-4 border-l border-cyan-200/50">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white font-bold shadow-lg">
                H
              </div>
              <div className="hidden sm:block">
                <p className="font-semibold text-gray-800 text-sm">Hemang</p>
                <p className="text-xs text-gray-500">Analyst</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">{children}</main>
    </div>
  )
}
