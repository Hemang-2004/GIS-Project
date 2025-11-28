"use client"

import { useState, useRef, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import WaterFlowAnimation from "@/components/water-flow-animation"
import ChatMessage from "@/components/chat-message"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function AskNereusPage() {
  const [selectedDataset, setSelectedDataset] = useState("1")
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const presetPrompts = [
    "What trends do you see in the NDCI data?",
    "Analyze the turbidity patterns",
    "Explain the water shrinkage trends",
    "What is the model accuracy telling us?",
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setLoading(true)

    try {
      const response = await fetch("http://localhost:8040/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedDataset || "1",
          prompt: text,
        }),
      })

      const data = await response.json()
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.analysis || "Analysis complete. Please check the dashboard for detailed insights.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("[v0] Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Unable to connect to analysis service on localhost:8040. Make sure the backend server is running.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout selectedDataset={selectedDataset} onDatasetChange={setSelectedDataset}>
      <div className="max-w-4xl mx-auto">
        {/* Welcome Message */}
        {messages.length === 0 && (
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4" style={{ color: "#1A1A1A" }}>
              Welcome To The Most Advanced Visualizing Tool in Today's Age
            </h1>
            <p className="text-xl text-gray-700 mb-8">How may we help you analyze your water quality data?</p>

            {/* Preset Prompts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {presetPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(prompt)}
                  className="glass-effect glow-blue p-4 rounded-lg text-left hover:shadow-lg transition-all"
                >
                  <p className="text-blue-600 font-semibold">{prompt}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="glass-effect rounded-lg p-6 mb-6 h-[500px] overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Start a conversation about your water analysis</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {loading && <WaterFlowAnimation />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="glass-effect p-6 rounded-lg">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !loading) {
                  handleSendMessage(inputValue)
                }
              }}
              placeholder="Ask NEREUS anything about your water analysis..."
              disabled={loading}
              className="flex-1 px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              disabled={loading || !inputValue.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all font-semibold"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
