import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "safenet-dev-secret-change-in-production")
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export interface AdminSession {
  username: string
  password: string // Store encrypted password for backend auth
  role: "admin"
  exp: number
}

export async function createSession(username: string, password: string): Promise<string> {
  const token = await new SignJWT({ username, password, role: "admin" })
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

export async function validateCredentials(username: string, password: string): Promise<boolean> {
  try {
    // Validate against backend database
    const credentials = Buffer.from(`${username}:${password}`).toString('base64')
    const response = await fetch(`${API_URL}/api/admin/stats`, {
      headers: {
        'Authorization': `Basic ${credentials}`
      }
    })
    
    return response.ok
  } catch (error) {
    console.error('Credential validation error:', error)
    return false
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
