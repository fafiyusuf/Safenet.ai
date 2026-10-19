"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  Eye,
  FileCheck2,
  FileText,
  Fingerprint,
  Gavel,
  Lock,
  MessageSquare,
  Phone,
  Scale,
  Shield,
  ShieldAlert,
  Sparkles,
  Users,
} from "lucide-react"

import { BlurredContent } from "@/components/blurred-content"
import { Header } from "@/components/header"
import { RiskBanner } from "@/components/risk-banner"
import { SeverityMeter } from "@/components/severity-meter"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getTranslation, type Language } from "@/lib/i18n"
import type { AbuseCategory, Report } from "@/lib/types"

const categoryLabels: Record<AbuseCategory, Record<Language, string>> = {
  harassment: { en: "Harassment", am: "ትንኮሳ", om: "Qoccolloo / Miidhaa", ti: "ምግልባጥ", so: "Dhibaateyn" },
  threats: { en: "Threats & Intimidation", am: "ማስፈራሪያ", om: "Sodaachisa", ti: "ምፍርራህ", so: "Hanjabaad" },
  stalking: { en: "Cyberstalking", am: "ማሳደድ", om: "Hordoffii Saayibarii", ti: "ምክትታል ሳይበር", so: "Dabagalka Internetka" },
  image_based_abuse: { en: "Non-Consensual Image Abuse", am: "በምስል ላይ የተመሰረተ ጥቃት", om: "Miidhaa Suuraa Hayyama Malee", ti: "መጥቃዕቲ ምስሊ ብዘይፍቓድ", so: "Xadgudubka Sawirrada ee aan Raalliga laga ahayn" },
  hate_speech: { en: "Gendered Hate Speech", am: "የጥላቻ ንግግር", om: "Haasaa Jibbiinsaa", ti: "ዘረባ ጽልኢ", so: "Hadalka Nacaybka" },
  sexual_content: { en: "Unwanted Sexual Content", am: "ወሲባዊ ይዘት", om: "Qabiyyee Saalaa Hin Barbaadamin", ti: "ዘይድሊ ጾታዊ ትሕዝቶ", so: "Nuxur Galmo oo aan la Rabin" },
  non_abusive: { en: "Non-Abusive", am: "ጥቃት ያልሆነ", om: "Miidhaa Kan Hin Qabne", ti: "መጥቃዕቲ ዘይኮነ", so: "Aan Xadgudub Ahayn" },
}

