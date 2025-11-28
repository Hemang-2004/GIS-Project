import { type NextRequest, NextResponse } from "next/server"

const mockTurbidityData = {
  description:
    "Turbidity variability is wider, suggesting rainfall, sediment transport, and wind-driven resuspension events.",
  analysis: "Moderate turbidity variability → seasonal hydrodynamics. Width suggests rainfall and sediment events.",
  imageUrl: "/turbidity-trend-analysis.jpg",
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id") || "1"

    console.log("[v0] Turbidity endpoint called with id:", id)

    return NextResponse.json({
      success: true,
      data: mockTurbidityData,
      datasetId: id,
    })
  } catch (error) {
    console.error("[v0] Error in turbidity route:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch turbidity data" }, { status: 500 })
  }
}
