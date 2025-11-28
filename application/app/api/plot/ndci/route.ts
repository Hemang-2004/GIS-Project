import { type NextRequest, NextResponse } from "next/server"

const mockNDCIData = {
  description:
    "NDCI values show gradual upward drift, indicating progressive chlorophyll intensification and potential eutrophication risk.",
  analysis:
    "Long-term upward drift in NDCI → rising chlorophyll concentrations. Moderate positive correlation with Year (0.53).",
  imageUrl: "/ndci-trend-analysis-over-time.jpg",
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id") || "1"

    console.log("[v0] NDCI endpoint called with id:", id)

    return NextResponse.json({
      success: true,
      data: mockNDCIData,
      datasetId: id,
    })
  } catch (error) {
    console.error("[v0] Error in NDCI route:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch NDCI data" }, { status: 500 })
  }
}
