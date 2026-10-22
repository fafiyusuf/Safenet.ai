export type Language = "en" | "am" | "om" | "ti" | "so"

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
      emergencyTitle: "Need Immediate Help?",
      emergencyText: "If you're in immediate danger, call these GBV hotlines in Ethiopia:",
      hotlines: ["7711", "6388", "8044"],
      evidenceMode: {
        title: "📸 Upload Evidence (Screenshot)",
        description: "For formal documentation and legal proceedings",
        features: [
          "AI analyzes screenshot content",
          "Generate tamper-proof evidence PDF",
          "Create legal complaint document",
          "Formal analysis for authorities"
        ]
      },
      conversationalMode: {
        title: "💬 Get Advice (Text Only)",
        description: "For supportive guidance and safety recommendations",
        features: [
          "Share content for assessment",
          "Receive personalized safety advice",
          "Get support recommendations",
          "Confidential and judgment-free"
        ]
      },
      howItWorks: "How it works",
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
      adviceTitle: "Safety Advice",
      conversationalNote: "Based on the text you shared, here's our assessment and advice:",
      evidenceNote: "This analysis is based on evidence you provided.",
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
    // Chat/Support page
    chat: {
      title: "Support Chat",
      subtitle: "Automated 24/7 AI Safety Guidance",
      placeholder: "Share what's on your mind... (you're safe here)",
      send: "Send",
      thinking: "AI is thinking...",
      privacy: "🤖 Automated AI Assistant • Ephemeral & Zero-Trace",
      inDanger: "In Immediate Danger?",
      emergency: "Emergency Support",
      typing: "AI Assistant is typing...",
      initialMessage: "Hello, I am SafeNet's automated AI support assistant. I am here to provide confidential digital safety guidance, evidence preservation tips, and emergency legal resources. Note: I am an AI system, not human counseling. How can I help you today? 🤖💙",
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
          prevention: "Prevention & Safety",
          legalRights: "Your Legal Rights",
          psychologicalImpact: "Psychological Impact",
        },
        content: {
          overview: {
            title: "What is Online GBV?",
            description: "Online Gender-Based Violence (GBV) refers to harmful acts committed through digital platforms that target individuals based on their gender. It can take many forms and has serious psychological, emotional, and sometimes physical consequences.",
            keyPoints: [
              "Online GBV is a serious crime that violates human rights",
              "It disproportionately affects women, girls, and other vulnerable groups",
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
          prevention: {
            title: "Prevention & Digital Safety",
            description: "Proactive steps you can take to protect yourself from online gender-based violence and maintain your digital safety.",
            privacySettings: {
              title: "Privacy & Security Settings",
              tips: [
                "Review and adjust privacy settings on all social media accounts regularly",
                "Use strong, unique passwords for each account (12+ characters with numbers, symbols)",
                "Enable two-factor authentication (2FA) on all platforms",
                "Limit who can see your posts, contact you, and view your personal information",
                "Be cautious about sharing location data and check-ins",
                "Review app permissions and revoke unnecessary access to your data",
              ],
            },
            digitalHygiene: {
              title: "Digital Hygiene Practices",
              tips: [
                "Think before you post - consider who might see it and how it could be misused",
                "Regularly audit your followers and connections - remove suspicious accounts",
                "Use separate email addresses for personal, professional, and online accounts",
                "Be skeptical of friend requests from people you don't know",
                "Avoid sharing intimate images digitally - they can be screenshot and shared",
                "Use encrypted messaging apps for sensitive conversations",
                "Clear your browser history and cookies regularly",
                "Log out of accounts when using shared or public devices",
              ],
            },
            recognizeWarnings: {
              title: "Recognize Warning Signs Early",
              signs: [
                "Someone showing excessive interest in your online activities",
                "Receiving unsolicited intimate messages or requests",
                "Noticing unusual login attempts or account activity",
                "Being added to groups or tagged in posts without consent",
                "Finding your photos being used by other accounts",
                "Receiving messages that make you feel uncomfortable or unsafe",
              ],
            },
            safeSharing: {
              title: "Safe Content Sharing",
              guidelines: [
                "Remove metadata (EXIF data) from photos before sharing - it can reveal location",
                "Be careful about revealing your routine or patterns online",
                "Use nicknames or pseudonyms when possible instead of real names",
                "Avoid posting about being home alone or away on vacation",
                "Be mindful of backgrounds in photos that might reveal personal information",
                "Use platform features like 'Close Friends' or 'Private Stories' wisely",
              ],
            },
          },
          legalRights: {
            title: "Your Legal Rights in Ethiopia",
            description: "Understanding your legal protections and rights when facing online gender-based violence in Ethiopia.",
            constitutionalRights: {
              title: "Constitutional Protections",
              rights: [
                "Right to dignity and personal security (Article 24, FDRE Constitution)",
                "Right to privacy - protection from unwarranted searches and interference (Article 26)",
                "Protection from cruel, inhuman, or degrading treatment (Article 18)",
                "Right to equality and non-discrimination based on gender (Article 25)",
                "Freedom from gender-based violence and harmful practices",
              ],
            },
            criminalLaws: {
              title: "Criminal Laws Protecting You",
              laws: [
                "Computer Crime Proclamation No. 958/2016 - criminalizes cyber harassment, cyberstalking, and unauthorized access",
                "Criminal Code of Ethiopia - provisions against defamation, threat, coercion, and sexual abuse",
                "Telecom Fraud Offences Proclamation - addresses identity theft and digital fraud",
                "Prevention and Suppression of Trafficking in Persons and Smuggling of Migrants Proclamation",
                "Women's rights to legal recourse for violence and abuse",
              ],
            },
            legalActions: {
              title: "Legal Actions You Can Take",
              actions: [
                "File a criminal complaint with the Federal Police Cyber Crime Unit",
                "Seek a protection order from the court against the perpetrator",
                "File a civil lawsuit for damages caused by online abuse",
                "Request content removal from platforms under Ethiopian law",
                "Report to the Ministry of Women and Social Affairs for support",
                "Access free legal aid through organizations like EWLA",
                "Seek compensation for harm suffered",
              ],
            },
            evidenceCollection: {
              title: "Collecting Evidence for Legal Proceedings",
              steps: [
                "Take screenshots showing the full context (including dates, times, usernames)",
                "Save original messages, emails, and notifications",
                "Document URLs and platform names",
                "Record dates and times of all incidents",
                "Keep a detailed written account of events and their impact on you",
                "Preserve any physical evidence (devices, SIM cards if relevant)",
                "Get witness statements if others observed the abuse",
                "Do not delete anything - even if it's distressing to keep",
              ],
            },
            reporting: {
              title: "Where to Report",
              options: [
                "Federal Police Cyber Crime Investigation Unit (+251-111-572355)",
                "Women and Children Affairs Office of the Attorney General",
                "Platform reporting mechanisms (Facebook, Instagram, Twitter, etc.)",
                "Ethiopian Women Lawyers Association (EWLA) for legal aid",
                "National GBV Hotlines (7711, 6388, 8044) for immediate support",
                "Ministry of Women and Social Affairs",
              ],
            },
          },
          psychologicalImpact: {
            title: "Understanding Psychological Impact",
            description: "Online gender-based violence can have severe psychological effects. Recognizing these impacts is the first step toward healing and recovery.",
            commonEffects: {
              title: "Common Psychological Effects",
              effects: [
                "Anxiety, fear, and constant worry about safety",
                "Depression, sadness, and feelings of hopelessness",
                "Post-Traumatic Stress Disorder (PTSD) symptoms",
                "Sleep disturbances, nightmares, or insomnia",
                "Loss of trust in others and difficulty forming relationships",
                "Social withdrawal and isolation",
                "Low self-esteem and self-blame",
                "Difficulty concentrating or making decisions",
                "Physical symptoms like headaches, stomach problems, or fatigue",
                "Increased substance use as a coping mechanism",
              ],
            },
            validatingFeelings: {
              title: "Your Feelings Are Valid",
              messages: [
                "What happened to you is NOT your fault",
                "Your emotional response is normal and understandable",
                "You have the right to feel angry, scared, sad, or confused",
                "Online abuse is real abuse - your pain is legitimate",
                "There is no 'right way' to feel or 'correct timeline' for healing",
                "Seeking help is a sign of strength, not weakness",
              ],
            },
            copingStrategies: {
              title: "Healthy Coping Strategies",
              strategies: [
                "Talk to someone you trust - friends, family, or a counselor",
                "Practice self-care: adequate sleep, nutrition, and exercise",
                "Set boundaries with technology - take breaks from social media",
                "Engage in activities that bring you joy and relaxation",
                "Join support groups with others who have similar experiences",
                "Keep a journal to process your thoughts and emotions",
                "Practice mindfulness, meditation, or deep breathing exercises",
                "Seek professional mental health support when needed",
              ],
            },
            whenToSeekHelp: {
              title: "When to Seek Professional Help",
              signs: [
                "If you're experiencing thoughts of self-harm or suicide",
                "If symptoms persist for more than a few weeks",
                "If you're unable to perform daily activities",
                "If you're using substances to cope",
                "If you're experiencing panic attacks or severe anxiety",
                "If you feel isolated and unable to reach out to loved ones",
                "If you notice changes in eating or sleeping patterns",
              ],
              resources: [
                "Contact a psychologist or psychiatrist",
                "Reach out to AWSAD for counseling services",
                "Call the National GBV Hotlines (7711, 6388, 8044) for immediate support",
                "Seek support from Yenege Tesfa for psychosocial assistance",
                "Join support groups facilitated by NGOs",
              ],
            },
            supportingOthers: {
              title: "Supporting Someone Experiencing Online GBV",
              howToHelp: [
                "Believe them - don't question or doubt their experience",
                "Listen without judgment and validate their feelings",
                "Respect their decisions and autonomy in how they respond",
                "Avoid asking 'why' questions that might imply blame",
                "Offer practical help: accompanying them to report, finding resources",
                "Maintain confidentiality unless there's immediate danger",
                "Be patient - healing takes time and isn't linear",
                "Encourage professional help but don't force it",
                "Take care of your own mental health while supporting them",
              ],
            },
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
      emergencyTitle: "ፈጣን እርዳታ ያስፈልግዎታል?",
      emergencyText: "በቅጽበታዊ አደጋ ውስጥ ከሆኑ፣ እነዚህን የኢትዮጵያ GBV የእገዛ መስመሮች ይደውሉ፡",
      hotlines: ["7711", "6388", "8044"],
      evidenceMode: {
        title: "📸 ማስረጃ ስቀል (ቅጽበታዊ ገጽ እይታ)",
        description: "ለመደበኛ ሰነድ እና ህጋዊ ሂደቶች",
        features: [
          "AI የቅጽበታዊ ገጽ እይታ ይዘት ይተነትናል",
          "የማይበላሽ የማስረጃ PDF ያመነጩ",
          "የህግ ቅሬታ ሰነድ ይፍጠሩ",
          "ለባለስልጣናት መደበኛ ትንታኔ"
        ]
      },
      conversationalMode: {
        title: "💬 ምክር ያግኙ (ጽሁፍ ብቻ)",
        description: "ለድጋፍ መመሪያ እና የደህንነት ምክሮች",
        features: [
          "ይዘትን ለግምገማ ያጋሩ",
          "ግላዊ የደህንነት ምክር ይቀበሉ",
          "የድጋፍ ምክሮች ያግኙ",
          "ሚስጥራዊ እና ያለ ፍርድ"
        ]
      },
      howItWorks: "እንዴት ይሰራል",
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
      adviceTitle: "የደህንነት ምክር",
      conversationalNote: "ባጋራችሁት ጽሁፍ ላይ በመመርኮዝ፣ ይህ የእኛ ግምገማና ምክር ነው፡",
      evidenceNote: "ይህ ትንታኔ የተመሰረተው በሰጡት ማስረጃ ላይ ነው።",
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
    // Chat/Support page
    chat: {
      title: "የድጋፍ ቻት",
      subtitle: "24/7 አውቶሜትድ የAI ደህንነት መመሪያ",
      placeholder: "የሚያጋጥምዎትን እዚህ ይጻፉ... (ውይይቱ ሚስጥራዊ ነው)",
      send: "ላክ",
      thinking: "AI በማሰብ ላይ...",
      privacy: "🤖 አውቶሜትድ የAI ድጋፍ ረዳት • ሚስጥራዊ",
      inDanger: "በወቅታዊ አደጋ?",
      emergency: "አስቸኳይ ድጋፍ",
      typing: "የAI ረዳት ምላሽ እያዘጋጀ ነው...",
      initialMessage: "ሰላም፣ እኔ የSafeNet አውቶሜትድ የAI ደህንነት ረዳት ነኝ። የዲጂታል ደህንነት እና የማስረጃ አጠባበቅ መረጃ ልሰጥዎ ዝግጁ ነኝ። ማስታወሻ፡ ይህ የAI ቴክኖሎጂ ሲሆን የሰው አማካሪ አይደለም። በምን ላግዝዎ እችላለሁ? 🤖💙",
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
          prevention: "መከላከል እና ደህንነት",
          legalRights: "የእርስዎ ህጋዊ መብቶች",
          psychologicalImpact: "የስነ-ልቦና ተጽእኖ",
        },
        content: {
          overview: {
            title: "የመስመር ላይ GBV ምንድን ነው?",
            description: "የመስመር ላይ ጾታን መሰረት ያደረገ ጥቃት በዲጂታል መድረኮች በኩል የሚፈጸሙ ጎጂ ድርጊቶችን ያመለክታል። በብዙ መልኮች ሊመጣ ይችላል እና ከባድ የስነ-ልቦና፣ ስሜታዊ እና አንዳንድ ጊዜ አካላዊ ውጤቶች አሉት።",
            keyPoints: [
              "የመስመር ላይ GBV የሰብአዊ መብትን የሚጥስ ከባድ ወንጀል ነው",
              "ሴቶችን፣ ልጃገረዶችን እና ሌሎች ተጋላጭ ቡድኖችን በተለይ ይነካል",
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
          prevention: {
            title: "መከላከል እና ዲጂታል ደህንነት",
            description: "ከመስመር ላይ ጾታን መሰረት ያደረገ ጥቃት እራስዎን ለመጠበቅ እና ዲጂታል ደህንነትዎን ለመጠበቅ የሚወስዷቸው ቅድመ እርምጃዎች።",
            privacySettings: {
              title: "የግላዊነት እና የደህንነት ቅንብሮች",
              tips: [
                "በሁሉም የማህበራዊ ሚዲያ መለያዎች ላይ የግላዊነት ቅንብሮችን በየጊዜው ይገምግሙ እና ያስተካክሉ",
                "ለእያንዳንዱ መለያ ጠንካራ እና ልዩ የይለፍ ቃሎችን ይጠቀሙ (12+ ቁምፊዎች ከቁጥሮች፣ ምልክቶች ጋር)",
                "በሁሉም መድረኮች ላይ ባለሁለት-ደረጃ ማረጋገጫን (2FA) ያንቁ",
                "ልጥፎችዎን ማን መመልከት፣ ማነጋገር እና የግል መረጃዎን ማየት እንደሚችል ይገድቡ",
                "ስለ አካባቢ መረጃ ማጋራት እና መመዝገቢያዎች ጥንቃቄ ያድርጉ",
                "የመተግበሪያ ፈቃዶችን ይገምግሙ እና ላስፈላጊ የውሂብ መዳረሻን ይሰርዙ",
              ],
            },
            digitalHygiene: {
              title: "የዲጂታል ንፅህና ልምዶች",
              tips: [
                "ከመለጠፍዎ በፊት አስቡ - ማን ሊያየው እና እንዴት በተሳሳተ መንገድ ጥቅም ላይ ሊውል እንደሚችል",
                "ተከታዮችዎን እና ግንኙነቶችዎን በየጊዜው ይመርምሩ - አጠራጣሪ መለያዎችን ያስወግዱ",
                "ለግል፣ ለሙያ እና ለመስመር ላይ መለያዎች የተለያዩ የኢሜይል አድራሻዎችን ይጠቀሙ",
                "ከማያውቋቸው ሰዎች የጓደኝነት ጥያቄዎች ላይ ጥርጣሬ ያድርጉ",
                "የቅርብ ምስሎችን በዲጂታል ማጋራት አይቀሩ - በቅጽበታዊ ገጽ እይታ ሊወሰዱ እና ሊጋሩ ይችላሉ",
                "ለስሜታዊ ውይይቶች የተመሰጠሩ የመልእክት መተግበሪያዎችን ይጠቀሙ",
                "የአሳሽ ታሪክዎን እና ኩኪዎችን በየጊዜው ያጽዱ",
                "የተጋሩ ወይም የሕዝብ መሳሪያዎችን በሚጠቀሙበት ጊዜ ከመለያዎች ይውጡ",
              ],
            },
            recognizeWarnings: {
              title: "የማስጠንቀቂያ ምልክቶችን በቀድሞ ይለዩ",
              signs: [
                "አንድ ሰው በመስመር ላይ እንቅስቃሴዎ ላይ ከመጠን ያለፈ ፍላጎት ማሳየት",
                "ያልተጠየቀ የቅርብ መልእክቶችን ወይም ጥያቄዎችን መቀበል",
                "ያልተለመዱ የመግባት ሙከራዎችን ወይም የመለያ እንቅስቃሴዎችን ማስተዋል",
                "ያለፈቃድ ወደ ቡድኖች መታከል ወይም በልጥፎች መታገድ",
                "ፎቶዎችዎ በሌሎች መለያዎች እየተጠቀሙ መፈለግ",
                "ያልተመች ወይም አስተማማኝ ያልሆነ ስሜት የሚፈጥሩ መልእክቶችን መቀበል",
              ],
            },
            safeSharing: {
              title: "ደህንነቱ የተጠበቀ ይዘት ማጋራት",
              guidelines: [
                "ከማጋራትዎ በፊት ከፎቶዎች ሜታዳታ (EXIF ውሂብ) ያስወግዱ - አካባቢን ሊገልጽ ይችላል",
                "መደበኛ ሁኔታዎን ወይም ምሳሌዎችን በመስመር ላይ ስለ መግለጽ ጥንቃቄ ያድርጉ",
                "በተቻለ መጠን ከእውነተኛ ስሞች ይልቅ የቅፅል ስሞችን ወይም የውሸት ስሞችን ይጠቀሙ",
                "ቤት ውስጥ ብቻዎ መሆንዎን ወይም በእረፍት ላይ መሆንዎን ስለ መለጠፍ ያስወግዱ",
                "የግል መረጃን ሊያሳዩ ስለሚችሉ በፎቶዎች ውስጥ ስላለው ዳራ ጥንቃቄ ያድርጉ",
                "እንደ 'ቅርብ ጓደኞች' ወይም 'የግል ታሪኮች' ያሉ የመድረክ ባህሪያትን በጥበብ ይጠቀሙ",
              ],
            },
          },
          legalRights: {
            title: "በኢትዮጵያ ውስጥ የእርስዎ ህጋዊ መብቶች",
            description: "በኢትዮጵያ ውስጥ የመስመር ላይ ጾታን መሰረት ያደረገ ጥቃት ሲያጋጥምዎ የህግ ጥበቃዎችን እና መብቶችዎን መረዳት።",
            constitutionalRights: {
              title: "የህገመንግስት ጥበቃዎች",
              rights: [
                "የክብር እና የግል ደህንነት መብት (አንቀጽ 24፣ የኢፌዴሪ ህገመንግስት)",
                "የግላዊነት መብት - ከያለ ምክንያት ፍተሻዎች እና ጣልቃገብነት ጥበቃ (አንቀጽ 26)",
                "ከጨካኝ፣ ከሰብአዊነት የጎደለው ወይም አዋራጅ አያያዝ ጥበቃ (አንቀጽ 18)",
                "በጾታ ላይ የተመሰረተ እኩልነት እና ድሎታም ያለመሆን መብት (አንቀጽ 25)",
                "ከጾታ ላይ የተመሰረተ ጥቃት እና ጎጂ ልምዶች ነፃነት",
              ],
            },
            criminalLaws: {
              title: "እርስዎን የሚጠብቁ የወንጀል ህጎች",
              laws: [
                "የኮምፒውተር ወንጀል አዋጅ ቁጥር 958/2016 - የሳይበር ትንኮሳን፣ የሳይበር ማሳደድን እና ያልተፈቀደ መዳረሻን ወንጀል ያደርጋል",
                "የኢትዮጵያ የወንጀል ህግ - በስም ማጥፋት፣ ዛቻ፣ አስገዳድ እና ጾታዊ ብልግና ላይ ድንጋጌዎች",
                "የቴሌኮም ማጭበርበር ወንጀሎች አዋጅ - የማንነት ስርቆትን እና ዲጂታል ማጭበርበርን ይመለከታል",
                "የሰዎች ዝውውር እና ህገወጥ ስደተኞችን መከላከል እና የማፈን አዋጅ",
                "ሴቶች ለጥቃት እና ለጥቃት የህግ እርዳታ የማግኘት መብቶች",
              ],
            },
            legalActions: {
              title: "ሊወስዷቸው የሚችሏቸው ህጋዊ እርምጃዎች",
              actions: [
                "በፌዴራል ፖሊስ የሳይበር ወንጀል ምርመራ ክፍል የወንጀል ቅሬታ ያቅርቡ",
                "ከጥፋተኛው ላይ ከፍርድ ቤት የጥበቃ ትዕዛዝ ይፈልጉ",
                "በመስመር ላይ ጥቃት ለደረሰው ጉዳት የሲቪል ክስ ያቅርቡ",
                "በኢትዮጵያ ህግ መሰረት ይዘት እንዲወገድ ከመድረኮች ይጠይቁ",
                "ለድጋፍ ለሴቶችና ማህበራዊ ጉዳይ ሚኒስቴር ሪፖርት ያድርጉ",
                "እንደ EWLA ባሉ ድርጅቶች በኩል ነፃ የህግ እርዳታ ያግኙ",
                "ለደረሰው ጉዳት ማካካሻ ይፈልጉ",
              ],
            },
            evidenceCollection: {
              title: "ለህግ ሂደት ማስረጃ መሰብሰብ",
              steps: [
                "ሙሉውን አውድ የሚያሳዩ ቅጽበታዊ ገጽ እይታዎችን ያንሱ (ቀናትን፣ ሰዓቶችን፣ የተጠቃሚ ስሞችን ጨምሮ)",
                "ዋናውን መልእክቶች፣ ኢሜይሎች እና ማሳወቂያዎች ያስቀምጡ",
                "የURL እና የመድረክ ስሞችን ይመዝግቡ",
                "የሁሉንም ክስተቶች ቀናት እና ሰዓቶች ይመዝግቡ",
                "የክስተቶችን እና በእርስዎ ላይ ያላቸውን ተጽእኖ ዝርዝር የተፃፈ መግለጫ ያስቀምጡ",
                "ማንኛውንም አካላዊ ማስረጃ ያቆዩ (መሳሪያዎች፣ ተገቢ ከሆነ SIM ካርዶች)",
                "ጥቃቱን ሌሎች የተመለከቱ ከሆነ የምስክር መግለጫዎችን ያግኙ",
                "ምንም ነገር አይሰርዙ - ለመያዝ አስቸጋሪ ቢሆንም",
              ],
            },
            reporting: {
              title: "የት ሪፖርት ማድረግ እንደሚችሉ",
              options: [
                "የፌዴራል ፖሊስ የሳይበር ወንጀል ምርመራ ክፍል (+251-111-572355)",
                "የአቃቤ ህግ የሴቶች እና ህፃናት ጉዳይ ጽ/ቤት",
                "የመድረክ ሪፖርት ማድረጊያ ዘዴዎች (ፌስቡክ፣ ኢንስታግራም፣ ትዊተር፣ ወዘተ)",
                "የኢትዮጵያ የሴቶች ጠበቆች ማህበር (EWLA) ለህግ እርዳታ",
                "ብሔራዊ የGBV ስልክ መስመር (8383) ለፈጣን ድጋፍ",
                "የሴቶችና ማህበራዊ ጉዳይ ሚኒስቴር",
              ],
            },
          },
          psychologicalImpact: {
            title: "የስነ-ልቦና ተጽእኖን መረዳት",
            description: "የመስመር ላይ ጾታን መሰረት ያደረገ ጥቃት ከባድ የስነ-ልቦና ተጽእኖዎች ሊኖረው ይችላል። እነዚህን ተጽእኖዎች መለየት ወደ ማገገም እና መመለስ የመጀመሪያው እርምጃ ነው።",
            commonEffects: {
              title: "የተለመዱ የስነ-ልቦና ተጽእኖዎች",
              effects: [
                "ጭንቀት፣ ፍርሃት እና ስለ ደህንነት ቀጣይነት ያለው ጭንቀት",
                "ድብርት፣ ሀዘን እና የተስፋ መቁረጥ ስሜቶች",
                "ከድንጋጤ በኋላ የጭንቀት ችግር (PTSD) ምልክቶች",
                "የእንቅልፍ መስተጓጎል፣ ቅዠቶች ወይም እንቅልፍ ማጣት",
                "በሌሎች ላይ እምነት ማጣት እና ግንኙነቶችን መፍጠር ከባድ ነው",
                "ማህበራዊ መገለል እና ማግለል",
                "ዝቅተኛ የራስ ክብር እና እራስን መውቀስ",
                "ትኩረት ማድረግ ወይም ውሳኔዎችን ማድረግ ከባድ ነው",
                "እንደ ራስ ምታት፣ የሆድ ችግሮች ወይም ድካም ያሉ አካላዊ ምልክቶች",
                "እንደ መቋቋሚያ ዘዴ የመድሃኒት አጠቃቀም መጨመር",
              ],
            },
            validatingFeelings: {
              title: "ስሜቶችዎ ትክክል ናቸው",
              messages: [
                "የደረሰብዎት ነገር የእርስዎ ጥፋት አይደለም",
                "የስሜት ምላሽዎ መደበኛ እና ሊገባ የሚችል ነው",
                "ቁጣ፣ ፍርሃት፣ ሀዘን ወይም ግራ መጋባት የመሰማት መብት አለዎት",
                "የመስመር ላይ ጥቃት እውነተኛ ጥቃት ነው - ህመምዎ ህጋዊ ነው",
                "ለመሰማት 'ትክክለኛ መንገድ' ወይም ለማገገም 'ትክክለኛ ጊዜ ሰሌዳ' የለም",
                "እርዳታ መፈለግ የጥንካሬ ምልክት ነው፣ የድክመት አይደለም",
              ],
            },
            copingStrategies: {
              title: "ጤናማ የመቋቋሚያ ስልቶች",
              strategies: [
                "ለሚታመኑት ሰው ይናገሩ - ጓደኞች፣ ቤተሰብ ወይም አማካሪ",
                "እራስን መንከባከብን ይለማመዱ፡ በቂ እንቅልፍ፣ ምግብ እና የአካል ብቃት እንቅስቃሴ",
                "ከቴክኖሎጂ ጋር ገደቦችን ያስቀምጡ - ከማህበራዊ ሚዲያ እረፍት ይውሰዱ",
                "ደስታ እና መዝናናትን የሚያመጡ እንቅስቃሴዎችን ይሳተፉ",
                "ተመሳሳይ ልምዶች ካላቸው ሌሎች ጋር የድጋፍ ቡድኖችን ይቀላቀሉ",
                "ሀሳቦችዎን እና ስሜቶችዎን ለማስኬድ ማስታወሻ ያስቀምጡ",
                "ትኩረትን፣ ማሰላሰልን ወይም ጥልቅ የመተንፈስ ልምምዶችን ይለማመዱ",
                "አስፈላጊ ሲሆን ሙያዊ የአእምሮ ጤና ድጋፍ ይፈልጉ",
              ],
            },
            whenToSeekHelp: {
              title: "መቼ ሙያዊ እርዳታ መፈለግ እንዳለብዎት",
              signs: [
                "እራስዎን የመጉዳት ወይም ራስን የማጥፋት ሀሳቦች እያጋጠመዎት ከሆነ",
                "ምልክቶች ከጥቂት ሳምንታት በላይ ከቀጠሉ",
                "የዕለት ተዕለት እንቅስቃሴዎችን ማከናወን እስከማይችሉ ድረስ",
                "ለመቋቋም መድሃኒቶችን እየተጠቀሙ ከሆነ",
                "የድንጋጤ ጥቃቶችን ወይም ከባድ ጭንቀትን እያጋጠመዎት ከሆነ",
                "ተገልሎ እንደሚሰማዎት እና ወደ ወዳጆችዎ መድረስ እስከማይችሉ ድረስ",
                "በመመገብ ወይም በመተኛት ዘይቤዎች ላይ ለውጦችን ካስተዋሉ",
              ],
              resources: [
                "ሳይኮሎጂስት ወይም ሳይካይትሪስትን ያነጋግሩ",
                "ለምክር አገልግሎቶች AWASADን ያነጋግሩ",
                "ለፈጣን ድጋፍ ብሔራዊ የGBV ስልክ መስመር (8383) ይደውሉ",
                "ለስነ-ልቦናዊ እርዳታ ከየነገ ተስፋ ድጋፍ ይፈልጉ",
                "በNGOዎች የሚመራ የድጋፍ ቡድኖችን ይቀላቀሉ",
              ],
            },
            supportingOthers: {
              title: "የመስመር ላይ GBV እያጋጠመው ያለን ሰው መደገፍ",
              howToHelp: [
                "ያምኑዋቸው - ተሞክሮዎን አይጠይቁ ወይም አያጠራጠሩ",
                "ያለ ፍርድ ያዳምጡ እና ስሜቶቻቸውን ያረጋግጡ",
                "እንዴት እንደሚናገሩ ውሳኔዎቻቸውን እና ራስን በራስ የማስተዳደር ችሎታቸውን ያክብሩ",
                "ጥፋትን ሊያመለክቱ የሚችሉ 'ለምን' ጥያቄዎችን ያስወግዱ",
                "ተግባራዊ እርዳታ ያቅርቡ፡ ሪፖርት ለማድረግ በማስታ ያነጋግሩዋቸው፣ ግብዓቶችን ማግኘት",
                "ወዲያውኑ አደጋ ካልሆነ በስተቀር ሚስጥራዊነትን ያስጠብቁ",
                "ትእግስት ይኑርዎት - ማገገም ጊዜ ይወስዳል እና መስመራዊ አይደለም",
                "ሙያዊ እርዳታን ያበረታቱ ግን አይገድዷቸው",
                "በመደገፍዎ ጊዜ የራስዎን የአእምሮ ጤና ይንከባከቡ",
              ],
            },
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
  om: {
    nav: {
      home: "Fuula Duraa",
      upload: "Miidhaa Gabaasi",
      resources: "Deeggarsa",
      about: "Waa'ee Keenya",
    },
    landing: {
      title: "Qofa keessan miti",
      subtitle: "SafeNet.ai miidhaa toora interneetaa irratti raawwatamu galmeessuu, xiinxaluu fi tarkaanfii seeraa fudhachuuf isin gargaara",
      cta: "Miidhaa Gabaasi",
      safeExit: "Bahiinsa Ariifachiisaa",
      features: {
        analyze: {
          title: "Xiinxala AI",
          description: "AI'n ammayyaa gosa miidhaa fi sadarkaa balaa addaan baasa",
        },
        evidence: {
          title: "Ragaa Funaanuu",
          description: "Adeemsa seeraatiif galmee ragaa hin jijjiiramne qopheessaa",
        },
        support: {
          title: "Deeggarsa Argadhaa",
          description: "Dhaabbilee NGO, gargaarsa seeraa fi toora bilbilaa Itoophiyaa waliin walqunnamaa",
        },
      },
      privacy: "Nageenyi keessan eegamaadha. Daataan hundi akka iccitii ta'etti eegama, guyyoota 30 booda ni haqama.",
    },
    upload: {
      title: "Miidhaa Dijitaalaa Gabaasi",
      subtitle: "Suuraa (screenshot) fe'aa ykn qabiyyee ergaa miidhaa asitti maxxansaa",
      dropzone: "Suuraa asitti buusaa ykn fe'uuf cuqqaalaa",
      dropzoneHint: "JPG, PNG, WebP ni deeggara (hanga 10MB)",
      orText: "YKAA",
      textPlaceholder: "Ergaa ykn qabiyyee miidhaa asitti maxxansaa...",
      platform: "Kun eessatti raawwatame?",
      platformPlaceholder: "Waltajjii filadhaa",
      submit: "Qabiyyee Qoradhu",
      submitting: "Qorachaa jira...",
      warning: "Akeekkachiisa: Xiinxalli kun qabiyyee nama dhiphisu qabaachuu danda'a.",
      emergencyTitle: "Gargaarsa Ariifachiisaa Barbaadduu?",
      emergencyText: "Balaa irra yoo jiraattan bilbiloota gargaarsa GBV Itoophiyaa bilbilaa:",
      hotlines: ["7711", "6388", "8044"],
      evidenceMode: {
        title: "📸 Ragaa Fe'aa (Suuraa)",
        description: "Galmee seeraa fi adeemsa ragaa qabatamaa qopheessuuf",
        features: [
          "AI'n qabiyyee suuraa ni qorata",
          "Ragaa PDF hin jijjiiramne uuma",
          "Iyyannoo seeraa qopheessa",
          "Qaamolee seeraatiif dhiyaata"
        ]
      },
      conversationalMode: {
        title: "💬 Gorsa Argadhaa (Barreeffama)",
        description: "Gorsa nageenyaa fi qajeelfama deeggarsaa argachuuf",
        features: [
          "Qabiyyee xiinxaluuf qoodaa",
          "Gorsa nageenyaa dhuunfaa argadhaa",
          "Yaada deeggarsaa fudhadhaa",
          "Iccitiin kan eegamee fi murtii malee"
        ]
      },
      howItWorks: "Akkamitti akka hojjetu",
    },
    results: {
      title: "Bu'aa Xiinxalaa",
      category: "Gosa Miidhaa",
      severity: "Qabxii Hamaa",
      riskLevel: "Sadarkaa Balaa",
      confidence: "Amanamummaa",
      rationale: "Xiinxala",
      flaggedPhrases: "Jechoota Balaa Qaban",
      extractedText: "Qabiyyee Baafame",
      adviceTitle: "Gorsa Nageenyaa",
      conversationalNote: "Barreeffama qooddan irratti hundaa'uun, xiinxalli fi gorsi keenya kanadha:",
      evidenceNote: "Xiinxalli kun ragaa dhiyeessitan irratti hundaa'eeti.",
      actions: {
        evidence: "Ragaa PDF Buufadhu",
        complaint: "Iyyannoo Seeraa Uumi",
        resources: "Deeggarsa Barbaadi",
        newReport: "Gabaasa Biraa Dhiyeessi",
      },
      risk: {
        high: "SODDAA OLAANAA - Deeggarsa ariifachiisaan gorfama",
        medium: "SODDAA GIDDU-GALEESSA - Deeggarsa barbaaduu yaadaa",
        low: "SODDAA GADI-AANAA",
      },
    },
    chat: {
      title: "Haasa'a Deeggarsaa",
      subtitle: "Gorsa Nageenyaa AI Yeroo Hunda",
      placeholder: "Waan yaaddoo isinitti ta'e asitti barreessaa... (asitti eegamtuudha)",
      send: "Ergi",
      thinking: "AI'n yaadaa jira...",
      privacy: "🤖 Gargaaraa AI Owtomaatikii • Iccitiin Eegamaadha",
      inDanger: "Balaa Ariifachiisaa Keessa Jirtuu?",
      emergency: "Deeggarsa Ariifachiisaa",
      typing: "Gargaaraan AI barreessaa jira...",
      initialMessage: "Akkam jirtu, ani gargaaraa AI SafeNet ti. Gorsa nageenya dijitaalaa fi ragaa seeraa isiniif kennuuf as jira. Hubachiisa: Kun sirna AI ti malee nama gorsaa miti. Har'a akkamittan si gargaaruu danda'a? 🤖💙",
    },
    resources: {
      title: "Qabeenyaalee Deeggarsaa",
      subtitle: "Dhaabbilee isin gargaaruu danda'an",
      filterRegion: "Naannoodhaan calali",
      allRegions: "Naannolee hunda",
      mainTabs: {
        resources: "Dhaabbilee Deeggarsaa",
        gbvInfo: "Oduu GBV",
      },
      types: {
        ngo: "NGO",
        legal_aid: "Gargaarsa Seeraa",
        helpline: "Toora Bilbilaa",
        shelter: "Bakka Jireenyaa",
      },
      gbvInfo: {
        title: "Miidhaa Koorniyaa Toora Interneetaa Hubachuu",
        subtitle: "Gosa miidhaalee dijitaalaa fi akkaataa of irraa ittisan baraa",
        tabs: {
          overview: "Waliigala",
          cyberstalking: "Hordoffii Saayibarii",
          harassment: "Miidhaa fi Qoccolloo",
          impersonation: "Eenyummaa Falsuu",
          doxing: "Odeeffannoo Dhuunfaa Facaasuu",
          imageAbuse: "Miidhaa Suuraa",
          prevention: "Ittisa & Nageenya",
          legalRights: "Mirga Seeraa",
          psychologicalImpact: "Dhiibbaa Xiinsammuu",
        },
        content: {
          overview: {
            title: "Miidhaan Koorniyaa Dijitaalaa Maali?",
            description: "Miidhaan koorniyaa toora interneetaa irratti raawwatamu miidhaa koorniyaa irratti hundaa'ee meeshaalee dijitaalaatiin namoota irratti raawwatamudha.",
            keyPoints: [
              "Yakka cimaa mirga namoomaa sarbudha",
              "Dubartoota fi shamarran irratti caalaatti qaqqaba",
              "Miidiyaa hawaasaa fi ergaawwan hunda irratti mul'achuu danda'a",
              "Dhiibbaan isaa akkuma miidhaa qaamaa hamaadha",
              "Mirgi nageenya toora interneetaa keessanii kabajamuu qaba",
            ],
          },
          cyberstalking: {
            title: "Hordoffii Saayibarii (Cyberstalking)",
            description: "Deddeebisanii hordofuu fi sodaa itti uumuudha.",
            signs: ["Ergaawwan baay'ee ergamuu", "Sochii toora interneetaa to'achuu", "Bakka jirtan beekuu agarsiisuu"],
            actions: ["Ragaa qabadhaa", "Gara cufaa (block) godhaa", "Toora bilbilaa 7711 ykn 991 bilbilaa"]
          },
          harassment: {
            title: "Miidhaa fi Qoccolloo Toora Interneetaa",
            description: "Jecha jibbiinsaa, arrabsoo fi sodaachisuudha.",
            signs: ["Ergaa sodaachisaa fudhachuu", "Miidhaa walxaxaa qaqqabuu"],
            actions: ["Deebii hin kenninaa", "Ragaa galmeessaa", "Gargaarsa seeraa barbaadaa"]
          },
          impersonation: {
            title: "Eenyummaa Falsuu",
            description: "Maqaa fi suuraa keessan fayyadamuun herrega sobaa banuu.",
            signs: ["Herrega maqaa keessaniin baname arguu", "Oduu sobaa faca'u"],
            actions: ["Waltajjiitti gabaasaa", "Jecha icciitii jijjiiraa"]
          },
          doxing: {
            title: "Odeeffannoo Dhuunfaa Facaasuu (Doxing)",
            description: "Osoo hayyama hin qabaatin teessoo, bilbila fi ragaa dhuunfaa baasuu.",
            signs: ["Odeeffannoon iccitii toorarratti ba'uu"],
            actions: ["Haqsiisuuf iyyadhaa", "Poolisiitti gabaasaa"]
          },
          imageAbuse: {
            title: "Miidhaa Suuraa fi Viidiyoo",
            description: "Suuraa qaama saalaa fi dhuunfaa osoo hin heyyamin facaasuu ykn sodaachisuu.",
            signs: ["Suuraan faca'a jedhamee sodaachifamuu"],
            actions: ["Kaffaltii hin kaffalinaa", "Ragaa qabadhaa", "7711 ykn 991 bilbilaa"]
          },
          prevention: {
            title: "Ittisa & Nageenya Dijitaalaa",
            description: "Tarkaanfii of eeggannoo nageenya dijitaalaa keessan eeguuf gargaaran.",
            privacySettings: {
              title: "Nageenya Herregaa",
              tips: [
                "Iccitii cimaa fayyadamaa",
                "Mirkaneessa sadarkaa lamaa (2FA) banadhaa",
                "Suuraa dhuunfaa nama hin amanamneef hin erginaa"
              ]
            },
            supportingOthers: {
              title: "Nama Miidhame Deeggaruu",
              howToHelp: [
                "Dhaggeeffadhaa, hin xiyyeeffatinaa",
                "Isaan hin komatinaa",
                "Toora gargaarsaa 7711 fi EWLA akka argatan gargaaraa"
              ]
            }
          }
        }
      }
    },
    common: {
      loading: "Fe'aa jira...",
      error: "Rakkoon uumameera",
      retry: "Irra deebi'ii yaali",
      back: "Duubatti",
      download: "Buufadhu",
      showContent: "Qabiyyee Agarsiisi",
      hideContent: "Qabiyyee Dhoksi",
    },
  },
  ti: {
    nav: {
      home: "መበገሲ",
      upload: "ጥርዓን ኣቕርብ",
      resources: "ጸጋታት / ሓገዝ",
      about: "ብዛዕባና",
    },
    landing: {
      title: "በይንኹም ኣይኮንኩምን",
      subtitle: "SafeNet.ai ኣብ መርበብ ሓበሬታ ዝበጽሕ መጥቃዕቲ ንምምዝጋብ፡ ንምምርማርን ሕጋዊ ስጉምቲ ንምውሳድን ይሕግዘኩም",
      cta: "ጥርዓን ኣቕርብ",
      safeExit: "ቅልጡፍ መውጺኢ",
      features: {
        analyze: {
          title: "ምርመራ AI",
          description: "ዘመናዊ AI ዓይነትን ደረጃን መጥቃዕቲ ፈሊዩ ጉዳይኩም የትርረልኩም",
        },
        evidence: {
          title: "ምእካብ መርትዖ",
          description: "ንሕጋዊ ከይዲ ዘገልግል ዘይቅየር ናይ መርትዖ ሰነድ የዳሉ",
        },
        support: {
          title: "ሓገዝ ርኸቡ",
          description: "ምስ ማሕበራት፡ ሕጋዊ ሓገዝን መስመራት ህጹጽ ረድኤትን ኢትዮጵያ ርኸቡ",
        },
      },
      privacy: "ድሕነትኩም ውሑስ እዩ። ኩሉ ሓበሬታ ምስጢራዊ ኮይኑ ድሕሪ 30 መዓልታት ብኡንብኡ ይድምሰስ።",
    },
    upload: {
      title: "ናይ ዲጂታል መጥቃዕቲ መዝግቡ",
      subtitle: "ስእሊ ስክሪንሾት ጽዓኑ ወይ ድማ ናይቲ መጥቃዕቲ መልእኽቲ ለጥፉ",
      dropzone: "ስእሊ ኣብዚ ደርብዩ ወይ ንምምራጽ ጠውቑ",
      dropzoneHint: "JPG, PNG, WebP ይድግፍ (ክሳብ 10MB)",
      orText: "ወይ",
      textPlaceholder: "መልእኽቲ መጥቃዕቲ ኣብዚ ለጥፉ...",
      platform: "እዚ ፍጻመ ኣብ ኣየናይ መድረኽ ተፈጺሙ?",
      platformPlaceholder: "መድረኽ ምረጹ",
      submit: "ትሕዝቶ መርምር",
      submitting: "ይምርመር ኣሎ...",
      warning: "መጠንቀቕታ: እዚ ምርመራ ዘጨንቕ ትሕዝቶታት ከርኢ ይኽእል እዩ።",
      emergencyTitle: "ህጹጽ ሓገዝ ትደልዩ ዶ?",
      emergencyText: "ኣብ ሓደጋ እንተሃሊኹም ናብዞም ናጻ መስመራት ደውሉ:",
      hotlines: ["7711", "6388", "8044"],
      evidenceMode: {
        title: "📸 መርትዖ ጽዓኑ (ስክሪንሾት)",
        description: "ንሕጋዊ ሰነድን ንፖሊስን ዘገልግል",
        features: [
          "AI ንትሕዝቶ ስእሊ ይምርምር",
          "ዘይቅየር ናይ መርትዖ PDF የዳሉ",
          "ሕጋዊ ናይ ክሲ ሰነድ የውጽእ",
          "ንሕጋውያን ኣካላት ዝቐርብ"
        ]
      },
      conversationalMode: {
        title: "💬 ምኽሪ ረኸቡ (ጽሑፍ ጥራይ)",
        description: "ናይ ስነ-ልቦና ደገፍን ድሕነትን ምኽሪ ንምርካብ",
        features: [
          "ትሕዝቶ ንምግምጋም ኣካፍሉ",
          "ናይ ድሕነት ምኽሪ ረኸቡ",
          "ናይ ደገፍ ሓሳባት ተቐበሉ",
          "ምስጢራውን ብዘይ ፍርድን"
        ]
      },
      howItWorks: "ብኸመይ ይሰርሕ",
    },
    results: {
      title: "ውጽኢት ምርመራ",
      category: "ዓይነት መጥቃዕቲ",
      severity: "መጠን ከበድቲ",
      riskLevel: "ደረጃ ሓደጋ",
      confidence: "ምትእምማን",
      rationale: "ትንተና",
      flaggedPhrases: "ዝተለለዩ ኣስገእቲ ቃላት",
      extractedText: "ዝወጸ ጽሑፍ",
      adviceTitle: "ናይ ድሕነት ምኽሪ",
      conversationalNote: "ብመሰረት ዘካፈልክምዎ ጽሑፍ፡ ገምጋምናን ምኽርናን እዚ ይመስል:",
      evidenceNote: "እዚ ትንተና ኣብ ዘቕረብክምዎ መርትዖ ዝተመርኮሰ እዩ።",
      actions: {
        evidence: "መረዳእታ PDF ኣውርድ",
        complaint: "ሕጋዊ ጥርዓን ኣዳሉ",
        resources: "ደገፍ ድለዩ",
        newReport: "ካልእ ሪፖርት ኣቕርብ",
      },
      risk: {
        high: "ላዕለዋይ ሓደጋ - ህጹጽ ደገፍ ይምከር",
        medium: "ማእከላይ ሓደጋ - ደገፍ ምድላይ ሕሰቡ",
        low: "ትሑት ሓደጋ",
      },
    },
    chat: {
      title: "ናይ ደገፍ ቻት",
      subtitle: "24/7 ናይ AI ናይ ድሕነት ምኽሪ",
      placeholder: "ዝስምዓኩም ዘሎ ኣካፍሉ... (ኣብዚ ውሑስ ኢኹም)",
      send: "ስደድ",
      thinking: "AI ይሓስብ ኣሎ...",
      privacy: "🤖 ኣውቶማቲክ ናይ AI ሓጋዚ • ምስጢራዊ",
      inDanger: "ኣብ ህጹጽ ሓደጋ ዲኹም ዘለኹም?",
      emergency: "ህጹጽ ደገፍ",
      typing: "ናይ AI ረዳእቲ ይጽሕፍ ኣሎ...",
      initialMessage: "ሰላም፡ ኣነ ናይ SafeNet ኣውቶማቲክ ናይ AI ድሕነት ረዳእቲ እየ። ናይ ዲጂታል ድሕነትን መርትዖ ምዕቃብን ምኽሪ ክህበኩም ድሉው ኣለኹ። መተሓሳሰቢ፡ እዚ ናይ AI ቴክኖሎጂ እዩ እምበር ሰብ ኣይኮነን። ሎሚ ብምንታይ ክሕግዘኩም ይኽእል? 🤖💙",
    },
    resources: {
      title: "ናይ ደገፍ ጸጋታት",
      subtitle: "ክሕግዙኹም ዝኽእሉ ማሕበራት",
      filterRegion: "ብዞባ ኣጣሪ",
      allRegions: "ኩሎም ዞባታት",
      mainTabs: {
        resources: "ማሕበራት ደገፍ",
        gbvInfo: "ሓበሬታ GBV",
      },
      types: {
        ngo: "NGO",
        legal_aid: "ሕጋዊ ሓገዝ",
        helpline: "ናይ ሓገዝ መስመር",
        shelter: "መዕቆቢ",
      },
      gbvInfo: {
        title: "ዲጂታል መጥቃዕቲ ጾታ ምርዳእ",
        subtitle: "ዓይነታት ዲጂታል መጥቃዕትን ሜላታት ምክልኻልን ፍለጡ",
        tabs: {
          overview: "ሓፈሻዊ",
          cyberstalking: "ምክትታል ሳይበር",
          harassment: "ምግልባጥን ምፍርራህን",
          impersonation: "ምስሊ ምውሳድ",
          doxing: "ናይ ብሕቲ ሓበሬታ ምዝርጋሕ",
          imageAbuse: "መጥቃዕቲ ምስሊ",
          prevention: "ምክልኻልን ድሕነትን",
          legalRights: "ሕጋዊ መሰላት",
          psychologicalImpact: "ስነ-ልቦናዊ ጽልዋ",
        },
        content: {
          overview: {
            title: "ናይ መርበብ ሓበሬታ መጥቃዕቲ ጾታ እንታይ እዩ?",
            description: "ብዲጂታል መሳርሒታት ኣቢሉ ኣብ ልዕሊ ሰባት ብጾታ ምኽንያት ዝፍጸም ጎዳኢ ተግባር እዩ።",
            keyPoints: [
              "ሰብኣዊ መሰላት ዝጥሕስ ከቢድ ገበን እዩ",
              "ብፍላይ ደቂ ኣንስትዮን ኣዋልድን ይጥቃዓ",
              "ኣብ ዝኾነ ናይ ማሕበራዊ ሚዲያ መድረኽ ከጋጥም ይኽእል",
              "ጽልዋኡ ከምቲ ናይ ገጽ ንገጽ መጥቃዕቲ ሓደገኛ እዩ",
              "ናይ መርበብ ሓበሬታ ድሕነትኩም ናይ ምሕላው መሰል ኣለኩም",
            ],
          },
          cyberstalking: {
            title: "ምክትታል ሳይበር (Cyberstalking)",
            description: "ተደጋጋሚ ምክትታልን ፍርሒ ምፍጣርን።",
            signs: ["ብዙሕ መልእኽትታት ምስዳድ", "ናይ ኦንላይን ምንቅስቓስኩም ምቁጽጻር"],
            actions: ["መረዳእታታት ሰንዱ", "ብኡንብኡ ዕጸዉ (Block)", "ናብ 7711 ወይ 991 ደውሉ"]
          },
          harassment: {
            title: "ናይ ኦንላይን ምፍርራህ",
            description: "ጸርፊ፡ ናይ ጽልኢ ዘረባን ምፍርራህን።",
            signs: ["ናይ ምፍርራህ መልእኽትታት ምርካብ"],
            actions: ["መልሲ ኣይትሃቡ", "መርትዖታት ኣክቡ", "ሕጋዊ ሓገዝ ሕተቱ"]
          },
          impersonation: {
            title: "ናይ ሓሶት መንነት ምፍጣር",
            description: "ብሽምኩምን ስእልኹምን ናይ ሓሶት ኣካውንት ምኽፋት።",
            signs: ["ብሽምኩም ዝተኸፍተ ኣካውንት ምርኣይ"],
            actions: ["ናብቲ ፕላትፎርም ኣመልክቱ", "ፓስዎርድኩም ቀይሩ"]
          },
          doxing: {
            title: "ናይ ብሕቲ ሓበሬታ ምዝርጋሕ (Doxing)",
            description: "ኣድራሻኹም፡ ስልክኹምን ናይ ብሕቲ ምስጢርኩምን ምብታን።",
            signs: ["ናይ ብሕቲ ሰነዳት ኣብ ኦንላይን ምርኣይ"],
            actions: ["ክድምሰስ ሕተቱ", "ንፖሊስ ሓብሩ"]
          },
          imageAbuse: {
            title: "መጥቃዕቲ ምስሊን ስእልን",
            description: "ዘይግቡእ ናይ ብሕቲ ስእልታት ምዝርጋሕ ወይ ምፍርራህ።",
            signs: ["ስእልኺ ክዝርግሖ እየ ምባል"],
            actions: ["ገንዘብ ኣይትኽፈሉ", "መረዳእታ ሓዙ", "ናብ 7711 ወይ 991 ደውሉ"]
          },
          prevention: {
            title: "ምክልኻልን ድሕነትን",
            description: "ንዲጂታል ድሕነትኩም ዝሕግዙ ኣገደስቲ ስጉምትታት።",
            privacySettings: {
              title: "ናይ ድሕነት ቅጥዕታት",
              tips: [
                "ሓያል ፓስዎርድ ተጠቐሙ",
                "ናይ ክልተ-ደረጃ መረጋገጺ (2FA) ኣስርሑ",
                "ናይ ብሕቲ ስእልታት ንዘይትኣምንዎም ሰባት ኣይትስደዱ"
              ]
            },
            supportingOthers: {
              title: "ንዝተጎድአ ሰብ ምድጋፍ",
              howToHelp: [
                "እመኑዎም፡ ኣይትጠራጠሩ",
                "ኣይትውቀሱዎም",
                "ናብ EWLAን 7711ን ሓገዝ ክረኽቡ ሓግዙዎም"
              ]
            }
          }
        }
      }
    },
    common: {
      loading: "ይጽዕን ኣሎ...",
      error: "ጸገም ኣጋጢሙ",
      retry: "ደጊምካ ፈትን",
      back: "ተመለስ",
      download: "ኣውርድ",
      showContent: "ትሕዝቶ ኣርኢ",
      hideContent: "ትሕዝቶ ሕባእ",
    },
  },
  so: {
    nav: {
      home: "Guriga",
      upload: "Gudbi Xadgudub",
      resources: "Xarumaha Taageerada",
      about: "Nagu Saabsan",
    },
    landing: {
      title: "Keligaa ma tihid",
      subtitle: "SafeNet.ai waxay kaa caawinaysaa inaad diiwaangeliso, falanqeyso, oo aad tallaabo sharciyeed ka qaaddo xadgudubyada internetka",
      cta: "Gudbi Xadgudub",
      safeExit: "Ka-bixid Degdeg ah",
      features: {
        analyze: {
          title: "Falanqaynta AI",
          description: "AI casri ah ayaa kala saarta nooca xadgudubka iyo heerka halista",
        },
        evidence: {
          title: "Ururinta Caddeymaha",
          description: "Soo saar dukumenti caddeyn ah oo aan la beddeli karin oo sharciga hortiisa gala",
        },
        support: {
          title: "Hel Taageero",
          description: "La xiriir hay'adaha NGO-yada, gargaarka sharciga, iyo khadadka caawimada ee Itoobiya",
        },
      },
      privacy: "Badbaadadaadu waa dhowran tahay. Xogta oo dhan waa la sir-xafiday oo si toos ah ayaa loo tirtirayaa 30 maalmood ka dib.",
    },
    upload: {
      title: "Diiwaangeli Xadgudubka Internetka",
      subtitle: "Soo rar sawir screenshot ah ama dheji qoraalka fariinta xadgudubka ah",
      dropzone: "Halkan soo dhig sawirka ama guji si aad u soo rarto",
      dropzoneHint: "Waxay taageertaa JPG, PNG, WebP (ugu badnaan 10MB)",
      orText: "AMA",
      textPlaceholder: "Dheji fariinta xadgudubka ah halkan...",
      platform: "Xagee arrintani ka dhacday?",
      platformPlaceholder: "Dooro madasha",
      submit: "Falanqee Nuxurka",
      submitting: "Waa la falanqeynayaa...",
      warning: "Digniin: Falanqayntu waxay muujin kartaa nuxur dhib ama dhiillo leh.",
      emergencyTitle: "Ma u Baahan Tahay Caawimo Degdeg ah?",
      emergencyText: "Haddii aad ku jirto halis degdeg ah, wac khadadka caawimada GBV ee Itoobiya:",
      hotlines: ["7711", "6388", "8044"],
      evidenceMode: {
        title: "📸 Soo rar Caddeyn (Sawir)",
        description: "Diiwaangelin rasmi ah iyo dacwado sharciyeed",
        features: [
          "AI waxay falanqaysaa nuxurka sawirka",
          "Soo saar caddeyn PDF ah oo aan la faragelin karin",
          "Diyaari dacwad sharciyeed",
          "Dukumenti rasmi ah oo booliska loo gudbiyo"
        ]
      },
      conversationalMode: {
        title: "💬 Hel Talo (Qoraal Keliya)",
        description: "Hanuunin taageero iyo talooyin badbaado",
        features: [
          "Wadaag nuxurka si loo qiimeeyo",
          "Hel talooyin badbaado oo gaar ah",
          "Hel talooyin taageero ah",
          "Sir ah oo aan xukun lahayn"
        ]
      },
      howItWorks: "Sida ay u shaqeyso",
    },
    results: {
      title: "Natiijooyinka Falanqaynta",
      category: "Qaybta Xadgudubka",
      severity: "Heerka Darnaanta",
      riskLevel: "Heerka Halista",
      confidence: "Kalsoonida",
      rationale: "Falanqaynta",
      flaggedPhrases: "Weedhaha Khatarta ah ee la Helay",
      extractedText: "Qoraalka Laga Soo Saaray",
      adviceTitle: "Talada Badbaadada",
      conversationalNote: "Iyada oo lagu saleynayo qoraalka aad wadaagtay, halkan waa qiimeyntayada iyo taladeena:",
      evidenceNote: "Falanqayntani waxay ku saleysan tahay caddeymaha aad bixisay.",
      actions: {
        evidence: "Degso Caddeynta PDF",
        complaint: "Diyaari Dacwada Sharciga",
        resources: "Raadso Taageero",
        newReport: "Gudbi Warbixin Kale",
      },
      risk: {
        high: "HALIS SARE - Waxaa lagula talinayaa caawimo degdeg ah",
        medium: "HALIS DHEX-DHEXAAD AH - Ka fiirso raadinta caawimo",
        low: "HALIS HOOSE",
      },
    },
    chat: {
      title: "Sheekaysiga Taageerada",
      subtitle: "Hanuuninta Badbaadada ee AI 24/7",
      placeholder: "La wadaag waxa maskaxdaada ku jira... (halkan waad ku badbaaddaa)",
      send: "Dir",
      thinking: "AI wuu fekerayaa...",
      privacy: "🤖 Caawiyaha AI ee Tooska ah • Qarsoodi ah",
      inDanger: "Ma ku Jirtaa Halis Degdeg ah?",
      emergency: "Taageero Degdeg ah",
      typing: "Caawiyaha AI ayaa qoraya...",
      initialMessage: "Nabadeey, waxaan ahay caawiyaha tooska ah ee AI ee SafeNet. Waxaan halkan u joogaa inaan ku siiyo talooyin badbaado digital ah iyo agabka sharciga. Fiiro gaar ah: Kani waa nidaam AI ah, maaha la-taliye qof bini'aadan ah. Sideen kuu caawin karaa maanta? 🤖💙",
    },
    resources: {
      title: "Xarumaha Taageerada",
      subtitle: "Ururada ku caawin kara",
      filterRegion: "Ku kala saar gobolka",
      allRegions: "Dhammaan gobollada",
      mainTabs: {
        resources: "Xarumaha Taageerada",
        gbvInfo: "Xogta GBV",
      },
      types: {
        ngo: "NGO",
        legal_aid: "Gargaarka Sharciga",
        helpline: "Khadka Caawimada",
        shelter: "Hoyga Gabbaadka",
      },
      gbvInfo: {
        title: "Fahamka Xadgudubka Jinsiga ee Internetka",
        subtitle: "Baro noocyada kala duwan ee xadgudubka internetka iyo sida looga hortago",
        tabs: {
          overview: "Dulmar",
          cyberstalking: "Dabagalka Internetka",
          harassment: "Dhibaateynta",
          impersonation: "Isku-yeelidda Qof Kale",
          doxing: "Faafinta Xogta Gaarka ah",
          imageAbuse: "Xadgudubka Sawirrada",
          prevention: "Kahortagga & Badbaadada",
          legalRights: "Xuquuqdaada Sharciga ah",
          psychologicalImpact: "Saameynta Maskaxda",
        },
        content: {
          overview: {
            title: "Waa Maxay GBV-ga Internetka?",
            description: "Xadgudubka ku saleysan jinsiga ee tiknoolojiyadda fududaysay waa ficil waxyeello leh oo loo adeegsado aaladaha dijitaalka ah.",
            keyPoints: [
              "Waa dambi culus oo xadgudub ku ah xuquuqda aadanaha",
              "Waxay si gaar ah u saameysaa haweenka iyo gabdhaha",
              "Waxay ka dhici kartaa dhammaan aaladaha baraha bulshada",
              "Saameynteedu waxay la mid tahay rabshadaha jirka",
              "Waxaad xaq u leedahay badbaado buuxda",
            ],
          },
          cyberstalking: {
            title: "Dabagalka Internetka (Cyberstalking)",
            description: "Dabaggal joogto ah oo cabsi gelin leh.",
            signs: ["Fariimo xad-dhaaf ah", "La socodka dhaqdhaqaaqaaga internetka"],
            actions: ["Xafid caddeymaha", "Isla markiiba xannib (Block)", "Wac 7711 ama 991"]
          },
          harassment: {
            title: "Dhibaateynta Internetka",
            description: "Hadallo nacayb ah, cay iyo handadaad joogto ah.",
            signs: ["Helitaanka fariimo hanjabaad ah"],
            actions: ["Ha u jawaabin", "Keydi dhammaan caddeymaha", "Raadso gargaar sharci"]
          },
          impersonation: {
            title: "Isku-yeelidda Qof Kale (Aqoonsi Been-abuur ah)",
            description: "In lagugu sameeyo cinwaanno been abuur ah oo magacaaga iyo sawirkaaga wata.",
            signs: ["Akoonno magacaaga wata oo la arko"],
            actions: ["U dacwoo baraha bulshada", "Beddel erayada sirta ah"]
          },
          doxing: {
            title: "Faafinta Xogta Gaarka ah (Doxing)",
            description: "In internetka lagu faafiyo cinwaankaaga, taleefankaaga ama macluumaadkaaga sirta ah.",
            signs: ["Xogtaada gaarka ah oo la faafiyo"],
            actions: ["Dalbo in laga saaro", "U sheeg booliska"]
          },
          imageAbuse: {
            title: "Xadgudubka Sawirrada Gaarka ah",
            description: "Faafinta ama ku handadaadda sawirradaada gaarka ah adigoon raalli ka ahayn.",
            signs: ["Hanjabaad faafin sawirro ah"],
            actions: ["Lacag ha bixin", "Hayso caddeymaha", "Wac 7711 ama 991"]
          },
          prevention: {
            title: "Kahortagga & Badbaadada",
            description: "Tallaabooyinka lagu ilaaliyo badbaadadaada dijitaalka ah.",
            privacySettings: {
              title: "Nidaaminta Sirta",
              tips: [
                "Isticmaal eray sir ah oo adag",
                "Fur xaqiijinta labada tallaabo (2FA)",
                "Ha u dirin sawirro gaar ah dad aadan aaminin"
              ]
            },
            supportingOthers: {
              title: "Taageeridda Qof Dhibban",
              howToHelp: [
                "Aamin oo ha shakiyin",
                "Ha eedayn iyaga",
                "Ku hag inay la xiriiraan 7711 iyo EWLA"
              ]
            }
          }
        }
      }
    },
    common: {
      loading: "Waa la soo rarayaa...",
      error: "Khalad ayaa dhacay",
      retry: "Isku day mar kale",
      back: "Dib u noqo",
      download: "Degso",
      showContent: "Muuji Nuxurka",
      hideContent: "Qari Nuxurka",
    },
  },
}

export function getTranslation(lang: Language) {
  return (translations as any)[lang] || translations.en
}
