import { type NextRequest, NextResponse } from "next/server"

const mockViolinTurbidityData = {
  description: "Turbidity distribution showing seasonal clustering patterns.",
  imageUrl: "/turbidity-distribution-violin-plot.jpg",
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id") || "1"

    return NextResponse.json({
      success: true,
      data: mockViolinTurbidityData,
      datasetId: id,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch turbidity violin data" }, { status: 500 })
  }
}
