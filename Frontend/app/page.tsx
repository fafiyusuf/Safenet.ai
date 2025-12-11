"use client"

import Link from "next/link"
import { Shield, FileText, Users, ArrowRight, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { getTranslation } from "@/lib/i18n"
import { useLanguage } from "@/hooks/use-language"

export default function LandingPage() {
  const { language, setLanguage } = useLanguage()
  const t = getTranslation(language)

  const features = [
    {
      icon: Shield,
      title: t.landing.features.analyze.title,
      description: t.landing.features.analyze.description,
    },
    {
      icon: FileText,
      title: t.landing.features.evidence.title,
      description: t.landing.features.evidence.description,
    },
    {
      icon: Users,
      title: t.landing.features.support.title,
      description: t.landing.features.support.description,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header language={language} onLanguageChange={setLanguage} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
                {t.landing.title}
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
                {t.landing.subtitle}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="gap-2 px-8">
                  <Link href="/upload">
                    {t.landing.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-transparent">
                  <Link href="/resources">{t.landing.features.support.title}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {features.map((feature) => (
                <Card key={feature.title} className="border-0 shadow-sm bg-card">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg text-card-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy Notice */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm">
                <Lock className="h-4 w-4" />
                {t.landing.privacy}
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
