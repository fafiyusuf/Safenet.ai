import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    const response = await fetch(`${API_URL}/api/reports/${id}`)

    if (!response.ok) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 })
    }

    const report = await response.json()
    return NextResponse.json(report)
  } catch (error) {
    console.error("Error fetching report:", error)
    return NextResponse.json({ error: "Failed to fetch report" }, { status: 500 })
  }
}
