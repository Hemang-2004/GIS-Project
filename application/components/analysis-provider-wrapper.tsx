"use client"

import type React from "react"

import { AnalysisProvider } from "@/lib/analysis-context"

export function AnalysisProviderWrapper({ children }: { children: React.ReactNode }) {
  return <AnalysisProvider>{children}</AnalysisProvider>
}
