"use client"

import { Leaf, Droplets, TrendingDown, Brain } from "lucide-react"

export default function Timeline() {
  const events = [
    {
      title: "NDCI Analysis",
      icon: <Leaf className="w-6 h-6" />,
      description:
        "Chlorophyll-a and algal bloom proxy detection for eutrophication monitoring. Shows gradual upward drift indicating progressive chlorophyll intensification.",
      stats: { label: "Correlation", value: "0.53 with Year" },
      position: "left",
      color: "from-emerald-500 to-green-500",
    },
    {
      title: "Turbidity Measurement",
      icon: <Droplets className="w-6 h-6" />,
      description:
        "Suspended matter concentration analysis (NTU). Wider variability suggests rainfall, sediment transport, and wind-driven resuspension events.",
      stats: { label: "Data Points", value: "45,000+" },
      position: "right",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "NDWI Shrinkage",
      icon: <TrendingDown className="w-6 h-6" />,
      description:
        "Water body area fluctuation tracking. Seasonal patterns align with monsoon/non-monsoon transitions showing water level seasonality.",
      stats: { label: "Period", value: "2020-2024" },
      position: "left",
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "AI Analysis",
      icon: <Brain className="w-6 h-6" />,
      description:
        "Gemini 2.5 generative AI interprets dataset patterns and provides advanced ecological insights with predictive modeling.",
      stats: { label: "Accuracy", value: "92-93%" },
      position: "right",
      color: "from-cyan-500 to-teal-500",
    },
  ]

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-cyan-800 bg-clip-text text-transparent">
          Our Analysis Pipeline
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A comprehensive methodology combining satellite-derived indices, machine learning, and AI
        </p>
      </div>

      <div className="relative">
        {/* Center line with glow */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 via-teal-400 to-emerald-400 rounded-full shadow-lg"
          style={{ boxShadow: "0 0 20px rgba(0, 188, 212, 0.5)" }}
        />

        <div className="space-y-16">
          {events.map((event, index) => (
            <div
              key={index}
              className={`flex ${event.position === "left" ? "flex-row-reverse" : "flex-row"} items-center`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Content */}
              <div className="w-1/2 px-8">
                <div className="glass-effect card-hover p-6 rounded-2xl group">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${event.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}
                    >
                      {event.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{event.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-xs text-gray-500">{event.stats.label}</span>
                    <span className="font-bold text-cyan-600">{event.stats.value}</span>
                  </div>
                </div>
              </div>

              {/* Timeline dot */}
              <div className="w-0 flex justify-center relative">
                <div
                  className={`w-8 h-8 bg-gradient-to-br ${event.color} rounded-full border-4 border-white shadow-xl pulse-ring z-10`}
                />
              </div>

              {/* Empty space for the other side */}
              <div className="w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
