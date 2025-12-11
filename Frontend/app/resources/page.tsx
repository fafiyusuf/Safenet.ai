"use client"

import { Header } from "@/components/header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/hooks/use-language"
import { REGIONS } from "@/lib/constants"
import { getTranslation } from "@/lib/i18n"
import { AlertTriangle, Building2, Globe, HeartHandshake, Home, Info, Mail, MapPin, Phone, Scale, Shield } from "lucide-react"
import { useEffect, useState } from "react"

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
  // resources is an object, not an array
  const [resources, setResources] = useState<any>({})
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

          {/* Main Tabs: Support Resources and GBV Information */}
          <Tabs defaultValue="resources" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="resources" className="gap-2">
                <Building2 className="h-4 w-4" />
                {t.resources.mainTabs.resources}
              </TabsTrigger>
              <TabsTrigger value="gbvInfo" className="gap-2">
                <Info className="h-4 w-4" />
                {t.resources.mainTabs.gbvInfo}
              </TabsTrigger>
            </TabsList>

            {/* Support Resources Tab */}
            <TabsContent value="resources" className="space-y-8">
              {/* Filter */}
              <div>
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
              <Card className="border-primary/30 bg-primary/5">
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
                  {/* Flatten resources object to a single array */}
                  {[
                    ...(resources.hotlines || []),
                    ...(resources.legal_resources || []),
                    ...(resources.online_resources || [])
                  ].map((resource: any) => {
                    const Icon = typeIcons[String(resource.type) as keyof typeof typeIcons] || HeartHandshake;
                    return (
                      <Card key={resource.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
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
                            <Badge variant="outline" className={typeColors[String(resource.type) as keyof typeof typeColors]}>
                              {t.resources.types[String(resource.type) as keyof typeof t.resources.types]}
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

                  {[
                    ...(resources.hotlines || []),
                    ...(resources.legal_resources || []),
                    ...(resources.online_resources || [])
                  ].length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">
                        {language === "am" ? "ምንም ግብዓቶች አልተገኙም" : "No resources found for this region"}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            {/* GBV Information Tab */}
            <TabsContent value="gbvInfo" className="space-y-6">
              <Card className="border-chart-3/30 bg-chart-3/5">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-chart-3/20 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-chart-3" />
                    </div>
                    <div>
                      <CardTitle>{t.resources.gbvInfo.title}</CardTitle>
                      <CardDescription>{t.resources.gbvInfo.subtitle}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 gap-2">
                      <TabsTrigger value="overview">{t.resources.gbvInfo.tabs.overview}</TabsTrigger>
                      <TabsTrigger value="cyberstalking">{t.resources.gbvInfo.tabs.cyberstalking}</TabsTrigger>
                      <TabsTrigger value="harassment">{t.resources.gbvInfo.tabs.harassment}</TabsTrigger>
                      <TabsTrigger value="impersonation">{t.resources.gbvInfo.tabs.impersonation}</TabsTrigger>
                      <TabsTrigger value="doxing">{t.resources.gbvInfo.tabs.doxing}</TabsTrigger>
                      <TabsTrigger value="imageAbuse">{t.resources.gbvInfo.tabs.imageAbuse}</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-6 space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                          <Shield className="h-5 w-5 text-chart-3" />
                          {t.resources.gbvInfo.content.overview.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {t.resources.gbvInfo.content.overview.description}
                        </p>
                        <ul className="space-y-2">
                          {t.resources.gbvInfo.content.overview.keyPoints.map((point: string, idx: number) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-chart-3 mt-1">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>

                    <TabsContent value="cyberstalking" className="mt-6 space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{t.resources.gbvInfo.content.cyberstalking.title}</h3>
                        <p className="text-muted-foreground mb-4">
                          {t.resources.gbvInfo.content.cyberstalking.description}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                          {language === "am" ? "የማስጠንቀቂያ ምልክቶች" : "Warning Signs"}
                        </h4>
                        <ul className="space-y-2 mb-4">
                          {t.resources.gbvInfo.content.cyberstalking.signs.map((sign: string, idx: number) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-amber-500 mt-1">•</span>
                              <span>{sign}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Shield className="h-4 w-4 text-green-500" />
                          {language === "am" ? "የሚወስዷቸው እርምጃዎች" : "Actions to Take"}
                        </h4>
                        <ul className="space-y-2">
                          {t.resources.gbvInfo.content.cyberstalking.actions.map((action: string, idx: number) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-green-500 mt-1">•</span>
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>

                    <TabsContent value="harassment" className="mt-6 space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{t.resources.gbvInfo.content.harassment.title}</h3>
                        <p className="text-muted-foreground mb-4">
                          {t.resources.gbvInfo.content.harassment.description}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                          {language === "am" ? "የማስጠንቀቂያ ምልክቶች" : "Warning Signs"}
                        </h4>
                        <ul className="space-y-2 mb-4">
                          {t.resources.gbvInfo.content.harassment.signs.map((sign: string, idx: number) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-amber-500 mt-1">•</span>
                              <span>{sign}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Shield className="h-4 w-4 text-green-500" />
                          {language === "am" ? "የሚወስዷቸው እርምጃዎች" : "Actions to Take"}
                        </h4>
                        <ul className="space-y-2">
                          {t.resources.gbvInfo.content.harassment.actions.map((action: string, idx: number) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-green-500 mt-1">•</span>
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>

                    <TabsContent value="impersonation" className="mt-6 space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{t.resources.gbvInfo.content.impersonation.title}</h3>
                        <p className="text-muted-foreground mb-4">
                          {t.resources.gbvInfo.content.impersonation.description}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                          {language === "am" ? "የማስጠንቀቂያ ምልክቶች" : "Warning Signs"}
                        </h4>
                        <ul className="space-y-2 mb-4">
                          {t.resources.gbvInfo.content.impersonation.signs.map((sign: string, idx: number) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-amber-500 mt-1">•</span>
                              <span>{sign}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Shield className="h-4 w-4 text-green-500" />
                          {language === "am" ? "የሚወስዷቸው እርምጃዎች" : "Actions to Take"}
                        </h4>
                        <ul className="space-y-2">
                          {t.resources.gbvInfo.content.impersonation.actions.map((action: string, idx: number) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-green-500 mt-1">•</span>
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>

                    <TabsContent value="doxing" className="mt-6 space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{t.resources.gbvInfo.content.doxing.title}</h3>
                        <p className="text-muted-foreground mb-4">
                          {t.resources.gbvInfo.content.doxing.description}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                          {language === "am" ? "የማስጠንቀቂያ ምልክቶች" : "Warning Signs"}
                        </h4>
                        <ul className="space-y-2 mb-4">
                          {t.resources.gbvInfo.content.doxing.signs.map((sign: string, idx: number) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-amber-500 mt-1">•</span>
                              <span>{sign}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Shield className="h-4 w-4 text-green-500" />
                          {language === "am" ? "የሚወስዷቸው እርምጃዎች" : "Actions to Take"}
                        </h4>
                        <ul className="space-y-2">
                          {t.resources.gbvInfo.content.doxing.actions.map((action: string, idx: number) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-green-500 mt-1">•</span>
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>

                    <TabsContent value="imageAbuse" className="mt-6 space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{t.resources.gbvInfo.content.imageAbuse.title}</h3>
                        <p className="text-muted-foreground mb-4">
                          {t.resources.gbvInfo.content.imageAbuse.description}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                          {language === "am" ? "የማስጠንቀቂያ ምልክቶች" : "Warning Signs"}
                        </h4>
                        <ul className="space-y-2 mb-4">
                          {t.resources.gbvInfo.content.imageAbuse.signs.map((sign: string, idx: number) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-amber-500 mt-1">•</span>
                              <span>{sign}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Shield className="h-4 w-4 text-green-500" />
                          {language === "am" ? "የሚወስዷቸው እርምጃዎች" : "Actions to Take"}
                        </h4>
                        <ul className="space-y-2">
                          {t.resources.gbvInfo.content.imageAbuse.actions.map((action: string, idx: number) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-green-500 mt-1">•</span>
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

        </div>
      </main>
    </div>
  )
}
