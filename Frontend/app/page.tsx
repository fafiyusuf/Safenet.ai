"use client"

import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Bot,
  Download,
  Lock,
  MessageSquare,
  Phone,
  Scale,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Upload,
  CheckCircle2
} from "lucide-react"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import { getTranslation } from "@/lib/i18n"

interface HotlineItem {
  number: string
  title: string
  hours: string
}

interface StatutoryRow {
  article: string
  title: string
  offence: string
  penalty: string
  evidence: string
}

interface ProtocolStep {
  step: string
  name: string
  desc: string
}

interface LocaleContent {
  tickerPrompt: string
  hotlines: HotlineItem[]
  institutionalHeader: string
  portalTitle: string
  portalDesc: string
  heroImageTag: string
  heroImageCaption: string
  evidenceImageTag: string
  counselorImageTag: string

  // Terminal 1 (Forensic)
  intake1Tag: string
  intake1Title: string
  intake1Desc: string
  intake1Action: string
  intake1Specs: string[]

  // Terminal 2 (Crisis)
  intake2Tag: string
  intake2Title: string
  intake2Desc: string
  intake2Action: string
  intake2Specs: string[]

  // Evidence Specimen
  specimenTitle: string
  specimenNotice: string
  fieldDocketId: string
  fieldHash: string
  fieldPlatform: string
  fieldClassification: string
  fieldRiskScore: string
  fieldLaw: string
  btnGenerateDossier: string
  btnViewRights: string
  specimenRetentionNote: string

  // Legal Framework Table
  legalSectionTitle: string
  legalSectionDesc: string
  colArticle: string
  colOffence: string
  colPenalty: string
  colEvidence: string
  statutes: StatutoryRow[]
  btnViewAllResources: string

  // Custody Protocol
  protocolTitle: string
  protocolDesc: string
  protocolSteps: ProtocolStep[]

  // Action Bar
  actionPrompt: string
  actionDesc: string
  btnUploadEvidence: string
  btnTalkCounselor: string

  // Footer
  footerAgency: string
  footerCounselor: string
  footerDisclaimer: string
}

