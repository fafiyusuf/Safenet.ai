"use client"

import { useState, useEffect } from "react"
import { Phone, Mail, Globe, MapPin, Building2, Scale, HeartHandshake, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Header } from "@/components/header"
import { getTranslation } from "@/lib/i18n"
import { useLanguage } from "@/hooks/use-language"
import { REGIONS } from "@/lib/constants"
import type { Resource } from "@/lib/types"

const typeIcons = {
  ngo: Building2,
  legal_aid: Scale,
  helpline: Phone,
  shelter: Home,
}

const typeColors = {
  ngo: "bg-chart-2/10 text-chart-2 border-chart-2/30",
  legal_aid: "bg-chart-1/10 text-chart-1 border-chart-1/30",
  helpline: "bg-primary/10 text-primary border-primary/30",
  shelter: "bg-chart-4/10 text-chart-4 border-chart-4/30",
}

export default function ResourcesPage() {
  const { language, setLanguage } = useLanguage()
  const [region, setRegion] = useState("all")
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)

  const t = getTranslation(language)

  useEffect(() => {
    async function fetchResources() {
      setLoading(true)
      try {
        const url = region === "all" ? "/api/resources" : `/api/resources?region=${region}`
        const response = await fetch(url)
        if (response.ok) {
          setResources(await response.json())
        }
      } finally {
        setLoading(false)
      }
    }
    fetchResources()
  }, [region])

  return (
    <div className="min-h-screen flex flex-col">
      <Header language={language} onLanguageChange={setLanguage} />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <HeartHandshake className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">{t.resources.title}</h1>
            <p className="text-muted-foreground mt-2">{t.resources.subtitle}</p>
          </div>

          {/* Filter */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-foreground mb-2">{t.resources.filterRegion}</label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder={t.resources.allRegions} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.resources.allRegions}</SelectItem>
                {REGIONS.map((r) => (
                  <SelectItem key={r.id} value={r.id}>
                    {language === "am" ? r.name_am : r.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Emergency Helpline Banner */}
          <Card className="mb-8 border-primary/30 bg-primary/5">
            <CardContent className="py-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {language === "am" ? "ብሔራዊ የጾታ ጥቃት ስልክ መስመር" : "National GBV Hotline"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {language === "am" ? "24/7 ሚስጥራዊ ድጋፍ" : "24/7 confidential support"}
                    </p>
                  </div>
                </div>
                <Button asChild size="lg" className="gap-2">
                  <a href="tel:8383">
                    <Phone className="h-4 w-4" />
                    8383
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Resources List */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {resources.map((resource) => {
                const Icon = typeIcons[resource.type]
                return (
                  <Card key={resource.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                            <Icon className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {language === "am" ? resource.name_am : resource.name}
                            </CardTitle>
                            <CardDescription className="mt-1">
                              {language === "am" ? resource.description_am : resource.description}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline" className={typeColors[resource.type]}>
                          {t.resources.types[resource.type]}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-4 mt-2">
                        {resource.phone && (
                          <a
                            href={`tel:${resource.phone}`}
                            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                          >
                            <Phone className="h-4 w-4" />
                            {resource.phone}
                          </a>
                        )}
                        {resource.email && (
                          <a
                            href={`mailto:${resource.email}`}
                            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                          >
                            <Mail className="h-4 w-4" />
                            {resource.email}
                          </a>
                        )}
                        {resource.website && (
                          <a
                            href={resource.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                          >
                            <Globe className="h-4 w-4" />
                            {language === "am" ? "ድረ-ገጽ" : "Website"}
                          </a>
                        )}
                        <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {REGIONS.find((r) => r.id === resource.region)?.[language === "am" ? "name_am" : "name"] ||
                            resource.region}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}

              {resources.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    {language === "am" ? "ምንም ግብዓቶች አልተገኙም" : "No resources found for this region"}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
