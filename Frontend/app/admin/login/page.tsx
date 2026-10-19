"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Shield, Eye, EyeOff, Lock, User, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Login failed")
      }

      router.push("/admin")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm border border-border rounded-md bg-card p-6 shadow-xs">
        <div className="text-center pb-5 mb-5 border-b border-border">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-emerald-700 text-white">
            <Shield className="h-5 w-5" />
          </div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold mb-1">
            Restricted Telemetry Terminal
          </div>
          <h1 className="text-lg font-bold text-foreground">Safenet.ai Investigator Portal</h1>
          <p className="text-xs text-muted-foreground mt-1">Authenticate credentials to access case logs</p>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-xs text-destructive flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="username" className="text-xs font-medium">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="investigator_id"
                  className="pl-9 h-9 text-xs rounded-md border-border"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="pl-9 pr-9 h-9 text-xs rounded-md border-border"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-9 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs mt-2" disabled={loading}>
              {loading ? "Authenticating..." : "Authorize Access"}
            </Button>
          </form>

          <p className="mt-5 text-center text-[10px] text-muted-foreground">
            Audit logging active. Unauthorized access is punishable under Ethiopian Computer Crime Proclamation 958/2016.
          </p>
        </div>
      </div>
    </div>
  )
}
