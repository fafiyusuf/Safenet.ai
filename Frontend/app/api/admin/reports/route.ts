import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit") || "50"
    const offset = searchParams.get("offset") || "0"
    
    // Get admin credentials from headers (Basic Auth)
    const authHeader = request.headers.get("authorization")
    
    const response = await fetch(`${API_URL}/api/admin/reports?limit=${limit}&offset=${offset}`, {
      headers: authHeader ? { Authorization: authHeader } : {},
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching admin reports:", error)
    return NextResponse.json({ error: "Failed to fetch reports" }, { status: 500 })
  }
}
