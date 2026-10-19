import { createSession, loginToBackend, setSessionCookie } from "@/lib/services/auth"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 })
    }

    const loginResult = await loginToBackend(username, password)

    if (!loginResult.success || !loginResult.token) {
      return NextResponse.json({ error: loginResult.error || "Invalid credentials" }, { status: 401 })
    }

    const sessionToken = await createSession(loginResult.username || username, loginResult.token)
    await setSessionCookie(sessionToken)

    return NextResponse.json({ success: true, username: loginResult.username || username })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
