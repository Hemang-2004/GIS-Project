import { type NextRequest, NextResponse } from "next/server"

const mockViolinShrinkageData = {
  description: "Shrinkage distribution revealing seasonal clustering and water-level seasonality.",
  imageUrl: "/shrinkage-distribution-violin-plot.jpg",
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id") || "1"

    return NextResponse.json({
      success: true,
      data: mockViolinShrinkageData,
      datasetId: id,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch shrinkage violin data" }, { status: 500 })
  }
}
