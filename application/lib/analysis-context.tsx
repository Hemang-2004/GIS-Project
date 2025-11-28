"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

interface AnalysisData {
  datasetId: string
  fileName: string
  uploadedAt: string
  status: "idle" | "loading" | "complete" | "error"
  loadingStep: number
}

interface AnalysisContextType {
  analysisData: AnalysisData | null
  startAnalysis: (fileName: string, datasetId: string) => void
  completeAnalysis: (datasetId: string) => void
  resetAnalysis: () => void
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined)

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)

  const startAnalysis = useCallback((fileName: string, datasetId: string) => {
    setAnalysisData({
      datasetId,
      fileName,
      uploadedAt: new Date().toLocaleString(),
      status: "loading",
      loadingStep: 0,
    })
  }, [])

  const completeAnalysis = useCallback((datasetId: string) => {
    setAnalysisData((prev) =>
      prev
        ? {
            ...prev,
            status: "complete",
            loadingStep: 6,
          }
        : null,
    )
  }, [])

  const resetAnalysis = useCallback(() => {
    setAnalysisData(null)
  }, [])

  return (
    <AnalysisContext.Provider value={{ analysisData, startAnalysis, completeAnalysis, resetAnalysis }}>
      {children}
    </AnalysisContext.Provider>
  )
}

export function useAnalysis() {
  const context = useContext(AnalysisContext)
  if (context === undefined) {
    throw new Error("useAnalysis must be used within AnalysisProvider")
  }
  return context
}
