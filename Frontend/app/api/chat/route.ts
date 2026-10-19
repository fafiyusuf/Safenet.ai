import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Forward the request to Express backend chat service
    const response = await fetch(`${API_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Failed to communicate with counselor service" }))
      return NextResponse.json(
        { error: errorData.error || errorData.message || "Failed to communicate with counselor service" },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Chat proxy error:", error)
    return NextResponse.json(
      { error: "Counselor service is temporarily unreachable. If you are in immediate danger, please call 7711 or 991." },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/api/chat/health`)
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ status: "Chat backend unreachable" }, { status: 503 })
  }
}