const LOCALES: Record<string, LocaleContent> = {
  en: {
    tickerPrompt: "In immediate danger? Free 24/7 emergency hotlines in Ethiopia:",
    hotlines: [
      { number: "7711", title: "GBV Hotline", hours: "24/7 Free" },
      { number: "6388", title: "Women's Line", hours: "Toll-Free" },
      { number: "8044", title: "Crisis Referral", hours: "Confidential" },
      { number: "991", title: "Federal Police", hours: "Cyber Crime Unit" },
    ],
    institutionalHeader: "Safety & Evidence Preservation",
    portalTitle: "Digital Evidence Preservation & Crisis Support for Technology-Facilitated Abuse",
    portalDesc: "Preserve court-admissible proof from Telegram, WhatsApp, TikTok, Facebook, or SMS. Generate tamper-evident PDF dossiers mapped to Computer Crime Proclamation No. 958/2016, or access confidential, multilingual crisis support.",
    heroImageTag: "Civic Tech for Ethiopian Digital Spaces",
    heroImageCaption: "Preserve court-admissible proof before messages are deleted on Telegram, WhatsApp, TikTok or SMS.",
    evidenceImageTag: "Cryptographic Chain of Custody",
    counselorImageTag: "Automated 24/7 AI Safety Guidance",

    intake1Tag: "Forensic Ingestion",
    intake1Title: "Preserve Digital Evidence",
    intake1Desc: "Upload screenshots before messages are edited or unsent. We compute a cryptographic SHA-256 hash, extract multilingual text via OCR, and format a police-ready complaint docket.",
    intake1Action: "Begin Evidence Intake",
    intake1Specs: [
      "Supported: Telegram, WhatsApp, TikTok, Facebook, SMS",
      "Multilingual OCR: Amharic (Ge'ez), Tigrinya, Oromo, Somali, English",
      "Client-side SHA-256 hash verification (Zero external broker leak)",
      "Zero account registration required • Automated 90-day purge",
    ],

    intake2Tag: "Support Protocol",
    intake2Title: "AI Support Chat (24/7)",
    intake2Desc: "Chat privately with our automated AI assistant. Get instant digital safety guidance, evidence preservation advice, boundary checklists, and regional emergency shelter referrals across Ethiopia.",
    intake2Action: "Open AI Support Chat",
    intake2Specs: [
      "Automated AI assistant (Zero identifying chats stored)",
      "Evidence preservation guidance and risk de-escalation",
      "Direct connection to verified shelter and legal aid directories",
      "Strict confidentiality • No conversation logs stored",
    ],

    specimenTitle: "CHAIN-OF-CUSTODY EVIDENCE DOSSIER SPECIMEN",
    specimenNotice: "Tamper-Evident Forensic Record for Cyber Crime Investigation Unit",
    fieldDocketId: "DOCKET REF:",
    fieldHash: "CRYPTOGRAPHIC HASH (SHA-256):",
    fieldPlatform: "DETECTED SOURCE:",
    fieldClassification: "STATUTORY OFFENCE:",
    fieldRiskScore: "EVALUATED THREAT LEVEL:",
    fieldLaw: "APPLICABLE PROCLAMATION:",
    btnGenerateDossier: "Preserve Your Evidence",
    btnViewRights: "View Legal Provisions",
    specimenRetentionNote: "Evidentiary records purge automatically after 90 days. We do not sell or transfer data to any third party.",

    legalSectionTitle: "Ethiopian Cybercrime Statutory Framework",
    legalSectionDesc: "Technology-facilitated abuse is punishable under federal proclamation. Below are statutory thresholds and required evidence types for formal prosecution.",
    colArticle: "Proclamation & Article",
    colOffence: "Offence Category",
    colPenalty: "Statutory Penalty",
    colEvidence: "Required Evidence Types",
    statutes: [
      {
        article: "Proc. 958/2016 — Art. 13",
        title: "Computer Intimidation",
        offence: "Coercing, threatening bodily harm, or intimidating a person via messaging platforms or social media.",
        penalty: "Up to 3 years rigorous imprisonment",
        evidence: "Timestamped screenshots, sender handles, unaltered message export logs",
      },
      {
        article: "Proc. 958/2016 — Art. 14",
        title: "Non-Consensual Image Sharing",
        offence: "Distributing, publishing, or blackmailing with intimate images/videos without consent (Sextortion).",
        penalty: "Up to 5 years rigorous imprisonment",
        evidence: "Blackmail demand messages, threat timestamps, original image metadata",
      },
      {
        article: "Proc. 1185/2020 — Art. 5",
        title: "Hate Speech & Defamation",
        offence: "Public dissemination of gender-targeted hatred, deliberate falsehoods, and smear campaigns.",
        penalty: "Fines and up to 3 years imprisonment",
        evidence: "Public post URLs, viral distribution counts, screenshot records",
      },
    ],
    btnViewAllResources: "View Verified Ethiopian Shelters & Legal Aid Providers",

    protocolTitle: "Forensic Chain-of-Custody Protocol",
    protocolDesc: "From raw screenshot to court-admissible legal dossier in four verifiable phases.",
    protocolSteps: [
      {
        step: "01",
        name: "Hash Ingestion",
        desc: "A cryptographic SHA-256 hash is generated upon intake, creating an immutable mathematical fingerprint.",
      },
      {
        step: "02",
        name: "Multilingual OCR",
        desc: "Tesseract extracts Amharic (Ge'ez), Tigrinya, Afaan Oromoo, Somali, and English text directly in memory.",
      },
      {
        step: "03",
        name: "Statutory Mapping",
        desc: "Groq & Gemini AI models identify abuse patterns, flag immediate physical safety risks, and map legal articles.",
      },
      {
        step: "04",
        name: "Sealed PDF Export",
        desc: "A tamper-evident PDF complaint package is compiled, formatted for submission to the Federal Police.",
      },
    ],

    actionPrompt: "Preserve evidence before messages are deleted.",
    actionDesc: "Perpetrators routinely delete messages or unsend threats on Telegram and social apps. Take immediate screenshots and preserve a timestamped cryptographic record.",
    btnUploadEvidence: "Start Evidence Upload",
    btnTalkCounselor: "Talk with Counselor",

    footerAgency: "SafeNet.ai — Technology-Facilitated GBV Documentation Portal",
    footerCounselor: "Crisis Counselor",
    footerDisclaimer: "Disclaimer: SafeNet.ai is a technical evidence preservation and crisis guidance system. It does not provide formal legal representation or medical diagnoses. In an emergency, dial 7711, 6388, 8044, or Federal Police 991 immediately.",
  },
  am: {
    tickerPrompt: "አፋጣኝ የደህንነት ስጋት ካለብዎ በነፃ ይደውሉ:",
    hotlines: [
      { number: "7711", title: "የጾታ ጥቃት መስመር", hours: "24/7 ነፃ ጥሪ" },
      { number: "6388", title: "የሴቶች ድጋፍ", hours: "በነፃ መስመር" },
      { number: "8044", title: "የአደጋ ጊዜ ድጋፍ", hours: "ሚስጥራዊ" },
      { number: "991", title: "የፌዴራል ፖሊስ", hours: "የሳይበር ክፍል" },
    ],
    institutionalHeader: "የዲጂታል ማስረጃ ማሰባሰቢያ እና የደህንነት መድረክ",
    portalTitle: "የሳይበር ጾታዊ ጥቃት ማስረጃ ማሰባሰቢያ እና የስነ-ልቦና ድጋፍ መድረክ",
    portalDesc: "በቴሌግራም፣ ዋትስአፕ፣ ቲክቶክ፣ ፌስቡክ ወይም ኤስኤምኤስ የደረሰቦትን ጥቃት ማስረጃ በህጋዊ መንገድ ይመዝግቡ። በኮምፒውተር ወንጀል አዋጅ 958/2008 መሰረት የክስ ሰነድ ያዘጋጁ።",
    heroImageTag: "የኢትዮጵያ ዲጂታል ደህንነት መድረክ",
    heroImageCaption: "መልዕክቶች በቴሌግራም፣ ዋትስኣፕ፣ ቲክቶክ ወይም ኤስኤምኤስ ከመጥፋታቸው በፊት ህጋዊ ማስረጃዎን ይመዝግቡ።",
    evidenceImageTag: "ክሪፕቶግራፊክ የማስረጃ ማረጋገጫ",
    counselorImageTag: "አውቶሜትድ 24/7 የAI ደህንነት መመሪያ",

    intake1Tag: "የማስረጃ ትንታኔ",
    intake1Title: "የዲጂታል ማስረጃ ይመዝግቡ",
    intake1Desc: "መልዕክቶች ከመጥፋታቸው በፊት ስክሪንሾት ያስገቡ። ስርዓቱ የSHA-256 ክሪፕቶግራፊክ ፊርማ በማመንጨት፣ ጽሁፉን በOCR በማውጣት ለፌዴራል ፖሊስ ዝግጁ ሰነድ ያዘጋጃል።",
    intake1Action: "ማስረጃ መመዝገብ ይጀምሩ",
    intake1Specs: [
      "የሚደገፉ፡ ቴሌግራም፣ ዋትስአፕ፣ ቲክቶክ፣ ፌስቡክ፣ ኤስኤምኤስ",
      "ባለብዙ ቋንቋ OCR፡ አማርኛ፣ ትግርኛ፣ ኦሮምኛ፣ ሶማሊኛ፣ እንግሊዝኛ",
      "የSHA-256 ፋይል ማረጋገጫ (ምንም መረጃ ለሶስተኛ ወገን አይጋራም)",
      "ምንም መለያ መክፈት አይጠየቅም • ከ90 ቀናት በኋላ በራስ-ሰር ይሰረዛል",
    ],

    intake2Tag: "የድጋፍ አገልግሎት",
    intake2Title: "የAI ድጋፍ ቻት (24/7)",
    intake2Desc: "ከአውቶሜትድ AI ረዳታችን ጋር በሚስጥር ይወያዩ። ፈጣን የዲጂታል ደህንነት መመሪያ፣ የማስረጃ አጠባበቅ ዘዴዎችን እና የኢትዮጵያ የአደጋ ጊዜ መጠለያዎች መረጃ ያግኙ።",
    intake2Action: "የAI ድጋፍ ቻት ይክፈቱ",
    intake2Specs: [
      "አውቶሜትድ የAI ድጋፍ (ምንም የግል መረጃ አይቀመጥም)",
      "የደህንነት እቅድ እና የስጋት መቀነሻ መመሪያዎች",
      "ወደ ተረጋገጡ የኢትዮጵያ ድጋፍ ድርጅቶችና መጠለያዎች ፈጣን ግንኙነት",
      "100% ሚስጥራዊ • ምንም የውይይት መረጃ አይቀመጥም",
    ],

    specimenTitle: "የማስረጃ ሰነድ ናሙና (CHAIN-OF-CUSTODY)",
    specimenNotice: "ለፌዴራል ፖሊስ የሳይበር ወንጀል ክፍል የሚቀርብ ህጋዊ ሰነድ",
    fieldDocketId: "የመዝገብ ቁጥር:",
    fieldHash: "ክሪፕቶግራፊክ ፊርማ (SHA-256):",
    fieldPlatform: "የተገኘበት መድረክ:",
    fieldClassification: "የወንጀል ምድብ:",
    fieldRiskScore: "የስጋት ደረጃ:",
    fieldLaw: "ተፈጻሚ ህግ:",
    btnGenerateDossier: "የራስዎን ማስረጃ ይመዝግቡ",
    btnViewRights: "የህግ ድንጋጌዎችን ይመልከቱ",
    specimenRetentionNote: "ሁሉም መረጃዎች ከ90 ቀናት በኋላ ይሰረዛሉ። የሶስተኛ ወገን ዳታ ሽያጭ ወይም መጋራት የለም።",

    legalSectionTitle: "የኢትዮጵያ የሳይበር ወንጀል የህግ ማዕቀፍ",
    legalSectionDesc: "የመስመር ላይ ጥቃቶች በኢትዮጵያ አዋጅ መሰረት በወንጀል የሚያስቀጡ ናቸው። ከዚህ በታች የተዘረዘሩት የህግ ድንጋጌዎችና የሚፈለጉ ማስረጃዎች ናቸው።",
    colArticle: "አዋጅ እና አንቀጽ",
    colOffence: "የወንጀል አይነት",
    colPenalty: "የሚያስቀጣው ቅጣት",
    colEvidence: "የሚፈለግ ማስረጃ",
    statutes: [
      {
        article: "አዋጅ 958/2008 — አንቀጽ 13",
        title: "በኮምፒውተር ማስፈራራት",
        offence: "በማህበራዊ ሚዲያ ወይም በመልዕክት ሌላውን ሰው በአካል፣ በክብር ወይም በንብረት ላይ ጉዳት ለማድረስ ማስፈራራት።",
        penalty: "እስከ 3 ዓመት ጽኑ እስራት",
        evidence: "የመልዕክት ስክሪንሾት፣ የመላኪያው አድራሻ (Handle)፣ የሰዓት ማረጋገጫ",
      },
      {
        article: "አዋጅ 958/2008 — አንቀጽ 14",
        title: "አስነዋሪ ምስል ማሰራጨት",
        offence: "የግል ፎቶዎችን ወይም ቪዲዮዎችን ያለፍቃድ ማሰራጨት ወይም በማሰራጨት ማስፈራራት (Sextortion)።",
        penalty: "እስከ 5 ዓመት ጽኑ እስራት",
        evidence: "የማስፈራሪያ መልዕክቶች፣ የምስል ሜታዳታ፣ የገንዘብ መጠየቂያ መረጃ",
      },
      {
        article: "አዋጅ 1185/2012 — አንቀጽ 5",
        title: "የጥላቻ ንግግርና ስም ማጥፋት",
        offence: "በጾታ ወይም ማንነት ላይ ያነጣጠረ የጥላቻ ንግግር፣ የስም ማጥፋት እና የውሸት መረጃ ማሰራጨት።",
        penalty: "የገንዘብ መቀጮ እና እስከ 3 ዓመት እስራት",
        evidence: "የህዝብ ፖስቶች ሊንክ፣ የተሰራጨበት መጠን መረጃ፣ ስክሪንሾቶች",
      },
    ],
    btnViewAllResources: "የኢትዮጵያ የድጋፍና መጠለያ ድርጅቶችን ዝርዝር ይመልከቱ",

    protocolTitle: "የማስረጃ አያያዝ ሂደት (Chain-of-Custody)",
    protocolDesc: "ከጥሬ ስክሪንሾት እስከ ህጋዊ ሰነድ ድረስ ያለው ደረጃ በደረጃ አሰራር።",
    protocolSteps: [
      {
        step: "01",
        name: "ክሪፕቶግራፊክ ሃሽ",
        desc: "ምስሉ እንደተሰቀለ የSHA-256 ልዩ የፋይል ፊርማ ወዲያውኑ ይመነጫል።",
      },
      {
        step: "02",
        name: "ባለብዙ ቋንቋ OCR",
        desc: "Tesseract የአማርኛ (ግዕዝ)፣ ትግርኛ፣ ኦሮምኛ፣ ሶማሊኛና እንግሊዝኛ ጽሁፎችን ያወጣል።",
      },
      {
        step: "03",
        name: "የህግ ትንታኔ",
        desc: "Groq እና Gemini AI ሞዴሎች የወንጀል ክብደቱን ለይተው ከአዋጁ አንቀጽ ጋር ያዛምዳሉ።",
      },
      {
        step: "04",
        name: "የክስ ሰነድ ዝግጅት",
        desc: "ለፌዴራል ፖሊስ የሚቀርብ የማስረጃ ማረጋገጫ ያለው የተሟላ PDF ሰነድ ይዘጋጃል።",
      },
    ],

    actionPrompt: "መልዕክቶች ከመጥፋታቸው በፊት ማስረጃዎን ይመዝግቡ።",
    actionDesc: "አጥፊዎች በቴሌግራም ወይም በማህበራዊ ሚዲያ መልዕክቶችን በብዛት ያጠፋሉ። አሁኑኑ ስክሪንሾት በማንሳት በSafeNet.ai ያስመዝግቡ።",
    btnUploadEvidence: "ማስረጃ መመዝገብ ይጀምሩ",
    btnTalkCounselor: "ከአማካሪ ጋር ይነጋገሩ",

    footerAgency: "SafeNet.ai — የኢትዮጵያ የሳይበር ጾታዊ ጥቃት ማስረጃ መድረክ",
    footerCounselor: "አማካሪ",
    footerDisclaimer: "ማሳሰቢያ፡ SafeNet.ai የቴክኖሎጂ ማስረጃ ማሰባሰቢያ እና የመጀመሪያ ደረጃ ድጋፍ መድረክ ነው። ህጋዊ ውክልና ወይም የህክምና ምክር አይሰጥም። ለአስቸኳይ አደጋ ወደ 7711፣ 6388 ወይም ፖሊስ 991 ይደውሉ።",
  },
  om: {
    tickerPrompt: "Balaa yeroo ammaa keessa jirtuu? Bilbila sarara gargaarsa ariifachiisaa Itoophiyaa bilisaan:",
    hotlines: [
      { number: "7711", title: "Sarara GBV", hours: "24/7 Bilisa" },
      { number: "6388", title: "Dubartootaaf", hours: "Biyya Guutuu" },
      { number: "8044", title: "Balaa Yeroo", hours: "Iccitii" },
      { number: "991", title: "Poolisii Federaalaa", hours: "Yakka Saayibarii" },
    ],
    institutionalHeader: "Nageenya Lammilee fi Eegumsa Ragaa",
    portalTitle: "Wlaltii Eegumsa Ragaa Miidhaa Saayibarii fi Deeggarsa Yeroo Balaa",
    portalDesc: "Telegram, WhatsApp, TikTok, Facebook ykn SMS irraa ragaalee mana murtiitti fudhatama qaban eegaa. Akka Labsii Yakkoota Kompiitaraa Lakk. 958/2008 tti sanada himataa qopheessaa.",
    heroImageTag: "Nageenya Diijitaalaa Itoophiyaa",
    heroImageCaption: "Ergaawwan Telegram, WhatsApp, TikTok ykn SMS irraa osoo hin haqamin dura ragaa mana murtii qabadhaa.",
    evidenceImageTag: "Kiriptoogiraafii Eegumsa Ragaa",
    counselorImageTag: "Qajeelfama Nageenyaa AI 24/7",

    intake1Tag: "Qaaccessa Ragaa",
    intake1Title: "Ragaa Diijitaalaa Eegaa",
    intake1Desc: "Ergaawwan osoo hin haqamin dura suuraa galchaa. SHA-256 fayyadamuun ragaa mirkaneessa, barruu OCR dhaan baasa, sanada PDF poolisiif qopheessa.",
    intake1Action: "Ragaa Galchuu Jalqabaa",
    intake1Specs: [
      "Kan deeggaramu: Telegram, WhatsApp, TikTok, Facebook, SMS",
      "OCR Afaanota: Afaan Oromoo, Amaaraa, Tigriffaa, Soomaalii, Ingiliffaa",
      "Mirkanneessa SHA-256 (Odeeffannoon qaama biraatti hin bahu)",
      "Galmeen dhuunfaa hin barbaachisu • Guyyoota 90 booda ofumaan haqama",
    ],

    intake2Tag: "Tajaajila Deeggarsaa",
    intake2Title: "Haasa'a Deeggarsa AI (24/7)",
    intake2Desc: "Gargaaraa AI owtomaatikii wajjin iccitiin haasa'aa. Qajeelfama nageenya dijitaalaa, ragaa seeraa qabachuu fi odeeffannoo sarara gargaarsa ariifachiisaa Itoophiyaa argadhaa.",
    intake2Action: "Haasa'a AI Bani",
    intake2Specs: [
      "Gargaarsa AI owtomaatikii (Galmeen hin kuufamu)",
      "Qajeelfama eegumsa ragaa fi tasgabbii",
      "Dhaabbilee deeggarsaa fi bakka qubannaa amansiisoo waliin walqunnamsiisuu",
      "100% Iccitii • Haasa'aan tokkollee hin kuufamu",
    ],

    specimenTitle: "FAKKEENYA SANADA RAGAA (CHAIN-OF-CUSTODY)",
    specimenNotice: "Sanada Qorannoo Yakka Saayibarii Poolisii Federaalaatiif Dhiyaatu",
    fieldDocketId: "LAKK. SANADAA:",
    fieldHash: "MALLATTOO KIRIPTOOGIRAAFII (SHA-256):",
    fieldPlatform: "MADDII ARGAME:",
    fieldClassification: "GOSA YAKKAA:",
    fieldRiskScore: "SADARKAA BALAA:",
    fieldLaw: "SEERA LABSII:",
    btnGenerateDossier: "Ragaa Keessan Galmeessaa",
    btnViewRights: "Kewwatoota Seeraa Ilaalaa",
    specimenRetentionNote: "Ragaaleen guyyoota 90 booda ofumaan haqamu. Qaama biraaf gurguruun ykn dabarsuun hin jiru.",

    legalSectionTitle: "Seera Yakkoota Saayibarii Itoophiyaa",
    legalSectionDesc: "Miidhaan toora interneetii labsii federaalaatiin kan adabsiisuudha. Qabxiilee seeraa fi ragaalee barbaachisan armaan gaditti ilaalaa.",
    colArticle: "Labsii fi Keewwata",
    colOffence: "Gosa Miidhaa",
    colPenalty: "Adabbii Seeraa",
    colEvidence: "Ragaa Barbaachisu",
    statutes: [
      {
        article: "Labsii 958/2008 — Kw. 13",
        title: "Sodachisa Sirna Kompiitaraa",
        offence: "Miidiyaa hawaasaa ykn ergaadhaan nama sodaachisuu, qaama irratti miidhaa geessisuuf doorsisuu.",
        penalty: "Hanga hidhaa waggaa 3 cimaa",
        evidence: "Suuraa ergaa, maqaa ergaa ergee (handle), galmee yeroo",
      },
      {
        article: "Labsii 958/2008 — Kw. 14",
        title: "Suuraa Dhuunfaa Facaasuu",
        offence: "Suuraa ykn viidiyoo qaama saalaa hayyama malee facaasuu ykn doorsisuu (Sextortion).",
        penalty: "Hanga hidhaa waggaa 5 cimaa",
        evidence: "Ergaawwan doorsisaa, metadata suuraa, ragaa maallaqa gaafachuu",
      },
      {
        article: "Labsii 1185/2012 — Kw. 5",
        title: "Dubbii Jibbiinsaa fi Sobaa",
        offence: "Dubbii jibbiinsaa saala irratti xiyyeeffate, maqaa balleessii fi odeeffannoo sobaa facaasuu.",
        penalty: "Adabbii maallaqaa fi hidhaa waggaa 3",
        evidence: "Liankii maxxansaa, lakkoofsa faca'ee, suuraalee ragaa",
      },
    ],
    btnViewAllResources: "Dhaabbilee Deeggarsaa fi Bakkeewwan Qubannaa Ilaalaa",

    protocolTitle: "Tarkaanfiiwwan Eegumsa Ragaa",
    protocolDesc: "Suuraa qulqulluu irraa hanga sanada poolisiitti adeemsa mirkanaa'e afuriin.",
    protocolSteps: [
      {
        step: "01",
        name: "Kiriptoogiraafii Hash",
        desc: "Akkuma suuraan fe'ameen mallattoon addaa SHA-256 yeroma sana uumama.",
      },
      {
        step: "02",
        name: "OCR Afaan Baay'ee",
        desc: "Tesseract barruu Afaan Oromoo, Amaaraa, Tigriffaa, Soomaalii fi Ingiliffaa baasa.",
      },
      {
        step: "03",
        name: "Qaaccessa Seeraa",
        desc: "Groq fi Gemini AI gosa miidhaa fi sadarkaa balaa kewwata labsii waliin walbira qaba.",
      },
      {
        step: "04",
        name: "Qophii PDF Poolisii",
        desc: "Sanadni guutuun SHA-256 qabu Poolisii Federaalaatiif qophaa'ee buufama.",
      },
    ],

    actionPrompt: "Ergaawwan osoo hin haqamin dura ragaa keessan eegaa.",
    actionDesc: "Miidhaa raawwattoonni ergaa Telegram fi miidiyaa hawaasaa yeroo baay'ee ni haqu. Dafee suuraa kaasaatii galmeessaa.",
    btnUploadEvidence: "Ragaa Fe'uu Jalqabaa",
    btnTalkCounselor: "Gorsaa Waliin Haasawaa",

    footerAgency: "SafeNet.ai — Wlaltii Sanadeessaa TFGBV Itoophiyaa",
    footerCounselor: "Gorsaa",
    footerDisclaimer: "Akeekkachiisa: SafeNet.ai sirna eegumsa ragaa tekinooloojii fi gorsa jalqabaati. Gorsa seeraa ykn yaalaa miti. Balaa ariifachiisaaf 7711, 6388 ykn 991 bilbilaa.",
  },
  ti: {
    tickerPrompt: "ህጹጽ ሓደጋ ኣለኩም ድዩ? ናጻ ናይ 24/7 ህጹጽ ረድኤት መስመራት ኣብ ኢትዮጵያ:",
    hotlines: [
      { number: "7711", title: "መስመር GBV", hours: "24/7 ናጻ" },
      { number: "6388", title: "ደቂ-ኣንስትዮ", hours: "ናጻ መስመር" },
      { number: "8044", title: "ህጹጽ ረድኤት", hours: "ምስጢራዊ" },
      { number: "991", title: "ፌደራል ፖሊስ", hours: "ክፍሊ ሳይበር" },
    ],
    institutionalHeader: "ፌዴራላዊ ዴሞክራሲያዊ ሪፓብሊክ ኢትዮጵያ • ድሕነት ዜጋታትን ምዕቃብ መርትዖን",
    portalTitle: "ናይ ሳይበር ጾታዊ መጥቃዕቲ መርትዖታት ምዕቃብን ህጹጽ ደገፍን",
    portalDesc: "ካብ ቴሌግራም፡ ዋትስኣፕ፡ ቲክቶክ፡ ፌስቡክ ወይ ኤስኤምኤስ ናይ ቤት ፍርዲ ተቐባልነት ዘለዎም መርትዖታት ዓቅቡ። ብመሰረት ኣዋጅ ገበን ኮምፒውተር 958/2008 ናይ ክሲ ዶክመንት ኣዳልዉ።",
    heroImageTag: "ናይ ኢትዮጵያ ዲጂታል ድሕነት መድረኽ",
    heroImageCaption: "መልእኽትታት ካብ ቴሌግራም፡ ዋትስኣፕ፡ ቲክቶክ ወይ ኤስኤምኤስ ቅድሚ ምድምሳሶም ሕጋዊ መርትዖኹም ዓቅቡ።",
    evidenceImageTag: "ክሪፕቶግራፊክ መርትዖ ምዕቃብ",
    counselorImageTag: "ኣውቶማቲክ 24/7 ናይ AI ድሕነት መምርሒ",

    intake1Tag: "ምርመራ መርትዖ",
    intake1Title: "ዲጂታል መርትዖ ዓቅቡ",
    intake1Desc: "መልእኽትታት ቅድሚ ምድምሳሶም ስእሊ ኣእትዉ። SHA-256 ፊርማ ብምፍጣር፡ ብOCR ጽሑፍ የውጽእ፡ ንፌደራል ፖሊስ ድሉው ዝኾነ ሰነድ የዳልው።",
    intake1Action: "መርትዖ ምእታው ጀምሩ",
    intake1Specs: [
      "ዝድገፉ፡ ቴሌግራም፡ ዋትስኣፕ፡ ቲክቶክ፡ ፌስቡክ፡ ኤስኤምኤስ",
      "ብዙሕ ቋንቋ ዘለዎ OCR፡ ትግርኛ፡ ኣምሓርኛ፡ ኦሮምኛ፡ ሶማሊኛ፡ እንግሊዝኛ",
      "ናይ SHA-256 መርትዖ ፊርማ (ምስ ሳልሳይ ኣካል ዝካፈል የለን)",
      "ምዝገባ ኣየድልን • ድሕሪ 90 መዓልታት ብኣውቶማቲክ ይድምሰስ",
    ],

    intake2Tag: "ናይ ደገፍ ኣገልግሎት",
    intake2Title: "ናይ AI ደገፍ ቻት (24/7)",
    intake2Desc: "ምስ ኣውቶማቲክ ናይ AI ረዳእቲ ብምስጢር ተዘራረቡ። ቅልጡፍ ናይ ዲጂታል ድሕነት መምርሒ፡ ናይ መርትዖ ምዕቃብ ሜላታትን ናይ ኢትዮጵያ ህጹጽ ረድኤት ኣድራሻታትን ረኺቡ።",
    intake2Action: "ናይ AI ደገፍ ቻት ክፈቱ",
    intake2Specs: [
      "ኣውቶማቲክ ናይ AI ደገፍ (ዝኾነ መዝገብ ኣይዕቀብን)",
      "መርትዖ ምዕቃብን ናይ ሓደጋ ምቅላል መምርሒታትን",
      "ናብ ዝተረጋገጹ ናይ ኢትዮጵያ ማእከላት ደገፍ ቀጥታዊ ርክብ",
      "100% ምስጢራዊ • ዝኾነ ናይ ዕላል መዝገብ ኣይዕቀብን",
    ],

    specimenTitle: "መርኣያ ናይ መርትዖ ሰነድ (CHAIN-OF-CUSTODY)",
    specimenNotice: "ንክፍሊ ገበን ሳይበር ፌደራል ፖሊስ ዝቐርብ ሕጋዊ መርትዖ",
    fieldDocketId: "ቁጽሪ ሰነድ:",
    fieldHash: "ክሪፕቶግራፊክ ፊርማ (SHA-256):",
    fieldPlatform: "ዝተረኽበሉ መድረኽ:",
    fieldClassification: "ዓይነት ገበን:",
    fieldRiskScore: "ደረጃ ስግኣት:",
    fieldLaw: "ተፈጻሚ ኣዋጅ:",
    btnGenerateDossier: "ናይ ባዕልኹም መርትዖ ዓቅቡ",
    btnViewRights: "ዓንቀጻት ሕጊ ርኣዩ",
    specimenRetentionNote: "ኩሎም መርትዖታት ድሕሪ 90 መዓልታት ይድምሰሱ። ዳታ ምሻጥ ወይ ምክፋል የለን።",

    legalSectionTitle: "ናይ ኢትዮጵያ ሳይበር ገበን ሕጋዊ ማዕቀፍ",
    legalSectionDesc: "ናይ ኢንተርነት መጥቃዕትታት ብሕጊ ኢትዮጵያ ዘቕጽዑ ገበናት እዮም። ኣብ ታሕቲ ዘለዉ ዓንቀጻትን ዘድልዩ መርትዖታትን ተመልከቱ።",
    colArticle: "ኣዋጅን ዓንቀጽን",
    colOffence: "ዓይነት መጥቃዕቲ",
    colPenalty: "ሕጋዊ መቕጻዕቲ",
    colEvidence: "ዘድሊ መርትዖ",
    statutes: [
      {
        article: "ኣዋጅ 958/2008 — ዓንቀጽ 13",
        title: "ብኮምፒውተር ምፍርራሕ",
        offence: "ብማሕበራዊ ሚድያ ወይ መልእኽቲ ኣቢልካ ምፍርራሕ፡ ኣብ ኣካል ጉድኣት ንምብጻሕ ምፍርራሕ።",
        penalty: "ክሳብ 3 ዓመት ጽኑዕ ማእሰርቲ",
        evidence: "ናይ መልእኽቲ ስእሊ፡ ናይ ለኣኺ ኣድራሻ (handle)፡ ሰዓትን ዕለትን",
      },
      {
        article: "ኣዋጅ 958/2008 — ዓንቀጽ 14",
        title: "ዘይሕጋዊ ናይ ምስሊ ምክፋል",
        offence: "ናይ ብሕቲ ስእልታት ወይ ቪድዮታት ብዘይ ፍቓድ ምዝርጋሕ ወይ ብምዝርጋሕ ምፍርራሕ (Sextortion)።",
        penalty: "ክሳብ 5 ዓመት ጽኑዕ ማእሰርቲ",
        evidence: "ናይ ምፍርራሕ መልእኽትታት፡ ሜታዳታ ስእሊ፡ ገንዘብ ምሕታት መርትዖ",
      },
      {
        article: "ኣዋጅ 1185/2012 — ዓንቀጽ 5",
        title: "ናይ ጽልኢ ዘረባን ስም ምጥፋእን",
        offence: "ኣብ ጾታ ወይ መንነት ዝተመርኮሰ ጽልኢ፡ ስም ምጥፋእን ናይ ሓሶት ወረ ምዝርጋሕን።",
        penalty: "ገንዘባዊ መቕጻዕትን ክሳብ 3 ዓመት ማእሰርትን",
        evidence: "ናይ ህዝቢ ፖስት ሊንክ፡ ዝተዘርግሓሉ መጠን፡ ስእልታት",
      },
    ],
    btnViewAllResources: "ናይ ኢትዮጵያ ማእከላት ደገፍ ዝርዝር ርኣዩ",

    protocolTitle: "ናይ መርትዖ ምዕቃብ መስርሕ",
    protocolDesc: "ካብ ስእሊ መርትዖ ክሳብ ናይ ፖሊስ ሰነድ ብኣርባዕተ ቅደም-ተኸተል ደረጃታት።",
    protocolSteps: [
      {
        step: "01",
        name: "ክሪፕቶግራፊክ ሃሽ",
        desc: "ስእሊ ምስ ኣተወ ናይ SHA-256 ፍሉይ ፊርማ ብኡንብኡ ይፍጠር።",
      },
      {
        step: "02",
        name: "ብዙሕ ቋንቋ ዘለዎ OCR",
        desc: "Tesseract ናይ ትግርኛ፡ ኣምሓርኛ፡ ኦሮምኛ፡ ሶማሊኛን እንግሊዝኛን ጽሑፋት የውጽእ።",
      },
      {
        step: "03",
        name: "ሕጋዊ ትንተና",
        desc: "Groqን Gemini AIን ክብደት ገበን መርሚሮም ምስ ናይ ኣዋጅ ዓንቀጻት የዛምዱ።",
      },
      {
        step: "04",
        name: "ድሉው ሰነድ PDF",
        desc: "ንፌደራል ፖሊስ ዝቐርብ ዝተዓሸገ ናይ መርትዖ PDF ዶክመንት ይዳሎ።",
      },
    ],

    actionPrompt: "መልእኽትታት ቅድሚ ምድምሳሶም መርትዖኹም ዓቅቡ።",
    actionDesc: "መጥቃዕቲ ፈጸምቲ ኣብ ቴሌግራምን ማሕበራዊ ሚድያን መልእኽትታቶም ክድምስሱ ይኽእሉ እዮም። ቀልጢፍኩም ስእሊ ብምልዓል መዝግቡ።",
    btnUploadEvidence: "መርትዖ ምእታው ጀምሩ",
    btnTalkCounselor: "ምስ ኣማኻሪ ተዘራረቡ",

    footerAgency: "SafeNet.ai — ናይ ኢትዮጵያ TFGBV መዝገብ መርትዖ",
    footerCounselor: "ኣማኻሪ",
    footerDisclaimer: "መተሓሳሰቢ፡ SafeNet.ai ናይ ቴክኖሎጂ መርትዖታት መመዝገብን ናይ መጀመርታ ደገፍን ዝህብ መድረኽ እዩ። ሕጋዊ ወይ ሕክምናዊ ውክልና ኣይኮነን። ንህጹጽ ሓደጋ ናብ 7711፡ 6388 ወይ 991 ደውሉ።",
  },
  so: {
    tickerPrompt: "Khatar degdeg ah miyaad ku jirtaa? Khadadka degdegga ah ee bilaashka ah ee Itoobiya 24/7:",
    hotlines: [
      { number: "7711", title: "Khadka GBV", hours: "24/7 Bilaash" },
      { number: "6388", title: "Haweenka", hours: "Khad Bilaash ah" },
      { number: "8044", title: "Gargaarka Degdegga", hours: "Qarsoodi" },
      { number: "991", title: "Booliska Federaalka", hours: "Dambiyada Internetka" },
    ],
    institutionalHeader: "Jamhuuriyadda Dimuqraadiga Federaalka Itoobiya • Badbaadada Muwaadinka & Xafidista Caddeymaha",
    portalTitle: "Madasha Xafidista Caddeymaha Xadgudubka Internetka & Taageerada Degdegga ah",
    portalDesc: "Xafid caddeymaha maxkamaddu aqbali karto ee ka yimid Telegram, WhatsApp, TikTok, Facebook, ama SMS. Samee faylal PDF ah oo waafaqsan Bayaanka Dambiyada Kumbuyuutarka Lr. 958/2016.",
    heroImageTag: "Madal Badbaadada Dijitaalka ee Itoobiya",
    heroImageCaption: "Xafid caddeymaha maxkamaddu aqbasho ka hor inta aan farriimaha Telegram, WhatsApp, TikTok ama SMS la tirtirin.",
    evidenceImageTag: "Xaqiijinta Cryptographic ee Caddeynta",
    counselorImageTag: "Hanuuninta Badbaadada ee AI 24/7",

    intake1Tag: "Qaadashada Caddeynta",
    intake1Title: "Xafid Caddeymaha Dhijitaalka ah",
    intake1Desc: "Soo geli sawirka ka hor inta aan farriimaha la tirtirin. Waxaan abuureynaa saxiixa SHA-256, ku soo saareynaa qoraalka OCR, una diyaarineynaa fayl dacwadeed booliska.",
    intake1Action: "Bilow Soo Gelinta Caddeynta",
    intake1Specs: [
      "La taageeray: Telegram, WhatsApp, TikTok, Facebook, SMS",
      "Luqadaha OCR: Soomaali, Amharic, Oromo, Tigrinya, Ingiriis",
      "Hubinta saxiixa SHA-256 (Xog lama wadaago cid kale)",
      "Akoon looma baahna • Si toos ah ayaa loo tirtiraa 90 maalmood ka dib",
    ],

    intake2Tag: "Habka Taageerada",
    intake2Title: "Sheekaysiga Taageerada AI (24/7)",
    intake2Desc: "Si qarsoodi ah ula hadal caawiyaha tooska ah ee AI. Hel hagid degdeg ah oo ku saabsan badbaadada digital-ka, ilaalinta caddeymaha, iyo macluumaadka xarumaha degdegga ah ee Itoobiya.",
    intake2Action: "Fur Sheekaysiga AI",
    intake2Specs: [
      "Taageero toos ah oo AI ah (Wax xog ah lama keydiyo)",
      "Hanuuninta badbaadada iyo xafidista caddeymaha",
      "Xiriirinta goobaha taageerada iyo gargaarka sharciga ee la xaqiijiyay",
      "100% Qarsoodi • Ma jiro wadahadal la keydinayo",
    ],

    specimenTitle: "MUUNADA FAYLKA CADDEYNTA (CHAIN-OF-CUSTODY)",
    specimenNotice: "Diiwaanka Rasmiga ah ee Qeybta Baarista Dambiyada Internetka ee Booliska",
    fieldDocketId: "LR. FAYLKA:",
    fieldHash: "SAXIIXA CRYPTOGRAPHIC (SHA-256):",
    fieldPlatform: "GOOBTA LA HELAY:",
    fieldClassification: "NOOCA DAMBIGA:",
    fieldRiskScore: "SADARKAA BALAA:",
    fieldLaw: "BAYAANKA SHARCIGA:",
    btnGenerateDossier: "Xafid Caddeyntaada",
    btnViewRights: "Eeg Qodobbada Sharciga",
    specimenRetentionNote: "Dhammaan faylasha waxaa la tirtiraa 90 maalmood ka dib. Xog lama iibiyo lamana wadaago.",

    legalSectionTitle: "Sharciga Dambiyada Kumbuyuutarka ee Itoobiya",
    legalSectionDesc: "Xadgudubyada internetka waa dambiyo lagu ciqaabo bayaannada federaalka. Hoos ka eeg qodobbada sharciga iyo caddeymaha loo baahan yahay.",
    colArticle: "Bayaanka & Qodobka",
    colOffence: "Qeybta Dambiga",
    colPenalty: "Ciqaabta Sharciga",
    colEvidence: "Caddeynta loo Baahan yahay",
    statutes: [
      {
        article: "Bayaanka 958/2016 — Qod. 13",
        title: "Cabsi-gelinta Kumbuyuutarka",
        offence: "Ku hanjabidda waxyeello jireed ama cabsi-gelinta qofka iyadoo loo marayo baraha bulshada ama farriimaha.",
        penalty: "Xabsi culus ilaa 3 sano ah",
        evidence: "Sawirrada farriimaha, magaca soo diraha (handle), taariikhda iyo waqtiga",
      },
      {
        article: "Bayaanka 958/2016 — Qod. 14",
        title: "Faafinta Sawirrada Qarsoodiga",
        offence: "Faafinta ama ku hanjabidda faafinta sawirrada/fiidiyowyada galmada iyadoo aan oggolaansho jirin (Sextortion).",
        penalty: "Xabsi culus ilaa 5 sano ah",
        evidence: "Farriimaha hanjabaadda, xogta sawirka (metadata), caddeynta lacag-weydiinta",
      },
      {
        article: "Bayaanka 1185/2020 — Qod. 5",
        title: "Hadal-nacaybka & Sumcad-dilka",
        offence: "Faafinta hadallada nacaybka ah ee ku saleysan jinsiga, sumcad-dilka iyo been-abuurka.",
        penalty: "Ganaax lacageed iyo xabsi ilaa 3 sano ah",
        evidence: "Linkiyada qoraallada, xogta faafitaanka, sawirrada caddeynta",
      },
    ],
    btnViewAllResources: "Eeg Goobaha Taageerada iyo Gargaarka Sharciga ee Itoobiya",

    protocolTitle: "Hab-raaca Xafidista Caddeymaha",
    protocolDesc: "Laga bilaabo sawirka ilaa faylka dacwadda booliska afar marxaladood oo la hubiyay.",
    protocolSteps: [
      {
        step: "01",
        name: "Saxiixa SHA-256",
        desc: "Saxiix xisaabeed oo gaar ah (SHA-256) ayaa la abuuraa isla marka sawirka la soo geliyo.",
      },
      {
        step: "02",
        name: "OCR Luqadaha Badan",
        desc: "Tesseract wuxuu soo saarayaa qoraallada Soomaaliga, Amharic, Oromo, Tigrinya iyo Ingiriiska.",
      },
      {
        step: "03",
        name: "Qiimeynta Sharciga",
        desc: "Moodallada Groq iyo Gemini AI waxay falanqeeyaan khatarta waxayna la xiriiriyaan qodobbada sharciga.",
      },
      {
        step: "04",
        name: "Faylka PDF ee Booliska",
        desc: "Dukumenti PDF oo shaabadeysan oo loo diyaariyay Booliska Federaalka ayaa la soo dejin karaa.",
      },
    ],

    actionPrompt: "Xafid caddeymahaaga ka hor inta aan farriimaha la tirtirin.",
    actionDesc: "Kuwa dhibaatada geysta waxay inta badan tirtiraan farriimaha Telegram iyo baraha bulshada. Si degdeg ah sawir uga qaad oo halkan ku diiwaangeli.",
    btnUploadEvidence: "Bilow Soo Gelinta Caddeynta",
    btnTalkCounselor: "La Hadal La-taliyaha",

    footerAgency: "SafeNet.ai — Diiwaanka Xadgudubka TFGBV ee Itoobiya",
    footerCounselor: "La-taliye",
    footerDisclaimer: "Digniin: SafeNet.ai waa nidaam xafidista caddeymaha farsamada iyo hanuuninta dhibaatooyinka. Maaha wakiilnimo sharci ama talo caafimaad. Xaalad degdeg ah wac 7711, 6388 ama 991.",
  },
}

