import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function GET(request: Request) {
  try {
    // Get admin credentials from headers (Basic Auth)
    const authHeader = request.headers.get("authorization")
    
    const response = await fetch(`${API_URL}/api/admin/stats`, {
      headers: authHeader ? { Authorization: authHeader } : {},
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const stats = await response.json()
    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 })
  }
}
