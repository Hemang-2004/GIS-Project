"use client"

import type React from "react"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import GraphCard from "@/components/graph-card"
import UserActivityChart from "@/components/user-activity-chart"
import StatsOverview from "@/components/stats-overview"
import AnalysisLoader from "@/components/analysis-loader"
import ViewAnalysisOverlay from "@/components/view-analysis-overlay"
import { useAnalysis } from "@/lib/analysis-context"

export default function DashboardPage() {
  const [selectedDataset, setSelectedDataset] = useState("1")
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [contextInput, setContextInput] = useState<string>("")
  const [showContextBox, setShowContextBox] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)
  const [showViewAnalysisOverlay, setShowViewAnalysisOverlay] = useState(false)
  const [analysisCompleteDatasetId, setAnalysisCompleteDatasetId] = useState<string | null>(null)
  const [isViewAnalysisComplete, setIsViewAnalysisComplete] = useState(false)

  const { startAnalysis, completeAnalysis } = useAnalysis()

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file.name)
      startAnalysis(file.name, selectedDataset)
      setShowLoader(true)
    }
  }

  const handleLoaderComplete = () => {
    setShowLoader(false)
    completeAnalysis(selectedDataset)
    setAnalysisCompleteDatasetId(selectedDataset)
    setShowViewAnalysisOverlay(true)
  }

  const handleOverlayComplete = () => {
    setShowViewAnalysisOverlay(false)
    setIsViewAnalysisComplete(true)
  }

  const graphs = [
    { id: "correlation", title: "Correlation Matrix", endpoint: "/api/plot/correlation" },
    { id: "ndci", title: "NDCI Trend Analysis", endpoint: "/api/plot/ndci" },
    { id: "turbidity", title: "Turbidity Trend", endpoint: "/api/plot/turbidity" },
    { id: "shrinkage", title: "Water Shrinkage Analysis", endpoint: "/api/plot/shrinkage" },
    { id: "violin-ndci", title: "NDCI Distribution", endpoint: "/api/plot/violin/ndci" },
    { id: "violin-turbidity", title: "Turbidity Distribution", endpoint: "/api/plot/violin/turbidity" },
    { id: "violin-shrinkage", title: "Shrinkage Distribution", endpoint: "/api/plot/violin/shrinkage" },
    { id: "box-ndci", title: "NDCI Outliers", endpoint: "/api/plot/box/ndci" },
    { id: "box-turbidity", title: "Turbidity Outliers", endpoint: "/api/plot/box/turbidity" },
    { id: "model-accuracy", title: "Model Accuracy Comparison", endpoint: "/api/plot/model_accuracy" },
  ]

  const handleContextSubmit = () => {
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setShowContextBox(null)
      setContextInput("")
    }, 2000)
  }

  return (
    <DashboardLayout selectedDataset={selectedDataset} onDatasetChange={setSelectedDataset}>
      <AnalysisLoader isVisible={showLoader} onComplete={handleLoaderComplete} />

      <ViewAnalysisOverlay isVisible={showViewAnalysisOverlay} onComplete={handleOverlayComplete} />

      {/* Header Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-2" style={{ color: "#1A1A1A" }}>
          All About your Analysis
        </h2>
        <p className="text-gray-600 mb-8">Dataset: Water Body {selectedDataset}</p>

        {uploadedFile && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <p className="text-sm text-emerald-800">
              ✓ File <span className="font-semibold">{uploadedFile}</span> placed in analysis
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() =>
              window.open("https://code.earthengine.google.com/b17b344df93fd62578700aad921e108f", "_blank")
            }
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md"
            style={{ fontFamily: '"Google Sans Flex", sans-serif', fontWeight: 500 }}
          >
            🌍 GEE-Analyser
          </button>

          <label
            className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all cursor-pointer"
            style={{ fontFamily: '"Google Sans Flex", sans-serif', fontWeight: 500 }}
          >
            📤 Drop your database
            <input type="file" className="hidden" accept=".csv,.json,.xlsx" onChange={handleFileUpload} />
          </label>
        </div>

        {/* File Upload with Animation */}
        <div className="mt-6 glass-effect p-8 rounded-lg border-2 border-dashed border-blue-300">
          <label className="flex flex-col items-center justify-center cursor-pointer">
            <svg
              className="w-12 h-12 text-blue-600 mb-2 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span className="text-lg font-semibold text-blue-600">Drop your database file here</span>
            <span className="text-sm text-gray-600 mt-2">CSV, JSON, or Excel formats supported</span>
            <input type="file" className="hidden" accept=".csv,.json,.xlsx" onChange={handleFileUpload} />
          </label>
        </div>
      </div>

      {/* Stats Overview */}
      <StatsOverview />

      {/* User Activity Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold mb-6" style={{ color: "#1A1A1A" }}>
          User Activity Overview
        </h3>
        <UserActivityChart />
      </div>

      {/* Graph Cards Grid */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold mb-6" style={{ color: "#1A1A1A" }}>
          Analysis Visualizations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {graphs.map((graph) => (
            <div key={graph.id} className="relative">
              <GraphCard
                id={graph.id}
                title={graph.title}
                endpoint={graph.endpoint}
                dataset={selectedDataset}
                isExpanded={expandedCard === graph.id}
                onExpand={() => setExpandedCard(expandedCard === graph.id ? null : graph.id)}
                shouldReloadAfterAnalysis={analysisCompleteDatasetId === selectedDataset}
                isViewAnalysisComplete={isViewAnalysisComplete}
              />

              {/* Context Input */}
              {showContextBox === graph.id && (
                <div className="absolute top-full mt-4 left-0 right-0 glass-effect p-4 rounded-lg z-10 shadow-xl border border-blue-200">
                  <label className="block text-sm font-semibold mb-2" style={{ color: "#1A1A1A" }}>
                    Give Context:
                  </label>
                  <textarea
                    value={contextInput}
                    onChange={(e) => setContextInput(e.target.value)}
                    placeholder="Share your feedback or questions about this graph..."
                    className="w-full p-3 border border-blue-200 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    rows={3}
                  />
                  <button
                    onClick={handleContextSubmit}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                  >
                    {submitted ? "✓ Submitted" : "Submit Feedback"}
                  </button>
                  {submitted && (
                    <p className="text-green-600 text-sm mt-2 text-center">
                      Thank you! Your suggestions are incorporated to our AI Model
                    </p>
                  )}
                </div>
              )}

              {/* Give Context Button */}
              <button
                onClick={() => setShowContextBox(showContextBox === graph.id ? null : graph.id)}
                className="mt-3 w-full py-2 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-all text-sm font-semibold"
              >
                {showContextBox === graph.id ? "✕ Hide Context" : "💬 Give Context"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
