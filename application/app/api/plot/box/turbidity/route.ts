import { type NextRequest, NextResponse } from "next/server"

const mockBoxTurbidityData = {
  description: "Turbidity outlier detection and statistical bounds.",
  imageUrl: "/turbidity-box-plot-outliers.jpg",
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id") || "1"

    return NextResponse.json({
      success: true,
      data: mockBoxTurbidityData,
      datasetId: id,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch turbidity box plot data" }, { status: 500 })
  }
}
