import { type NextRequest, NextResponse } from "next/server"

const mockAnalysis = {
  "1": "Based on the NEREUS analysis, the water quality data shows significant trends over the 2020-2024 period. The NDCI values demonstrate a gradual upward drift indicating progressive chlorophyll intensification, with a moderate positive correlation (0.53) with time. Turbidity patterns reveal wider variability suggesting seasonal hydrodynamics driven by rainfall and sediment transport events. The NDWI-based shrinkage metrics align well with monsoon transitions, showing recovery during wet seasons and decline during dry periods. Machine learning models, particularly Random Forest, achieve 92-93% accuracy in predicting NDCI values, validating our predictive framework.",
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id = "1", prompt } = body

    console.log("[v0] Analyze endpoint called with id:", id, "prompt:", prompt)

    const analysis = mockAnalysis[id as keyof typeof mockAnalysis] || mockAnalysis["1"]

    return NextResponse.json({
      success: true,
      analysis,
      datasetId: id,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Error in analyze route:", error)
    return NextResponse.json({ success: false, error: "Failed to generate analysis" }, { status: 500 })
  }
}
