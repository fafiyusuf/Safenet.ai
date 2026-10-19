"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  HeartHandshake,
  Lock,
  MessageSquare,
  Phone,
  Send,
  Shield,
  ShieldAlert,
  Sparkles,
  Trash2
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Header } from "@/components/header"
import { useLanguage } from "@/hooks/use-language"
import { getTranslation } from "@/lib/i18n"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp?: string
}

const WELCOME_MESSAGES: Record<string, string> = {
  en: "Hello. You are in a safe, confidential space. Everything shared here is private. How are you feeling today, and how can I support you? 💙",
  am: "ሰላም፣ ደህንነትዎ የተጠበቀበት ቦታ ነው። እዚህ ያጋሩት ነገር ሁሉ ሚስጥራዊ ነው። በምን ላግዝዎ እችላለሁ? 💙",
  om: "Akkam jirtu. Iddoo nageenyi keessan eegame keessa jirtu. Wanti asitti qooddan hundi iccitiidha. Har'a akkam jirtu, akkamittan si gargaaruu danda'a? 💙",
  ti: "ሰላም፡ ኣብ ውሑስን ምስጢራውን ቦታ ኢኹም ዘለኹም። ኣብዚ ዘካፈልክምዎ ነገር ኩሉ ምስጢር እዩ። ሎሚ ከመይ ኣለኹም፡ ብምንታይ ክድግፈኩም ይኽእል? 💙",
  so: "Nabadeey. Waxaad ku sugan tahay goob ammaan ah oo sir ah. Wax kasta oo aad halkan ku wadaagto waa qarsoodi. Sideed dareemaysaa maanta, sideense kuu caawin karaa? 💙",
}

const CLEAR_MESSAGES: Record<string, string> = {
  en: "Conversation cleared. You are safe. How can I help you?",
  am: "ውይይቱ ጸድቷል። ደህንነትዎ የተጠበቀ ነው። በምን ላግዝዎ እችላለሁ?",
  om: "Haasa'aan qulqulleeffameera. Nageenyi keessan eegamaadha. Akkamittan si gargaaruu danda'a?",
  ti: "ዕላል ተወዲኡን ጸርዩን እዩ። ውሑስ ኢኹም። ብምንታይ ክሕግዘኩም ይኽእል?",
  so: "Wadahadalkii waa la nadiifiyay. Waad badbaaddaa. Sideen kuu caawin karaa?",
}

const PROMPT_SUGGESTIONS: Record<string, string[]> = {
  en: [
    "Someone is threatening to share my private pictures",
    "How do I preserve evidence before messages are deleted?",
    "I'm being harassed on Telegram and feel overwhelmed",
    "What are my legal rights under Ethiopian cyber law?",
  ],
  am: [
    "አንድ ሰው ፎቶዬን አሰራጫለሁ እያለ እያስፈራራኝ ነው",
    "በቴሌግራም የማላውቀው ሰው እያሳደደኝ ነው፣ ምን ላድርግ?",
    "መልዕክቶች ከመጥፋታቸው በፊት ማስረጃ እንዴት ልያዝ?",
    "ለፌዴራል ፖሊስ ክስ ማቅረብ እፈልጋለሁ",
  ],
  om: [
    "Namni tokko suuraa koo nan facaasa jedhee na sodaachisaa jira",
    "Ergaawwan osoo hin haqamin dura akkamittan ragaa qabachuu danda'a?",
    "Telegram irratti miidhaan narratti raawwatamaa jira, maalan godha?",
    "Poolisii Federaalaatti himata dhiyeessuu barbaada",
  ],
  ti: [
    "ሓደ ሰብ ናይ ብሕቲ ስእለይ ክዝርግሖ እየ ኢሉ የፈራርሃኒ ኣሎ",
    "መልእኽትታት ቅድሚ ምድምሳሶም ብኸመይ መርትዖ ክሕዝ እኽእል?",
    "ኣብ ቴሌግራም መጥቃዕቲ ይበጽሓኒ ኣሎ፡ እንታይ ክገብር ኣለኒ?",
    "ንፌደራል ፖሊስ ክሲ ከቕርብ እደሊ ኣለኹ",
  ],
  so: [
    "Qof ayaa ku hanjabaya inuu faafin doono sawirradeyda gaarka ah",
    "Sideen u xafidi karaa caddeymaha ka hor inta aan farriimaha la tirtirin?",
    "Faraxumeyn ayaa Telegram igula socota, maxaan sameeyaa?",
    "Waxaan rabaa inaan dacwad u gudbiyo Booliska Federaalka",
  ],
}

