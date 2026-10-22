"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Bot,
  Brain,
  Building2,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  Copy,
  ExternalLink,
  Gavel,
  Globe,
  HeartHandshake,
  Home,
  Info,
  Lock,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  Scale,
  Search,
  Shield,
  Sparkles,
  Users,
  X,
} from "lucide-react"

import { Header } from "@/components/header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/hooks/use-language"
import { REGIONS, RESOURCES } from "@/lib/constants"
import { getTranslation, type Language } from "@/lib/i18n"
import type { Resource } from "@/lib/types"

const typeIcons: Record<string, any> = {
  ngo: Building2,
  legal_aid: Scale,
  helpline: Phone,
  shelter: Home,
}

const typeColors: Record<string, string> = {
  ngo: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30",
  legal_aid: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30",
  helpline: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  shelter: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30",
}

const RESOURCE_UI_STRINGS: Record<Language, {
  warningSigns: string
  actionsToTake: string
  hotlinesTitle: string
  hotlinesDesc: string
  call: (num: string) => string
  searchPlaceholder: string
  allCategories: string
  legalAidChip: string
  shelterChip: string
  helplineChip: string
  ngoChip: string
  showingCount: (count: number) => string
  noMatchTitle: string
  noMatchDesc: string
  resetFilters: string
  speakCounselor: string
  copied: string
  copyPhone: string
  availabilityLabel: string
  locationsLabel: string
  servicesLabel: string
  counselorBannerTitle: string
  counselorBannerDesc: string
  counselorBannerAction: string
  domainAbuseTypes: string
  domainPrevention: string
  domainLegal: string
  domainPsych: string
  emergencyBarTag: string
  quickExitNotice: string
}> = {
  en: {
    warningSigns: "Warning Signs",
    actionsToTake: "Recommended Actions",
    hotlinesTitle: "National 24/7 GBV & Legal Hotlines",
    hotlinesDesc: "Free, confidential, and accessible across all Ethiopian telecom networks",
    call: (num) => `Call ${num}`,
    searchPlaceholder: "Search by organization name, service, or city...",
    allCategories: "All Resources",
    legalAidChip: "Legal Aid & Court Defense",
    shelterChip: "Emergency Shelters",
    helplineChip: "24/7 Hotlines",
    ngoChip: "Advocacy & NGOs",
    showingCount: (c) => `Showing ${c} verified Ethiopian support organizations`,
    noMatchTitle: "No organizations match your current search or filters",
    noMatchDesc: "While there is no localized office matching this filter, emergency assistance is always accessible nationwide. You can call the 24/7 national hotlines or consult our automated AI Support Chat right now.",
    resetFilters: "Reset All Filters",
    speakCounselor: "Open AI Support Chat",
    copied: "Copied!",
    copyPhone: "Copy",
    availabilityLabel: "Hours",
    locationsLabel: "Locations / Branches",
    servicesLabel: "Services Provided",
    counselorBannerTitle: "Need Automated 24/7 Digital Safety Guidance?",
    counselorBannerDesc: "Chat with our automated AI assistant for instant risk assessment, evidence preservation steps, and crisis resource routing. Completely anonymous with zero browsing trail.",
    counselorBannerAction: "Open AI Support Chat",
    domainAbuseTypes: "Types of Online Abuse",
    domainPrevention: "Digital Safety & Prevention",
    domainLegal: "Ethiopian Legal Rights",
    domainPsych: "Psychological Coping & Healing",
    emergencyBarTag: "CRITICAL 24/7 DIRECT LINES",
    quickExitNotice: "Safety Reminder: Press ESC anytime to leave this page instantly without leaving browser history.",
  },
  am: {
    warningSigns: "የማስጠንቀቂያ ምልክቶች",
    actionsToTake: "የሚመከሩ እርምጃዎች",
    hotlinesTitle: "ብሔራዊ የ24/7 የጾታ ጥቃት እና የህግ ስልክ መስመሮች",
    hotlinesDesc: "በመላው ኢትዮጵያ በነጻ እና በሚስጥር የሚሰሩ የእርዳታ መስመሮች",
    call: (num) => `${num} ደውል`,
    searchPlaceholder: "በድርጅት ስም፣ በአገልግሎት ወይም በከተማ ይፈልጉ...",
    allCategories: "ሁሉም ግብዓቶች",
    legalAidChip: "የህግ እርዳታ እና ጥብቅና",
    shelterChip: "የአደጋ ጊዜ መጠለያዎች",
    helplineChip: "የ24/7 ስልክ መስመሮች",
    ngoChip: "የሲቪክ ድርጅቶች",
    showingCount: (c) => `${c} የተረጋገጡ የድጋፍ ድርጅቶች ቀርበዋል`,
    noMatchTitle: "ከፍለጋዎ ወይም ከማጣሪያዎ ጋር የሚዛመድ ድርጅት አልተገኘም",
    noMatchDesc: "ለዚህ ልዩ ማጣሪያ የተለየ ቅርንጫፍ ባይኖርም፣ በመላው ኢትዮጵያ የ24/7 ብሔራዊ የስልክ መስመሮች እና አውቶሜትድ የAI ድጋፍ ቻታችን ሁልጊዜም ዝግጁ ናቸው።",
    resetFilters: "ማጣሪያዎችን ዳግም አስጀምር",
    speakCounselor: "ከAI ድጋፍ ቻት ጋር ይነጋገሩ",
    copied: "ተቀድቷል!",
    copyPhone: "ቅዳ",
    availabilityLabel: "የስራ ሰዓት",
    locationsLabel: "የቢሮ ቦታዎች / ቅርንጫፎች",
    servicesLabel: "የሚሰጡ አገልግሎቶች",
    counselorBannerTitle: "አውቶሜትድ 24/7 የዲጂታል ደህንነት መመሪያ ይፈልጋሉ?",
    counselorBannerDesc: "የስጋት ደረጃዎን ለመገምገም፣ ማስረጃዎችን በህጋዊ መንገድ ለማስቀመጥ እና የመጠለያ መረጃዎችን ለማግኘት ከአውቶሜትድ AI ረዳታችን ጋር በሚስጥር ይወያዩ። ምንም የአሳሽ ታሪክ አይቀመጥም።",
    counselorBannerAction: "የAI ድጋፍ ቻት ይክፈቱ",
    domainAbuseTypes: "የኦንላይን ጥቃት አይነቶች",
    domainPrevention: "የዲጂታል ደህንነት እና መከላከያ",
    domainLegal: "የኢትዮጵያ ህጋዊ መብቶች",
    domainPsych: "ስነ-ልቦናዊ ድጋፍ እና ማገገም",
    emergencyBarTag: "አስቸኳይ የ24/7 ስልክ መስመሮች",
    quickExitNotice: "የደህንነት ማሳሰቢያ፡ ያለ ታሪክ ወዲያውኑ ገጹን ለመዝጋት የESC ቁልፍን ይጫኑ።",
  },
  om: {
    warningSigns: "Mallattoolee Akeekkachiisaa",
    actionsToTake: "Tarkaanfiiwwan Gorfaman",
    hotlinesTitle: "Sarara Bilbila Balaa GBV fi Seeraa Biyyooleessaa 24/7",
    hotlinesDesc: "Bilisaan, iccitii eeguun Itoophiyaa guutuutti kan hojjetu",
    call: (num) => `${num} irratti bilbilaa`,
    searchPlaceholder: "Maqaa dhaabbataatiin, tajaajilaan ykn magaalaan barbaadi...",
    allCategories: "Qabeenya Hunda",
    legalAidChip: "Deeggarsa Seeraa fi Falmii",
    shelterChip: "Bakka Jireenya Balaa",
    helplineChip: "Sarara Bilbilaa 24/7",
    ngoChip: "Dhaabbilee NGO",
    showingCount: (c) => `Dhaabbilee deeggarsaa mirkanaa'an ${c} agarsiisaa jira`,
    noMatchTitle: "Dhaabbanni barbaaddan walsimu hin argamne",
    noMatchDesc: "Naannoo kanaan waajjirri dhihoo yoo jiraachuu baateyyuu, sararri bilbila balaa biyyooleessaa 24/7 fi gorsi AI yeroo hundumaa jira.",
    resetFilters: "Filannoo Hunda Qulqulleessi",
    speakCounselor: "Haasa'a AI Waliin Dubbadhu",
    copied: "Koppiita'eera!",
    copyPhone: "Koppii",
    availabilityLabel: "Yeroo Hojii",
    locationsLabel: "Bakka Waajjiraalee",
    servicesLabel: "Tajaajiloota Kennaman",
    counselorBannerTitle: "Qajeelfama Nageenya Diijitaalaa AI 24/7 Barbaadduu?",
    counselorBannerDesc: "Sadarkaa balaa qorachuuf, ragaalee seeraan qabachuuf fi deeggarsa argachuuf gargaaraa AI wajjin haasa'aa. Iccitiin guutuu kan eeggameedha.",
    counselorBannerAction: "Haasa'a AI Bani",
    domainAbuseTypes: "Gosa Miidhaa Saayibarii",
    domainPrevention: "Nageenya Diijitaalaa fi Ittisa",
    domainLegal: "Mirga Seeraa Itoophiyaa",
    domainPsych: "Miira Tasgabbeessuu fi Fayyuu",
    emergencyBarTag: "SARARAWWAN BALAA ARIFACHIISAA 24/7",
    quickExitNotice: "Akeekkachiisa Nageenyaa: Battalumatti fuula kana dhiistee ba'uuf furtuu ESC dhiibi.",
  },
  ti: {
    warningSigns: "ናይ መጠንቀቕታ ምልክታት",
    actionsToTake: "ዝምከሩ ስጉምትታት",
    hotlinesTitle: "ሃገራዊ 24/7 ናይ ጾታዊ መጥቃዕትን ሕግን መስመራት ተሌፎን",
    hotlinesDesc: "ብነጻ፡ ብምስጢርን ኣብ መላእ ኢትዮጵያ ዝሰርሕ ናይ ሓደጋ መስመር",
    call: (num) => `${num} ደውሉ`,
    searchPlaceholder: "ብሽም ትካል፡ ብኣገልግሎት ወይ ብከተማ ድለዩ...",
    allCategories: "ኩሎም ጸጋታት",
    legalAidChip: "ናይ ሕጊ ሓገዝን ጥብቅናን",
    shelterChip: "ናይ ሓደጋ መዕቆቢታት",
    helplineChip: "24/7 ናይ ተሌፎን መስመራት",
    ngoChip: "ሲቪክ ማሕበራት",
    showingCount: (c) => `${c} ዝተረጋገጹ ናይ ደገፍ ትካላት ቀሪቦም ኣለዉ`,
    noMatchTitle: "ምስ ፍለጋኹም ዝሰማማዕ ትካል ኣይተረኽበን",
    noMatchDesc: "ነዚ ፍሉይ መምረጺ ዝኸውን ጨንፈር እንተዘይተረኽበ እኳ፡ መላእ ኢትዮጵያ 24/7 ሃገራዊ ናይ ሓደጋ መስመራት 7711ን 6388ን ናይ AI ደገፍ ቻትን ኩሉ ግዜ ክፉታት እዮም።",
    resetFilters: "መምረጺታት ብምሉኡ ሓድሽ ግበር",
    speakCounselor: "ምስ ናይ AI ደገፍ ቻት ተዘራረቡ",
    copied: "ተቐዲሑ!",
    copyPhone: "ቅዳሕ",
    availabilityLabel: "ናይ ስራሕ ሰዓታት",
    locationsLabel: "ጨናፍር / ኣብያተ ጽሕፈት",
    servicesLabel: "ዝወሃቡ ኣገልግሎታት",
    counselorBannerTitle: "ኣውቶማቲክ 24/7 ናይ ዲጂታል ድሕነት ምኽሪ ትደልዩ ዶ?",
    counselorBannerDesc: "ደረጃ ሓደጋኹም ንምግምጋም፡ መረዳእታ ብሕጋዊ መንገዲ ንምዕቃብን ደገፍ ንምርካብን ምስ ኣውቶማቲክ ናይ AI ረዳእቲ ብምስጢር ተዘራረቡ። ዝኾነ ታሪኽ ኣይዕቀብን።",
    counselorBannerAction: "ናይ AI ደገፍ ቻት ክፈቱ",
    domainAbuseTypes: "ዓይነታት ናይ ኦንላይን መጥቃዕቲ",
    domainPrevention: "ዲጂታል ድሕነትን መከላኸልን",
    domainLegal: "ሕጋዊ መሰላት ኢትዮጵያ",
    domainPsych: "ስነ-ኣእምሮኣዊ ደገፍን ምሕዋይን",
    emergencyBarTag: "ህጹጽ 24/7 ናይ ሓደጋ መስመራት",
    quickExitNotice: "ናይ ድሕነት ማዕዳ፡ ካብዚ ገጽ ብቕጽበት ንምውጻእ ESC ጠውቑ።",
  },
  so: {
    warningSigns: "Calaamadaha Digniinta",
    actionsToTake: "Tallaabooyinka La Taliyey",
    hotlinesTitle: "Khadadka Degdegga ah ee Qaranka 24/7 GBV & Sharciga",
    hotlinesDesc: "Bilaash, qarsoodi ah, lagana heli karo dhammaan shabakadaha Isgaarsiinta Itoobiya",
    call: (num) => `Wac ${num}`,
    searchPlaceholder: "Ku raadi magaca hay'adda, adeegga, ama magaalada...",
    allCategories: "Dhammaan Kheyraadka",
    legalAidChip: "Kaalmada Sharciga & Difaaca",
    shelterChip: "Guryaha Gabbaadka Degdegga ah",
    helplineChip: "Khadadka Degdegga ah 24/7",
    ngoChip: "Hay'adaha Bulshada Rayidka",
    showingCount: (c) => `Muujinaya ${c} hay'adood oo taageero ah oo la xaqiijiyey`,
    noMatchTitle: "Lama helin hay'ad u dhiganta raadintaada",
    noMatchDesc: "In kasta oo aan la helin xafiis gaar ah oo ku yaal gobolkan, khadadka degdegga ah ee qaranka 24/7 iyo nidaamka AI Support Chat ayaa diyaar ku ah meel kasta.",
    resetFilters: "Dib u Deji Shaandhooyinka Hunda",
    speakCounselor: "La Hadal AI Support Chat",
    copied: "Waa la koobiyey!",
    copyPhone: "Koobbi",
    availabilityLabel: "Saacadaha Shaqada",
    locationsLabel: "Xarumaha & Laamaha",
    servicesLabel: "Adeegyada la Bixiyo",
    counselorBannerTitle: "Ma u Baahan Tahay Hanuuninta Badbaadada ee AI 24/7?",
    counselorBannerDesc: "Si toos ah ula hadal nidaamka AI si aad u qiimeyso khatarta, u ilaaliso caddeymaha, una hesho macluumaadka xarumaha caawinta. Gebi ahaanba waa qarsoodi.",
    counselorBannerAction: "Fur Sheekaysiga AI",
    domainAbuseTypes: "Noocyada Xadgudubka Internetka",
    domainPrevention: "Badbaadada Diijitaalka & Ka-hortagga",
    domainLegal: "Xuquuqda Sharciga ee Itoobiya",
    domainPsych: "La-qabsiga Shucuureed & Bogsiinta",
    emergencyBarTag: "KHADADKA DEGDEGGA AH EE 24/7",
    quickExitNotice: "Xusuusin Badbaado: Riix ESC wakhti kasta si aad uga baxdo boggan isla markiiba.",
  },
}

