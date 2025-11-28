import { type NextRequest, NextResponse } from "next/server"

// Mock correlation data
const mockCorrelationData = {
  description: "Correlation Matrix Across NDCI, Turbidity, Shrinkage, and Temporal Features",
  data: "NDCI shows moderate positive correlation with Year (0.53), suggesting long-term gradual increase in chlorophyll content. Turbidity and shrinkage show weak pairwise correlations, indicating independent seasonal drivers.",
  imageUrl: "/correlation-matrix-heatmap.jpg",
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id") || "1"

    console.log("[v0] Correlation endpoint called with id:", id)

    return NextResponse.json({
      success: true,
      data: mockCorrelationData,
      datasetId: id,
    })
  } catch (error) {
    console.error("[v0] Error in correlation route:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch correlation data" }, { status: 500 })
  }
}
