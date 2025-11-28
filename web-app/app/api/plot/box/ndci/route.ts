import { type NextRequest, NextResponse } from "next/server"

const mockBoxNDCIData = {
  description: "NDCI outlier detection and statistical distribution.",
  imageUrl: "/ndci-box-plot-outliers.jpg",
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id") || "1"

    return NextResponse.json({
      success: true,
      data: mockBoxNDCIData,
      datasetId: id,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch NDCI box plot data" }, { status: 500 })
  }
}