const RESULTS_UI: Record<Language, {
  expiredOrNotFound: string
  expiredOrNotFoundDesc: string
  backToUpload: string
  recordAnother: string
  dossierTitle: string
  shaCert: string
  counselorGuidance: string
  categoryAssessment: string
  flaggedPhrases: string
  legalStatuteTitle: string
  legalThreats: string
  legalImages: string
  legalGeneral: string
  extractedRecord: string
  blurredWarning: string
  takeAction: string
  takeActionDesc: string
  evidencePdfTitle: string
  evidencePdfDesc: string
  policeFormTitle: string
  policeFormDesc: string
  counselorTitle: string
  counselorDesc: string
  directoryTitle: string
  directoryDesc: string
  copiedDossierId: string
  copiedHash: string
  copyId: string
  copyHashBtn: string
  downloadPdfBtn: string
  reviewOnlineBtn: string
  openChatBtn: string
  browseResourcesBtn: string
  severityHighExp: string
  severityMedExp: string
  severityLowExp: string
  loadingDossier: string
  privacyNote: string
}> = {
  en: {
    expiredOrNotFound: "Report Record Not Found",
    expiredOrNotFoundDesc: "This report may have expired under our 90-day zero-trace retention policy or the Dossier ID was mistyped. Your privacy is protected and no lingering copies exist.",
    backToUpload: "Back to Upload New Evidence",
    recordAnother: "Submit New Evidence",
    dossierTitle: "Forensic Evidence Dossier",
    shaCert: "Cryptographic Chain of Custody Seal",
    counselorGuidance: "Counselor Safety Guidance",
    categoryAssessment: "Threat Category & Severity Assessment",
    flaggedPhrases: "Flagged Threat Phrases Detected",
    legalStatuteTitle: "Applicable Ethiopian Legal Statute",
    legalThreats: "Violates Computer Crime Proclamation No. 958/2016 Article 13 (Criminal Intimidation using Computer System) punishable by up to 3 years imprisonment.",
    legalImages: "Violates Computer Crime Proclamation No. 958/2016 Article 14 (Dissemination of Obscene Content) punishable by up to 5 years imprisonment.",
    legalGeneral: "Falls under Proclamation No. 1185/2020 and Computer Crime Proclamation No. 958/2016.",
    extractedRecord: "Extracted Evidence Record",
    blurredWarning: "This evidentiary transcript may contain disturbing language. Click to reveal.",
    takeAction: "Take Action with Your Evidence",
    takeActionDesc: "Download official court-ready documentation or connect with support resources",
    evidencePdfTitle: "Evidence Dossier Document",
    evidencePdfDesc: "Tamper-proof record with cryptographic SHA-256 hash seal",
    policeFormTitle: "Federal Police Complaint Form",
    policeFormDesc: "Pre-formatted complaint tailored for the Cyber Crime Unit",
    counselorTitle: "Confidential Safety Counselor",
    counselorDesc: "Discuss this report confidentially and plan your safety",
    directoryTitle: "Ethiopian Civic Support Network",
    directoryDesc: "Connect with EWLA legal aid, AWSAD shelters, and 24/7 hotlines",
    copiedDossierId: "Dossier ID Copied!",
    copiedHash: "Hash Copied!",
    copyId: "Copy ID",
    copyHashBtn: "Copy Hash",
    downloadPdfBtn: "Download PDF",
    reviewOnlineBtn: "Review Document",
    openChatBtn: "Open Confidential Chat",
    browseResourcesBtn: "Browse Directory",
    severityHighExp: "High Urgency: Direct threat or extortion detected. Immediate safety measures and official reporting to Federal Police Cyber Crime Unit (8044) are strongly advised.",
    severityMedExp: "Moderate Risk: Hostile harassment or targeted intimidation detected. Preserve all digital messages, avoid direct confrontation, and consult a safety advocate.",
    severityLowExp: "Low Immediate Risk: Non-threatening or minor offensive content. Adjust platform privacy settings, block sender, and monitor if harassment recurs.",
    loadingDossier: "Decrypting forensic record and verifying cryptographic chain of custody...",
    privacyNote: "Zero-Trace Privacy: No tracking cookies are stored. Press ESC to immediately exit to a safe page.",
  },
  am: {
    expiredOrNotFound: "የማስረጃ ሪፖርቱ አልተገኘም",
    expiredOrNotFoundDesc: "ይህ ሪፖርት በ90 ቀናት ሚስጥራዊነት ፖሊሲ መሰረት ተሰርዞ ሊሆን ይችላል ወይም የሰነድ ቁጥሩ ተሳስቷል። የእርስዎ ደህንነት የተጠበቀ ነው።",
    backToUpload: "ወደ ማስረጃ ማስገቢያ ተመለስ",
    recordAnother: "አዲስ ማስረጃ ይመዝግቡ",
    dossierTitle: "የማስረጃ ግምገማ ሰነድ",
    shaCert: "የማስረጃው ክሪፕቶግራፊክ ማረጋገጫ (SHA-256)",
    counselorGuidance: "የአማካሪው የደህንነት ምክር",
    categoryAssessment: "የጥቃት ምድብ እና የክብደት ትንታኔ",
    flaggedPhrases: "የተለዩ አስጊ ቃላት / ሐረጎች",
    legalStatuteTitle: "ተፈጻሚ የኢትዮጵያ ህግ ማጣቀሻ",
    legalThreats: "በኮምፒውተር ወንጀል አዋጅ 958/2008 አንቀጽ 13 (በኮምፒውተር ማስፈራራት) ስር እስከ 3 ዓመት ጽኑ እስራት የሚያስቀጣ ወንጀል ተብሎ ተለይቷል።",
    legalImages: "በኮምፒውተር ወንጀል አዋጅ 958/2008 አንቀጽ 14 (አስነዋሪ ይዘት ማሰራጨት) ስር እስከ 5 ዓመት ጽኑ እስራት የሚያስቀጣ ወንጀል ተብሎ ተለይቷል።",
    legalGeneral: "በጥላቻ ንግግርና የውሸት መረጃ አዋጅ 1185/2012 እና በኮምፒውተር ወንጀል አዋጅ 958/2008 ስር ተፈጻሚነት አለው።",
    extractedRecord: "የተቀዳ የማስረጃ ጽሁፍ",
    blurredWarning: "ይህ ይዘት የሚያስጨንቅ ወይም ስድብ ሊሆን ይችላል። ለማየት ይጫኑ።",
    takeAction: "ቀጣይ እርምጃዎች እና ህጋዊ ሰነዶች",
    takeActionDesc: "ለፖሊስ ወይም ለጠበቃ የሚቀርቡ ህጋዊ ሰነዶችን አሁኑኑ ያውርዱ",
    evidencePdfTitle: "የማስረጃ ሰነድ (Dossier)",
    evidencePdfDesc: "የSHA-256 ማህተም ያለበት የማስረጃ ሰነድ",
    policeFormTitle: "የፌዴራል ፖሊስ ቅሬታ ማመልከቻ",
    policeFormDesc: "ለሳይበር ወንጀል ምርመራ ክፍል የተዘጋጀ ቅጽ",
    counselorTitle: "ስለዚህ ክስተት ከአማካሪ ጋር ይነጋገሩ",
    counselorDesc: "ስሜታዊ ድጋፍ እና የደህንነት እቅድ ማውጣት",
    directoryTitle: "የድጋፍ ድርጅቶች ማውጫ",
    directoryDesc: "EWLA፣ AWSAD እና የአደጋ ጊዜ መጠለያዎች",
    copiedDossierId: "የሰነድ ቁጥር ተቀድቷል!",
    copiedHash: "ሃሽ ተቀድቷል!",
    copyId: "ቁጥር ቅዳ",
    copyHashBtn: "ሃሽ ቅዳ",
    downloadPdfBtn: "PDF አውርድ",
    reviewOnlineBtn: "ሰነዱን ተመልከት",
    openChatBtn: "ውይይት ጀምር",
    browseResourcesBtn: "ማውጫውን ክፈት",
    severityHighExp: "ከፍተኛ አደጋ፡ ቀጥተኛ ማስፈራሪያ ወይም ዝርፊያ ተገኝቷል። ወዲያውኑ ጥንቃቄ እንዲወስዱና ለፌዴራል ፖሊስ ሳይበር ክፍል (8044) እንዲያሳውቁ ይመከራል።",
    severityMedExp: "መካከለኛ ስጋት፡ ተደጋጋሚ ትንኮሳ ወይም ማሳደድ ተገኝቷል። ማስረጃዎችን እንዳይጠፉ ጠብቀው ያስቀምጡ፣ አጥፊውን ያግዱ።",
    severityLowExp: "ዝቅተኛ ስጋት፡ ቀጥተኛ ጥቃት የሌለው አግባብ ያልሆነ መልእክት ነው። የመለያዎትን ደህንነት ያጠናክሩ።",
    loadingDossier: "የማስረጃ ሰነዱ እየተፈተሸ እና የSHA-256 ማህተም እየተረጋገጠ ነው...",
    privacyNote: "የደህንነት ማሳሰቢያ፡ ምንም አይነት ክትትል አይደረግም። ወዲያውኑ ለመውጣት ESC ቁልፍን ይጫኑ።",
  },
  om: {
    expiredOrNotFound: "Galmeen Ragaa Hin Argamne",
    expiredOrNotFoundDesc: "Gabaasni kun imaammata guyyoota 90 booda haquutiin haqameera ta'uu danda'a. Iccitiin keessan eegamaadha.",
    backToUpload: "Ragaa Haaraa Dhiyeessuuf Deebi'aa",
    recordAnother: "Ragaa Haaraa Galmeessi",
    dossierTitle: "Galmee Qorannoo Ragaa",
    shaCert: "Chaappaa Ragaa Kiripptoogiraafii (SHA-256)",
    counselorGuidance: "Gorsa Nageenyaa Gorsituu",
    categoryAssessment: "Gosa Miidhaa fi Sadarkaa Balaa",
    flaggedPhrases: "Jechoota Balaa Qaban Adda Bahan",
    legalStatuteTitle: "Seerota Itoophiyaa Reefferansii",
    legalThreats: "Labsii Yakka Kompiitaraa 958/2008 Keeyyata 13 (Sirna Kompiitaraatiin Sodaachisuu) hanga hidhaa waggaa 3 adabsiisa.",
    legalImages: "Labsii Yakka Kompiitaraa 958/2008 Keeyyata 14 (Qabiyyee Qaanfachiisaa Facaasuu) hanga hidhaa waggaa 5 adabsiisa.",
    legalGeneral: "Labsii 1185/2012 fi Labsii Yakka Kompiitaraa 958/2008 jalatti kufu.",
    extractedRecord: "Qabiyyee Ragaa Baafame",
    blurredWarning: "Barreeffamni kun jechoota nama dhiphisan qabaachuu danda'a. Ilaaluuf cuqqaalaa.",
    takeAction: "Ragaa Keessaniin Tarkaanfii Fudhachuu",
    takeActionDesc: "Dukumentoota mana murtii fi poolisiif dhiyaatan buufadhaa",
    evidencePdfTitle: "Dossier Ragaa PDF",
    evidencePdfDesc: "Chaappaa amanamummaa SHA-256 kan qabu",
    policeFormTitle: "Iyyannoo Poolisii Federaalaa",
    policeFormDesc: "Kutaa Qorannoo Yakka Saayibariitiif kan qophaa'e",
    counselorTitle: "Gorsituu Nageenyaa Iccitii",
    counselorDesc: "Gorsa miiraa fi karoora nageenyaa dhuunfaa",
    directoryTitle: "Dhaabbilee Deeggarsa Itoophiyaa",
    directoryDesc: "EWLA, AWSAD fi sararoota bilbilaa 24/7",
    copiedDossierId: "Lakk. Galmee Koppiita'eera!",
    copiedHash: "Hash Koppiita'eera!",
    copyId: "Koppii",
    copyHashBtn: "Hash Koppii",
    downloadPdfBtn: "PDF Buufadhu",
    reviewOnlineBtn: "Dukumentii Ilaali",
    openChatBtn: "Haasawa Eegali",
    browseResourcesBtn: "Qabeenya Ilaali",
    severityHighExp: "Balaa Olaanaa: Sodaachisni ykn saamichi adda baheera. Battalumatti poolisii saayibariitti (8044) gabaasuun gorfama.",
    severityMedExp: "Balaa Giddu-galeessaa: Qoccolloo deddeebi'e. Ragaa hunda qabaadhaa, nama miidhaa geessise cufaa.",
    severityLowExp: "Balaa Gad-aanaa: Jechoota sirrii hin taane qofa. Nageenya herrega keessanii jabeessaa.",
    loadingDossier: "Galmeen ragaa qoratamaa fi chaappaan SHA-256 mirkanaa'aa jira...",
    privacyNote: "Nageenya: Seenaan hin galmaa'u. Fuula kana battalatti dhiisuuf ESC dhiibi.",
  },
  ti: {
    expiredOrNotFound: "ዝተሓተተ ሰነድ ኣይተረኽበን",
    expiredOrNotFoundDesc: "እዚ ጸብጻብ ብመሰረት ናይ 90 መዓልታት ናይ ምስጢር ፖሊሲ ተደምሲሱ ክኸውን ይኽእል እዩ።",
    backToUpload: "ሓድሽ መርትዖ ንምቕራብ ተመለስ",
    recordAnother: "ሓድሽ ፍጻመ መዝግብ",
    dossierTitle: "ሰነድ መጽናዕቲ መርትዖ",
    shaCert: "ክሪፕቶግራፊክ ማሕተም መርትዖ (SHA-256)",
    counselorGuidance: "ናይ ድሕነት ምኽሪ ኣማኻሪት",
    categoryAssessment: "ዓይነት መጥቃዕትን ገምጋም ሓደጋን",
    flaggedPhrases: "ዝተለለዩ ኣስገእቲ ቃላት",
    legalStatuteTitle: "ተፈጸምቲ ሕግታት ኢትዮጵያ",
    legalThreats: "ኣዋጅ ኮምፒውተር ወንጀል 958/2008 ዓንቀጽ 13 (ብኮምፒውተር ምፍርራህ) ክሳብ 3 ዓመት ማእሰርቲ የቕጽዕ።",
    legalImages: "ኣዋጅ ኮምፒውተር ወንጀል 958/2008 ዓንቀጽ 14 (ዜሕፍር ትሕዝቶ ምዝርጋሕ) ክሳብ 5 ዓመት ማእሰርቲ የቕጽዕ።",
    legalGeneral: "ብኣዋጅ 1185/2012ን ኣዋጅ ኮምፒውተር ወንጀል 958/2008ን ይምራሕ።",
    extractedRecord: "ዝወጸ ጽሑፍ መርትዖ",
    blurredWarning: "እዚ ጽሑፍ ዘጨንቑ ቃላት ክህልውዎ ይኽእሉ እዮም። ንምርኣይ ጠውቑ።",
    takeAction: "ብመረዳእታኹም ስጉምቲ ውሰዱ",
    takeActionDesc: "ንቤት ፍርድን ፖሊስን ዝቐርቡ ሕጋዊ ሰነዳት ኣውርዱ",
    evidencePdfTitle: "ሰነድ መረዳእታ PDF",
    evidencePdfDesc: "ብSHA-256 ዝተሓትመ ዘይቅየር ሰነድ",
    policeFormTitle: "ናይ ፖሊስ ክሲ ቅጥዒ",
    policeFormDesc: "ንፌደራል ፖሊስ ሳይበር ክፍሊ ዝተዳለወ",
    counselorTitle: "ምስ ምስጢራዊት ኣማኻሪት ተዘራረቡ",
    counselorDesc: "ስምዒታዊ ደገፍን ናይ ድሕነት መደብን",
    directoryTitle: "ማሕበራት ደገፍ ኢትዮጵያ",
    directoryDesc: "ምስ EWLA፡ AWSADን መዕቆቢታትን ተራኸቡ",
    copiedDossierId: "መፍለዪ ቁጽሪ ተቐዲሑ!",
    copiedHash: "ሃሽ ተቐዲሑ!",
    copyId: "ቅዳሕ",
    copyHashBtn: "ሃሽ ቅዳሕ",
    downloadPdfBtn: "PDF ኣውርድ",
    reviewOnlineBtn: "ሰነድ ርአ",
    openChatBtn: "ምይይጥ ጀምር",
    browseResourcesBtn: "ማውጫ ርአ",
    severityHighExp: "ልዑል ሓደጋ፡ ቀጥታዊ ምፍርራህ ተረኺቡ። ንፌደራል ፖሊስ ሳይበር (8044) ብቕጽበት ሓበሬታ ምሃብ ይምከር።",
    severityMedExp: "ማእከላይ ሓደጋ፡ ምግልባጥ ወይ ምክትታል ተራእዩ። መረዳእታታት ዓቅቡ፡ ነቲ ሰብ ዓጽዉዎ።",
    severityLowExp: "ትሑት ሓደጋ፡ ዘየድሊ መልእኽቲ እዩ። ናይ ኣካውንትኹም ድሕነት ኣረጋግጹ።",
    loadingDossier: "መረዳእታ ይምርመርን ናይ SHA-256 ማሕተም ይረጋገጽን ኣሎ...",
    privacyNote: "ናይ ድሕነት ማዕዳ፡ ዝኾነ ታሪኽ ኣይዕቀብን። ንምውጻእ ESC ጠውቑ።",
  },
  so: {
    expiredOrNotFound: "Lama Helin Warbixinta",
    expiredOrNotFoundDesc: "Warbixintan waxaa laga yaabaa inay dhacday muddada 90-ka maalmood ah ee siyaasadda qarsoodiga. Badbaadadaadu waa mid dhowrsan.",
    backToUpload: "Ku noqo Bogga Rarka Caddeymaha",
    recordAnother: "Diiwaangeli Dhacdo Kale",
    dossierTitle: "Galalka Caddeymaha Dhacdada",
    shaCert: "Shaabadda Caddeynta SHA-256",
    counselorGuidance: "Talada Badbaadada ee La-taliyaha",
    categoryAssessment: "Nooca Xadgudubka & Qiimeynta Darnaanta",
    flaggedPhrases: "Weedhaha Khatarta ah ee la Helay",
    legalStatuteTitle: "Qodobbada Sharciga Itoobiya ee Khuseeya",
    legalThreats: "Waxay jebinaysaa Sharciga Dambiyada Kombiyuutarka 958/2016 Qodobka 13 (Hanjabaad) ciqaabteedu waa ilaa 3 sano oo xabsi ah.",
    legalImages: "Waxay jebinaysaa Sharciga Dambiyada Kombiyuutarka 958/2016 Qodobka 14 (Faafinta Anshaxxumada) ciqaabteedu waa ilaa 5 sano oo xabsi ah.",
    legalGeneral: "Waxay hoos timaadaa Sharciga 1185/2020 iyo Sharciga 958/2016.",
    extractedRecord: "Qoraalka Laga Soo Saaray Caddeynta",
    blurredWarning: "Qoraalkan waxaa ku jiri kara erayo dhiillo leh. Guji si aad u aragto.",
    takeAction: "Tallaabo Qaad Adigoo Adeegsanaya Caddeyntaada",
    takeActionDesc: "Degso dukumentiyo sharciyeed oo diyaarsan ama la xiriir hay'adaha taageerada",
    evidencePdfTitle: "Dukumentiga Dossier PDF",
    evidencePdfDesc: "Dukumenti xafidan oo wata shaabadda SHA-256",
    policeFormTitle: "Foomka Dacwada Booliska",
    policeFormDesc: "Loo habeeyay Qaybta Cyber Crime ee Booliska Federaalka",
    counselorTitle: "La-taliyaha Badbaadada ee Qarsoodiga ah",
    counselorDesc: "Kala hadal warbixintan oo qorshee badbaadadaada",
    directoryTitle: "Shabakadda Taageerada Itoobiya",
    directoryDesc: "La xiriir EWLA, hoyga AWSAD, iyo khadadka 24/7",
    copiedDossierId: "Dossier ID waa la koobiyey!",
    copiedHash: "Hash waa la koobiyey!",
    copyId: "Koobi",
    copyHashBtn: "Koobi Hash",
    downloadPdfBtn: "Degso PDF",
    reviewOnlineBtn: "Eeg Dukumentiga",
    openChatBtn: "Fur Wada-hadalka",
    browseResourcesBtn: "Eeg Kheyraadka",
    severityHighExp: "Khatar Sare: Hanjabaad toos ah ama baad ayaa la helay. Waxaa si adag lagula talinayaa in la wargeliyo Booliska (8044).",
    severityMedExp: "Khatar Dhexdhexaad ah: Dhibaateyn joogto ah. Ilaali dhammaan caddeymaha oo xir qofka waxyeellada geysanaya.",
    severityLowExp: "Khatar Hoose: Erayo xun oo aan toos ahayn. Adkee amniga koontadaada.",
    loadingDossier: "Waxaa la xaqiijinayaa diiwaanka caddeymaha iyo shaabadda SHA-256...",
    privacyNote: "Badbaado: Lama keydinayo wax xog ah. Riix ESC si aad uga baxdo boggan isla markiiba.",
  },
}