export default function ResourcesPage() {
  const { language, setLanguage } = useLanguage()
  const [region, setRegion] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [rawResources, setRawResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null)

  // Sub-navigation state for GBV information domain
  const [activeInfoDomain, setActiveInfoDomain] = useState<"abuseTypes" | "prevention" | "legalRights" | "psychology">("abuseTypes")
  const [activeAbuseType, setActiveAbuseType] = useState<string>("overview")

  const t = getTranslation(language)
  const resUI = RESOURCE_UI_STRINGS[language] || RESOURCE_UI_STRINGS.en

  // Fetch resources from API with local fallback
  useEffect(() => {
    async function fetchResources() {
      setLoading(true)
      try {
        const response = await fetch("/api/resources")
        if (response.ok) {
          const data = await response.json()
          let list: Resource[] = []
          if (Array.isArray(data)) {
            list = data
          } else if (typeof data === "object" && data !== null) {
            list = [
              ...(data.hotlines || []),
              ...(data.legal_resources || []),
              ...(data.online_resources || []),
            ]
          }
          // Merge with fallback constants if needed
          if (list.length === 0) {
            list = RESOURCES
          }
          setRawResources(list)
        } else {
          setRawResources(RESOURCES)
        }
      } catch {
        setRawResources(RESOURCES)
      } finally {
        setLoading(false)
      }
    }
    fetchResources()
  }, [])

  // Copy phone helper
  const handleCopyPhone = (phoneNum: string) => {
    navigator.clipboard.writeText(phoneNum)
    setCopiedPhone(phoneNum)
    setTimeout(() => setCopiedPhone(null), 2000)
  }

  // Filtered list calculation
  const filteredResources = useMemo(() => {
    return rawResources.filter((item) => {
      // 1. Region filter
      if (region !== "all") {
        const itemRegion = (item.region || "").toLowerCase()
        const selectedRegion = region.toLowerCase()
        const isNationwide = itemRegion === "nationwide" || itemRegion === "all"
        if (itemRegion !== selectedRegion && !isNationwide) {
          return false
        }
      }

      // 2. Category filter
      if (categoryFilter !== "all") {
        if (categoryFilter === "shelter") {
          const isShelter =
            item.type === "shelter" ||
            (item.services && item.services.some((s) => s.toLowerCase().includes("shelter")))
          if (!isShelter) return false
        } else if (categoryFilter === "legal_aid") {
          const isLegal =
            item.type === "legal_aid" ||
            (item.services && item.services.some((s) => s.toLowerCase().includes("legal")))
          if (!isLegal) return false
        } else if (item.type !== categoryFilter) {
          return false
        }
      }

      // 3. Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchName = (item.name || "").toLowerCase().includes(q)
        const matchNameAm = (item.name_am || "").toLowerCase().includes(q)
        const matchDesc = (item.description || "").toLowerCase().includes(q)
        const matchDescAm = (item.description_am || "").toLowerCase().includes(q)
        const matchLoc = (item.locations || "").toLowerCase().includes(q)
        const matchServices = (item.services || []).some((s) => s.toLowerCase().includes(q))
        if (!matchName && !matchNameAm && !matchDesc && !matchDescAm && !matchLoc && !matchServices) {
          return false
        }
      }

      return true
    })
  }, [rawResources, region, categoryFilter, searchQuery])

  // Reset filters handler
  const handleResetFilters = () => {
    setRegion("all")
    setCategoryFilter("all")
    setSearchQuery("")
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header language={language} onLanguageChange={setLanguage} />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-5xl space-y-8">

          {/* Header Banner */}
          <div className="border-b border-border/80 pb-6 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
              <Shield className="h-4 w-4" />
              <span>ETHIOPIAN CIVIC SAFETY DIRECTORY • VERIFIED CRISIS INFRASTRUCTURE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              {t.resources.title}
            </h1>
            <p className="text-sm md:text-base text-muted-foreground max-w-3xl leading-relaxed">
              {t.resources.subtitle}
            </p>
          </div>

          {/* Quick-Access 24/7 National Emergency Hotlines Bar */}
          <div className="rounded-lg border-2 border-amber-500/30 bg-amber-500/5 p-4 md:p-5 shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 border border-amber-500/40">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                    {resUI.emergencyBarTag}
                  </div>
                  <h2 className="text-base font-bold text-foreground mt-0.5">
                    {resUI.hotlinesTitle}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {resUI.hotlinesDesc}
                  </p>
                </div>
              </div>

              {/* Direct Touch-Friendly Hotline Buttons */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* 7711 MoWSA Helpline */}
                <div className="inline-flex items-center rounded-md border border-emerald-600/30 bg-background shadow-xs overflow-hidden">
                  <Button
                    asChild
                    size="sm"
                    className="h-9 px-3 rounded-none bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold gap-1.5"
                  >
                    <a href="tel:7711">
                      <Phone className="h-3.5 w-3.5" />
                      7711 (GBV)
                    </a>
                  </Button>
                  <button
                    onClick={() => handleCopyPhone("7711")}
                    title={resUI.copyPhone}
                    className="h-9 px-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors border-l border-border"
                  >
                    {copiedPhone === "7711" ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>

                {/* 6388 EWLA Legal Helpline */}
                <div className="inline-flex items-center rounded-md border border-blue-600/30 bg-background shadow-xs overflow-hidden">
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="h-9 px-3 rounded-none text-blue-700 dark:text-blue-300 border-0 hover:bg-blue-500/10 text-xs font-bold gap-1.5"
                  >
                    <a href="tel:6388">
                      <Scale className="h-3.5 w-3.5" />
                      6388 (EWLA Legal)
                    </a>
                  </Button>
                  <button
                    onClick={() => handleCopyPhone("6388")}
                    title={resUI.copyPhone}
                    className="h-9 px-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors border-l border-border"
                  >
                    {copiedPhone === "6388" ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>

                {/* 8044 Police Cyber Emergency */}
                <div className="inline-flex items-center rounded-md border border-border bg-background shadow-xs overflow-hidden">
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="h-9 px-3 rounded-none text-foreground border-0 hover:bg-muted text-xs font-bold gap-1.5"
                  >
                    <a href="tel:8044">
                      <Shield className="h-3.5 w-3.5 text-amber-600" />
                      8044 (Police Cyber)
                    </a>
                  </Button>
                  <button
                    onClick={() => handleCopyPhone("8044")}
                    title={resUI.copyPhone}
                    className="h-9 px-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors border-l border-border"
                  >
                    {copiedPhone === "8044" ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>



          {/* Main Navigation Tabs: Support Directory vs Civic Safety & Rights Guide */}
          <Tabs defaultValue="resources" className="w-full space-y-6">
            <TabsList className="grid w-full grid-cols-2 rounded-lg bg-muted p-1 h-12">
              <TabsTrigger value="resources" className="gap-2 rounded-md text-xs sm:text-sm font-bold">
                <Building2 className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                {t.resources.mainTabs.resources}
              </TabsTrigger>
              <TabsTrigger value="gbvInfo" className="gap-2 rounded-md text-xs sm:text-sm font-bold">
                <BookOpen className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                {t.resources.mainTabs.gbvInfo}
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: SUPPORT DIRECTORY */}
            <TabsContent value="resources" className="space-y-6 mt-0">

              {/* Search, Region, and Category Filter Controls */}
              <div className="rounded-lg border border-border bg-card p-4 space-y-4 shadow-xs">

                {/* Search & Region Select Row */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">

                  {/* Keyword Search Input */}
                  <div className="md:col-span-8 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={resUI.searchPlaceholder}
                      className="pl-9 pr-9 h-10 text-xs sm:text-sm bg-background border-border"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {/* Region Dropdown */}
                  <div className="md:col-span-4">
                    <Select value={region} onValueChange={setRegion}>
                      <SelectTrigger className="h-10 text-xs sm:text-sm bg-background border-border">
                        <MapPin className="h-3.5 w-3.5 mr-1.5 text-muted-foreground shrink-0" />
                        <SelectValue placeholder={t.resources.allRegions} />
                      </SelectTrigger>
                      <SelectContent className="rounded-md">
                        <SelectItem value="all" className="text-xs">{t.resources.allRegions}</SelectItem>
                        {REGIONS.map((r) => (
                          <SelectItem key={r.id} value={r.id} className="text-xs">
                            {language === "am" ? r.name_am : r.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Filter Chips by Category */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/60">
                  <Button
                    type="button"
                    variant={categoryFilter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCategoryFilter("all")}
                    className={`h-8 px-3 text-xs rounded-md ${categoryFilter === "all" ? "bg-foreground text-background" : "bg-background"
                      }`}
                  >
                    {resUI.allCategories}
                  </Button>

                  <Button
                    type="button"
                    variant={categoryFilter === "legal_aid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCategoryFilter("legal_aid")}
                    className={`h-8 px-3 text-xs rounded-md gap-1.5 ${categoryFilter === "legal_aid" ? "bg-blue-700 text-white" : "bg-background"
                      }`}
                  >
                    <Scale className="h-3.5 w-3.5" />
                    {resUI.legalAidChip}
                  </Button>

                  <Button
                    type="button"
                    variant={categoryFilter === "shelter" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCategoryFilter("shelter")}
                    className={`h-8 px-3 text-xs rounded-md gap-1.5 ${categoryFilter === "shelter" ? "bg-amber-700 text-white" : "bg-background"
                      }`}
                  >
                    <Home className="h-3.5 w-3.5" />
                    {resUI.shelterChip}
                  </Button>

                  <Button
                    type="button"
                    variant={categoryFilter === "helpline" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCategoryFilter("helpline")}
                    className={`h-8 px-3 text-xs rounded-md gap-1.5 ${categoryFilter === "helpline" ? "bg-emerald-700 text-white" : "bg-background"
                      }`}
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {resUI.helplineChip}
                  </Button>

                  <Button
                    type="button"
                    variant={categoryFilter === "ngo" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCategoryFilter("ngo")}
                    className={`h-8 px-3 text-xs rounded-md gap-1.5 ${categoryFilter === "ngo" ? "bg-purple-700 text-white" : "bg-background"
                      }`}
                  >
                    <Building2 className="h-3.5 w-3.5" />
                    {resUI.ngoChip}
                  </Button>

                  {/* Active Filters Reset Button */}
                  {(region !== "all" || categoryFilter !== "all" || searchQuery.trim()) && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleResetFilters}
                      className="h-8 px-2.5 text-xs text-muted-foreground hover:text-foreground ml-auto gap-1"
                    >
                      <RotateCcw className="h-3 w-3" />
                      {resUI.resetFilters}
                    </Button>
                  )}
                </div>

                {/* Showing Count Status */}
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                  <span>{resUI.showingCount(filteredResources.length)}</span>
                  {region !== "all" && (
                    <Badge variant="outline" className="text-[11px] font-normal">
                      Region: {REGIONS.find((r) => r.id === region)?.[language === "am" ? "name_am" : "name"] || region}
                    </Badge>
                  )}
                </div>

              </div>

              {/* Resource Cards Grid / Loading / Empty State */}
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-36 w-full rounded-lg" />
                  ))}
                </div>
              ) : filteredResources.length === 0 ? (
                /* Human-Centered Empty State (UX Rule 8) */
                <div className="rounded-lg border border-border bg-card p-8 md:p-12 text-center space-y-5">
                  <div className="w-14 h-14 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 flex items-center justify-center mx-auto">
                    <Compass className="h-7 w-7" />
                  </div>
                  <div className="max-w-md mx-auto space-y-2">
                    <h3 className="text-lg font-bold text-foreground">
                      {resUI.noMatchTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {resUI.noMatchDesc}
                    </p>
                  </div>

                  {/* Recovery Actions */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <Button
                      onClick={handleResetFilters}
                      variant="outline"
                      className="text-xs h-9 px-4 gap-1.5"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      {resUI.resetFilters}
                    </Button>
                    <Button
                      asChild
                      className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs h-9 px-4 gap-1.5"
                    >
                      <a href="tel:7711">
                        <Phone className="h-3.5 w-3.5" />
                        {resUI.call("7711")}
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="secondary"
                      className="text-xs h-9 px-4 gap-1.5"
                    >
                      <Link href="/chat">
                        <Sparkles className="h-3.5 w-3.5" />
                        {resUI.speakCounselor}
                      </Link>
                    </Button>
                  </div>
                </div>
              ) : (
                /* Resource List */
                <div className="space-y-4">
                  {filteredResources.map((resource) => {
                    const Icon = typeIcons[resource.type] || Building2
                    const badgeColor = typeColors[resource.type] || "bg-muted text-foreground border-border"
                    const typeLabel = t.resources.types[resource.type as keyof typeof t.resources.types] || resource.type

                    return (
                      <Card key={resource.id} className="border border-border/90 shadow-xs hover:border-border transition-colors">
                        <CardContent className="p-5 space-y-4">

                          {/* Top Row: Icon + Title + Type Badge + Region */}
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            <div className="flex items-start gap-3.5">
                              <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center shrink-0 border border-border">
                                <Icon className="h-5 w-5 text-foreground/80" />
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="font-bold text-base text-foreground">
                                    {language === "am" && resource.name_am ? resource.name_am : resource.name}
                                  </h3>
                                  <Badge variant="outline" className={`text-[10px] font-semibold px-2 py-0.5 rounded ${badgeColor}`}>
                                    {typeLabel}
                                  </Badge>
                                </div>
                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                  {language === "am" && resource.description_am ? resource.description_am : resource.description}
                                </p>
                              </div>
                            </div>

                            {/* Region Pill */}
                            <div className="shrink-0">
                              <Badge variant="secondary" className="text-[11px] font-mono gap-1">
                                <MapPin className="h-3 w-3 text-muted-foreground" />
                                {REGIONS.find((r) => r.id === resource.region)?.[language === "am" ? "name_am" : "name"] || resource.region}
                              </Badge>
                            </div>
                          </div>

                          {/* Services Tags (If present) */}
                          {resource.services && resource.services.length > 0 && (
                            <div className="space-y-1.5 pt-1">
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
                                {resUI.servicesLabel}
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {resource.services.map((svc, sIdx) => (
                                  <Badge
                                    key={sIdx}
                                    variant="outline"
                                    className="text-[11px] bg-muted/50 border-border text-foreground/80 font-normal px-2 py-0.5"
                                  >
                                    {svc}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Availability & Location metadata banner */}
                          {(resource.availability || resource.locations) && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-muted/30 p-2.5 rounded-md border border-border/60">
                              {resource.availability && (
                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                  <Clock className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                                  <span className="font-semibold text-foreground/80">{resUI.availabilityLabel}:</span>
                                  <span className="truncate">{resource.availability}</span>
                                </div>
                              )}
                              {resource.locations && (
                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                  <Compass className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                                  <span className="font-semibold text-foreground/80">{resUI.locationsLabel}:</span>
                                  <span className="truncate">{resource.locations}</span>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Action Bar: Direct Calling + Email + Website */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/80">

                            {/* Contact Action Buttons */}
                            <div className="flex flex-wrap items-center gap-2">
                              {resource.phone && (
                                <div className="inline-flex items-center rounded-md border border-emerald-600/30 bg-background shadow-xs overflow-hidden">
                                  <Button
                                    asChild
                                    size="sm"
                                    className="h-8 px-3 rounded-none bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold gap-1.5"
                                  >
                                    <a href={`tel:${resource.phone.split(",")[0].trim()}`}>
                                      <Phone className="h-3.5 w-3.5" />
                                      {resource.phone.split(",")[0].trim()}
                                    </a>
                                  </Button>
                                  <button
                                    onClick={() => handleCopyPhone(resource.phone || "")}
                                    title={resUI.copyPhone}
                                    className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors border-l border-border"
                                  >
                                    {copiedPhone === resource.phone ? (
                                      <span className="text-[10px] text-emerald-600 font-bold">{resUI.copied}</span>
                                    ) : (
                                      <Copy className="h-3.5 w-3.5" />
                                    )}
                                  </button>
                                </div>
                              )}

                              {resource.email && (
                                <Button
                                  asChild
                                  variant="outline"
                                  size="sm"
                                  className="h-8 px-3 text-xs gap-1.5 bg-background border-border"
                                >
                                  <a href={`mailto:${resource.email}`}>
                                    <Mail className="h-3.5 w-3.5 text-primary" />
                                    {resource.email}
                                  </a>
                                </Button>
                              )}

                              {resource.website && (
                                <Button
                                  asChild
                                  variant="outline"
                                  size="sm"
                                  className="h-8 px-3 text-xs gap-1.5 bg-background border-border"
                                >
                                  <a href={resource.website} target="_blank" rel="noopener noreferrer">
                                    <Globe className="h-3.5 w-3.5 text-primary" />
                                    <span>{resUI.allCategories === "All Resources" ? "Website" : "ድረ-ገጽ"}</span>
                                    <ExternalLink className="h-3 w-3 text-muted-foreground ml-0.5" />
                                  </a>
                                </Button>
                              )}
                            </div>

                            {/* Direct Chat Referral */}
                            <Button asChild variant="ghost" size="sm" className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground gap-1 ml-auto">
                              <Link href="/chat">
                                <Sparkles className="h-3 w-3 text-emerald-600" />
                                <span>{resUI.speakCounselor}</span>
                              </Link>
                            </Button>

                          </div>

                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}

            </TabsContent>

            {/* TAB 2: CIVIC SAFETY & LEGAL RIGHTS GUIDE */}
            <TabsContent value="gbvInfo" className="space-y-6 mt-0">
              <div className="rounded-lg border border-border bg-card p-6 shadow-xs space-y-6">

                {/* Guide Title Banner */}
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="w-10 h-10 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-foreground">{t.resources.gbvInfo.title}</h2>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{t.resources.gbvInfo.subtitle}</p>
                  </div>
                </div>

                {/* 4 Clean Strategic Knowledge Domains (Mobile-First Architecture) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <Button
                    type="button"
                    variant={activeInfoDomain === "abuseTypes" ? "default" : "outline"}
                    onClick={() => setActiveInfoDomain("abuseTypes")}
                    className={`h-auto py-2.5 px-3 flex flex-col items-center justify-center gap-1.5 rounded-md text-xs font-semibold ${activeInfoDomain === "abuseTypes" ? "bg-emerald-700 text-white" : "bg-muted/40"
                      }`}
                  >
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-center">{resUI.domainAbuseTypes}</span>
                  </Button>

                  <Button
                    type="button"
                    variant={activeInfoDomain === "prevention" ? "default" : "outline"}
                    onClick={() => setActiveInfoDomain("prevention")}
                    className={`h-auto py-2.5 px-3 flex flex-col items-center justify-center gap-1.5 rounded-md text-xs font-semibold ${activeInfoDomain === "prevention" ? "bg-blue-700 text-white" : "bg-muted/40"
                      }`}
                  >
                    <Lock className="h-4 w-4" />
                    <span className="text-center">{resUI.domainPrevention}</span>
                  </Button>

                  <Button
                    type="button"
                    variant={activeInfoDomain === "legalRights" ? "default" : "outline"}
                    onClick={() => setActiveInfoDomain("legalRights")}
                    className={`h-auto py-2.5 px-3 flex flex-col items-center justify-center gap-1.5 rounded-md text-xs font-semibold ${activeInfoDomain === "legalRights" ? "bg-purple-700 text-white" : "bg-muted/40"
                      }`}
                  >
                    <Gavel className="h-4 w-4" />
                    <span className="text-center">{resUI.domainLegal}</span>
                  </Button>

                  <Button
                    type="button"
                    variant={activeInfoDomain === "psychology" ? "default" : "outline"}
                    onClick={() => setActiveInfoDomain("psychology")}
                    className={`h-auto py-2.5 px-3 flex flex-col items-center justify-center gap-1.5 rounded-md text-xs font-semibold ${activeInfoDomain === "psychology" ? "bg-amber-700 text-white" : "bg-muted/40"
                      }`}
                  >
                    <Brain className="h-4 w-4" />
                    <span className="text-center">{resUI.domainPsych}</span>
                  </Button>
                </div>

                {/* DOMAIN 1: TYPES OF ONLINE ABUSE */}
                {activeInfoDomain === "abuseTypes" && (
                  <div className="space-y-6 pt-2">

                    {/* Sub-selector pills for abuse types */}
                    <div className="flex flex-wrap gap-1.5 pb-2 border-b border-border/60">
                      {[
                        { id: "overview", label: t.resources.gbvInfo.tabs.overview },
                        { id: "cyberstalking", label: t.resources.gbvInfo.tabs.cyberstalking },
                        { id: "harassment", label: t.resources.gbvInfo.tabs.harassment },
                        { id: "impersonation", label: t.resources.gbvInfo.tabs.impersonation },
                        { id: "doxing", label: t.resources.gbvInfo.tabs.doxing },
                        { id: "imageAbuse", label: t.resources.gbvInfo.tabs.imageAbuse },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setActiveAbuseType(item.id)}
                          className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${activeAbuseType === item.id
                              ? "bg-foreground text-background font-bold shadow-xs"
                              : "bg-muted hover:bg-muted/80 text-foreground"
                            }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>

                    {/* Overview Screen */}
                    {activeAbuseType === "overview" && (
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                            <Shield className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                            {t.resources.gbvInfo.content.overview.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-foreground/90 mt-1.5 leading-relaxed">
                            {t.resources.gbvInfo.content.overview.description}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                            Key Realities & Protections
                          </span>
                          <div className="grid sm:grid-cols-2 gap-2.5">
                            {t.resources.gbvInfo.content.overview.keyPoints.map((point: string, idx: number) => (
                              <div key={idx} className="p-3 rounded-md bg-muted/40 border border-border text-xs flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                                <span className="leading-relaxed">{point}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Individual Abuse Type Card (Cyberstalking, Harassment, Impersonation, Doxing, Image Abuse) */}
                    {activeAbuseType !== "overview" && (() => {
                      const content = t.resources.gbvInfo.content[activeAbuseType as keyof typeof t.resources.gbvInfo.content] as any
                      if (!content) return null

                      return (
                        <div className="space-y-5">
                          <div className="space-y-1.5">
                            <h3 className="text-base md:text-lg font-bold text-foreground">{content.title}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{content.description}</p>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            {/* Warning Signs Box */}
                            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 space-y-3">
                              <h4 className="font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                                <AlertTriangle className="h-4 w-4 text-amber-600" />
                                {resUI.warningSigns}
                              </h4>
                              <ul className="space-y-2">
                                {content.signs?.map((sign: string, idx: number) => (
                                  <li key={idx} className="text-xs flex items-start gap-2 text-foreground/90 leading-relaxed">
                                    <span className="text-amber-600 font-bold">•</span>
                                    <span>{sign}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Recommended Actions Box */}
                            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 space-y-3">
                              <h4 className="font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300">
                                <Shield className="h-4 w-4 text-emerald-600" />
                                {resUI.actionsToTake}
                              </h4>
                              <ul className="space-y-2">
                                {content.actions?.map((act: string, idx: number) => (
                                  <li key={idx} className="text-xs flex items-start gap-2 text-foreground/90 leading-relaxed">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                                    <span>{act}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )
                    })()}

                  </div>
                )}

                {/* DOMAIN 2: PREVENTION & DIGITAL SAFETY */}
                {activeInfoDomain === "prevention" && (
                  <div className="space-y-6 pt-2">
                    <div className="space-y-1.5">
                      <h3 className="text-base md:text-lg font-bold text-foreground flex items-center gap-2">
                        <Lock className="h-5 w-5 text-blue-600" />
                        {t.resources.gbvInfo.content.prevention.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {t.resources.gbvInfo.content.prevention.description}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Privacy Settings */}
                      <div className="p-4 rounded-lg bg-muted/40 border border-border space-y-3">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-foreground flex items-center gap-2">
                          <Lock className="h-4 w-4 text-blue-600" />
                          {t.resources.gbvInfo.content.prevention.privacySettings.title}
                        </h4>
                        <ul className="space-y-2 text-xs">
                          {t.resources.gbvInfo.content.prevention.privacySettings.tips.map((tip: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Digital Hygiene */}
                      <div className="p-4 rounded-lg bg-muted/40 border border-border space-y-3">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-foreground flex items-center gap-2">
                          <Shield className="h-4 w-4 text-emerald-600" />
                          {t.resources.gbvInfo.content.prevention.digitalHygiene.title}
                        </h4>
                        <ul className="space-y-2 text-xs">
                          {t.resources.gbvInfo.content.prevention.digitalHygiene.tips.map((tip: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Safe Content Sharing */}
                      <div className="p-4 rounded-lg bg-muted/40 border border-border space-y-3">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-foreground flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-purple-600" />
                          {t.resources.gbvInfo.content.prevention.safeSharing.title}
                        </h4>
                        <ul className="space-y-2 text-xs">
                          {t.resources.gbvInfo.content.prevention.safeSharing.guidelines.map((g: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-purple-600 shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{g}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Warning Signs Recognition */}
                      <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 space-y-3">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-600" />
                          {t.resources.gbvInfo.content.prevention.recognizeWarnings.title}
                        </h4>
                        <ul className="space-y-2 text-xs">
                          {t.resources.gbvInfo.content.prevention.recognizeWarnings.signs.map((sign: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-amber-600 font-bold">•</span>
                              <span className="leading-relaxed">{sign}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* DOMAIN 3: ETHIOPIAN LEGAL RIGHTS */}
                {activeInfoDomain === "legalRights" && (
                  <div className="space-y-6 pt-2">
                    <div className="space-y-1.5">
                      <h3 className="text-base md:text-lg font-bold text-foreground flex items-center gap-2">
                        <Gavel className="h-5 w-5 text-purple-600" />
                        {t.resources.gbvInfo.content.legalRights.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {t.resources.gbvInfo.content.legalRights.description}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Constitutional Rights */}
                      <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20 space-y-3">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-purple-900 dark:text-purple-300 flex items-center gap-2">
                          <Scale className="h-4 w-4 text-purple-600" />
                          {t.resources.gbvInfo.content.legalRights.constitutionalRights.title}
                        </h4>
                        <ul className="space-y-2 text-xs">
                          {t.resources.gbvInfo.content.legalRights.constitutionalRights.rights.map((r: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-purple-600 shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Criminal & Cyber Laws */}
                      <div className="p-4 rounded-lg bg-muted/40 border border-border space-y-3">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-foreground flex items-center gap-2">
                          <Gavel className="h-4 w-4 text-red-600" />
                          {t.resources.gbvInfo.content.legalRights.criminalLaws.title}
                        </h4>
                        <ul className="space-y-2 text-xs">
                          {t.resources.gbvInfo.content.legalRights.criminalLaws.laws.map((l: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-red-600 font-bold">•</span>
                              <span className="leading-relaxed">{l}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Evidence Collection Rules */}
                      <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 space-y-3">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-blue-900 dark:text-blue-300 flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-blue-600" />
                          {t.resources.gbvInfo.content.legalRights.evidenceCollection.title}
                        </h4>
                        <ul className="space-y-2 text-xs">
                          {t.resources.gbvInfo.content.legalRights.evidenceCollection.steps.map((step: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="font-mono font-bold text-blue-600 shrink-0">{idx + 1}.</span>
                              <span className="leading-relaxed">{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Where to Report Official Complaints */}
                      <div className="p-4 rounded-lg bg-muted/40 border border-border space-y-3">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-foreground flex items-center gap-2">
                          <Phone className="h-4 w-4 text-emerald-600" />
                          {t.resources.gbvInfo.content.legalRights.reporting.title}
                        </h4>
                        <ul className="space-y-2 text-xs">
                          {t.resources.gbvInfo.content.legalRights.reporting.options.map((opt: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{opt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* DOMAIN 4: PSYCHOLOGICAL COPING & HEALING */}
                {activeInfoDomain === "psychology" && (
                  <div className="space-y-6 pt-2">
                    <div className="space-y-1.5">
                      <h3 className="text-base md:text-lg font-bold text-foreground flex items-center gap-2">
                        <Brain className="h-5 w-5 text-amber-600" />
                        {t.resources.gbvInfo.content.psychologicalImpact.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {t.resources.gbvInfo.content.psychologicalImpact.description}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Validating Feelings */}
                      <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 space-y-3">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-blue-900 dark:text-blue-300 flex items-center gap-2">
                          <HeartHandshake className="h-4 w-4 text-blue-600" />
                          {t.resources.gbvInfo.content.psychologicalImpact.validatingFeelings.title}
                        </h4>
                        <ul className="space-y-2 text-xs">
                          {t.resources.gbvInfo.content.psychologicalImpact.validatingFeelings.messages.map((m: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                              <span className="leading-relaxed font-medium">{m}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Coping Strategies */}
                      <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 space-y-3">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
                          <Shield className="h-4 w-4 text-emerald-600" />
                          {t.resources.gbvInfo.content.psychologicalImpact.copingStrategies.title}
                        </h4>
                        <ul className="space-y-2 text-xs">
                          {t.resources.gbvInfo.content.psychologicalImpact.copingStrategies.strategies.map((s: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Common Trauma Effects */}
                      <div className="p-4 rounded-lg bg-muted/40 border border-border space-y-3">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-foreground flex items-center gap-2">
                          <Brain className="h-4 w-4 text-purple-600" />
                          {t.resources.gbvInfo.content.psychologicalImpact.commonEffects.title}
                        </h4>
                        <ul className="space-y-2 text-xs">
                          {t.resources.gbvInfo.content.psychologicalImpact.commonEffects.effects.map((e: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-purple-600 font-bold">•</span>
                              <span className="leading-relaxed">{e}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* When to Seek Urgent Help */}
                      <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 space-y-3">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-600" />
                          {t.resources.gbvInfo.content.psychologicalImpact.whenToSeekHelp.title}
                        </h4>
                        <ul className="space-y-2 text-xs">
                          {t.resources.gbvInfo.content.psychologicalImpact.whenToSeekHelp.signs.map((s: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </TabsContent>
          </Tabs>

          {/* Quick Exit Privacy Safeguard Note */}
          <div className="pt-4 border-t border-border/60 text-center">
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
              <Lock className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{resUI.quickExitNotice}</span>
            </p>
          </div>

        </div>
      </main>
    </div>
  )
}
