import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "safenet-dev-secret-change-in-production")
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export interface AdminSession {
  username: string
  token: string // Secure backend-issued JWT token (no plaintext password)
  role: "admin"
  exp: number
}

export interface LoginResult {
  success: boolean
  token?: string
  username?: string
  error?: string
}

export async function loginToBackend(username: string, password: string): Promise<LoginResult> {
  try {
    const response = await fetch(`${API_URL}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      return { success: false, error: err.error || "Invalid credentials" }
    }

    const data = await response.json()
    return {
      success: true,
      token: data.token,
      username: data.admin?.username || username,
    }
  } catch (error) {
    console.error("Backend login error:", error)
    return { success: false, error: "Unable to reach authentication server" }
  }
}

export async function createSession(username: string, backendToken: string): Promise<string> {
  const token = await new SignJWT({ username, token: backendToken, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("8h")
    .setIssuedAt()
    .sign(JWT_SECRET)

  return token
}

export async function verifySession(): Promise<AdminSession | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_session")?.value

  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as AdminSession
  } catch {
    return null
  }
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8 hours
    path: "/",
  })
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("admin_session")
}
