"use client"
import { useRouter } from "next/navigation"
import Timeline from "@/components/timeline"
import Navbar from "@/components/navbar"
import BubbleBackground from "@/components/bubble-background"
import { Droplets, Satellite, Brain, BarChart3, Shield, Zap, ArrowRight, Check } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push("/dashboard")
  }

  const features = [
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "NDCI Analysis",
      description: "Advanced chlorophyll detection for eutrophication monitoring with 93% accuracy",
      stat: "93%",
      statLabel: "Accuracy",
    },
    {
      icon: <Satellite className="w-8 h-8" />,
      title: "Satellite Integration",
      description: "Real-time data from 8 satellites covering global water bodies",
      stat: "8+",
      statLabel: "Satellites",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Insights",
      description: "Gemini 2.5 generative AI for interpretable ecological assessments",
      stat: "2.5M+",
      statLabel: "Data Points",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Predictive Analytics",
      description: "ML models including Random Forest for future trend predictions",
      stat: "5yr",
      statLabel: "Forecasting",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Early Warning System",
      description: "Automated alerts for critical water quality threshold breaches",
      stat: "24/7",
      statLabel: "Monitoring",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Processing",
      description: "Instant analysis of turbidity, shrinkage, and quality indices",
      stat: "<2s",
      statLabel: "Response",
    },
  ]

  return (
    <div className="min-h-screen water-gradient relative overflow-hidden">
      <BubbleBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-8 fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-700">Trusted by IIIT Bangalore Research Team</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 fade-in-up" style={{ animationDelay: "0.2s" }}>
            <span className="bg-gradient-to-r from-gray-900 via-cyan-800 to-teal-700 bg-clip-text text-transparent">
              The NEREUS
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
              Analyzer
            </span>
          </h1>
          <p
            className="text-xl md:text-2xl mb-4 text-gray-700 max-w-3xl mx-auto fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            AI-Driven Water Quality Intelligence System
          </p>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto fade-in-up" style={{ animationDelay: "0.4s" }}>
            Comprehensive analysis using satellite-derived indices, ML regression, and generative AI for freshwater
            monitoring
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16 fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            <button
              onClick={handleGetStarted}
              className="btn-glow px-10 py-4 text-white text-lg font-semibold rounded-2xl inline-flex items-center justify-center gap-2 group"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn-outline-glow px-10 py-4 text-cyan-700 text-lg font-semibold rounded-2xl hover:bg-cyan-50/50 transition-all">
              View Demo
            </button>
          </div>

          {/* Stats Bar */}
          <div className="glass-effect rounded-2xl p-6 max-w-4xl mx-auto fade-in-up" style={{ animationDelay: "0.6s" }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                  1,825
                </p>
                <p className="text-sm text-gray-600">Daily Records</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                  2020-2024
                </p>
                <p className="text-sm text-gray-600">Analysis Period</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                  92-93%
                </p>
                <p className="text-sm text-gray-600">Model Accuracy</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                  3
                </p>
                <p className="text-sm text-gray-600">Satellite Indices</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-cyan-800 bg-clip-text text-transparent">
              Powerful Analysis Features
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Leveraging cutting-edge technology for comprehensive water quality intelligence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {features.map((feature, index) => (
              <div key={index} className="glass-effect card-hover p-6 rounded-2xl group shimmer">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                      {feature.stat}
                    </p>
                    <p className="text-xs text-gray-500">{feature.statLabel}</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 relative z-10">
        <Timeline />
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-cyan-800 bg-clip-text text-transparent">
              Pricing Plans
            </h2>
            <p className="text-gray-600">Choose the perfect plan for your water quality monitoring needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 stagger-children">
            {/* Basic Plan */}
            <div className="glass-effect card-hover p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-2 text-gray-800">Basic</h3>
              <p className="text-gray-600 mb-6">Perfect for small projects</p>
              <p className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                $29<span className="text-lg text-gray-500">/mo</span>
              </p>
              <ul className="space-y-3 mb-8">
                {["1 Water Body Analysis", "Basic Reports", "AI Insights", "Email Support"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-cyan-600" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full btn-outline-glow py-3 text-cyan-700 rounded-xl font-semibold">
                Choose Plan
              </button>
            </div>

            {/* Professional Plan */}
            <div className="relative glass-effect card-hover p-8 rounded-2xl border-2 border-cyan-500 scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 btn-glow text-white px-4 py-1 rounded-full text-sm font-bold">
                POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-800 mt-4">Professional</h3>
              <p className="text-gray-600 mb-6">For growing teams</p>
              <p className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                $79<span className="text-lg text-gray-500">/mo</span>
              </p>
              <ul className="space-y-3 mb-8">
                {["5 Water Bodies", "Advanced Reports", "AI Analysis", "Priority Support", "API Access"].map(
                  (item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-cyan-600" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ),
                )}
              </ul>
              <button className="w-full btn-glow py-3 text-white rounded-xl font-semibold">Choose Plan</button>
            </div>

            {/* Enterprise Plan */}
            <div className="glass-effect card-hover p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-2 text-gray-800">Enterprise</h3>
              <p className="text-gray-600 mb-6">For large organizations</p>
              <p className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                Custom
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Unlimited Analysis",
                  "Custom Reports",
                  "Dedicated AI Agent",
                  "24/7 Support",
                  "On-premise Option",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-cyan-600" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full btn-outline-glow py-3 text-cyan-700 rounded-xl font-semibold">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 text-white py-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
                  <span className="text-white font-bold">N</span>
                </div>
                <span className="font-bold text-xl">NEREUS</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                AI-Driven Water Quality Intelligence System by IIIT Bangalore
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Research</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    Publications
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    Datasets
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition">
                    Methodology
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Authors</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Hemang Seth</li>
                <li>Satyam Devangan</li>
                <li className="text-cyan-400">IIIT Bangalore</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2025 NEREUS Analyzer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
