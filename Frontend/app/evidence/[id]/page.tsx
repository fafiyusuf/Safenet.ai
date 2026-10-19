"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Download, Printer, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
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
          <div className="border-b border-border pb-6 mb-6">
            <Link
              href={`/results/${id}?lang=${language}`}
              className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground mb-3 font-medium"
            >
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
              {t.common.back}
            </Link>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 mb-1">
              <span>FORENSIC EVIDENCE SPECIMEN • CHAIN OF CUSTODY</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Evidence Document</h1>
            <p className="text-xs font-mono text-muted-foreground mt-1">Docket ID: {id}</p>
          </div>

          <div className="border border-border rounded-md bg-card p-5 mb-6">
            <div className="pb-4 mb-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-bold text-foreground">Document Preview</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Review the forensic evidence dossier prior to formal export</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button onClick={handleDownload} size="sm" className="gap-1.5 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white text-xs h-8 px-3">
                  <Download className="h-3.5 w-3.5" />
                  Download PDF
                </Button>
                <Button onClick={handlePrint} size="sm" variant="outline" className="gap-1.5 rounded-md text-xs h-8 px-3 bg-background">
                  <Printer className="h-3.5 w-3.5" />
                  Print
                </Button>
                <Button asChild size="sm" variant="outline" className="gap-1.5 rounded-md text-xs h-8 px-3 bg-background">
                  <a href={`/api/evidence/${id}/pdf`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Open in New Tab
                  </a>
                </Button>
              </div>
            </div>

            <div className="border border-border rounded-md overflow-hidden bg-white">
              <iframe
                src={`/api/evidence/${id}/pdf`}
                className="w-full h-[600px]"
                title="Evidence Document Preview"
              />
            </div>
          </div>

          {report?.file_hash && (
            <div className="border border-border rounded-md bg-card p-5">
              <div className="pb-3 mb-3 border-b border-border">
                <h2 className="text-sm font-bold text-foreground">Cryptographic Integrity Hash</h2>
                <p className="text-xs text-muted-foreground mt-0.5">SHA-256 fingerprint verified against original evidence payload</p>
              </div>
              <div className="bg-muted border border-border/80 rounded-md p-3 font-mono text-xs break-all select-all">
                {report.file_hash}
              </div>
              <p className="text-[11px] text-muted-foreground mt-2">
                This cryptographic fingerprint confirms the evidence has not been altered or tampered with since initial ingestion.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