const CHAT_UI_STRINGS: Record<string, {
  errorMessage: (err: string) => string
  crisisSupport: string
  counselorTitle: string
  counselorSubtitle: string
  clear: string
  confidentialBanner: string
  typing: string
  suggestedTopics: string
  placeholder: string
  send: string
  disclaimer: string
}> = {
  en: {
    errorMessage: (err) => `I'm sorry, I encountered an issue: ${err}. If you are in immediate danger, please dial 7711 (GBV hotline) or 991 (Police).`,
    crisisSupport: "24/7 Crisis Support:",
    counselorTitle: "SafeNet Support Counselor",
    counselorSubtitle: "Encrypted • No Personal Record Stored",
    clear: "Clear",
    confidentialBanner: "This peer counselor session is ephemeral and encrypted. No identifying details are stored.",
    typing: "Counselor is typing...",
    suggestedTopics: "Suggested Support Topics:",
    placeholder: "Share what is on your mind or describe the incident... (you are safe here)",
    send: "Send",
    disclaimer: "SafeNet Counselor provides supportive crisis guidance. To generate formal legal dossiers, use the [Upload Evidence] forensic feature.",
  },
  am: {
    errorMessage: (err) => `ይቅርታ፣ በግንኙነት ላይ ችግር አጋጥሟል: ${err}። አስቸኳይ አደጋ ካለ እባክዎ 7711 ወይም 991 ይደውሉ።`,
    crisisSupport: "የአደጋ ጊዜ ስልክ መስመሮች:",
    counselorTitle: "የSafeNet የስነ-ልቦና ድጋፍ አማካሪ",
    counselorSubtitle: "ሚስጥራዊ • ምንም መለያ አይቀመጥም",
    clear: "ውይይት አጽዳ",
    confidentialBanner: "ይህ ውይይት የተጠበቀ ነው። የሚያጋሩት ማንኛውም መረጃ ለህዝብ ክፍት አይደረግም።",
    typing: "ምላሽ በማዘጋጀት ላይ...",
    suggestedTopics: "የተለመዱ ጥያቄዎች (ይምረጡ):",
    placeholder: "የሚሰማዎትን ወይም ያጋጠመዎትን እዚህ ይጻፉ... (ሚስጥራዊ ነው)",
    send: "ላክ",
    disclaimer: "SafeNet.ai ለድንገተኛ የስነ-ልቦና ድጋፍ የተዘጋጀ ነው። ለህጋዊ ክስ ማስረጃ ማሰባሰቢያ ወደ [ማስረጃ ይስቀሉ] ይሂዱ።",
  },
  om: {
    errorMessage: (err) => `Dhiifama, rakkoon qunnamtii uumameera: ${err}. Balaa ariifachiisaan yoo jiraate 7711 ykn 991 bilbilaa.`,
    crisisSupport: "Sarara Balaa Ariifachiisaa 24/7:",
    counselorTitle: "Gorsaa Deeggarsa SafeNet",
    counselorSubtitle: "Iccitii • Galmeen Dhuunfaa Hin Kaa'amu",
    clear: "Haasa'a Qulqulleessi",
    confidentialBanner: "Mariin kun guutummaatti iccitii kan eeggateedha. Odeeffannoon kamiyyuu hin kuufamu.",
    typing: "Gorsaan deebii barreessaa jira...",
    suggestedTopics: "Mata dureewwan Deeggarsaa:",
    placeholder: "Wanta isin yaaddesse ykn isin mudate asitti barreessaa... (nageenyi keessan eegamaadha)",
    send: "Ergi",
    disclaimer: "Gorsaan SafeNet qajeelfama balaa yeroo ariifachiisaa kenna. Sanada seeraatiif [Ragaa Fe'aa] fayyadamaa.",
  },
  ti: {
    errorMessage: (err) => `ይቕረታ፡ ኣብ ርክብ ጸገም ኣጋጢሙ: ${err}። ህጹጽ ሓደጋ እንተሃልዩ ብኽብረትኩም 7711 ወይ 991 ደውሉ።`,
    crisisSupport: "ናይ 24/7 ህጹጽ ረድኤት መስመራት:",
    counselorTitle: "ናይ SafeNet ስነ-ልቦናዊ ደገፍ ኣማኻሪ",
    counselorSubtitle: "ምስጢራዊ • ናይ ብሕቲ መዝገብ ኣይዕቀብን",
    clear: "ዕላል ኣጽሪ",
    confidentialBanner: "እዚ ናይ ኣማኻሪ ዘተ ውሑስን ምስጢራውን እዩ። ዝኾነ ናይ መንነት ሓበሬታ ኣይዕቀብን እዩ።",
    typing: "ኣማኻሪ መልሲ የዳልው ኣሎ...",
    suggestedTopics: "ዝምረጹ ናይ ደገፍ ዛዕባታት:",
    placeholder: "ዝስመዓኩም ዘሎ ወይ ዘጋጠመኩም ኣብዚ ጽሓፉ... (ውሑስ ኢኹም)",
    send: "ስደድ",
    disclaimer: "SafeNet ስነ-ልቦናዊ ምኽሪ ይህብ። ንሕጋዊ ሰነድ ክሲ ንምድላው ናብ [መርትዖ ኣእትዉ] ኪዱ።",
  },
  so: {
    errorMessage: (err) => `Waan ka xunnahay, khalad ayaa dhacay: ${err}. Haddii aad khatar ku jirto fadlan wac 7711 ama 991.`,
    crisisSupport: "Khadadka Taageerada Degdegga ah 24/7:",
    counselorTitle: "La-taliyaha Taageerada SafeNet",
    counselorSubtitle: "Qarsoodi • Ma Jiro Diiwaan La Keydinayo",
    clear: "Nadiifi Wada-hadalka",
    confidentialBanner: "Kalfadhigan la-talintu waa mid sir ah oo la dhowray. Faahfaahin shakhsi ah lama keydiyo.",
    typing: "La-taliyuhu wuu soo qorayaa...",
    suggestedTopics: "Mowduucyada Taageerada ee la Soo Jeediyay:",
    placeholder: "Halkan ku qor waxa kugu dhacay ama dareenkaaga... (halkan waad ku badbaaddaa)",
    send: "Dir",
    disclaimer: "SafeNet wuxuu bixiyaa hanuunin taageero dhibaato. Si aad u diyaariso gal dacwadeed sharci, isticmaal [Soo Geli Caddeynta].",
  },
}

