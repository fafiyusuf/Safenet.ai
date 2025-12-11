import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    // Forward the request to the Backend API
    const response = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json({ error: error.detail || "Failed to process upload" }, { status: response.status })
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to process upload" }, { status: 500 })
  }
}
