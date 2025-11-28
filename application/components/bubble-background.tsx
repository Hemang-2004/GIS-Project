"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface Bubble {
  id: number
  size: number
  left: number
  duration: number
  delay: number
}

export default function BubbleBackground() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])

  useEffect(() => {
    // Generate random bubbles on mount
    const newBubbles: Bubble[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 60 + 20,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 5,
    }))
    setBubbles(newBubbles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble-rise"
          style={
            {
              width: bubble.size,
              height: bubble.size,
              left: `${bubble.left}%`,
              "--duration": `${bubble.duration}s`,
              "--delay": `${bubble.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
