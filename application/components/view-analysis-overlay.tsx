"use client"

import { useState, useEffect } from "react"

interface ViewAnalysisOverlayProps {
  isVisible: boolean
  onComplete: () => void
}

export default function ViewAnalysisOverlay({ isVisible, onComplete }: ViewAnalysisOverlayProps) {
  const [displayText, setDisplayText] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (!isVisible) {
      setDisplayText("")
      setIsAnimating(false)
      return
    }

    setIsAnimating(true)
    const fullText = "View your analysis"
    let charIndex = 0

    const interval = setInterval(() => {
      if (charIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(interval)
        // Auto-close after 2 seconds
        setTimeout(() => {
          setIsAnimating(false)
          setTimeout(onComplete, 300)
        }, 2000)
      }
    }, 80)

    return () => clearInterval(interval)
  }, [isVisible, onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      {/* Background with blur */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onComplete} />

      {/* Animated content */}
      <div className="relative">
        <div className="text-center">
          <div className="inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full blur-2xl opacity-30 animate-pulse" />
            <div className="relative px-8 py-6">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                {displayText}
                {isAnimating && <span className="animate-pulse">_</span>}
              </h2>
            </div>
          </div>

          {/* Floating particles effect */}
          <div className="mt-12 flex justify-center gap-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
