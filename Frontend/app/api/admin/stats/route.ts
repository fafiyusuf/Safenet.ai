import { verifySession } from "@/lib/services/auth"
import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function GET(request: Request) {
  try {
    // Verify session and get credentials
    const session = await verifySession()
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Create Basic Auth header
    const credentials = Buffer.from(`${session.username}:${session.password}`).toString('base64')
    
    const response = await fetch(`${API_URL}/api/admin/stats`, {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
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
