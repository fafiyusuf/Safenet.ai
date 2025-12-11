"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { FileText, Scale, Users, Plus, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Header } from "@/components/header"
import { SeverityMeter } from "@/components/severity-meter"
import { RiskBanner } from "@/components/risk-banner"
import { BlurredContent } from "@/components/blurred-content"
import { getTranslation, type Language } from "@/lib/i18n"
import type { Report, AbuseCategory } from "@/lib/types"

const categoryLabels: Record<AbuseCategory, { en: string; am: string }> = {
  harassment: { en: "Harassment", am: "ትንኮሳ" },
  threats: { en: "Threats", am: "ማስፈራሪያ" },
  stalking: { en: "Stalking", am: "ማሳደድ" },
  image_based_abuse: { en: "Image-Based Abuse", am: "በምስል ላይ የተመሰረተ ጥቃት" },
  hate_speech: { en: "Hate Speech", am: "የጥላቻ ንግግር" },
  sexual_content: { en: "Sexual Content", am: "ወሲባዊ ይዘት" },
  non_abusive: { en: "Non-Abusive", am: "ጥቃት ያልሆነ" },
}

export default function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const searchParams = useSearchParams()
  const [language, setLanguage] = useState<Language>((searchParams.get("lang") as Language) || "en")
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const t = getTranslation(language)

  useEffect(() => {
    async function fetchReport() {
      try {
        const response = await fetch(`/api/reports/${id}`)
        if (!response.ok) throw new Error("Report not found")
        const data = await response.json()
        setReport(data)
      } catch {
        setError("Failed to load report")
      } finally {
        setLoading(false)
      }
    }
    fetchReport()
  }, [id])

  const handleDownloadEvidence = () => {
    window.open(`/api/evidence/${id}/pdf`, "_blank")
  }

  const handleDownloadComplaint = () => {
    window.open(`/api/complaint/${id}/pdf?lang=${language}`, "_blank")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header language={language} onLanguageChange={setLanguage} />
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4 max-w-3xl space-y-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
        </main>
      </div>
    )
  }

  if (error || !report) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header language={language} onLanguageChange={setLanguage} />
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <p className="text-destructive mb-4">{error || "Report not found"}</p>
            <Button asChild variant="outline">
              <Link href="/upload">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t.common.back}
              </Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header language={language} onLanguageChange={setLanguage} />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-8">
            <Link
              href="/upload"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              {t.common.back}
            </Link>
            <h1 className="text-3xl font-bold text-foreground">{t.results.title}</h1>
            <p className="text-muted-foreground mt-1">Report ID: {report.id}</p>
          </div>

          {/* Risk Banner */}
          <RiskBanner level={report.risk_level} language={language} className="mb-6" />

          {/* Classification Results */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">{t.results.category}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t.results.category}</span>
                <Badge variant="secondary" className="text-sm">
                  {categoryLabels[report.category][language]}
                </Badge>
              </div>

              <SeverityMeter value={report.severity} />

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t.results.confidence}</span>
                <span className="font-medium">{(report.confidence * 100).toFixed(1)}%</span>
              </div>

              <div>
                <span className="text-muted-foreground block mb-2">{t.results.rationale}</span>
                <p className="text-foreground">{report.rationale}</p>
              </div>

              {report.highlighted_phrases.length > 0 && (
                <div>
                  <span className="text-muted-foreground block mb-2">{t.results.flaggedPhrases}</span>
                  <div className="flex flex-wrap gap-2">
                    {report.highlighted_phrases.map((phrase, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="bg-destructive/10 text-destructive border-destructive/30"
                      >
                        {phrase}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Extracted Content */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">{t.results.extractedText}</CardTitle>
            </CardHeader>
            <CardContent>
              <BlurredContent warning={language === "am" ? "ይህ ይዘት አስቸጋሪ ሊሆን ይችላል" : "This content may be disturbing"}>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm whitespace-pre-wrap">
                  {report.extracted_text}
                </div>
              </BlurredContent>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-3">
                <Button
                  onClick={handleDownloadEvidence}
                  variant="outline"
                  className="justify-start gap-2 bg-transparent"
                >
                  <FileText className="h-4 w-4" />
                  {t.results.actions.evidence}
                </Button>
                <Button
                  onClick={handleDownloadComplaint}
                  variant="outline"
                  className="justify-start gap-2 bg-transparent"
                >
                  <Scale className="h-4 w-4" />
                  {t.results.actions.complaint}
                </Button>
                <Button asChild variant="outline" className="justify-start gap-2 bg-transparent">
                  <Link href="/resources">
                    <Users className="h-4 w-4" />
                    {t.results.actions.resources}
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-start gap-2 bg-transparent">
                  <Link href="/upload">
                    <Plus className="h-4 w-4" />
                    {t.results.actions.newReport}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