export default function LandingPage() {
  const { language, setLanguage } = useLanguage()
  const t = getTranslation(language)
  const l = LOCALES[language] || LOCALES.en

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header language={language} onLanguageChange={setLanguage} />

      {/* Emergency Assistance Ticker Bar */}
      <div className="border-b border-border bg-amber-500/10 px-4 py-2 text-xs">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium text-foreground">
            <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>{l.tickerPrompt}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {l.hotlines.map((hotline) => (
              <a
                key={hotline.number}
                href={`tel:${hotline.number}`}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-border/80 bg-background hover:bg-muted font-medium text-foreground transition-colors text-[11px]"
              >
                <Phone className="h-3 w-3 text-muted-foreground" />
                <span className="font-bold">{hotline.number}</span>
                <span className="text-muted-foreground text-[10px]">({hotline.title})</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1">

        {/* Institutional Masthead Header (Mobile-First 2-Column Responsive Layout) */}
        <section className="border-b border-border bg-muted/20 py-10 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">

              {/* Left Column: Direct Institutional Actions */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-border bg-background text-xs font-medium text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400" />
                  <span>{l.institutionalHeader}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight">
                  {l.portalTitle}
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                  {l.portalDesc}
                </p>

                {/* Primary & Secondary Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button asChild className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-md h-9 sm:h-10 px-4 text-xs sm:text-sm font-semibold">
                    <Link href="/upload">
                      <Upload className="h-4 w-4 mr-2" />
                      {l.intake1Action}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-md h-9 sm:h-10 px-4 text-xs sm:text-sm font-semibold border-emerald-600/30 hover:bg-emerald-50 dark:hover:bg-emerald-950/20">
                    <Link href="/chat">
                      <Bot className="h-4 w-4 mr-2 text-emerald-600" />
                      {l.intake2Action}
                    </Link>
                  </Button>
                </div>

                {/* Trust Badges Bar */}
                <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3 pt-1 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1 font-medium text-foreground/80">
                    <Lock className="h-3 w-3 text-emerald-600" />
                    <span>Client-side SHA-256</span>
                  </span>
                  <span>•</span>
                  <span>Zero Accounts Needed</span>
                  <span>•</span>
                  <span>Auto-Purge 90 Days</span>
                </div>
              </div>

              {/* Right Column: Grounded Editorial Photo Card */}
              <div className="lg:col-span-5">
                <div className="border border-border rounded-xl bg-card overflow-hidden shadow-xs">
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden bg-muted">
                    <Image
                      src="/survivor-action.jpg"
                      alt="Ethiopian citizen using digital evidence platform"
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 420px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/75 backdrop-blur-md text-[10px] font-mono text-white border border-white/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {l.heroImageTag}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-xs font-medium leading-snug drop-shadow-sm">
                        {l.heroImageCaption}
                      </p>
                    </div>
                  </div>
                  <div className="p-3 bg-card border-t border-border flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                    <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Proc. 958/2016 Compliant
                    </span>
                    <span className="text-[10px]">Toll-Free 7711</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Operational Intake Terminals (Visualized Entrypoints) */}
        <section className="py-10 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-6">

              {/* Terminal 1: Forensic Evidence Intake */}
              <div className="border border-border rounded-lg bg-card overflow-hidden flex flex-col justify-between">
                <div className="relative h-44 sm:h-48 w-full bg-muted overflow-hidden">
                  <Image
                    src="/evidence-shield.jpg"
                    alt="Digital evidence preservation on smartphone screen"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-emerald-300 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded border border-emerald-500/30">
                      {l.intake1Tag}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-[11px] font-mono text-emerald-300 font-semibold mb-0.5">
                      {l.evidenceImageTag}
                    </div>
                    <div className="text-xs text-white/90 font-medium">
                      SHA-256 Tamper-Proof Cryptographic Verification
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h2 className="text-lg font-bold text-foreground">
                      {l.intake1Title}
                    </h2>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {l.intake1Desc}
                    </p>
                    <div className="border-t border-border/60 pt-3 space-y-1.5">
                      {l.intake1Specs.map((spec, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-foreground/80">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button asChild className="w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded-md h-9 text-xs font-semibold mt-4">
                    <Link href="/upload">
                      <Upload className="h-3.5 w-3.5 mr-2" />
                      {l.intake1Action}
                      <ArrowRight className="h-3.5 w-3.5 ml-auto" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Terminal 2: Automated AI Support Chat */}
              <div className="border border-border rounded-lg bg-card overflow-hidden flex flex-col justify-between">
                <div className="relative h-44 sm:h-48 w-full bg-linear-to-br from-emerald-950 via-slate-900 to-slate-950 p-5 flex flex-col justify-between text-white overflow-hidden border-b border-border/60">
                  <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-emerald-300 bg-emerald-950/80 backdrop-blur-md px-2 py-0.5 rounded border border-emerald-500/30">
                      {l.intake2Tag}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-black/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      AUTOMATED AI
                    </span>
                  </div>

                  <div className="relative z-10 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 shadow-lg">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-emerald-300 font-semibold">
                        {l.counselorImageTag}
                      </div>
                      <div className="text-xs text-white/90 font-medium">
                        Automated Guidance in 5 Ethiopian Languages (Zero-Trace)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-foreground">
                        {l.intake2Title}
                      </h2>
                      <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                        AI SYSTEM
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {l.intake2Desc}
                    </p>
                    <div className="border-t border-border/60 pt-3 space-y-1.5">
                      {l.intake2Specs.map((spec, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-foreground/80">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button asChild variant="outline" className="w-full rounded-md h-9 text-xs font-semibold mt-4 border-emerald-600/30 hover:bg-emerald-50 dark:hover:bg-emerald-950/20">
                    <Link href="/chat">
                      <Bot className="h-3.5 w-3.5 mr-2 text-emerald-600" />
                      {l.intake2Action}
                      <ArrowRight className="h-3.5 w-3.5 ml-auto" />
                    </Link>
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* Ethiopian Cybercrime Statutory Reference Matrix (Clean Table Layout) */}
        <section className="py-12 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl space-y-6">

            <div className="space-y-1">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Scale className="h-4 w-4 text-emerald-700" />
                {l.legalSectionTitle}
              </h2>
              <p className="text-xs text-muted-foreground">
                {l.legalSectionDesc}
              </p>
            </div>

            {/* Structured Table */}
            <div className="border border-border rounded-lg overflow-hidden bg-card">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-muted/40 font-semibold text-foreground">
                      <th className="py-3 px-4 w-1/4">{l.colArticle}</th>
                      <th className="py-3 px-4 w-1/3">{l.colOffence}</th>
                      <th className="py-3 px-4 w-1/5">{l.colPenalty}</th>
                      <th className="py-3 px-4">{l.colEvidence}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {l.statutes.map((stat, idx) => (
                      <tr key={idx} className="hover:bg-muted/20 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-foreground">
                          <div>{stat.article}</div>
                          <div className="text-[11px] font-sans font-medium text-emerald-700 dark:text-emerald-400 mt-0.5">
                            {stat.title}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground leading-relaxed">
                          {stat.offence}
                        </td>
                        <td className="py-3 px-4 font-semibold text-rose-700 dark:text-rose-400">
                          {stat.penalty}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground text-[11px]">
                          {stat.evidence}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <Button asChild variant="outline" size="sm" className="rounded-md text-xs h-8">
                <Link href="/resources" className="gap-1.5">
                  <span>{l.btnViewAllResources}</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </div>

          </div>
        </section>

        {/* Forensic Custody Protocol (Horizontal / Structured Steps) */}
        <section className="py-12 bg-muted/20 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl space-y-6">

            <div className="space-y-1">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-700" />
                {l.protocolTitle}
              </h2>
              <p className="text-xs text-muted-foreground">
                {l.protocolDesc}
              </p>
            </div>

            {/* Protocol Steps Bar */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {l.protocolSteps.map((s) => (
                <div key={s.step} className="border border-border rounded-md bg-card p-4 space-y-2">
                  <div className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    PHASE {s.step}
                  </div>
                  <h3 className="font-bold text-sm text-foreground">
                    {s.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Direct Action Banner */}
        <section className="py-12 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <div className="border border-border rounded-lg bg-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <h2 className="text-lg sm:text-xl font-bold text-foreground">
                  {l.actionPrompt}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {l.actionDesc}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Button asChild className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-md h-9 px-4 text-xs font-semibold">
                  <Link href="/upload">
                    <Upload className="h-3.5 w-3.5 mr-2" />
                    {l.btnUploadEvidence}
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-md h-9 px-4 text-xs font-semibold">
                  <Link href="/chat">
                    <MessageSquare className="h-3.5 w-3.5 mr-2 text-blue-600" />
                    {l.btnTalkCounselor}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Institutional Legal Footer */}
      <footer className="py-8 bg-card text-xs text-muted-foreground border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-700" />
              <span className="font-bold text-foreground">SafeNet.ai</span>
              <span>— {l.footerAgency}</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <Link href="/upload" className="hover:text-foreground">{t.nav.upload}</Link>
              <Link href="/chat" className="hover:text-foreground">{l.footerCounselor}</Link>
              <Link href="/resources" className="hover:text-foreground">{t.nav.resources}</Link>
              <Link href="/admin" className="hover:text-foreground">Admin</Link>
            </div>
          </div>
          <p className="text-[11px] leading-relaxed text-muted-foreground border-t border-border/60 pt-3">
            {l.footerDisclaimer}
          </p>
        </div>
      </footer>
    </div>
  )
}
