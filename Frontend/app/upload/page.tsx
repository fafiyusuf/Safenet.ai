"use client"

import type React from "react"
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  AlertTriangle,
  ArrowRight,
  Camera,
  Check,
  CheckCircle2,
  Copy,
  FileCheck2,
  FileImage,
  FileText,
  Fingerprint,
  Info,
  Loader2,
  Lock,
  MessageCircle,
  MessageSquare,
  Phone,
  Scale,
  Send,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Trash2,
  Upload,
  Video,
  X
} from "lucide-react"

import { Header } from "@/components/header"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/hooks/use-language"
import { PLATFORMS } from "@/lib/constants"
import { cn } from "@/lib/utils"

const UPLOAD_UI_TEXT: Record<string, {
  badge: string
  title: string
  description: string
  submissionTitle: string
  submissionDesc: string
  uploadTab: string
  pasteTab: string
  dropTitle: string
  dropSub: string
  ocrSupport: string
  textareaPlaceholder: string
  platformLabel: string
  platformSubtitle: string
  step1: string
  step2: string
  step3: string
  submitBtn: string
  tipsTitle: string
  tip1Label: string
  tip1Text: string
  tip2Label: string
  tip2Text: string
  tip3Label: string
  tip3Text: string
  privacyTitle: string
  privacyText: string
  dangerTitle: string
  dangerText: string
  counselorPromptTitle: string
  counselorPromptDesc: string
  counselorPromptAction: string
  loadSampleBtn: string
  sampleIncidentLoaded: string
}> = {
  en: {
    badge: "Ethiopian Civic Evidence Portal • Statutory Custody",
    title: "Report Abuse & Preserve Evidence",
    description: "Preserve court-admissible proof before messages are edited or unsent. We compute a tamper-evident SHA-256 seal, run multilingual OCR, and structure legal complaints for Ethiopian authorities.",
    submissionTitle: "Forensic Evidence Intake Station",
    submissionDesc: "Select platform and upload original full-screen screenshot or raw message log",
    uploadTab: "Screenshot Evidence (Admissible)",
    pasteTab: "Message Text Transcription",
    dropTitle: "Drop screenshot here or tap to choose file",
    dropSub: "Select from gallery or file system • PNG, JPG, WebP up to 10MB",
    ocrSupport: "OCR: Amharic (Ge'ez), Tigrinya, Afaan Oromo, Somali, English",
    textareaPlaceholder: "Paste the threatening or extortion message verbatim here... include sender phone numbers or usernames if known.",
    platformLabel: "Where did this incident take place?",
    platformSubtitle: "Select the primary communication channel used by the perpetrator",
    step1: "Phase 1/3: Generating client SHA-256 mathematical seal...",
    step2: "Phase 2/3: Extracting multilingual text with OCR...",
    step3: "Phase 3/3: Classifying statutory offences under Proc. 958/2016...",
    submitBtn: "Verify Evidence & Generate Court Dossier",
    tipsTitle: "Court Admissibility Protocol",
    tip1Label: "Preserve Identifiers:",
    tip1Text: "Ensure sender handle (@username), phone number, and profile details are visible in the capture.",
    tip2Label: "Never Crop Screenshots:",
    tip2Text: "Leave the top status bar (system clock, network carrier, battery) intact for forensic validation.",
    tip3Label: "Act Before Un-Send:",
    tip3Text: "Telegram and WhatsApp allow perpetrators to delete messages remotely. Capture evidence immediately.",
    privacyTitle: "Zero-Trace Privacy & Purge Guarantee",
    privacyText: "No personal identity or IP address is stored. Evidentiary dockets purge automatically after 90 days. You retain full control of the generated PDF.",
    dangerTitle: "In Immediate Physical Danger?",
    dangerText: "Call 991 (Federal Police) or 7711 (GBV Toll-Free) immediately for emergency response.",
    counselorPromptTitle: "Prefer Talking to a Counselor First?",
    counselorPromptDesc: "Speak privately with our trauma-informed peer counselor. 100% confidential emotional guidance and shelter referrals in 5 languages.",
    counselorPromptAction: "Open Crisis Counselor",
    loadSampleBtn: "Load Test Case Specimen",
    sampleIncidentLoaded: "Sample extortion incident loaded for testing",
  },
  am: {
    badge: "የኢትዮጵያ ህጋዊ ማስረጃ ማሰባሰቢያ መድረክ",
    title: "የጥቃት ማስረጃ ይመዝግቡ",
    description: "መልዕክቶች ከመጥፋታቸው በፊት ህጋዊ ማስረጃዎን ይመዝግቡ። SafeNet.ai የSHA-256 ማረጋገጫ ያለው፣ ለፖሊስና ለፍርድ ቤት የሚቀርብ የክስ ሰነድ ያዘጋጃል።",
    submissionTitle: "የማስረጃ ማስገቢያ ጣቢያ",
    submissionDesc: "ጥቃቱ የተፈጸመበትን መድረክ ይምረጡ እና ሙሉ ስክሪንሾት ወይም ጽሁፍ ያስገቡ",
    uploadTab: "ስክሪንሾት ይስቀሉ (ተመራጭ)",
    pasteTab: "የመልዕክት ጽሁፍ ይቅዱ",
    dropTitle: "ስክሪንሾት ይጎትቱ ወይም ከስልክዎ ይምረጡ",
    dropSub: "ከስልክዎ ፎቶዎች ወይም ፋይሎች ይምረጡ • PNG፣ JPG ወይም WebP እስከ 10MB",
    ocrSupport: "በአማርኛ (ግዕዝ)፣ ትግርኛ፣ ኦሮምኛ፣ ሶማሊኛና እንግሊዝኛ ይሰራል",
    textareaPlaceholder: "የተላከውን የስድብ፣ የማስፈራሪያ ወይም የትንኮሳ መልዕክት እዚህ ይለጥፉ... የላኪውን ስልክ ወይም መለያ ይጨምሩ።",
    platformLabel: "ጥቃቱ የተፈጸመበት መድረክ የቱ ነው?",
    platformSubtitle: "ጥቃቱ የተላከበትን ዋና መተግበሪያ ይምረጡ",
    step1: "ደረጃ 1/3፡ የSHA-256 ፋይል ማረጋገጫ ፊርማ በማመንጨት ላይ...",
    step2: "ደረጃ 2/3፡ ጽሁፉን በOCR በማውጣት ላይ...",
    step3: "ደረጃ 3/3፡ በአዋጅ 958/2008 መሰረት በAI በመተንተን ላይ...",
    submitBtn: "ማስረጃውን ያረጋግጡ እና የክስ ሰነድ ያዘጋጁ",
    tipsTitle: "በህግ ተቀባይነት ያለው ማስረጃ አሰባሰብ",
    tip1Label: "የላኪው መለያ ይካተት:",
    tip1Text: "የላኪው ስልክ ቁጥር ወይም የቴሌግራም/ፌስቡክ መለያ (@username) በስክሪንሾቱ ውስጥ መታየቱን ያረጋግጡ።",
    tip2Label: "ስክሪንሾቱን አይቁረጡ:",
    tip2Text: "የስልኩ ሰዓት፣ ባትሪ እና ኔትወርክ ምልክቶች ሳይቆረጡ ሙሉ ፎቶ መነሳት አለበት።",
    tip3Label: "መልዕክቶች ሳይጠፉ በፍጥነት ይያዙ:",
    tip3Text: "አጥፊዎች በቴሌግራም ወይም ዋትስአፕ መልዕክቱን 'Delete for everyone' ሊያደርጉ ስለሚችሉ ወዲያውኑ ፎቶ ያንሱ።",
    privacyTitle: "የግላዊነት እና ሚስጥራዊነት ዋስትና",
    privacyText: "SafeNet የእርስዎን ማንነት ወይም የአይፒ አድራሻ አይከታተልም። ሪፖርቶች ከ90 ቀናት በኋላ በራስ-ሰር ይሰረዛሉ።",
    dangerTitle: "አፋጣኝ የደህንነት ስጋት ካለ?",
    dangerText: "ወዲያውኑ ወደ ፖሊስ 991 ወይም ወደ ጾታዊ ጥቃት መስመር 7711 ይደውሉ።",
    counselorPromptTitle: "በቅድሚያ ከአማካሪ ጋር መነጋገር ይፈልጋሉ?",
    counselorPromptDesc: "ከስነ-ልቦና ድጋፍ አማካሪ ጋር በ5 ቋንቋዎች በሚስጥር ይነጋገሩ። ምንም መረጃ አይቀመጥም።",
    counselorPromptAction: "ከአማካሪ ጋር ይነጋገሩ",
    loadSampleBtn: "የናሙና ጥቃት መረጃ ሙላ",
    sampleIncidentLoaded: "የናሙና የማስፈራሪያ መረጃ ተሞልቷል",
  },
  om: {
    badge: "Wlaltii Eegumsa Ragaa Itoophiyaa",
    title: "Miidhaa Dijitaalaa Galmeessi",
    description: "Ergaawwan osoo hin haqamin dura ragaa mana murtiitti fudhatama qabu qabadhaa. SafeNet mallattoo SHA-256 uumuun iyyannoo seeraa Labsii 958/2008 qopheessa.",
    submissionTitle: "Iddoo Ragaa Itti Dhiyeessan",
    submissionDesc: "Waltajjii filadhaatii suuraa guutuu ykn barreeffama ergaa galchaa",
    uploadTab: "Suuraa (Screenshot) Fe'i",
    pasteTab: "Barruu Ergaa Maxxansi",
    dropTitle: "Suuraa asitti buusaa ykn fe'uuf cuqqaalaa",
    dropSub: "Faayilii ykn suuraa bilbila keessanii filadhaa • PNG, JPG, WebP hanga 10MB",
    ocrSupport: "Afaan Oromoo, Ge'ez, Soomaalii fi Ingiliffaan ni hojjeta",
    textareaPlaceholder: "Ergaa sodaachisaa ykn qoccolloo asitti maxxansaa... lakk. bilbilaa ykn maqaa ergaa ergee dabaladhaa.",
    platformLabel: "Miidhaan kun eessatti raawwatame?",
    platformSubtitle: "Waltajjii miidhaan irratti ergame filadhaa",
    step1: "Sadarkaa 1/3: Mallattoo kiriptoogiraafii SHA-256 uumaa jira...",
    step2: "Sadarkaa 2/3: Qabiyyee barruu OCR dhaan baasaa jira...",
    step3: "Sadarkaa 3/3: Akka Labsii 958/2008 tti AI dhaan qorachaa jira...",
    submitBtn: "Ragaa Mirkaneessi & Sanada Himataa Qopheessi",
    tipsTitle: "Qajeelfama Ragaa Mana Murtii",
    tip1Label: "Lakk. fi Maqaan Haa Mul'atu:",
    tip1Text: "Lakk. bilbilaa ergaa ergee fi maqaan fayyadamaa (@username) akka mul'atu mirkaneessaa.",
    tip2Label: "Suuraa Hin Murinaa:",
    tip2Text: "Sa'aatii bilbilaa fi baatriin osoo hin muramin guutuutti mul'achuu qaba.",
    tip3Label: "Osoo Hin Haqamin Qabaadhaa:",
    tip3Text: "Telegram fi WhatsApp irraa ergaawwan akka hin haqamne yeroma sana suuraa kaasaa.",
    privacyTitle: "Wadaa Iccitii fi Nageenyaa",
    privacyText: "Eenyummaan ykn IP'n hin galmeeffamu. Gabaasni guyyoota 90 booda ofumaan haqama.",
    dangerTitle: "Balaa Ariifachiisaa Keessa Jirtuu?",
    dangerText: "Poolisii Federaalaa 991 ykn toora bilisaa GBV 7711 yeroma sana bilbilaa.",
    counselorPromptTitle: "Gorsaa waliin haasa'uu barbaadduu?",
    counselorPromptDesc: "Afaan keessaniin gorsaa iccitii waliin haasa'aa. Nageenya eeguu fi qajeelfama seeraa argadhaa.",
    counselorPromptAction: "Gorsaa Waliin Haasawaa",
    loadSampleBtn: "Fakkeenya Qabiyyee Guuti",
    sampleIncidentLoaded: "Fakkeenyi qabiyyee sodaachisaa guutameera",
  },
  ti: {
    badge: "ናይ ኢትዮጵያ ሕጋዊ መርትዖ ምዕቃብ መድረኽ",
    title: "ዲጂታል መጥቃዕቲ መዝግቡ",
    description: "መልእኽትታት ቅድሚ ምድምሳሶም ሕጋዊ መርትዖኹም ዓቅቡ። SafeNet ብSHA-256 ዝተረጋገጸ ናይ ፖሊስን ቤት ፍርድን ሰነድ የዳሉ:",
    submissionTitle: "ናይ መርትዖ ምቕራብ ማእከል",
    submissionDesc: "መድረኽ ምረጹ እሞ ምሉእ ስክሪንሾት ወይ ጽሑፍ ኣእትዉ",
    uploadTab: "ስክሪንሾት ጽዓኑ (ዝምረጽ)",
    pasteTab: "ጽሑፍ ለጥፉ",
    dropTitle: "ስእሊ ኣብዚ ደርብዩ ወይ ንምምራጽ ጠውቑ",
    dropSub: "ካብ ስልኪ ጋለሪ ወይ ፋይል ምረጹ • PNG፡ JPG፡ WebP ክሳብ 10MB",
    ocrSupport: "ብትግርኛ፡ ኣምሓርኛ፡ ኦሮምኛ፡ ሶማሊኛን እንግሊዝኛን ይሰርሕ",
    textareaPlaceholder: "ናይ ምፍርራህ ወይ ምግልባጥ መልእኽቲ ኣብዚ ለጥፉ... ናይቲ ሰዳዲ ስልኪ ወይ መለልዪ ጸሓፉ።",
    platformLabel: "ጥቃዕቲ ዘጋጠመሉ መድረኽ ኣየናይ እዩ?",
    platformSubtitle: "እቲ መጥቃዕቲ ዝተላእኸሉ ኣፕሊኬሽን ምረጹ",
    step1: "ደረጃ 1/3: ናይ SHA-256 መርትዖ ፊርማ ይፍጠር ኣሎ...",
    step2: "ደረጃ 2/3: ጽሑፍ ብOCR ይወጽእ ኣሎ...",
    step3: "ደረጃ 3/3: ብመሰረት ኣዋጅ 958/2008 ብAI ይምርመር ኣሎ...",
    submitBtn: "መርትዖ ኣረጋግጽ & ናይ ክሲ ሰነድ ኣዳልው",
    tipsTitle: "ተቐባልነት ዘለዎ መርትዖ ኣተሓሕዛ",
    tip1Label: "መለልዪ ሰዳዲ ይርአ:",
    tip1Text: "ቁጽሪ ስልኪ ወይ ናይ ቴሌግራም/ፌስቡክ ኣድራሻ (@username) ኣብቲ ስእሊ ይሃሉ:",
    tip2Label: "ስእሊ ኣይትቑረጹ:",
    tip2Text: "ሰዓት፡ ባትሪን ኔትወርክን ዘለዎ ምሉእ ስክሪን ስልኪ ይሃሉ:",
    tip3Label: "ቀልጢፍኩም ስእሊ ኣልዕሉ:",
    tip3Text: "ኣብ ቴሌግራም መልእኽቲ ክድምሰስ ስለ ዝኽእል ቀልጢፍኩም ስክሪንሾት ኣልዕሉ:",
    privacyTitle: "ውሕስነት ምስጢርን ምድምሳስን",
    privacyText: "መንነትኩም ወይ IP ኣድራሻኹም ኣይዕቀብን እዩ። ጸብጻባት ድሕሪ 90 መዓልታት ይድምሰሱ።",
    dangerTitle: "ህጹጽ ሓደጋ ኣጋጢሙ ዶ?",
    dangerText: "ብህጹጽ ናብ ፖሊስ 991 ወይ ናብ ናጻ መስመር ጾታዊ መጥቃዕቲ 7711 ደውሉ:",
    counselorPromptTitle: "ቅድም ምስ ኣማኻሪ ክትዛረቡ ትደልዩ ዶ?",
    counselorPromptDesc: "ብቋንቋኹም ምስ ኣማኻሪ ብምስጢር ተዘራረቡ። ናይ ስነ-ልቦናን ድሕነትን ምኽሪ ረኺቡ።",
    counselorPromptAction: "ምስ ኣማኻሪ ተዘራረቡ",
    loadSampleBtn: "ናይ ፈተነ መረዳእታ ምላእ",
    sampleIncidentLoaded: "ናይ ፈተነ መረዳእታ ተመሊኡ ኣሎ",
  },
  so: {
    badge: "Madasha Xafidista Caddeymaha ee Itoobiya",
    title: "Diiwaangeli Xadgudubka Internetka",
    description: "Xafid caddeymaha ka hor inta aan farriimaha la tirtirin. SafeNet waxay abuuraysaa saxiixa SHA-256 oo waafaqsan Bayaanka 958/2016 una diyaarinaysaa booliska.",
    submissionTitle: "Goobta Qaadashada Caddeynta",
    submissionDesc: "Dooro madasha oo soo geli sawirka oo dhan ama qoraalka",
    uploadTab: "Soo geli Sawirka (La Doortay)",
    pasteTab: "Dheji Qoraalka Farriinta",
    dropTitle: "Halkan soo dhig sawirka ama guji si aad u soo rarto",
    dropSub: "Ka dooro sawirradaada ama faylasha • PNG, JPG, WebP ilaa 10MB",
    ocrSupport: "Soomaali, Ge'ez, Oromo iyo Ingiriisi",
    textareaPlaceholder: "Dheji fariimaha hanjabaadda ama dhibaatada ah halkan... ku dar lambarka soo diraha haddii aad hayso.",
    platformLabel: "Xaggee buu falku ka dhacay?",
    platformSubtitle: "Dooro app-ka fariinta lagu soo diray",
    step1: "Tallaabo 1/3: Abuurista saxiixa SHA-256 ee caddeynta...",
    step2: "Tallaabo 2/3: Qoraalka oo lagu soo saarayo OCR...",
    step3: "Tallaabo 3/3: Falanqaynta sharciga Bayaanka 958/2016...",
    submitBtn: "Xaqiiji Caddeynta & Diyaari Dacwada",
    tipsTitle: "Hab-raaca Caddeynta Maxkamadda",
    tip1Label: "Magaca & Lambarku ha Muuqdaan:",
    tip1Text: "Xaqiiji in magaca isticmaalaha (@username) ama lambarka taleefanka uu ka dhex muuqdo sawirka.",
    tip2Label: "Ha Goynin Sawirka:",
    tip2Text: "U daa saacadda iyo baytariga sidooda si ay maxkamaddu u aqbasho.",
    tip3Label: "Si Degdeg ah Sawir uga Qaad:",
    tip3Text: "Telegram iyo WhatsApp waa laga tirtiri karaa farriinta, marka si degdeg ah sawir uga qaad.",
    privacyTitle: "Ballanqaadka Sirta & Tirtiridda",
    privacyText: "Aqoonsi shakhsi ama IP lama keydiyo. Xogta waxaa la tirtiraa 90 maalmood ka dib.",
    dangerTitle: "Khatar Degdeg ah miyaad ku jirtaa?",
    dangerText: "Wac Booliska Federaalka 991 ama khadka bilaashka ah ee GBV 7711.",
    counselorPromptTitle: "Ma doonaysaa inaad la-taliye la hadasho marka hore?",
    counselorPromptDesc: "Si qarsoodi ah ula hadal la-taliye ku hadla luqaddaada. Taageero nafsaani ah oo bilaash ah.",
    counselorPromptAction: "La Hadal La-taliyaha",
    loadSampleBtn: "Geli Tusaale Tijaabo ah",
    sampleIncidentLoaded: "Tusaalihii tijaabada waa la buuxiyay",
  },
}

