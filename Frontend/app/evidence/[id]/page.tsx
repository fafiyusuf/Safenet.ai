"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Download, Printer, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Header } from "@/components/header"
import { getTranslation, type Language } from "@/lib/i18n"
import type { Report } from "@/lib/types"

export default function EvidencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const searchParams = useSearchParams()
  const [language, setLanguage] = useState<Language>((searchParams.get("lang") as Language) || "en")
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)

  const t = getTranslation(language)

  useEffect(() => {
    async function fetchReport() {
      try {
        const response = await fetch(`/api/reports/${id}`)
        if (response.ok) {
          setReport(await response.json())
        }
      } finally {
        setLoading(false)
      }
    }
    fetchReport()
  }, [id])

  const handleDownload = () => {
    window.open(`/api/evidence/${id}/pdf`, "_blank")
  }

  const handlePrint = () => {
    const printWindow = window.open(`/api/evidence/${id}/pdf`, "_blank")
    printWindow?.addEventListener("load", () => {
      printWindow.print()
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header language={language} onLanguageChange={setLanguage} />
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <Skeleton className="h-8 w-48 mb-6" />
            <Skeleton className="h-[600px] w-full" />
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header language={language} onLanguageChange={setLanguage} />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <Link
              href={`/results/${id}?lang=${language}`}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              {t.common.back}
            </Link>
            <h1 className="text-3xl font-bold text-foreground">Evidence Document</h1>
            <p className="text-muted-foreground mt-1">Report ID: {id}</p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Document Preview</CardTitle>
              <CardDescription>Review the evidence document before downloading or printing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 mb-6">
                <Button onClick={handleDownload} className="gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
                <Button onClick={handlePrint} variant="outline" className="gap-2 bg-transparent">
                  <Printer className="h-4 w-4" />
                  Print
                </Button>
                <Button asChild variant="outline" className="gap-2 bg-transparent">
                  <a href={`/api/evidence/${id}/pdf`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Open in New Tab
                  </a>
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden bg-white">
                <iframe
                  src={`/api/evidence/${id}/pdf`}
                  className="w-full h-[600px]"
                  title="Evidence Document Preview"
                />
              </div>
            </CardContent>
          </Card>

          {report?.file_hash && (
            <Card>
              <CardHeader>
                <CardTitle>File Integrity</CardTitle>
                <CardDescription>Cryptographic hash for verification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm break-all">{report.file_hash}</div>
                <p className="text-sm text-muted-foreground mt-2">
                  This SHA-256 hash can be used to verify the original file has not been modified.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
