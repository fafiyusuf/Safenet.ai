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

const COMPLAINT_UI: Record<string, {
  title: string
  docTitle: string
  docDesc: string
  downloadPdf: string
  print: string
  openNewTab: string
  filingTitle: string
  filingDesc: string
}> = {
  en: {
    title: "Legal Complaint",
    docTitle: "Complaint Document",
    docDesc: "Use this document to file with authorities",
    downloadPdf: "Download PDF",
    print: "Print",
    openNewTab: "Open in New Tab",
    filingTitle: "Filing Locations",
    filingDesc: "Where you can file your complaint",
  },
  am: {
    title: "የህግ ቅሬታ",
    docTitle: "የቅሬታ ሰነድ",
    docDesc: "ለባለስልጣናት ለማስገባት ይህንን ሰነድ ይጠቀሙ",
    downloadPdf: "PDF አውርድ",
    print: "አትም",
    openNewTab: "በአዲስ ትብ ክፈት",
    filingTitle: "የማስገባት ቦታዎች",
    filingDesc: "ቅሬታዎን ማስገባት የሚችሉባቸው ቦታዎች",
  },
  om: {
    title: "Himata Seeraa",
    docTitle: "Sanada Himataa",
    docDesc: "Sanada kana abbootii taayitaatti dhiyeessuuf fayyadamaa",
    downloadPdf: "PDF Buufadhaa",
    print: "Maxxansaa",
    openNewTab: "Taabii Haaraatti Bani",
    filingTitle: "Iddoowwan Himanni Itti Dhiyaatu",
    filingDesc: "Iddoowwan himata keessan dhiyeessuu dandeessan",
  },
  ti: {
    title: "ሕጋዊ ክሲ",
    docTitle: "ሰነድ ክሲ",
    docDesc: "ነዚ ሰነድ ንበዓል መዚ ንምእታው ተጠቐሙሉ",
    downloadPdf: "PDF ኣውርዱ",
    print: "ሕተሙ",
    openNewTab: "ኣብ ሓድሽ ታብ ክፈቱ",
    filingTitle: "ክሲ ዝኣትወሎም ቦታታት",
    filingDesc: "ክስኹም ከተእትውሉ እትኽእሉ ቦታታት",
  },
  so: {
    title: "Dacwadda Sharciga",
    docTitle: "Faylka Dacwadda",
    docDesc: "U isticmaal dukumeentigan si aad ugu gudbiso maamulka",
    downloadPdf: "Soo Dejiso PDF",
    print: "Daabac",
    openNewTab: "Ku Fur Tab Cusub",
    filingTitle: "Goobaha Dacwadda la Dhigo",
    filingDesc: "Halka aad ka gudbin karto dacwaddaada",
  },
}

