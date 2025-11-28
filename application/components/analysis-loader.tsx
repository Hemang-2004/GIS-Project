"use client"

import { useState, useEffect } from "react"
import { CheckCircle2 } from "lucide-react"

interface AnalysisLoaderProps {
  isVisible: boolean
  onComplete: () => void
}

const steps = [
  { label: "Analysing the Dataset", icon: "📊" },
  { label: "Plotting the Graphs", icon: "📈" },
  { label: "Running the Models", icon: "🤖" },
  { label: "Producing Insights", icon: "💡" },
  { label: "Integration with LLM", icon: "🧠" },
  { label: "Processing Complete", icon: "✅" },
]

export default function AnalysisLoader({ isVisible, onComplete }: AnalysisLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showContinueButton, setShowContinueButton] = useState(false)

  useEffect(() => {
    if (!isVisible) {
      setCurrentStep(0)
      setShowContinueButton(false)
      return
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval)
          setTimeout(() => setShowContinueButton(true), 500)
          return prev
        }
        return prev + 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isVisible, onComplete])

  const handleContinue = () => {
    setShowContinueButton(false)
    setTimeout(onComplete, 300)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
          Analyzing Your Data
        </h3>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-3 rounded-lg transition-all ${
                index <= currentStep
                  ? index === currentStep
                    ? "bg-cyan-100 scale-105"
                    : "bg-emerald-50"
                  : "bg-gray-50 opacity-50"
              }`}
            >
              <div className="text-2xl">{step.icon}</div>
              <div className="flex-1">
                <p
                  className={`text-sm font-medium transition-colors ${
                    index <= currentStep ? "text-gray-800" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </p>
              </div>
              {index < currentStep && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
              {index === currentStep && (
                <div className="w-5 h-5 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {showContinueButton && (
          <button
            onClick={handleContinue}
            className="mt-6 w-full py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all animate-pulse"
          >
            Continue to View Analysis
          </button>
        )}
      </div>
    </div>
  )
}
