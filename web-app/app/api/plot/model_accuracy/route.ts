import { type NextRequest, NextResponse } from "next/server"

const mockModelAccuracyData = {
  description:
    "Random Forest achieves the highest accuracy (92–93%), making it the best-performing model for NDCI prediction.",
  analysis:
    "Comparison of ML model accuracies: Random Forest, Gradient Boosting, AdaBoost, Linear Regression, SVR, KNN.",
  imageUrl: "/model-accuracy-comparison-chart.jpg",
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id") || "1"

    console.log("[v0] Model accuracy endpoint called with id:", id)

    return NextResponse.json({
      success: true,
      data: mockModelAccuracyData,
      datasetId: id,
    })
  } catch (error) {
    console.error("[v0] Error in model accuracy route:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch model accuracy data" }, { status: 500 })
  }
}
