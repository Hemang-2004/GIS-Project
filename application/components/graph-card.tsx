"use client"

import { useState, useEffect } from "react"
import { Expand, Download, RefreshCw, ExternalLink } from "lucide-react"

interface GraphCardProps {
  id: string
  title: string
  endpoint: string
  dataset: string
  isExpanded: boolean
  onExpand: () => void
  shouldReloadAfterAnalysis?: boolean
  isViewAnalysisComplete?: boolean
}

const getDummyGraphUrl = () => {
  return "/water-quality-analysis-chart.jpg"
}

export default function GraphCard({
  id,
  title,
  endpoint,
  dataset,
  isExpanded,
  onExpand,
  shouldReloadAfterAnalysis,
  isViewAnalysisComplete = false,
}: GraphCardProps) {
  const [imageUrl, setImageUrl] = useState<string>(getDummyGraphUrl())
  const [loading, setLoading] = useState(true)
  const [description, setDescription] = useState("")
  const [isDummy, setIsDummy] = useState(true)

  useEffect(() => {
    setLoading(false)
    setImageUrl(getDummyGraphUrl())
    setIsDummy(true)
    setDescription(`Water quality ${title.toLowerCase()} visualization for dataset ${dataset || "1"}`)
  }, [title, dataset])

  useEffect(() => {
    if (isViewAnalysisComplete && isDummy) {
      setLoading(true)
      const url = `http://localhost:8040${endpoint}`

      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          const imageUrl = URL.createObjectURL(blob)
          setImageUrl(imageUrl)
          setIsDummy(false)
          setLoading(false)
        })
        .catch(() => {
          console.log("[v0] Using dummy data for:", title)
          setLoading(false)
        })
    }
  }, [isViewAnalysisComplete, endpoint, dataset, title, isDummy])

  useEffect(() => {
    if (shouldReloadAfterAnalysis && !isDummy) {
      setLoading(true)
      const url = `http://localhost:8040${endpoint}?id=${dataset || "1"}`

      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          const imageUrl = URL.createObjectURL(blob)
          setImageUrl(imageUrl)
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
    }
  }, [shouldReloadAfterAnalysis, endpoint, dataset])

  return (
    <div
      className={`glass-effect card-hover rounded-2xl overflow-hidden transition-all cursor-pointer ${
        isExpanded ? "ring-2 ring-cyan-500 shadow-xl" : ""
      }`}
      onClick={onExpand}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
            {title}
          </h3>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-cyan-50 transition-colors text-gray-500 hover:text-cyan-600">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg hover:bg-cyan-50 transition-colors text-gray-500 hover:text-cyan-600">
              <Expand className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Graph Container */}
        <div className="relative w-full h-64 bg-gradient-to-br from-white to-cyan-50 rounded-xl overflow-hidden border border-cyan-100">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full border-4 border-cyan-200 border-t-cyan-500 animate-spin" />
                <p className="text-gray-500 text-sm">Loading visualization...</p>
              </div>
            </div>
          ) : (
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              className="w-full h-full object-cover"
              onError={() => setImageUrl(getDummyGraphUrl())}
            />
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-4 leading-relaxed line-clamp-2">{description}</p>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">{isDummy ? "Sample visualization" : "Click to expand view"}</p>
          <div className="flex items-center gap-1 text-xs text-cyan-600">
            <span className={`w-2 h-2 rounded-full animate-pulse ${isDummy ? "bg-amber-500" : "bg-emerald-500"}`} />
            {isDummy ? "Demo data" : "Real-time data"}
          </div>
        </div>
      </div>

      {/* Expanded View */}
      {isExpanded && (
        <div className="border-t border-cyan-100 p-6 bg-gradient-to-br from-white/80 to-cyan-50/80">
          <p className="text-gray-700 mb-4 text-sm leading-relaxed">{description}</p>
          <div className="flex gap-3">
            <button className="btn-glow px-4 py-2 text-white rounded-xl text-sm font-medium flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              View Full Screen
            </button>
            <button className="btn-outline-glow px-4 py-2 text-cyan-700 rounded-xl text-sm font-medium flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
