"use client"

export default function NereusLogo({ size = 40, animated = true }: { size?: number; animated?: boolean }) {
  return (
    <div className={`relative ${animated ? "logo-glow" : ""}`} style={{ width: size, height: size }}>
      {/* Outer ring */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{ filter: "drop-shadow(0 2px 8px rgba(0, 188, 212, 0.3))" }}
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00bcd4" />
            <stop offset="50%" stopColor="#0097a7" />
            <stop offset="100%" stopColor="#006064" />
          </linearGradient>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#e0f7fa" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle cx="50" cy="50" r="48" fill="url(#logoGradient)" />

        {/* Inner glow */}
        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />

        {/* Water waves */}
        <path
          d="M 20 55 Q 30 45, 40 55 T 60 55 T 80 55"
          fill="none"
          stroke="url(#waveGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          className={animated ? "animate-pulse" : ""}
        />
        <path
          d="M 25 65 Q 35 55, 45 65 T 65 65 T 75 65"
          fill="none"
          stroke="url(#waveGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* N Letter */}
        <text
          x="50"
          y="48"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="32"
          fontWeight="bold"
          fontFamily="system-ui"
        >
          N
        </text>

        {/* Bubble decorations */}
        <circle cx="25" cy="30" r="4" fill="rgba(255,255,255,0.5)" />
        <circle cx="75" cy="35" r="3" fill="rgba(255,255,255,0.4)" />
        <circle cx="70" cy="25" r="2" fill="rgba(255,255,255,0.3)" />
      </svg>
    </div>
  )
}