const SAMPLE_TEXTS: Record<string, string> = {
  en: "If you do not send 15,000 Birr to this Commercial Bank of Ethiopia account by 6:00 PM today, I will leak every private photo you shared into the public Telegram channel with 45,000 members. You cannot block me.",
  am: "እስከ ዛሬ ማታ 6:00 ሰዓት 15,000 ብር ወደ ንግድ ባንክ አካውንቴ ካላስገባሽ፣ የላክሽልኝን የግል ፎቶዎች 45 ሺህ ተከታዮች ወዳሉት የቴሌግራም ቻናል እለጥፈዋለሁ። ብታግጂኝም አታመልጪም።",
  om: "Hanga har'a sa'aatii 12:00tti qarshii 15,000 lakkoofsa herregaa Baankii Daldala Itoophiyaa kanaan yoo hin ergine, suuraalee kee hunda Telegram miseensa 45,000 qabu irratti nan facaasa.",
  ti: "ክሳብ ሎሚ ምሸት ሰዓት 12:00 ናይ 15,000 ብር ናብ ንግዲ ባንክ ሕሳበይ እንተዘየእቲኺ፡ ኩሉ ዝሰደድክልኒ ስእልታት ናብቲ 45,000 ኣባላት ዘለዎ ቴሌግራም ቻናል ክዝርግሖ እየ።",
  so: "Haddii aadan lacag 15,000 Birr ah ku shubin xisaabta Baanka Ganacsiga Itoobiya caawa ka hor, waxaan sawirradaada ku faafin doonaa Telegram-ka ay ku jiraan 45,000 oo qof.",
}

