import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/api/platforms`)
    const platforms = await response.json()
    return NextResponse.json(platforms)
  } catch (error) {
    console.error("Error fetching platforms:", error)
    // Fallback to local data if backend is unavailable
    const { PLATFORMS } = await import("@/lib/constants")
    return NextResponse.json(PLATFORMS)
  }
}