const filingLocations = [
  {
    name: {
      en: "Federal Police Cyber Crime Unit",
      am: "የፌዴራል ፖሊስ የሳይበር ወንጀል ክፍል",
      om: "Poolisii Federaalaa Kutaa Yakka Saayibarii",
      ti: "ፌደራል ፖሊስ ክፍሊ ገበን ሳይበር",
      so: "Booliska Federaalka Qeybta Dambiyada Internetka",
    },
    description: {
      en: "For criminal investigation of online abuse",
      am: "የመስመር ላይ ጥቃት ወንጀል ለመመርመር",
      om: "Qorannoo yakka miidhaa toora interneetiitiif",
      ti: "ንመርመራ ገበን መጥቃዕቲ ሳይበር",
      so: "Baarista dambiyada xadgudubka internetka",
    },
    address: {
      en: "Addis Ababa, Ethiopia",
      am: "አዲስ አበባ፣ ኢትዮጵያ",
      om: "Finfinnee, Itoophiyaa",
      ti: "ኣዲስ ኣበባ፡ ኢትዮጵያ",
      so: "Addis Ababa, Itoobiya",
    },
    phone: "+251-111-551455",
  },
  {
    name: {
      en: "Ministry of Women and Social Affairs",
      am: "የሴቶችና ማህበራዊ ጉዳይ ሚኒስቴር",
      om: "Ministeera Dhimma Dubartootaa fi Hawaasummaa",
      ti: "ሚኒስትሪ ጉዳያት ደቂ-ኣንስትዮን ማሕበራውን",
      so: "Wasaaradda Haweenka iyo Arrimaha Bulshada",
    },
    description: {
      en: "For support services and referrals",
      am: "ለድጋፍ አገልግሎቶች እና ሪፈራሎች",
      om: "Tajaajila deeggarsaa fi dabarsaatiif",
      ti: "ንኣገልግሎታት ደገፍን ሪፈራልን",
      so: "Adeegyada taageerada iyo gudbinta",
    },
    address: {
      en: "Addis Ababa, Ethiopia",
      am: "አዲስ አበባ፣ ኢትዮጵያ",
      om: "Finfinnee, Itoophiyaa",
      ti: "ኣዲስ ኣበባ፡ ኢትዮጵያ",
      so: "Addis Ababa, Itoobiya",
    },
    phone: "+251-111-517200",
  },
  {
    name: {
      en: "Ethiopian Human Rights Commission",
      am: "የኢትዮጵያ ሰብአዊ መብቶች ኮሚሽን",
      om: "Koomishinii Mirga Namoomaa Itoophiyaa",
      ti: "ኮሚሽን ሰብኣዊ መሰላት ኢትዮጵያ",
      so: "Komishanka Xuquuqda Aadanaha ee Itoobiya",
    },
    description: {
      en: "For human rights violations",
      am: "ለሰብአዊ መብቶች ጥሰቶች",
      om: "Sarbiinsa mirga namoomaatiif",
      ti: "ንጥሕሰታት ሰብኣዊ መሰላት",
      so: "Ku xadgudubka xuquuqda aadanaha",
    },
    address: {
      en: "Addis Ababa, Ethiopia",
      am: "አዲስ አበባ፣ ኢትዮጵያ",
      om: "Finfinnee, Itoophiyaa",
      ti: "ኣዲስ ኣበባ፡ ኢትዮጵያ",
      so: "Addis Ababa, Itoobiya",
    },
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
  const cUI = COMPLAINT_UI[language] || COMPLAINT_UI.en

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
              {cUI.title}
            </h1>
            <p className="text-muted-foreground mt-1">Report ID: {id}</p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{cUI.docTitle}</CardTitle>
              <CardDescription>
                {cUI.docDesc}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={language} onValueChange={(v) => setDocLanguage(v as Language)}>
                <TabsList className="mb-4">
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="am">አማርኛ</TabsTrigger>
                  <TabsTrigger value="om">Afaan Oromoo</TabsTrigger>
                  <TabsTrigger value="ti">ትግርኛ</TabsTrigger>
                  <TabsTrigger value="so">Soomaali</TabsTrigger>
                </TabsList>

                <div className="flex gap-3 mb-6">
                  <Button onClick={handleDownload} className="gap-2">
                    <Download className="h-4 w-4" />
                    {cUI.downloadPdf}
                  </Button>
                  <Button onClick={handlePrint} variant="outline" className="gap-2 bg-transparent">
                    <Printer className="h-4 w-4" />
                    {cUI.print}
                  </Button>
                  <Button asChild variant="outline" className="gap-2 bg-transparent">
                    <a href={`/api/complaint/${id}/pdf?lang=${docLanguage}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      {cUI.openNewTab}
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

                <TabsContent value="om">
                  <div className="border rounded-lg overflow-hidden bg-white">
                    <iframe
                      src={`/api/complaint/${id}/pdf?lang=om`}
                      className="w-full h-[600px]"
                      title="Legal Complaint Preview (Afaan Oromoo)"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="ti">
                  <div className="border rounded-lg overflow-hidden bg-white">
                    <iframe
                      src={`/api/complaint/${id}/pdf?lang=ti`}
                      className="w-full h-[600px]"
                      title="Legal Complaint Preview (Tigrinya)"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="so">
                  <div className="border rounded-lg overflow-hidden bg-white">
                    <iframe
                      src={`/api/complaint/${id}/pdf?lang=so`}
                      className="w-full h-[600px]"
                      title="Legal Complaint Preview (Somali)"
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
                {cUI.filingTitle}
              </CardTitle>
              <CardDescription>
                {cUI.filingDesc}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filingLocations.map((location, i) => {
                  const locName = (location.name as any)[language] || location.name.en
                  const locDesc = (location.description as any)[language] || location.description.en
                  const locAddr = (location.address as any)[language] || location.address.en
                  return (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{locName}</h3>
                        <p className="text-sm text-muted-foreground">{locDesc}</p>
                        <p className="text-sm text-muted-foreground mt-1">{locAddr}</p>
                      </div>
                      <a
                        href={`tel:${location.phone}`}
                        className="flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        <Phone className="h-4 w-4" />
                        {location.phone}
                      </a>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
