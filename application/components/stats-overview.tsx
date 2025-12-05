"use client"

import { useEffect, useState } from "react"
import { BarChart3, Satellite, Database, Target, TrendingUp } from "lucide-react"

interface Metrics {
  datasets_analyzed: number
  satellites_used: number
  data_points: number
  accuracy: number
}

export default function StatsOverview() {
  const [metrics] = useState<Metrics>({
    datasets_analyzed: 1250,
    satellites_used: 4,
    data_points: 45000,
    accuracy: 90,
  })

  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    setAnimated(true)
  }, [])

  const stats = [
    {
      label: "Datasets Analyzed",
      value: metrics.datasets_analyzed,
      icon: <BarChart3 className="w-6 h-6" />,
      suffix: "",
      color: "from-blue-500 to-cyan-500",
      description: "Water body records processed",
    },
    {
      label: "Satellites Used",
      value: metrics.satellites_used,
      icon: <Satellite className="w-6 h-6" />,
      suffix: "+",
      color: "from-purple-500 to-indigo-500",
      description: "Global coverage satellites",
    },
    {
      label: "Data Points",
      value: metrics.data_points,
      icon: <Database className="w-6 h-6" />,
      suffix: "+",
      color: "from-emerald-500 to-green-500",
      description: "Daily observations 2020-2024",
    },
    {
      label: "Model Accuracy",
      value: metrics.accuracy,
      icon: <Target className="w-6 h-6" />,
      suffix: "%",
      color: "from-cyan-500 to-teal-500",
      description: "Random Forest performance",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 stagger-children">
      {stats.map((stat, index) => (
        <div key={index} className="glass-effect card-hover p-6 rounded-2xl group shimmer">
          <div className="flex items-start justify-between mb-4">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}
            >
              {stat.icon}
            </div>
            <div className="flex items-center gap-1 text-emerald-500 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>Live</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm font-medium mb-1">{stat.label}</p>
          <p
            className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent transition-all duration-1000 ${animated ? "opacity-100" : "opacity-0"}`}
          >
            {stat.value.toLocaleString()}
            {stat.suffix}
          </p>
          <p className="text-xs text-gray-400 mt-2">{stat.description}</p>
        </div>
      ))}
    </div>
  )
}
