import { type NextRequest, NextResponse } from "next/server"

const mockShrinkageData = {
  description: "Seasonal shrinkage patterns align with monsoon/non-monsoon transitions.",
  analysis: "NDWI shrinkage rhythm → monsoon recovery followed by dry-season decline.",
  imageUrl: "/water-shrinkage-ndwi-trend.jpg",
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id") || "1"

    console.log("[v0] Shrinkage endpoint called with id:", id)

    return NextResponse.json({
      success: true,
      data: mockShrinkageData,
      datasetId: id,
    })
  } catch (error) {
    console.error("[v0] Error in shrinkage route:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch shrinkage data" }, { status: 500 })
  }
}
