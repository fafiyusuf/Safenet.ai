"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/hooks/use-language"
import { getTranslation } from "@/lib/i18n"
import { AlertCircle, ArrowRight, CheckCircle2, FileText, Lock, Shield, Users } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const { language, setLanguage } = useLanguage()
  const t = getTranslation(language)

  const features = [
    {
      icon: Shield,
      title: t.landing.features.analyze.title,
      description: t.landing.features.analyze.description,
      color: "bg-green-500/10 text-green-600 dark:text-green-400",
    },
    {
      icon: FileText,
      title: t.landing.features.evidence.title,
      description: t.landing.features.evidence.description,
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      icon: Users,
      title: t.landing.features.support.title,
      description: t.landing.features.support.description,
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    },
  ]

  const benefits = [
    language === "am" ? "ነፃ እና ሚስጥራዊ" : "Free and confidential",
    language === "am" ? "AI የተደገፈ ትንታኔ" : "AI-powered analysis",
    language === "am" ? "የህግ ድጋፍ" : "Legal support resources",
    language === "am" ? "24/7 ተደራሽነት" : "24/7 availability",
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header language={language} onLanguageChange={setLanguage} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-background to-blue-50 dark:from-green-950/20 dark:via-background dark:to-blue-950/20 -z-10" />
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] -z-10" />
          
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-700 dark:text-green-400 text-sm font-medium mb-6 border border-green-500/20">
                <Shield className="h-4 w-4" />
                {language === "am" ? "በAI የተደገፈ ጥበቃ" : "AI-Powered Protection"}
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6 bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
                {t.landing.title}
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
                {t.landing.subtitle}
              </p>

              {/* Benefits list */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 mb-10">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="gap-2 px-8 bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20">
                  <Link href="/upload">
                    {t.landing.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-transparent border-2">
                  <Link href="/resources">
                    <Users className="h-4 w-4 mr-2" />
                    {t.landing.features.support.title}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {language === "am" ? "እንዴት እንረዳለን" : "How We Help"}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {language === "am" 
                  ? "የላቀ ቴክኖሎጂ እና የሰው ድጋፍ በመጠቀም የመስመር ላይ ጥቃትን ለመመዝገብ እና ለመቋቋም የሚረዱ አገልግሎቶች"
                  : "Comprehensive tools combining advanced technology and human support to document and combat online abuse"}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {features.map((feature, idx) => (
                <Card key={feature.title} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                  <CardContent className="pt-8 pb-6">
                    <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-7 w-7" />
                    </div>
                    <div className="mb-2 text-sm font-semibold text-primary">
                      {language === "am" ? `ደረጃ ${idx + 1}` : `Step ${idx + 1}`}
                    </div>
                    <h3 className="font-bold text-xl text-card-foreground mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Section */}
        <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-y border-red-200 dark:border-red-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-red-200 dark:border-red-900 bg-card shadow-xl">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                        <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-foreground mb-2">
                          {language === "am" ? "ድንገተኛ እገዛ ያስፈልግዎታል?" : "Need Immediate Help?"}
                        </h3>
                        <p className="text-muted-foreground">
                          {language === "am" 
                            ? "ብሔራዊ የጾታ ጥቃት ስልክ መስመር 24/7 ሚስጥራዊ ድጋፍ ይሰጣል"
                            : "National GBV Hotline provides 24/7 confidential support"}
                        </p>
                      </div>
                    </div>
                    <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white shadow-lg shrink-0">
                      <a href="tel:8383" className="gap-2">
                        <AlertCircle className="h-5 w-5" />
                        {language === "am" ? "8383 ደውል" : "Call 8383"}
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Privacy Notice */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-green-500/10 text-foreground text-sm border border-green-500/20">
                <Lock className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="font-medium">{t.landing.privacy}</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            {language === "am"
              ? "Safenet.ai - በቴክኖሎጂ የተደገፈ የጾታ ጥቃት ትንተና መድረክ"
              : "Safenet.ai - Technology-Facilitated Gender-Based Violence Analysis Platform"}
          </p>
        </div>
      </footer>
    </div>
  )
}