export function ChatInterface() {
  const { language, setLanguage } = useLanguage()
  const t = getTranslation(language)
  const chatUI = CHAT_UI_STRINGS[language] || CHAT_UI_STRINGS.en

  const initialMessage: Message = {
    role: "assistant",
    content: WELCOME_MESSAGES[language] || WELCOME_MESSAGES.en,
    timestamp: new Date().toISOString(),
  }

  const [messages, setMessages] = useState<Message[]>([initialMessage])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Re-initialize welcome message if language switches on empty chat
  useEffect(() => {
    if (messages.length <= 1) {
      setMessages([
        {
          role: "assistant",
          content: WELCOME_MESSAGES[language] || WELCOME_MESSAGES.en,
          timestamp: new Date().toISOString(),
        },
      ])
    }
  }, [language])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const promptSuggestions = PROMPT_SUGGESTIONS[language] || PROMPT_SUGGESTIONS.en

  const handleSuggestionClick = (prompt: string) => {
    setInput(prompt)
  }

  const handleClearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: CLEAR_MESSAGES[language] || CLEAR_MESSAGES.en,
        timestamp: new Date().toISOString(),
      },
    ])
    setError(null)
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userText = input.trim()
    const userMessage: Message = {
      role: "user",
      content: userText,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          conversationHistory: messages
            .filter((m) => m.role === "user" || m.role === "assistant")
            .map((m) => ({
              role: m.role,
              content: m.content,
            })),
          language,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || errorData.message || "Failed to communicate with counselor")
      }

      const data = await response.json()

      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
        timestamp: data.timestamp || new Date().toISOString(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err: any) {
      const errMsg = err.message || "An unexpected error occurred"
      setError(errMsg)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: chatUI.errorMessage(errMsg),
          timestamp: new Date().toISOString(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-background text-foreground overflow-hidden">
      <Header language={language} onLanguageChange={setLanguage} />

      {/* Floating Emergency Hotlines Strip */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 px-3 sm:px-4 py-2 text-xs">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-2 max-w-4xl">
          <div className="flex items-center gap-1.5 font-semibold text-amber-900 dark:text-amber-200 text-[11px] sm:text-xs">
            <ShieldAlert className="h-3.5 w-3.5 text-amber-600 shrink-0" />
            <span>{chatUI.crisisSupport}</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-[11px]">
            <a href="tel:7711" className="font-bold text-amber-900 dark:text-amber-200 hover:underline">
              7711 (GBV Line)
            </a>
            <span>•</span>
            <a href="tel:6388" className="font-bold text-amber-900 dark:text-amber-200 hover:underline">
              6388 (Women's Line)
            </a>
            <span>•</span>
            <a href="tel:991" className="font-bold text-amber-900 dark:text-amber-200 hover:underline">
              991 (Police)
            </a>
          </div>
        </div>
      </div>

      {/* Main Chat Canvas */}
      <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto overflow-hidden px-3 sm:px-4 py-3 sm:py-4">
        
        {/* Chat Header Details with Counselor Avatar */}
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-emerald-600/30 shrink-0 bg-muted">
              <Image
                src="/counselor-support.jpg"
                alt="SafeNet Counselor"
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-xs sm:text-sm font-bold text-foreground">
                  {chatUI.counselorTitle}
                </h2>
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              </div>
              <p className="text-[10px] sm:text-[11px] text-muted-foreground">
                {chatUI.counselorSubtitle}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearChat}
            title="Clear Chat History"
            className="text-xs text-muted-foreground hover:text-destructive h-8 px-2.5 rounded-md"
          >
            <Trash2 className="h-3.5 w-3.5 sm:mr-1" />
            <span className="hidden sm:inline">{chatUI.clear}</span>
          </Button>
        </div>

        {/* Message Feed Area */}
        <ScrollArea className="flex-1 py-3 sm:py-4 pr-2 sm:pr-3">
          <div className="space-y-4">
            
            {/* Counselor Warm Welcome Banner */}
            <div className="p-3 sm:p-3.5 rounded-lg bg-card border border-border shadow-xs max-w-lg mx-auto flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-emerald-500/30 shrink-0 hidden sm:block">
                <Image
                  src="/counselor-support.jpg"
                  alt="Counselor Consultation"
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </div>
              <div className="space-y-0.5 text-left flex-1">
                <div className="text-xs font-bold text-foreground flex items-center justify-between">
                  <span>Zero-Trace Crisis Guidance</span>
                  <span className="text-[9px] bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-mono font-semibold px-1.5 py-0.2 rounded border border-emerald-500/20">
                    Encrypted
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-snug">
                  {chatUI.confidentialBanner}
                </p>
              </div>
            </div>

            {/* Conversation Messages */}
            {messages.map((msg, idx) => {
              const isUser = msg.role === "user"
              return (
                <div
                  key={idx}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-1`}
                >
                  <div className="flex items-center gap-1.5 px-1 text-[10px] uppercase tracking-wider font-mono text-muted-foreground">
                    {!isUser && (
                      <div className="relative w-3.5 h-3.5 rounded-full overflow-hidden border border-emerald-600/40 shrink-0">
                        <Image src="/counselor-support.jpg" alt="" fill className="object-cover" sizes="14px" />
                      </div>
                    )}
                    <span>{isUser ? "You" : "SafeNet Crisis Counselor"}</span>
                    {msg.timestamp && (
                      <span>
                        • {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    )}
                  </div>
                  <div
                    className={`max-w-[88%] sm:max-w-xl p-3 sm:p-3.5 rounded-md text-xs sm:text-sm leading-relaxed border ${
                      isUser
                        ? "bg-emerald-700 text-white border-emerald-800"
                        : "bg-card border-border text-foreground"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </div>
              )
            })}

            {/* Typing Loader Indicator */}
            {isLoading && (
              <div className="flex flex-col items-start space-y-1">
                <div className="text-[10px] uppercase tracking-wider font-mono text-muted-foreground px-1">
                  SafeNet Crisis Counselor
                </div>
                <div className="bg-card border border-border p-3 rounded-md flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span className="text-xs text-muted-foreground">
                    {chatUI.typing}
                  </span>
                </div>
              </div>
            )}

            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {/* Prompt Suggestions (Visible when input is idle) */}
        {!isLoading && messages.length <= 3 && (
          <div className="pt-2 pb-1 space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-muted-foreground block px-1 tracking-wider">
              {chatUI.suggestedTopics}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {promptSuggestions.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSuggestionClick(prompt)}
                  className="px-2.5 py-1.5 rounded-md bg-muted/60 hover:bg-muted text-xs text-foreground/80 border border-border/70 transition-colors text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div className="pt-3 border-t border-border">
          {error && (
            <div className="mb-2 p-2 rounded-md bg-destructive/10 border border-destructive/20 text-xs text-destructive flex items-center justify-between">
              <span>{error}</span>
              <button onClick={() => setError(null)} className="text-xs underline ml-2">
                Dismiss
              </button>
            </div>
          )}

          <form onSubmit={sendMessage} className="flex gap-2 items-center">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={chatUI.placeholder}
              disabled={isLoading}
              className="rounded-md text-xs sm:text-sm px-3 py-2.5 h-10 border-border bg-card focus-visible:ring-emerald-600"
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="rounded-md h-10 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-medium shrink-0 flex items-center gap-1.5"
            >
              <Send className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{chatUI.send}</span>
            </Button>
          </form>

          <p className="text-[10px] text-center text-muted-foreground mt-2">
            {chatUI.disclaimer}
          </p>
        </div>

      </div>
    </div>
  )
}
