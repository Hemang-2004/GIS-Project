"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import ReportPreview from "@/components/report-preview"
import { FileDown, Table, Share2, Loader2, CheckCircle, FileText, Printer, Upload } from "lucide-react"

export default function ExportReportPage() {
  const [selectedDataset, setSelectedDataset] = useState("1")
  const [loading, setLoading] = useState(false)
  const [reportGenerated, setReportGenerated] = useState(false)
  const [filePath, setFilePath] = useState("")
  const [showPathInput, setShowPathInput] = useState(false)

  const handleGeneratePDF = async () => {
    setLoading(true)
    try {
      const response = await fetch("http://localhost:8040/api/export/pdf", {
  method: "GET"
})
      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = filePath || "NEREUS_Report.pdf"
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(url)

        setReportGenerated(true)
        setFilePath("")
        setShowPathInput(false)
        setTimeout(() => setReportGenerated(false), 5000)
      }
    } catch (error) {
      console.error("[v0] Error generating report:", error)
      alert("Could not export PDF. Make sure backend server is running on localhost:8040")
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout selectedDataset={selectedDataset} onDatasetChange={setSelectedDataset}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 fade-in-up">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-cyan-800 bg-clip-text text-transparent">
                Export Analysis Report
              </h1>
              <p className="text-gray-600">Generate comprehensive PDF reports of your water quality analysis</p>
            </div>
          </div>

          {/* File Path Input */}
          {showPathInput && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">Export File Path (optional)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={filePath}
                  onChange={(e) => setFilePath(e.target.value)}
                  placeholder="e.g., /downloads/NEREUS_Report_2024.pdf or just filename"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                  onClick={() => setShowPathInput(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Leave empty to use default filename. Database ID: {selectedDataset || "1"}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 flex-wrap mt-8">
            <button
              onClick={handleGeneratePDF}
              disabled={loading}
              className="btn-glow px-8 py-4 text-white rounded-2xl font-semibold flex items-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <FileDown className="w-5 h-5" />
                  Export as PDF
                </>
              )}
            </button>
            <button
              onClick={() => setShowPathInput(!showPathInput)}
              className="btn-outline-glow px-8 py-4 text-cyan-700 rounded-2xl font-semibold flex items-center gap-3"
            >
              <Upload className="w-5 h-5" />
              {showPathInput ? "Hide" : "Set"} File Path
            </button>
            <button className="btn-outline-glow px-8 py-4 text-cyan-700 rounded-2xl font-semibold flex items-center gap-3">
              <Table className="w-5 h-5" />
              Download Excel
            </button>
            <button className="btn-outline-glow px-8 py-4 text-cyan-700 rounded-2xl font-semibold flex items-center gap-3">
              <Share2 className="w-5 h-5" />
              Share Report
            </button>
            <button className="btn-outline-glow px-8 py-4 text-cyan-700 rounded-2xl font-semibold flex items-center gap-3">
              <Printer className="w-5 h-5" />
              Print
            </button>
          </div>
        </div>

        {/* Report Preview */}
        <ReportPreview dataset={selectedDataset} />

        {/* Success Message */}
        {reportGenerated && (
          <div className="fixed bottom-6 right-6 glass-effect p-6 rounded-2xl shadow-xl border-l-4 border-emerald-500 flex items-center gap-3 animate-in slide-in-from-right">
            <CheckCircle className="w-6 h-6 text-emerald-600" />
            <div>
              <p className="text-emerald-700 font-semibold">Report generated successfully!</p>
              <p className="text-sm text-gray-500">
                Dataset ID: {selectedDataset || "1"} {filePath && `→ ${filePath}`}
              </p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
