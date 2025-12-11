import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "safenet-dev-secret-change-in-production")

// Admin credentials from environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "safenet2024"

export interface AdminSession {
  username: string
  role: "admin"
  exp: number
}

export async function createSession(username: string): Promise<string> {
  const token = await new SignJWT({ username, role: "admin" })
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
  // Constant-time comparison to prevent timing attacks
  const usernameMatch = username === ADMIN_USERNAME
  const passwordMatch = password === ADMIN_PASSWORD
  return usernameMatch && passwordMatch
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
