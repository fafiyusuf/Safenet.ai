"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Download, Printer, ExternalLink, Scale, Building2, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Header } from "@/components/header"
import { getTranslation, type Language } from "@/lib/i18n"
import type { Report } from "@/lib/types"

const filingLocations = [
  {
    name: { en: "Federal Police Cyber Crime Unit", am: "የፌዴራል ፖሊስ የሳይበር ወንጀል ክፍል" },
    description: { en: "For criminal investigation of online abuse", am: "የመስመር ላይ ጥቃት ወንጀል ለመመርመር" },
    address: { en: "Addis Ababa, Ethiopia", am: "አዲስ አበባ፣ ኢትዮጵያ" },
    phone: "+251-111-551455",
  },
  {
    name: { en: "Ministry of Women and Social Affairs", am: "የሴቶችና ማህበራዊ ጉዳይ ሚኒስቴር" },
    description: { en: "For support services and referrals", am: "ለድጋፍ አገልግሎቶች እና ሪፈራሎች" },
    address: { en: "Addis Ababa, Ethiopia", am: "አዲስ አበባ፣ ኢትዮጵያ" },
    phone: "+251-111-517200",
  },
  {
    name: { en: "Ethiopian Human Rights Commission", am: "የኢትዮጵያ ሰብአዊ መብቶች ኮሚሽን" },
    description: { en: "For human rights violations", am: "ለሰብአዊ መብቶች ጥሰቶች" },
    address: { en: "Addis Ababa, Ethiopia", am: "አዲስ አበባ፣ ኢትዮጵያ" },
    phone: "+251-111-550477",
  },
]

export default function ComplaintPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const searchParams = useSearchParams()
  const [language, setLanguage] = useState<Language>((searchParams.get("lang") as Language) || "en")
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)
  const [docLanguage, setDocLanguage] = useState<Language>(language)

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
    window.open(`/api/complaint/${id}/pdf?lang=${docLanguage}`, "_blank")
  }

  const handlePrint = () => {
    const printWindow = window.open(`/api/complaint/${id}/pdf?lang=${docLanguage}`, "_blank")
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
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Scale className="h-8 w-8 text-primary" />
              {language === "am" ? "የህግ ቅሬታ" : "Legal Complaint"}
            </h1>
            <p className="text-muted-foreground mt-1">Report ID: {id}</p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{language === "am" ? "የቅሬታ ሰነድ" : "Complaint Document"}</CardTitle>
              <CardDescription>
                {language === "am" ? "ለባለስልጣናት ለማስገባት ይህንን ሰነድ ይጠቀሙ" : "Use this document to file with authorities"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="en" onValueChange={(v) => setDocLanguage(v as Language)}>
                <TabsList className="mb-4">
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="am">አማርኛ</TabsTrigger>
                </TabsList>

                <div className="flex gap-3 mb-6">
                  <Button onClick={handleDownload} className="gap-2">
                    <Download className="h-4 w-4" />
                    {language === "am" ? "PDF አውርድ" : "Download PDF"}
                  </Button>
                  <Button onClick={handlePrint} variant="outline" className="gap-2 bg-transparent">
                    <Printer className="h-4 w-4" />
                    {language === "am" ? "አትም" : "Print"}
                  </Button>
                  <Button asChild variant="outline" className="gap-2 bg-transparent">
                    <a href={`/api/complaint/${id}/pdf?lang=${docLanguage}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      {language === "am" ? "በአዲስ ትብ ክፈት" : "Open in New Tab"}
                    </a>
                  </Button>
                </div>

                <TabsContent value="en">
                  <div className="border rounded-lg overflow-hidden bg-white">
                    <iframe
                      src={`/api/complaint/${id}/pdf?lang=en`}
                      className="w-full h-[600px]"
                      title="Legal Complaint Preview (English)"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="am">
                  <div className="border rounded-lg overflow-hidden bg-white">
                    <iframe
                      src={`/api/complaint/${id}/pdf?lang=am`}
                      className="w-full h-[600px]"
                      title="Legal Complaint Preview (Amharic)"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                {language === "am" ? "የማስገባት ቦታዎች" : "Filing Locations"}
              </CardTitle>
              <CardDescription>
                {language === "am" ? "ቅሬታዎን ማስገባት የሚችሉባቸው ቦታዎች" : "Where you can file your complaint"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filingLocations.map((location, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{location.name[language]}</h3>
                      <p className="text-sm text-muted-foreground">{location.description[language]}</p>
                      <p className="text-sm text-muted-foreground mt-1">{location.address[language]}</p>
                    </div>
                    <a
                      href={`tel:${location.phone}`}
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Phone className="h-4 w-4" />
                      {location.phone}
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
