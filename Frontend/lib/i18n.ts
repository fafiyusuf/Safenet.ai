export type Language = "en" | "am"

export const translations = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      upload: "Report Abuse",
      resources: "Resources",
      about: "About",
    },
    // Landing page
    landing: {
      title: "You are not alone",
      subtitle: "Safenet.ai helps you document, analyze, and take action against online abuse",
      cta: "Report Abuse",
      safeExit: "Safe Exit",
      features: {
        analyze: {
          title: "AI Analysis",
          description: "Advanced AI classifies abuse type and severity to strengthen your case",
        },
        evidence: {
          title: "Evidence Collection",
          description: "Generate tamper-proof documentation for legal proceedings",
        },
        support: {
          title: "Get Support",
          description: "Connect with NGOs, legal aid, and helplines in Ethiopia",
        },
      },
      privacy: "Your privacy is protected. All data is encrypted and auto-deleted after 30 days.",
    },
    // Upload page
    upload: {
      title: "Report Online Abuse",
      subtitle: "Upload a screenshot or paste the abusive content",
      dropzone: "Drop screenshot here or click to upload",
      dropzoneHint: "Supports JPG, PNG (max 10MB)",
      orText: "OR",
      textPlaceholder: "Paste the abusive message or content here...",
      platform: "Where did this happen?",
      platformPlaceholder: "Select platform",
      submit: "Analyze Content",
      submitting: "Analyzing...",
      warning: "Content warning: The analysis may display disturbing content.",
    },
    // Results page
    results: {
      title: "Analysis Results",
      category: "Abuse Category",
      severity: "Severity Score",
      riskLevel: "Risk Level",
      confidence: "Confidence",
      rationale: "Analysis",
      flaggedPhrases: "Flagged Phrases",
      extractedText: "Extracted Content",
      actions: {
        evidence: "Download Evidence PDF",
        complaint: "Generate Legal Complaint",
        resources: "Find Support",
        newReport: "Submit Another Report",
      },
      risk: {
        high: "HIGH RISK - Immediate support recommended",
        medium: "MEDIUM RISK - Consider seeking support",
        low: "LOW RISK",
      },
    },
    // Resources page
    resources: {
      title: "Support Resources",
      subtitle: "Organizations that can help you",
      filterRegion: "Filter by region",
      allRegions: "All regions",
      types: {
        ngo: "NGO",
        legal_aid: "Legal Aid",
        helpline: "Helpline",
        shelter: "Shelter",
      },
    },
    // Common
    common: {
      loading: "Loading...",
      error: "Something went wrong",
      retry: "Try again",
      back: "Go back",
      download: "Download",
      showContent: "Show content",
      hideContent: "Hide content",
    },
  },
  am: {
    // Navigation
    nav: {
      home: "መነሻ",
      upload: "ጥቃት ሪፖርት ያድርጉ",
      resources: "ግብዓቶች",
      about: "ስለ እኛ",
    },
    // Landing page
    landing: {
      title: "ብቻዎን አይደሉም",
      subtitle: "Safenet.ai የመስመር ላይ ጥቃትን ለመመዝገብ፣ ለመተንተን እና እርምጃ ለመውሰድ ይረዳዎታል",
      cta: "ጥቃት ሪፖርት ያድርጉ",
      safeExit: "ደህንነቱ የተጠበቀ መውጫ",
      features: {
        analyze: {
          title: "AI ትንተና",
          description: "የላቀ AI የጥቃት አይነትና ክብደት ይመድባል",
        },
        evidence: {
          title: "ማስረጃ ስብሰባ",
          description: "ለህግ ሂደት የማይበላሽ ሰነድ ያመነጫል",
        },
        support: {
          title: "ድጋፍ ያግኙ",
          description: "በኢትዮጵያ ከNGO፣ ከህግ እርዳታ እና ከመስመሮች ጋር ይገናኙ",
        },
      },
      privacy: "ግላዊነትዎ የተጠበቀ ነው። ሁሉም መረጃ የተመሰጠረ እና ከ30 ቀናት በኋላ በራስ-ሰር ይሰረዛል።",
    },
    // Upload page
    upload: {
      title: "የመስመር ላይ ጥቃት ሪፖርት ያድርጉ",
      subtitle: "ቅጽበታዊ ገጽ እይታ ይስቀሉ ወይም አጸያፊ ይዘቱን ይለጥፉ",
      dropzone: "ቅጽበታዊ ገጽ እይታ እዚህ ጣል ያድርጉ ወይም ለመስቀል ጠቅ ያድርጉ",
      dropzoneHint: "JPG፣ PNG ይደግፋል (ከፍተኛ 10MB)",
      orText: "ወይም",
      textPlaceholder: "አጸያፊ መልእክት ወይም ይዘቱን እዚህ ይለጥፉ...",
      platform: "ይህ የት ተከሰተ?",
      platformPlaceholder: "መድረክ ይምረጡ",
      submit: "ይዘት ተንትን",
      submitting: "እየተተነተነ ነው...",
      warning: "የይዘት ማስጠንቀቂያ: ትንተናው አስቸጋሪ ይዘት ሊያሳይ ይችላል።",
    },
    // Results page
    results: {
      title: "የትንታኔ ውጤቶች",
      category: "የጥቃት ምድብ",
      severity: "የክብደት ነጥብ",
      riskLevel: "የአደጋ ደረጃ",
      confidence: "እምነት",
      rationale: "ትንተና",
      flaggedPhrases: "የተሰመሩ ሀረጎች",
      extractedText: "የተወጣ ይዘት",
      actions: {
        evidence: "የማስረጃ PDF አውርድ",
        complaint: "የህግ ቅሬታ አመንጭ",
        resources: "ድጋፍ ፈልግ",
        newReport: "ሌላ ሪፖርት አስገባ",
      },
      risk: {
        high: "ከፍተኛ አደጋ - ፈጣን ድጋፍ ይመከራል",
        medium: "መካከለኛ አደጋ - ድጋፍ መፈለግ ያስቡ",
        low: "ዝቅተኛ አደጋ",
      },
    },
    // Resources page
    resources: {
      title: "የድጋፍ ግብዓቶች",
      subtitle: "ሊረዱዎት የሚችሉ ድርጅቶች",
      filterRegion: "በክልል አጣራ",
      allRegions: "ሁሉም ክልሎች",
      types: {
        ngo: "መንግስታዊ ያልሆነ ድርጅት",
        legal_aid: "የህግ እርዳታ",
        helpline: "የስልክ መስመር",
        shelter: "መጠለያ",
      },
    },
    // Common
    common: {
      loading: "በመጫን ላይ...",
      error: "የሆነ ችግር ተፈጥሯል",
      retry: "እንደገና ሞክር",
      back: "ተመለስ",
      download: "አውርድ",
      showContent: "ይዘት አሳይ",
      hideContent: "ይዘት ደብቅ",
    },
  },
}

export function getTranslation(lang: Language) {
  return translations[lang]
}
