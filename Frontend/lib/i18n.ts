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
      mainTabs: {
        resources: "Support Resources",
        gbvInfo: "GBV Information",
      },
      types: {
        ngo: "NGO",
        legal_aid: "Legal Aid",
        helpline: "Helpline",
        shelter: "Shelter",
      },
      gbvInfo: {
        title: "Understanding Online Gender-Based Violence",
        subtitle: "Learn about different types of online abuse and how to recognize them",
        tabs: {
          overview: "Overview",
          cyberstalking: "Cyberstalking",
          harassment: "Harassment",
          impersonation: "Impersonation",
          doxing: "Doxing",
          imageAbuse: "Image-Based Abuse",
        },
        content: {
          overview: {
            title: "What is Online GBV?",
            description: "Online Gender-Based Violence (GBV) refers to harmful acts committed through digital platforms that target individuals based on their gender. It can take many forms and has serious psychological, emotional, and sometimes physical consequences.",
            keyPoints: [
              "Online GBV is a serious crime that violates human rights",
              "It disproportionately affects women, girls, and LGBTQ+ individuals",
              "It can happen on any digital platform including social media, messaging apps, and email",
              "The impact can be just as harmful as offline violence",
              "You have the right to safety both online and offline",
            ],
          },
          cyberstalking: {
            title: "Cyberstalking",
            description: "Repeated and persistent online harassment that causes fear or distress. This includes monitoring someone's online activities, sending unwanted messages, and tracking their location.",
            signs: [
              "Receiving excessive messages, emails, or calls",
              "Someone monitoring your social media activity or online presence",
              "Receiving threats or intimidating messages",
              "Finding spyware or tracking software on your devices",
              "Having your accounts hacked or accessed without permission",
            ],
            actions: [
              "Document all incidents with screenshots and dates",
              "Block the perpetrator on all platforms",
              "Report to platform administrators",
              "Change passwords and enable two-factor authentication",
              "Contact law enforcement if you feel threatened",
            ],
          },
          harassment: {
            title: "Online Harassment",
            description: "Unwanted, aggressive, or abusive behavior that creates a hostile environment. This includes hate speech, derogatory comments, threats, and coordinated attacks.",
            signs: [
              "Receiving abusive or threatening messages",
              "Being targeted with hate speech or slurs",
              "Experiencing coordinated attacks from multiple accounts",
              "Having explicit or violent content sent to you",
              "Being subjected to sexual comments or requests",
            ],
            actions: [
              "Do not engage with the harasser",
              "Save evidence of all harassment",
              "Use platform reporting tools",
              "Adjust privacy settings",
              "Seek support from trusted friends, family, or organizations",
            ],
          },
          impersonation: {
            title: "Impersonation & Identity Theft",
            description: "Creating fake profiles or accounts using your name, photos, or personal information to deceive others or damage your reputation.",
            signs: [
              "Finding fake accounts using your name or photos",
              "People contacting you about messages or posts you didn't make",
              "Unusual activity on your accounts",
              "Personal information being shared without your consent",
              "Someone contacting your friends or family pretending to be you",
            ],
            actions: [
              "Report fake accounts to the platform immediately",
              "Alert your contacts about the impersonation",
              "Change passwords on all your accounts",
              "Enable additional security measures",
              "Document the impersonation with screenshots",
            ],
          },
          doxing: {
            title: "Doxing",
            description: "Publicly sharing private or personal information without consent, including home address, phone number, workplace, or financial information, often with malicious intent.",
            signs: [
              "Your private information appears online without permission",
              "Receiving unwanted contact at home or work",
              "Personal documents or photos shared publicly",
              "Family members being contacted or threatened",
              "Financial information being exposed",
            ],
            actions: [
              "Request removal of information from websites",
              "Contact platform administrators",
              "File a police report",
              "Secure your physical safety if necessary",
              "Consider legal action for privacy violations",
            ],
          },
          imageAbuse: {
            title: "Image-Based Abuse",
            description: "Non-consensual sharing of intimate images, photo manipulation, or creating fake explicit content. This includes revenge porn, deepfakes, and image morphing.",
            signs: [
              "Intimate photos shared without your consent",
              "Manipulated or fake images of you circulating online",
              "Threats to share private images",
              "Your photos being used in sexual contexts",
              "Blackmail involving intimate images",
            ],
            actions: [
              "Do not pay any ransom or comply with threats",
              "Report to the platform immediately",
              "Contact law enforcement - this is a serious crime",
              "Seek support from specialized organizations",
              "Document everything for legal purposes",
              "Consider legal action against perpetrators",
            ],
          },
        },
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
      mainTabs: {
        resources: "የድጋፍ ግብዓቶች",
        gbvInfo: "የGBV መረጃ",
      },
      types: {
        ngo: "መንግስታዊ ያልሆነ ድርጅት",
        legal_aid: "የህግ እርዳታ",
        helpline: "የስልክ መስመር",
        shelter: "መጠለያ",
      },
      gbvInfo: {
        title: "የመስመር ላይ ጾታን መሰረት ያደረገ ጥቃትን መረዳት",
        subtitle: "ስለ የተለያዩ የመስመር ላይ ጥቃቶች እና እንዴት እንደሚታወቁ ይማሩ",
        tabs: {
          overview: "አጠቃላይ እይታ",
          cyberstalking: "የሳይበር ማሳደድ",
          harassment: "ትንኮሳ",
          impersonation: "ማስመሰል",
          doxing: "የግል መረጃ መግለጫ",
          imageAbuse: "የምስል ጥቃት",
        },
        content: {
          overview: {
            title: "የመስመር ላይ GBV ምንድን ነው?",
            description: "የመስመር ላይ ጾታን መሰረት ያደረገ ጥቃት በዲጂታል መድረኮች በኩል የሚፈጸሙ ጎጂ ድርጊቶችን ያመለክታል። በብዙ መልኮች ሊመጣ ይችላል እና ከባድ የስነ-ልቦና፣ ስሜታዊ እና አንዳንድ ጊዜ አካላዊ ውጤቶች አሉት።",
            keyPoints: [
              "የመስመር ላይ GBV የሰብአዊ መብትን የሚጥስ ከባድ ወንጀል ነው",
              "ሴቶችን፣ ልጃገረዶችን እና LGBTQ+ ግለሰቦችን በተለይ ይነካል",
              "ማህበራዊ ሚ디ያ፣ የመልእክት መላላኪያ መተግበሪያዎች እና ኢሜይልን ጨምሮ በማንኛውም ዲጂታል መድረክ ሊሆን ይችላል",
              "ተጽእኖው ከመስመር ውጭ ጥቃት እንደ ጎጂ ሊሆን ይችላል",
              "በመስመር ላይ እና ከመስመር ውጭ ደህንነት የማግኘት መብት አለዎት",
            ],
          },
          cyberstalking: {
            title: "የሳይበር ማሳደድ",
            description: "ተደጋግሞ የሚደረግ እና ቀጣይነት ያለው የመስመር ላይ ትንኮሳ ፍርሃት ወይም ጭንቀት የሚፈጥር። የአንድ ሰው የመስመር ላይ እንቅስቃሴዎችን መከታተል፣ ያልተፈለጉ መልእክቶችን መላክ እና ቦታቸውን መከታተልን ያካትታል።",
            signs: [
              "ከልክ ያለፈ መልእክቶች፣ ኢሜይሎች ወይም ጥሪዎችን መቀበል",
              "አንድ ሰው የማህበራዊ ሚディያ እንቅስቃሴዎን ወይም የመስመር ላይ መገኘትዎን እየተከታተለ",
              "ዛቻዎችን ወይም አስፈራራ መልእክቶችን መቀበል",
              "በመሳሪያዎችዎ ላይ የስለላ ሶፍትዌር ወይም የመከታተያ ሶፍትዌር መፈለግ",
              "መለያዎችዎ ያለ ፈቃድ ሲጠለፉ ወይም ሲደረስባቸው",
            ],
            actions: [
              "ሁሉንም ክስተቶች በቅጽበታዊ ገጽ እይታዎች እና ቀናት ይመዝግቡ",
              "ጥፋተኛውን በሁሉም መድረኮች ላይ ያግዱ",
              "ለመድረክ አስተዳዳሪዎች ሪፖርት ያድርጉ",
              "የይለፍ ቃሎችን ይቀይሩ እና ባለሁለት-ደረጃ ማረጋገጫን ያንቁ",
              "ስጋት ካለብዎ የህግ አስከባሪ አካላትን ያነጋግሩ",
            ],
          },
          harassment: {
            title: "የመስመር ላይ ትንኮሳ",
            description: "ያልተፈለገ፣ ጠበኛ ወይም አላግባብ መጠቀም ጠላትነትን የሚፈጥር። የጥላቻ ንግግርን፣ የንቀት አስተያየቶችን፣ ዛቻዎችን እና የተቀናጁ ጥቃቶችን ያካትታል።",
            signs: [
              "አላግባብ የሚጠቀሙ ወይም አስፈራራ መልእክቶችን መቀበል",
              "በጥላቻ ንግግር ወይም መሳደብ መያዝ",
              "ከብዙ መለያዎች የተቀናጁ ጥቃቶችን ማጋጠም",
              "ግልጽ ወይም ኃይለኛ ይዘት ሲላክልዎ",
              "ለጾታዊ አስተያየቶች ወይም ጥያቄዎች መገዛት",
            ],
            actions: [
              "ከአስጨናቂው ጋር አይሳተፉ",
              "የሁሉንም ትንኮሳ ማስረጃ ያስቀምጡ",
              "የመድረክ ሪፖርት መሳሪያዎችን ይጠቀሙ",
              "የግላዊነት ቅንብሮችን ያስተካክሉ",
              "ከታማኝ ጓደኞች፣ ቤተሰብ ወይም ድርጅቶች ድጋፍ ይፈልጉ",
            ],
          },
          impersonation: {
            title: "ማስመሰል እና የማንነት ስርቆት",
            description: "ሌሎችን ለማታለል ወይም የእርስዎን መልካም ስም ለማበላሸት ስምዎን፣ ፎቶዎችዎን ወይም የግል መረጃዎን በመጠቀም የውሸት መገለጫዎችን ወይም መለያዎችን መፍጠር።",
            signs: [
              "ስምዎን ወይም ፎቶዎችዎን በመጠቀም የውሸት መለያዎችን መፈለግ",
              "ሰዎች ስለ ያላደረጓቸው መልእክቶች ወይም ልጥፎች ሲያነጋግሩዎት",
              "በመለያዎችዎ ላይ ያልተለመደ እንቅስቃሴ",
              "የግል መረጃ ያለእርስዎ ፈቃድ እየተጋራ",
              "አንድ ሰው ጓደኞችዎን ወይም ቤተሰብዎን እርስዎ እንደሆኑ በማስመሰል ማነጋገር",
            ],
            actions: [
              "የውሸት መለያዎችን ወዲያውኑ ለመድረኩ ሪፖርት ያድርጉ",
              "ዕውቂያዎችዎን ስለ ማስመሰሉ ያሳውቁ",
              "በሁሉም መለያዎችዎ ላይ የይለፍ ቃሎችን ይቀይሩ",
              "ተጨማሪ የደህንነት እርምጃዎችን ያንቁ",
              "ማስመሰሉን በቅጽበታዊ ገጽ እይታዎች ይመዝግቡ",
            ],
          },
          doxing: {
            title: "የግል መረጃ መግለጫ",
            description: "የቤት አድራሻ፣ የስልክ ቁጥር፣ የስራ ቦታ ወይም የፋይናንስ መረጃን ጨምሮ ያለፈቃድ የግል ወይም የግል መረጃን በይፋ ማጋራት፣ ብዙ ጊዜ ከጎጂ አላማ ጋር።",
            signs: [
              "የእርስዎ የግል መረጃ ያለፈቃድ በመስመር ላይ ይታያል",
              "በቤት ወይም በስራ ላይ ያልተፈለገ ግንኙነት መቀበል",
              "የግል ሰነዶች ወይም ፎቶዎች በይፋ እየተጋሩ",
              "የቤተሰብ አባላት እየተገናኙ ወይም እየተፈረደባቸው",
              "የፋይናንስ መረጃ እየተጋለጠ",
            ],
            actions: [
              "ከድረ-ገጾች መረጃ እንዲወገድ ይጠይቁ",
              "የመድረክ አስተዳዳሪዎችን ያነጋግሩ",
              "የፖሊስ ሪፖርት ያቅርቡ",
              "አስፈላጊ ከሆነ አካላዊ ደህንነትዎን ያስጠብቁ",
              "ለግላዊነት ጥሰቶች ህጋዊ እርምጃ ያስቡበት",
            ],
          },
          imageAbuse: {
            title: "የምስል ጥቃት",
            description: "ያለፈቃድ የቅርብ ምስሎችን ማጋራት፣ የፎቶ ማጭበርበር ወይም የውሸት ግልጽ ይዘት መፍጠር። የበቀል ፖርኖግራፊን፣ ዲፕፌክስን እና የምስል ለውጥን ያካትታል።",
            signs: [
              "ያለእርስዎ ፈቃድ የቅርብ ፎቶዎች እየተጋሩ",
              "የተጭበረበሩ ወይም የውሸት ምስሎችዎ በመስመር ላይ እየተሰራጩ",
              "የግል ምስሎችን ለማጋራት ዛቻዎች",
              "ፎቶዎችዎ በጾታዊ አውዶች ውስጥ እየተጠቀሙ",
              "የቅርብ ምስሎችን የሚያካትት ማስፈራራት",
            ],
            actions: [
              "ምንም አይነት ቤዛ አይክፈሉ ወይም ከዛቻዎች ጋር አይስማሙ",
              "ወዲያውኑ ለመድረኩ ሪፖርት ያድርጉ",
              "የህግ አስከባሪ አካላትን ያነጋግሩ - ይህ ከባድ ወንጀል ነው",
              "ከልዩ ድርጅቶች ድጋፍ ይፈልጉ",
              "ለህጋዊ ዓላማዎች ሁሉንም ነገር ይመዝግቡ",
              "በጥፋተኞች ላይ ህጋዊ እርምጃ ያስቡበት",
            ],
          },
        },
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
