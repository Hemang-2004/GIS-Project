import { type NextRequest, NextResponse } from "next/server"

const mockViolinNDCIData = {
  description: "Distributions gradually shift upward with narrower variance in later years.",
  imageUrl: "/ndci-distribution-violin-plot-by-year.jpg",
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id") || "1"

    return NextResponse.json({
      success: true,
      data: mockViolinNDCIData,
      datasetId: id,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch NDCI violin data" }, { status: 500 })
  }
}
