import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { searchParams } = new URL(request.url)
  const language = searchParams.get("lang") || searchParams.get("language") || "en"
  const isDownload = searchParams.get("download") === "true"
  const disposition = isDownload ? "attachment" : "inline"

  try {
    const response = await fetch(`${API_URL}/api/complaint/${id}/pdf?language=${language}&download=${isDownload}`)

    if (!response.ok) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 })
    }

    const pdfBuffer = await response.arrayBuffer()

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${disposition}; filename="complaint-${id}-${language}.pdf"`,
      },
    })
  } catch (error) {
    console.error("Error generating complaint PDF:", error)
    return NextResponse.json({ error: "Failed to generate complaint PDF" }, { status: 500 })
  }
}