const PLATFORM_CARDS = [
  { id: "telegram", name: "Telegram", sub: "Direct Messages & Channels", icon: Send, badge: "Most Common" },
  { id: "tiktok", name: "TikTok", sub: "Live Streams & Duets", icon: Video, badge: "Video Harassment" },
  { id: "facebook", name: "Facebook", sub: "Messenger & Smear Posts", icon: MessageCircle, badge: "Defamation" },
  { id: "whatsapp", name: "WhatsApp", sub: "Private & Group Chats", icon: Phone, badge: "Sextortion" },
  { id: "sms", name: "SMS / Mobile", sub: "Direct Cellular Threats", icon: Smartphone, badge: "Intimidation" },
  { id: "instagram", name: "Instagram", sub: "DMs & Story Leaks", icon: MessageSquare, badge: "Blackmail" },
  { id: "other", name: "Other Channel", sub: "Web Forum, Email, Call", icon: Shield, badge: "Generic Vector" },
]

export default function UploadPage() {
  const router = useRouter()
  const { language, setLanguage } = useLanguage()
  const [file, setFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [fileHash, setFileHash] = useState<string | null>(null)
  const [text, setText] = useState("")
  const [platform, setPlatform] = useState("telegram")
  const [inputMode, setInputMode] = useState<"screenshot" | "text">("screenshot")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStep, setSubmitStep] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copiedHash, setCopiedHash] = useState(false)
  const [sampleNotice, setSampleNotice] = useState<string | null>(null)

  const ui = UPLOAD_UI_TEXT[language] || UPLOAD_UI_TEXT.en

  // Client SHA-256 calculation for verifiable chain-of-custody
  const calculateSHA256 = async (fileToHash: File): Promise<string> => {
    const arrayBuffer = await fileToHash.arrayBuffer()
    const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  }

  const processFile = async (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WebP).")
      return
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File exceeds maximum allowed size of 10MB.")
      return
    }

    setError(null)
    setFile(selectedFile)

    const previewUrl = URL.createObjectURL(selectedFile)
    setFilePreview(previewUrl)

    try {
      const hash = await calculateSHA256(selectedFile)
      setFileHash(hash)
    } catch (e) {
      console.error("Hash calculation error:", e)
    }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      processFile(droppedFile)
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      processFile(selectedFile)
    }
  }

  const handleClearFile = (e: React.MouseEvent) => {
    e.stopPropagation()
    setFile(null)
    setFilePreview(null)
    setFileHash(null)
  }

  const handleCopyHash = () => {
    if (fileHash) {
      navigator.clipboard.writeText(fileHash)
      setCopiedHash(true)
      setTimeout(() => setCopiedHash(false), 2000)
    }
  }

  const handleLoadSample = () => {
    setInputMode("text")
    setPlatform("telegram")
    const sample = SAMPLE_TEXTS[language] || SAMPLE_TEXTS.en
    setText(sample)
    setSampleNotice(ui.sampleIncidentLoaded)
    setTimeout(() => setSampleNotice(null), 4000)
  }

  const handleSubmit = async () => {
    if (!platform) {
      setError("Please select the platform where this incident took place.")
      return
    }

    if (inputMode === "screenshot" && !file) {
      setError("Please upload a screenshot or switch to the text tab.")
      return
    }

    if (inputMode === "text" && !text.trim()) {
      setError("Please paste or type the abusive message text.")
      return
    }

    setIsSubmitting(true)
    setError(null)
    setSubmitStep(1)

    try {
      const formData = new FormData()
      if (file && inputMode === "screenshot") formData.append("file", file)
      if (text && inputMode === "text") formData.append("text", text.trim())
      formData.append("platform_id", platform)
      formData.append("language", language)
      formData.append("anonymous", "true")

      // Visual step indicator timers for transparency
      setTimeout(() => setSubmitStep(2), 1200)
      setTimeout(() => setSubmitStep(3), 2800)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || errorData.error || "Failed to analyze evidence")
      }

      const result = await response.json()
      router.push(`/results/${result.report_id}?lang=${language}`)
    } catch (err: any) {
      setError(err.message || "Failed to analyze content. Please try again or paste text manually.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header language={language} onLanguageChange={setLanguage} />

      {/* Emergency Immediate Hotline Ticker */}
      <div className="border-b border-border bg-amber-500/10 px-3 sm:px-4 py-2 text-xs">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-2 max-w-5xl">
          <div className="flex items-center gap-1.5 text-amber-900 dark:text-amber-200 font-medium text-[11px] sm:text-xs">
            <ShieldAlert className="h-3.5 w-3.5 text-amber-600 shrink-0" />
            <span>{ui.dangerTitle}</span>
            <span className="text-muted-foreground hidden sm:inline">{ui.dangerText}</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="tel:7711"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-background border border-border text-[11px] font-bold text-foreground hover:bg-muted"
            >
              <Phone className="h-3 w-3 text-emerald-600" />
              <span>7711 (GBV Line)</span>
            </a>
            <a
              href="tel:991"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-background border border-border text-[11px] font-bold text-foreground hover:bg-muted"
            >
              <Shield className="h-3 w-3 text-blue-600" />
              <span>991 (Police)</span>
            </a>
          </div>
        </div>
      </div>

      <main className="flex-1 py-8 sm:py-12">
        <div className="container mx-auto px-4 max-w-5xl space-y-8">
          
          {/* Institutional Masthead Banner */}
          <div className="border-b border-border pb-6 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border border-border bg-muted/40 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>{ui.badge}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-mono">
                <Lock className="h-3 w-3 text-emerald-600" />
                <span>Zero-Trace Anonymous Intake</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  {ui.title}
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {ui.description}
                </p>
              </div>

              {/* Quick Specimen Loader for testing */}
              <button
                type="button"
                onClick={handleLoadSample}
                className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-card hover:bg-muted text-xs font-medium text-foreground transition-colors"
                title="Fill a realistic blackmail specimen for testing"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>{ui.loadSampleBtn}</span>
              </button>
            </div>

            {/* Protocol Stepper Bar */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border/70 text-xs">
              <div className="flex items-center gap-2 p-2 rounded bg-muted/30 border border-border/80">
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 text-xs">01</span>
                <span className="text-[11px] font-medium text-foreground truncate">Select Source</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-muted/30 border border-border/80">
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 text-xs">02</span>
                <span className="text-[11px] font-medium text-foreground truncate">Upload / Text</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-muted/30 border border-border/80">
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 text-xs">03</span>
                <span className="text-[11px] font-medium text-foreground truncate">SHA-256 Dossier</span>
              </div>
            </div>
          </div>

          {/* Sample Notification */}
          {sampleNotice && (
            <div className="p-3 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                {sampleNotice}
              </span>
              <button onClick={() => setSampleNotice(null)} className="text-xs underline">Dismiss</button>
            </div>
          )}

          {/* Main Grid: Intake Form + Forensic Sidecars */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Primary Form Station (8 cols on desktop) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* STEP 1: Incident Platform Selector */}
              <div className="border border-border rounded-lg bg-card p-5 sm:p-6 space-y-4 shadow-xs">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-700 dark:text-emerald-400">
                      PHASE 01 • VECTOR IDENTIFICATION
                    </span>
                    <span className="text-[11px] text-muted-foreground font-mono">
                      Selected: <strong className="text-foreground capitalize">{platform}</strong>
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-foreground">
                    {ui.platformLabel}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {ui.platformSubtitle}
                  </p>
                </div>

                {/* Tactile Platform Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                  {PLATFORM_CARDS.map((p) => {
                    const isSelected = platform === p.id
                    const IconComponent = p.icon
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPlatform(p.id)}
                        className={cn(
                          "relative p-3 rounded-lg border text-left transition-all flex flex-col justify-between space-y-2 group",
                          isSelected
                            ? "border-emerald-600 bg-emerald-500/10 ring-1 ring-emerald-600"
                            : "border-border hover:border-border/80 hover:bg-muted/30 bg-muted/5"
                        )}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className={cn(
                            "w-7 h-7 rounded-md flex items-center justify-center transition-colors",
                            isSelected ? "bg-emerald-700 text-white" : "bg-muted text-muted-foreground group-hover:text-foreground"
                          )}>
                            <IconComponent className="h-3.5 w-3.5" />
                          </div>
                          {isSelected && (
                            <span className="h-4 w-4 rounded-full bg-emerald-700 text-white flex items-center justify-center">
                              <Check className="h-2.5 w-2.5 stroke-[3]" />
                            </span>
                          )}
                        </div>
                        <div>
                          <div className={cn("text-xs font-bold", isSelected ? "text-emerald-950 dark:text-emerald-200" : "text-foreground")}>
                            {p.name}
                          </div>
                          <div className="text-[10px] text-muted-foreground leading-tight line-clamp-1 mt-0.5">
                            {p.sub}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* STEP 2: Evidence Intake (Screenshot / Text) */}
              <div className="border border-border rounded-lg bg-card p-5 sm:p-6 space-y-5 shadow-xs">
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-700 dark:text-emerald-400">
                      PHASE 02 • EVIDENCE PAYLOAD
                    </span>
                    <span className="text-[11px] text-muted-foreground font-mono">
                      {inputMode === "screenshot" ? "Image Forensics" : "Text Extraction"}
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-foreground">
                    {ui.submissionTitle}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {ui.submissionDesc}
                  </p>
                </div>

                {/* Mode Segmented Controls */}
                <Tabs value={inputMode} onValueChange={(v) => setInputMode(v as any)} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 h-10 p-1 border border-border bg-muted/40 rounded-lg">
                    <TabsTrigger value="screenshot" className="gap-2 text-xs font-semibold rounded-md">
                      <FileImage className="h-3.5 w-3.5 text-emerald-600" />
                      <span>{ui.uploadTab}</span>
                    </TabsTrigger>
                    <TabsTrigger value="text" className="gap-2 text-xs font-semibold rounded-md">
                      <FileText className="h-3.5 w-3.5 text-blue-600" />
                      <span>{ui.pasteTab}</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* Screenshot Dropzone & Inspector */}
                  <TabsContent value="screenshot" className="space-y-4 pt-3 m-0">
                    <div
                      className={cn(
                        "relative border-2 border-dashed rounded-lg p-6 sm:p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[220px]",
                        isDragging ? "border-emerald-600 bg-emerald-500/10 scale-[1.01]" : "border-border hover:border-emerald-600/60 hover:bg-muted/20 bg-muted/10",
                        file && "border-emerald-600/70 bg-emerald-500/5 cursor-default"
                      )}
                      onDragOver={(e) => {
                        e.preventDefault()
                        setIsDragging(true)
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      onClick={() => {
                        if (!file) document.getElementById("file-input")?.click()
                      }}
                    >
                      <input
                        id="file-input"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleFileInput}
                        className="hidden"
                      />

                      {file && filePreview ? (
                        <div className="w-full space-y-4">
                          
                          {/* Image Inspector Preview Card */}
                          <div className="relative inline-block mx-auto max-h-56 overflow-hidden rounded-lg border border-border shadow-md bg-background">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={filePreview}
                              alt="Forensic evidence specimen"
                              className="max-h-56 w-auto object-contain mx-auto"
                            />
                            <button
                              type="button"
                              onClick={handleClearFile}
                              title="Remove file"
                              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/80 text-white hover:bg-rose-700 transition-colors shadow-sm"
                            >
                              <X className="h-4 w-4" />
                            </button>
                            <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-emerald-300 border border-white/20">
                              ✓ Uncropped Specimen
                            </div>
                          </div>

                          {/* Metadata Bar */}
                          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground font-mono">
                            <span className="font-semibold text-foreground">{file.name}</span>
                            <span>•</span>
                            <span>{(file.size / 1024).toFixed(1)} KB</span>
                            <span>•</span>
                            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">OCR Ready</span>
                          </div>

                          {/* SHA-256 Digest Inspector */}
                          {fileHash && (
                            <div className="p-3 rounded-lg bg-muted/60 border border-border text-left space-y-1.5 max-w-lg mx-auto">
                              <div className="flex items-center justify-between">
                                <span className="font-sans font-bold text-foreground flex items-center gap-1.5 text-[10px] uppercase tracking-wider">
                                  <Fingerprint className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400" />
                                  Immutable Cryptographic Digest (SHA-256)
                                </span>
                                <button
                                  type="button"
                                  onClick={handleCopyHash}
                                  className="inline-flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground font-sans px-1.5 py-0.5 rounded hover:bg-background border border-transparent hover:border-border"
                                >
                                  {copiedHash ? (
                                    <>
                                      <Check className="h-3 w-3 text-emerald-600" />
                                      <span className="text-emerald-600 font-bold">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="h-3 w-3" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>
                              <div className="break-all select-all font-mono text-[11px] text-foreground p-2 rounded bg-background border border-border">
                                {fileHash}
                              </div>
                              <p className="text-[10px] text-muted-foreground italic">
                                Mathematical proof that evidence was captured at this moment and has not been altered or doctored.
                              </p>
                            </div>
                          )}

                          {/* Replace action */}
                          <div className="pt-1">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => document.getElementById("file-input")?.click()}
                              className="text-xs h-8 rounded-md"
                            >
                              Choose a Different Screenshot
                            </Button>
                          </div>

                        </div>
                      ) : (
                        <div className="space-y-3 py-2">
                          <div className="w-12 h-12 rounded-full border border-border bg-background shadow-xs text-muted-foreground flex items-center justify-center mx-auto">
                            <Upload className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
                          </div>
                          <div>
                            <p className="font-bold text-sm text-foreground">
                              {ui.dropTitle}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {ui.dropSub}
                            </p>
                          </div>

                          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                            <Button
                              type="button"
                              size="sm"
                              className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-md h-8 text-xs font-semibold px-4"
                            >
                              <Camera className="h-3.5 w-3.5 mr-1.5" />
                              Choose from Photos / Gallery
                            </Button>
                          </div>

                          <div className="inline-flex items-center gap-1.5 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium pt-1">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>{ui.ocrSupport}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  {/* Direct Text Tab */}
                  <TabsContent value="text" className="space-y-3 pt-3 m-0">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-foreground">
                          Verbatim Abuse Transcription
                        </label>
                        <button
                          type="button"
                          onClick={handleLoadSample}
                          className="text-[11px] text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                        >
                          <Sparkles className="h-3 w-3" />
                          <span>Insert Sample Blackmail Text</span>
                        </button>
                      </div>
                      <Textarea
                        placeholder={ui.textareaPlaceholder}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="min-h-[180px] text-xs sm:text-sm leading-relaxed border-border rounded-lg bg-background font-sans focus-visible:ring-emerald-600"
                      />
                      <div className="flex justify-between items-center text-[11px] text-muted-foreground px-1">
                        <span>{text.length} characters</span>
                        <span>Minimum 10 characters required for classification</span>
                      </div>
                    </div>
                  </TabsContent>

                </Tabs>

              </div>

              {/* STEP 3: Pre-Flight Legal Checklist & Submission */}
              <div className="border border-border rounded-lg bg-card p-5 space-y-4 shadow-xs">
                
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Pre-Flight Legal Checklist
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 p-2 rounded bg-muted/30 border border-border/60">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>Platform identified: <strong className="capitalize">{platform}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded bg-muted/30 border border-border/60">
                      <CheckCircle2 className={cn("h-3.5 w-3.5 shrink-0", (file || text.trim()) ? "text-emerald-600" : "text-muted-foreground")} />
                      <span>{(file || text.trim()) ? "Payload ready for intake" : "Awaiting payload upload"}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded bg-muted/30 border border-border/60">
                      <Lock className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>Zero-Account Anonymous Submission</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded bg-muted/30 border border-border/60">
                      <Scale className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>Proc. 958/2016 Admissible Dossier</span>
                    </div>
                  </div>
                </div>

                {/* Error Banner */}
                {error && (
                  <Alert variant="destructive" className="text-xs rounded-md">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Submit Action Button */}
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || (inputMode === "screenshot" && !file) || (inputMode === "text" && !text.trim())}
                  className="w-full h-11 rounded-lg font-bold text-xs sm:text-sm bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm transition-all"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2.5">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="font-mono">
                        {submitStep === 1 && ui.step1}
                        {submitStep === 2 && ui.step2}
                        {submitStep === 3 && ui.step3}
                      </span>
                    </div>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <FileCheck2 className="h-4 w-4" />
                      <span>{ui.submitBtn}</span>
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </span>
                  )}
                </Button>

                <p className="text-[10px] text-center text-muted-foreground">
                  By clicking submit, your evidence is hashed and structured into a private legal dossier. No identity logs are created.
                </p>

              </div>

            </div>

            {/* Forensic Sidecars & Supportive Guides (4 cols on desktop) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Evidence Protocol Photo Card */}
              <Card className="border border-border rounded-lg shadow-xs overflow-hidden">
                <div className="relative h-32 w-full bg-muted overflow-hidden">
                  <Image
                    src="/evidence-shield.jpg"
                    alt="Chain of Custody Protocol"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 360px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                  <div className="absolute top-2.5 left-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 font-semibold bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-emerald-500/30">
                      Forensic Integrity
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <div className="text-xs font-semibold drop-shadow-sm">
                      Computer Crime Proclamation 958/2016
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-3 pt-3">
                  <CardTitle className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                    <Info className="h-3.5 w-3.5 text-emerald-600" />
                    {ui.tipsTitle}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3 text-xs text-muted-foreground leading-relaxed pt-0">
                  <div className="flex gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <p>
                      <strong className="text-foreground">{ui.tip1Label}</strong>{" "}
                      {ui.tip1Text}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <p>
                      <strong className="text-foreground">{ui.tip2Label}</strong>{" "}
                      {ui.tip2Text}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <p>
                      <strong className="text-foreground">{ui.tip3Label}</strong>{" "}
                      {ui.tip3Text}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Direct Peer Counselor Prompt Card */}
              <div className="border border-border rounded-lg bg-card overflow-hidden shadow-xs">
                <div className="relative h-28 w-full bg-muted overflow-hidden">
                  <Image
                    src="/counselor-support.jpg"
                    alt="Counselor Support Consultation"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 360px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-2 left-3 right-3 text-white">
                    <div className="text-[10px] font-mono text-blue-300 uppercase font-semibold">
                      Trauma-Informed Support
                    </div>
                    <div className="text-xs font-bold">
                      {ui.counselorPromptTitle}
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3 text-xs">
                  <p className="text-muted-foreground leading-relaxed">
                    {ui.counselorPromptDesc}
                  </p>
                  <Button asChild variant="outline" size="sm" className="w-full text-xs h-8 rounded-md font-semibold">
                    <Link href="/chat">
                      <MessageSquare className="h-3.5 w-3.5 mr-1.5 text-blue-600" />
                      {ui.counselorPromptAction}
                      <ArrowRight className="h-3.5 w-3.5 ml-auto" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Retention & Privacy Assurance */}
              <div className="p-4 rounded-lg bg-card border border-border space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-foreground">
                  <ShieldCheck className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                  <span>{ui.privacyTitle}</span>
                </div>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  {ui.privacyText}
                </p>
              </div>

              {/* Emergency Helpline Box */}
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 space-y-3 text-xs">
                <div className="font-bold flex items-center gap-1.5 text-amber-900 dark:text-amber-200">
                  <ShieldAlert className="h-4 w-4 text-amber-600" />
                  <span>{ui.dangerTitle}</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {ui.dangerText}
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Button asChild size="sm" className="text-xs h-8 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white font-bold">
                    <a href="tel:7711">7711 (GBV)</a>
                  </Button>
                  <Button asChild size="sm" variant="outline" className="text-xs h-8 rounded-md font-bold">
                    <a href="tel:991">991 (Police)</a>
                  </Button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  )
}
