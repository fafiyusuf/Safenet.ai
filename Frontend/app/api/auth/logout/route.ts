import { NextResponse } from "next/server"
import { clearSessionCookie } from "@/lib/services/auth"

export async function POST() {
  await clearSessionCookie()
  return NextResponse.json({ success: true })
}