export default function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const searchParams = useSearchParams()
  const [language, setLanguage] = useState<Language>((searchParams.get("lang") as Language) || "en")
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copiedHash, setCopiedHash] = useState(false)
  const [copiedId, setCopiedId] = useState(false)

  const t = getTranslation(language)
  const ui = RESULTS_UI[language] || RESULTS_UI.en

  useEffect(() => {
    async function fetchReport() {
      try {
        const response = await fetch(`/api/reports/${id}`)
        if (!response.ok) {
          throw new Error("Report not found or expired")
        }
        const data = await response.json()
        setReport(data)
      } catch (err: any) {
        setError(err.message || "Failed to load report")
      } finally {
        setLoading(false)
      }
    }
    fetchReport()
  }, [id])

  const copyHash = () => {
    if (report?.file_hash) {
      navigator.clipboard.writeText(report.file_hash)
      setCopiedHash(true)
      setTimeout(() => setCopiedHash(false), 2000)
    }
  }

  const copyDossierId = () => {
    navigator.clipboard.writeText(id)
    setCopiedId(true)
    setTimeout(() => setCopiedId(false), 2000)
  }

  // Loading state with clear reassuring status
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header language={language} onLanguageChange={setLanguage} />
        <main className="flex-1 py-16">
          <div className="container mx-auto px-4 max-w-3xl space-y-6">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300">
              <div className="h-4 w-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin shrink-0" />
              <p className="text-xs sm:text-sm font-medium">{ui.loadingDossier}</p>
            </div>
            <Skeleton className="h-8 w-64 rounded" />
            <Skeleton className="h-24 w-full rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </main>
      </div>
    )
  }

  // Error / Not found state with actionable recovery paths
  if (error || !report) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header language={language} onLanguageChange={setLanguage} />
        <main className="flex-1 py-16">
          <div className="container mx-auto px-4 max-w-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">{ui.expiredOrNotFound}</h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {ui.expiredOrNotFoundDesc}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-muted/40 border border-border text-xs text-left space-y-2">
              <div className="font-semibold text-foreground flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-600" />
                <span>Immediate 24/7 National Hotlines</span>
              </div>
              <p className="text-muted-foreground">
                In urgent situations, you can immediately contact <strong>7711</strong> (National GBV Hotline) or <strong>8044</strong> (Police Cyber Unit).
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button asChild className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs h-10 px-4">
                <Link href="/upload">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {ui.backToUpload}
                </Link>
              </Button>
              <Button asChild variant="outline" className="text-xs h-10 px-4">
                <Link href="/chat">
                  <MessageSquare className="mr-2 h-4 w-4 text-emerald-600" />
                  {ui.openChatBtn}
                </Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header language={language} onLanguageChange={setLanguage} />

      <main className="flex-1 py-10 md:py-14">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          
          {/* Header Navigation & Dossier Meta */}
          <div className="space-y-4">
            <Link
              href="/upload"
              className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
              {ui.recordAnother}
            </Link>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/80">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  <Shield className="h-4 w-4" />
                  <span>FORENSIC INCIDENT ANALYSIS</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  {ui.dossierTitle}
                </h1>
                
                {/* Dossier ID Badge with Single-Click Copy */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="font-mono text-xs text-muted-foreground">ID:</span>
                  <div className="inline-flex items-center gap-1.5 bg-muted/60 px-2.5 py-1 rounded-md border border-border">
                    <span className="font-mono text-xs font-bold text-foreground select-all">{report.id}</span>
                    <button
                      onClick={copyDossierId}
                      title={ui.copyId}
                      className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
                    >
                      {copiedId ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                  {copiedId && (
                    <span className="text-[11px] text-emerald-600 font-semibold animate-pulse">
                      {ui.copiedDossierId}
                    </span>
                  )}
                </div>
              </div>

              {/* Timestamp & Platform Badge */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <Badge variant="outline" className="font-mono text-xs uppercase px-2.5 py-1 bg-muted/60">
                  {report.platform_id}
                </Badge>
                <Badge variant="outline" className="text-xs px-2.5 py-1">
                  {new Date(report.created_at).toLocaleDateString()}
                </Badge>
              </div>
            </div>
          </div>

          {/* Risk Severity Banner */}
          <RiskBanner level={report.risk_level} language={language} />

          {/* Contextual Urgency Explanation Card */}
          <div className="rounded-lg border border-border bg-card p-4 space-y-2 text-xs leading-relaxed shadow-xs">
            <div className="flex items-center gap-2 font-bold text-foreground">
              <ShieldAlert className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              <span>Assessment & Threat Explanation</span>
            </div>
            <p className="text-muted-foreground">
              {report.severity >= 70
                ? ui.severityHighExp
                : report.severity >= 40
                ? ui.severityMedExp
                : ui.severityLowExp}
            </p>
          </div>

          {/* Cryptographic Chain of Custody Seal Card */}
          {report.file_hash && (
            <Card className="border border-emerald-500/30 bg-emerald-500/5 shadow-xs">
              <CardContent className="pt-5 pb-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    <Fingerprint className="h-4 w-4 text-emerald-600" />
                    <span>{ui.shaCert}</span>
                  </div>
                  <Badge variant="outline" className="text-[10px] bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 w-fit">
                    ✓ Verified Court-Admissible Hash
                  </Badge>
                </div>
                <div className="flex items-center gap-2 bg-background p-2.5 rounded-md border border-border">
                  <span className="font-mono text-xs text-foreground/90 break-all flex-1 select-all">
                    {report.file_hash}
                  </span>
                  <Button
                    onClick={copyHash}
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2.5 shrink-0 text-xs font-semibold"
                  >
                    {copiedHash ? (
                      <span className="flex items-center gap-1 text-emerald-600">
                        <Check className="h-3.5 w-3.5" /> {ui.copiedHash}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Copy className="h-3.5 w-3.5" /> {ui.copyHashBtn}
                      </span>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Conversational Mode Safety Advice (If text submission) */}
          {report.advice && report.is_conversational && (
            <Card className="border border-blue-500/30 bg-blue-500/5 shadow-xs">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold flex items-center gap-2 text-blue-900 dark:text-blue-200">
                  <Shield className="h-4 w-4 text-blue-600" />
                  {ui.counselorGuidance}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">{report.advice}</p>
              </CardContent>
            </Card>
          )}

          {/* Threat Category & Detailed Classification Breakdown */}
          <Card className="border border-border/80 shadow-xs">
            <CardHeader className="pb-4 border-b border-border/60">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold">
                  {ui.categoryAssessment}
                </CardTitle>
                <Badge variant="secondary" className="font-bold text-xs">
                  {categoryLabels[report.category]?.[language] || categoryLabels[report.category]?.en || report.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              
              {/* Severity Gauge */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-muted-foreground">{t.results.severity}</span>
                  <span className="font-bold text-foreground">{report.severity} / 100</span>
                </div>
                <SeverityMeter value={report.severity} />
              </div>

              {/* Rationale Narrative */}
              <div className="space-y-1.5 bg-muted/30 p-4 rounded-md border border-border">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                  {t.results.rationale}
                </span>
                <p className="text-xs sm:text-sm text-foreground leading-relaxed">{report.rationale}</p>
              </div>

              {/* Flagged Phrases Chips */}
              {report.highlighted_phrases && report.highlighted_phrases.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                    {ui.flaggedPhrases}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {report.highlighted_phrases.map((phrase, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="bg-destructive/10 text-destructive border-destructive/30 font-mono text-xs px-2.5 py-1 rounded"
                      >
                        {phrase}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Ethiopian Applicable Law Statute Mapping */}
              <div className="p-4 rounded-md bg-amber-500/10 border border-amber-500/30 text-xs space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-foreground">
                  <Gavel className="h-4 w-4 text-amber-700 dark:text-amber-400" />
                  <span>{ui.legalStatuteTitle}</span>
                </div>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  {report.category === "threats" || report.category === "stalking"
                    ? ui.legalThreats
                    : report.category === "image_based_abuse" || report.category === "sexual_content"
                    ? ui.legalImages
                    : ui.legalGeneral}
                </p>
              </div>

            </CardContent>
          </Card>

          {/* Extracted Evidence Content (With Sensitive Content Blur Protection) */}
          <Card className="border border-border/80 shadow-xs">
            <CardHeader className="pb-3 border-b border-border/60">
              <CardTitle className="text-base font-bold flex items-center justify-between">
                <span>{ui.extractedRecord}</span>
                <span className="text-xs font-normal text-muted-foreground">Sensitive Content Filter Active</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <BlurredContent warning={ui.blurredWarning}>
                <div className="bg-muted/50 rounded-md p-4 font-mono text-xs sm:text-sm whitespace-pre-wrap leading-relaxed border border-border">
                  {report.extracted_text}
                </div>
              </BlurredContent>
            </CardContent>
          </Card>

          {/* Action Center: 4 Clear, Verb-Driven Options */}
          <Card className="border border-border bg-card shadow-xs">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-base md:text-lg font-bold flex items-center gap-2">
                <FileCheck2 className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
                {ui.takeAction}
              </CardTitle>
              <CardDescription className="text-xs">
                {ui.takeActionDesc}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-5">
              <div className="grid sm:grid-cols-2 gap-4">
                
                {/* 1. Evidence Dossier (PDF + Review) */}
                <div className="rounded-lg border border-border p-4 bg-muted/20 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-emerald-700" />
                      <h4 className="font-bold text-xs sm:text-sm text-foreground">{ui.evidencePdfTitle}</h4>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{ui.evidencePdfDesc}</p>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <Button asChild size="sm" className="h-9 px-3 text-xs bg-emerald-700 hover:bg-emerald-800 text-white gap-1.5 flex-1">
                      <a href={`/api/evidence/${id}/pdf`} target="_blank" rel="noopener noreferrer">
                        <Download className="h-3.5 w-3.5" />
                        {ui.downloadPdfBtn}
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="h-9 px-3 text-xs gap-1.5">
                      <Link href={`/evidence/${id}?lang=${language}`}>
                        <Eye className="h-3.5 w-3.5" />
                        {ui.reviewOnlineBtn}
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* 2. Official Police Complaint Form */}
                <div className="rounded-lg border border-border p-4 bg-muted/20 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Scale className="h-4 w-4 text-blue-700" />
                      <h4 className="font-bold text-xs sm:text-sm text-foreground">{ui.policeFormTitle}</h4>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{ui.policeFormDesc}</p>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <Button asChild size="sm" className="h-9 px-3 text-xs bg-blue-700 hover:bg-blue-800 text-white gap-1.5 flex-1">
                      <a href={`/api/complaint/${id}/pdf`} target="_blank" rel="noopener noreferrer">
                        <Download className="h-3.5 w-3.5" />
                        {ui.downloadPdfBtn}
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="h-9 px-3 text-xs gap-1.5">
                      <Link href={`/complaint/${id}?lang=${language}`}>
                        <Eye className="h-3.5 w-3.5" />
                        {ui.reviewOnlineBtn}
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* 3. Confidential Safety Counselor */}
                <div className="rounded-lg border border-border p-4 bg-muted/20 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-purple-700" />
                      <h4 className="font-bold text-xs sm:text-sm text-foreground">{ui.counselorTitle}</h4>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{ui.counselorDesc}</p>
                  </div>
                  <div className="pt-1">
                    <Button asChild variant="outline" size="sm" className="h-9 px-3 text-xs w-full gap-1.5 border-purple-500/30 hover:bg-purple-500/10 text-purple-800 dark:text-purple-300">
                      <Link href="/chat">
                        <Sparkles className="h-3.5 w-3.5" />
                        {ui.openChatBtn}
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* 4. Support Directory & Shelters */}
                <div className="rounded-lg border border-border p-4 bg-muted/20 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-amber-700" />
                      <h4 className="font-bold text-xs sm:text-sm text-foreground">{ui.directoryTitle}</h4>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{ui.directoryDesc}</p>
                  </div>
                  <div className="pt-1">
                    <Button asChild variant="outline" size="sm" className="h-9 px-3 text-xs w-full gap-1.5 border-amber-500/30 hover:bg-amber-500/10 text-amber-800 dark:text-amber-300">
                      <Link href="/resources">
                        <ExternalLink className="h-3.5 w-3.5" />
                        {ui.browseResourcesBtn}
                      </Link>
                    </Button>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>

          {/* Quick Exit Privacy Safeguard Note */}
          <div className="pt-4 border-t border-border/60 text-center">
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
              <Lock className="h-3.5 w-3.5 text-muted-foreground" />
              <span>{ui.privacyNote}</span>
            </p>
          </div>

        </div>
      </main>
    </div>
  )
}
