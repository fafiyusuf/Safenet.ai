import type { Report } from "../types"

// In-memory store for reports (will be replaced with database later)
const reports = new Map<string, Report>()

export function generateReportId(): string {
  return `RPT-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
}

export function saveReport(report: Report): void {
  reports.set(report.id, report)
}

export function getReport(id: string): Report | undefined {
  return reports.get(id)
}

export function getAllReports(): Report[] {
  return Array.from(reports.values()).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  )
}

export function getReportStats() {
  const allReports = getAllReports()

  const reportsByPlatform = allReports.reduce(
    (acc, report) => {
      acc[report.platform_id] = (acc[report.platform_id] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const reportsByCategory = allReports.reduce(
    (acc, report) => {
      acc[report.category] = (acc[report.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const severityDistribution = [
    { range: "0-25", count: allReports.filter((r) => r.severity <= 25).length },
    { range: "26-50", count: allReports.filter((r) => r.severity > 25 && r.severity <= 50).length },
    { range: "51-75", count: allReports.filter((r) => r.severity > 50 && r.severity <= 75).length },
    { range: "76-100", count: allReports.filter((r) => r.severity > 75).length },
  ]

  return {
    total_reports: allReports.length,
    reports_by_platform: Object.entries(reportsByPlatform).map(([platform, count]) => ({
      platform,
      count,
    })),
    reports_by_category: Object.entries(reportsByCategory).map(([category, count]) => ({
      category: category as Report["category"],
      count,
    })),
    severity_distribution: severityDistribution,
    trend: [], // Would calculate from timestamps in production
  }
}
