"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PLATFORMS } from "@/lib/constants"
import type { AbuseCategory, AdminStats, Report, RiskLevel } from "@/lib/types"
import { AlertTriangle, BarChart3, ExternalLink, FileText, LogOut, Shield, TrendingUp, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const categoryLabels: Record<AbuseCategory, string> = {
  harassment: "Harassment",
  threats: "Threats",
  stalking: "Stalking",
  image_based_abuse: "Image Abuse",
  hate_speech: "Hate Speech",
  sexual_content: "Sexual Content",
  non_abusive: "Non-Abusive",
}

const riskColors: Record<RiskLevel, string> = {
  high: "bg-destructive/10 text-destructive border-destructive/30",
  medium: "bg-warning/10 text-warning-foreground border-warning/30",
  low: "bg-success/10 text-success border-success/30",
}

const CHART_COLORS = [
  "hsl(142 76% 36%)",  // Green
  "hsl(142 70% 45%)",  // Lighter Green
  "hsl(142 65% 55%)",  // Even Lighter Green
  "hsl(142 60% 65%)",  // Light Green
  "hsl(142 55% 75%)",  // Very Light Green
]

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<{ username: string } | null>(null)
  const [loggingOut, setLoggingOut] = useState(false)

  // Fetch data function
  const fetchData = async () => {
    try {
      const [statsRes, reportsRes, sessionRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/reports?limit=10"),
        fetch("/api/auth/session"),
      ])

      if (statsRes.ok) setStats(await statsRes.json())
      if (reportsRes.ok) {
        const data = await reportsRes.json()
        setReports(data.reports)
      }
      if (sessionRes.ok) {
        const data = await sessionRes.json()
        if (data.authenticated) {
          setSession({ username: data.username })
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchData()
  }, [])

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData()
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [])

  async function handleLogout() {
    setLoggingOut(true)
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/admin/login")
      router.refresh()
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      setLoggingOut(false)
    }
  }

  const getPlatformName = (id: string) => {
    return PLATFORMS.find((p) => p.id === id)?.name || id
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur">
          <div className="container mx-auto flex h-16 items-center px-4">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg">Safenet.ai Admin</span>
            </Link>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
          <Skeleton className="h-[400px]" />
        </main>
      </div>
    )
  }

  const categoryData =
    stats?.reports_by_category.map((item) => ({
      name: categoryLabels[item.category] || item.category,
      value: item.count,
    })) || []

  const platformData =
    stats?.reports_by_platform.map((item) => ({
      name: getPlatformName(item.platform),
      count: item.count,
    })) || []

  const severityData = stats?.severity_distribution || []

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">Safenet.ai Admin</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            {session && (
              <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground">
                <User className="h-3.5 w-3.5" />
                <span className="font-mono">{session.username}</span>
              </div>
            )}
            <Link href="/" className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded hover:bg-muted transition-colors">
              App
            </Link>
            <Button variant="outline" size="sm" className="h-8 px-2.5 text-xs" onClick={handleLogout} disabled={loggingOut}>
              <LogOut className="h-3.5 w-3.5 sm:mr-1.5" />
              <span className="hidden sm:inline">{loggingOut ? "Exiting..." : "Logout"}</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 mb-1">
              <Shield className="h-3.5 w-3.5" />
              <span>OFFICIAL TELEMETRY CONSOLE • RESTRICTED ACCESS</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Incident Telemetry & Case Management</h1>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-6">
          <div className="border border-border rounded-md bg-card p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
              <span>Total Dockets</span>
              <FileText className="h-4 w-4" />
            </div>
            <div className="text-2xl font-bold mt-2 font-mono">{stats?.total_reports || 0}</div>
          </div>

          <div className="border border-border rounded-md bg-card p-4">
            <div className="flex items-center justify-between text-xs text-destructive font-medium">
              <span>High Risk / Critical</span>
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div className="text-2xl font-bold text-destructive mt-2 font-mono">
              {(stats as any)?.reports_by_risk?.find(
                (r: any) => r.risk_level?.toLowerCase() === "high" || r.risk_level?.toLowerCase() === "critical"
              )?.count ?? reports.filter((r) => r.risk_level === "high").length}
            </div>
          </div>

          <div className="border border-border rounded-md bg-card p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
              <span>Violation Categories</span>
              <BarChart3 className="h-4 w-4" />
            </div>
            <div className="text-2xl font-bold mt-2 font-mono">{categoryData.length}</div>
          </div>

          <div className="border border-border rounded-md bg-card p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
              <span>Monitored Platforms</span>
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-2xl font-bold mt-2 font-mono">{platformData.length}</div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          <div className="border border-border rounded-md bg-card p-5">
            <div className="pb-4 mb-4 border-b border-border">
              <h2 className="text-sm font-bold text-foreground">Reports by Platform</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Distribution across social media platforms</p>
            </div>
            <div>
              {platformData.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={platformData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="name" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                      }}
                    />
                    <Bar dataKey="count" fill="hsl(142 76% 36%)" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[280px] flex items-center justify-center text-muted-foreground text-xs">
                  No data available
                </div>
              )}
            </div>
          </div>

          <div className="border border-border rounded-md bg-card p-5">
            <div className="pb-4 mb-4 border-b border-border">
              <h2 className="text-sm font-bold text-foreground">Abuse Categories</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Classification breakdown across statutory offences</p>
            </div>
            <div>
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} (${((percent || 0) * 100).toFixed(0)}%)`}
                      labelLine={false}
                    >
                      {categoryData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[280px] flex items-center justify-center text-muted-foreground text-xs">
                  No data available
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border border-border rounded-md bg-card p-5 mb-6">
          <div className="pb-4 mb-4 border-b border-border">
            <h2 className="text-sm font-bold text-foreground">Severity Distribution</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Reports grouped by algorithmic threat index</p>
          </div>
          <div>
            {severityData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={severityData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis dataKey="range" type="category" tick={{ fill: "hsl(var(--muted-foreground))" }} width={60} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(142 76% 36%)" radius={[0, 3, 3, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-muted-foreground text-xs">No data available</div>
            )}
          </div>
        </div>

        <div className="border border-border rounded-md bg-card p-5">
          <div className="pb-4 mb-4 border-b border-border">
            <h2 className="text-sm font-bold text-foreground">Recent Evidence Dockets</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Latest submitted forensic incident reports</p>
          </div>
          <div>
            {reports.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-mono text-sm">{report.id}</TableCell>
                      <TableCell>{getPlatformName(report.platform_id)}</TableCell>
                      <TableCell>{categoryLabels[report.category]}</TableCell>
                      <TableCell>{report.severity}/100</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={riskColors[report.risk_level]}>
                          {report.risk_level.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(report.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/results/${report.id}`}
                          className="inline-flex items-center text-primary hover:underline"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="py-12 text-center text-muted-foreground text-xs">No reports submitted yet</div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
