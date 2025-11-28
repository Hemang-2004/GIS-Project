"use client"

import {
  Droplets,
  Brain,
  TrendingUp,
  BarChart3,
  Shield,
  CheckCircle,
  FileText,
  Users,
  Calendar,
  Database,
  Target,
} from "lucide-react"

interface ReportPreviewProps {
  dataset: string
}

export default function ReportPreview({ dataset }: ReportPreviewProps) {
  return (
    <div id="report-content" className="space-y-8 stagger-children">
      {/* Title Page */}
      <div className="glass-effect p-12 rounded-2xl text-center border border-cyan-200 min-h-[500px] flex flex-col justify-between shimmer">
        <div>
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Droplets className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-cyan-800 to-teal-700 bg-clip-text text-transparent">
            NEREUS Analysis Report
          </h1>
          <p className="text-2xl text-gray-600 mb-2">AI-Driven Water Quality Intelligence System</p>
          <p className="text-lg text-cyan-600 font-medium">
            Comprehensive Analysis Using Satellite-Derived Indices, ML Regression, and Generative AI
          </p>
        </div>
        <div className="text-left glass-effect p-6 rounded-xl mt-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-cyan-600" />
              <div>
                <p className="text-xs text-gray-500">Dataset</p>
                <p className="font-semibold text-gray-800">Water Body {dataset}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-cyan-600" />
              <div>
                <p className="text-xs text-gray-500">Generated</p>
                <p className="font-semibold text-gray-800">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-cyan-600" />
              <div>
                <p className="text-xs text-gray-500">Authors</p>
                <p className="font-semibold text-gray-800">Hemang Seth & Satyam Devangan</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-cyan-600" />
              <div>
                <p className="text-xs text-gray-500">Institution</p>
                <p className="font-semibold text-gray-800">IIIT Bangalore</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="glass-effect p-8 rounded-2xl border-l-4 border-cyan-500 card-hover">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
            Executive Summary
          </h2>
        </div>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            This report presents <strong>NEREUS</strong>, an integrated AI–remote sensing water quality analytics
            system. Using NDCI, Turbidity (NTU), and NDWI-derived Shrinkage metrics collected longitudinally from{" "}
            <strong>2020–2024</strong>, the system performs ML modeling, trend decomposition, and predictive
            environmental assessment.
          </p>
          <p className="text-gray-700 leading-relaxed">
            A generative AI engine (Gemini 2.5) interprets dataset patterns and provides advanced ecological insights.
            The dataset contains <strong>1,825 daily observations</strong> with engineered temporal features including
            Year, Month, and DayOfYear. Machine learning models achieve <strong>92-93% accuracy</strong> in predicting
            water quality indices.
          </p>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Records",
            value: "1,825",
            icon: <Database className="w-5 h-5" />,
            color: "from-blue-500 to-cyan-500",
          },
          {
            label: "Period",
            value: "5 Years",
            icon: <Calendar className="w-5 h-5" />,
            color: "from-purple-500 to-indigo-500",
          },
          {
            label: "Indices",
            value: "3",
            icon: <BarChart3 className="w-5 h-5" />,
            color: "from-emerald-500 to-green-500",
          },
          { label: "Accuracy", value: "93%", icon: <Target className="w-5 h-5" />, color: "from-cyan-500 to-teal-500" },
        ].map((metric, i) => (
          <div key={i} className="glass-effect p-5 rounded-xl card-hover">
            <div
              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center text-white mb-3`}
            >
              {metric.icon}
            </div>
            <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
            <p className="text-sm text-gray-500">{metric.label}</p>
          </div>
        ))}
      </div>

      {/* Key Findings */}
      <div className="glass-effect p-8 rounded-2xl card-hover">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
            Key Findings
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              icon: <BarChart3 className="w-6 h-6" />,
              title: "NDCI Trend Analysis",
              description:
                "Long-term upward drift indicating progressive chlorophyll intensification and potential eutrophication risk. NDCI shows moderate positive correlation with Year (0.53).",
              color: "from-blue-500 to-cyan-500",
            },
            {
              icon: <Droplets className="w-6 h-6" />,
              title: "Turbidity Patterns",
              description:
                "Wider variability suggesting rainfall, sediment transport, and wind-driven resuspension events. Turbidity and shrinkage show weak pairwise correlations.",
              color: "from-purple-500 to-indigo-500",
            },
            {
              icon: <TrendingUp className="w-6 h-6" />,
              title: "Shrinkage Seasonal Rhythm",
              description:
                "Patterns align with monsoon/non-monsoon transitions. Monsoon recovery followed by dry-season decline in water levels.",
              color: "from-emerald-500 to-green-500",
            },
            {
              icon: <Brain className="w-6 h-6" />,
              title: "ML Model Performance",
              description:
                "Random Forest achieves 92-93% accuracy, making it the best-performing model for NDCI prediction compared to Gradient Boosting, AdaBoost, and others.",
              color: "from-cyan-500 to-teal-500",
            },
          ].map((finding, i) => (
            <div
              key={i}
              className="flex gap-4 p-4 rounded-xl bg-gradient-to-br from-white/50 to-cyan-50/50 border border-cyan-100"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${finding.color} flex items-center justify-center text-white flex-shrink-0`}
              >
                {finding.icon}
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">{finding.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{finding.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Methodology */}
      <div className="glass-effect p-8 rounded-2xl card-hover">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
            Methodology
          </h2>
        </div>
        <div className="space-y-4">
          {[
            {
              title: "Data Collection",
              content:
                "Daily observations from 2020-2024 using satellite-derived indices: NDCI (Chlorophyll-a proxy), Turbidity (NTU - suspended matter), and NDWI (water body area).",
            },
            {
              title: "Feature Engineering",
              content:
                "Temporal features (Year, Month, DayOfYear) with cyclical encoding for seasonal patterns. Additional derived metrics for trend analysis.",
            },
            {
              title: "Machine Learning",
              content:
                "Ensemble methods including Random Forest, Gradient Boosting, AdaBoost, Linear Regression, SVR, and KNN. Model comparison and optimization performed.",
            },
            {
              title: "AI Analysis",
              content:
                "Gemini 2.5 generative AI for interpretable insights, pattern recognition, and advanced ecological assessments with natural language explanations.",
            },
          ].map((method, i) => (
            <div key={i} className="p-4 rounded-xl bg-gradient-to-r from-white/60 to-cyan-50/60 border border-cyan-100">
              <h4 className="font-bold text-gray-800 mb-2">{method.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{method.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="glass-effect p-8 rounded-2xl border-l-4 border-emerald-500 card-hover">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-emerald-600">Recommendations</h2>
        </div>
        <ul className="space-y-3">
          {[
            "Monitor NDCI levels closely for early eutrophication warning signs",
            "Implement continuous turbidity monitoring during monsoon seasons",
            "Develop water conservation strategies based on seasonal shrinkage patterns",
            "Use Random Forest model for short-term NDCI predictions with 93% confidence",
            "Integrate real-time satellite data feeds for continuous monitoring",
          ].map((rec, i) => (
            <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50/50">
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Technical Specifications */}
      <div className="glass-effect p-8 rounded-2xl card-hover">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
          Technical Specifications
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Dataset Size", value: "1,825 records" },
            { label: "Analysis Period", value: "2020-2024 (5 years)" },
            { label: "Primary Metrics", value: "3 satellite indices" },
            { label: "Model Accuracy", value: "92-93%" },
            { label: "ML Models Tested", value: "6 algorithms" },
            { label: "Best Model", value: "Random Forest" },
            { label: "AI Engine", value: "Gemini 2.5" },
            { label: "Update Frequency", value: "Daily" },
          ].map((spec, i) => (
            <div key={i} className="text-center p-4 rounded-xl bg-gradient-to-br from-white/50 to-cyan-50/50">
              <p className="text-sm text-gray-500 mb-1">{spec.label}</p>
              <p className="text-lg font-bold text-gray-800">{spec.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm border-t border-gray-200 pt-8">
        <p className="font-semibold text-gray-700">NEREUS - AI-Driven Water Quality Intelligence System</p>
        <p className="mt-1">&copy; 2025 IIIT Bangalore. All rights reserved.</p>
        <p className="mt-1">Authors: Hemang Seth & Satyam Devangan</p>
      </div>
    </div>
  )
}
