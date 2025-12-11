import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    const response = await fetch(`${API_URL}/api/evidence/${id}/pdf`)

    if (!response.ok) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 })
    }

    const pdfBuffer = await response.arrayBuffer()

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="evidence-${id}.pdf"`,
      },
    })
  } catch (error) {
    console.error("Error generating evidence PDF:", error)
    return NextResponse.json({ error: "Failed to generate evidence PDF" }, { status: 500 })
  }
}
