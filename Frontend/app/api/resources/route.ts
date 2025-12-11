import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const region = searchParams.get("region")

  try {
    const url = region ? `${API_URL}/api/resources?region=${region}` : `${API_URL}/api/resources`
    const response = await fetch(url)
    const resources = await response.json()
    return NextResponse.json(resources)
  } catch (error) {
    console.error("Error fetching resources:", error)
    // Fallback to local data if backend is unavailable
    const { RESOURCES } = await import("@/lib/constants")
    let filteredResources = RESOURCES

    if (region && region !== "all") {
      filteredResources = RESOURCES.filter((r) => r.region === region || r.region === "nationwide")
    }

    return NextResponse.json(filteredResources)
  }
}
