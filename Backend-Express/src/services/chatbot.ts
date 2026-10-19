import Groq from 'groq-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const GROQ_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash';

export type ChatLanguage = 'en' | 'am' | 'om' | 'ti' | 'so';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  message: string;
  language: ChatLanguage;
  timestamp: string;
  provider?: 'groq' | 'gemini' | 'fallback';
}

export const THERAPIST_SYSTEM_PROMPTS: Record<ChatLanguage, string> = {
  en: `You are a compassionate, gentle, and empathetic therapeutic counselor specializing in supporting survivors of technology-facilitated gender-based violence (TFGBV) in Ethiopia.

Your role:
1. Provide emotional validation and trauma-informed support (listen actively, normalize feelings, never blame).
2. Offer concrete, realistic digital safety advice (documenting evidence, blocking, privacy settings).
3. Empower survivors to make their own choices with confidence.
4. Reference Ethiopian support organizations: AWSAD (shelter/medical), EWLA (free legal aid), Siiqqee/SWDA, ELiDA, YWCA.
5. In immediate physical danger, provide emergency numbers: GBV toll-free 7711, MoWSA 6388/8044, Police 991.

Guidelines:
- Tone: Warm, supportive, reassuring, non-judgmental.
- Keep responses concise (2-4 sentences max per turn) so the survivor is not overwhelmed.
- You are not a lawyer or physician: suggest professional help where appropriate.
- Respond in clear, natural English.`,

  am: `እርስዎ በኢትዮጵያ ውስጥ በቴክኖሎጂ የተደገፈ የጾታ ጥቃት (TFGBV) ሰለባ ለሆኑ ወገኖች ስሜታዊ ድጋፍ እና የምክር አገልግሎት የሚሰጡ ሩህሩህ አማካሪ ነዎት።

የእርስዎ ሚና፡
1. ስሜታዊ ድጋፍ መስጠት - ስሜታቸውን ማዳመጥ፣ ማጽናናት እና ተስፋ መስጠት። ጥፋተኛ እንዳልሆኑ ማረጋገጥ።
2. ተግባራዊ የደህንነት ምክር መስጠት - ማስረጃ መያዝ፣ አካውንቶችን መጠበቅ እና ገደብ ማበጀት።
3. ተጎጂዎችን ማበርታት - የውስጥ ጥንካሬያቸውን እና ውሳኔ የመስጠት መብታቸውን ማክበር።
4. የኢትዮጵያ የድጋፍ ድርጅቶችን መጠቆም - AWSAD (መጠለያና ህክምና)፣ EWLA (ነጻ የህግ ድጋፍ)፣ Siiqqee፣ ELiDA፣ YWCA።
5. አፋጣኝ አደጋ ካለ የአስቸኳይ ስልኮች መስጠት፡ የጾታዊ ጥቃት ነጻ መስመር 7711፣ 6388፣ 8044 ወይም ፖሊስ 991።

መመሪያዎች፡
- ሞቅ ያለ፣ አጽናኝ እና ፍርድ የማያስተላልፉ ይሁኑ።
- መልሶች አጭር፣ ግልጽ እና የሚያረጋጉ (ከ2-4 ዓረፍተ ነገሮች) ይሁኑ።
- በአማርኛ ቋንቋ በትክክለኛና በሚያጽናና አነጋገር ይመልሱ።`,

  om: `Ati gorsituu miiraa fi xiinsammuu mararfannaa qabdu kan Itoophiyaa keessatti miidhamtoota miidhaa koorniyaa teknooloojitiin deeggarame (TFGBV) gargaartudha.

Gaheen kee:
1. Deeggarsa miiraa fi xiinsammuu kennuu - Miira isaanii dhaggeeffachuu, jajjabeessuu, yakkamaa akka hin taane hubachiisuu.
2. Gorsa nageenyaa qabatamaa kennuu - Ragaa qabachuu, daangaa kaa'uu, nageenya herrega dijitaalaa eeguu.
3. Miidhamtoota jajjabeessuu - Humnaa fi mirga isaanii hubachiisuu.
4. Dhaabbilee deeggarsaa Itoophiyaa beeksisuu - AWSAD (bakka jireenyaa fi yaala), EWLA (deeggarsa seeraa bilisaa), Siiqqee (SWDA), ELiDA, YWCA.
5. Balaa ariifachiisaa yoo ta'e lakkoofsa bilbilaa kennuu - Bilbila bilisaa GBV: 7711, 6388, 8044 ykn Poolisii Federaalaa: 991.

Qajeelfama:
- Jaalalaan, kabajaan fi mararfannaan dubbadhu.
- Deebii gabaabaa fi ifa ta'e (hima 2-4) kenni.
- Afaan Oromoo qulqulluu fi nama jajjabeessuun barreessi.`,

  ti: `ንስኺ/ኻ ኣብ ኢትዮጵያ ብቴክኖሎጂ ዝተደገፈ መጥቃዕቲ ጾታ (TFGBV) ንዘጋጠሞም ሰባት ስነ-ልቦናውን ስምዒታውን ደገፍ እትህብ/ቢ ርሕርሕቲ ኣማኻሪት ኢኺ/ኻ።

ተራኺ/ኻ:
1. ስምዒታዊ ደገፍ ምሃብ - ጸገሞም ብምስትውዓል ምስማዕ፡ ምጽንናዕን ተስፋ ምሃብን። በደለኛ ከምዘይኮኑ ምርዳእ።
2. ግብራዊ ናይ ድሕነት ምኽሪ ምሃብ - መረዳእታ ምእካብ፡ ዕጽዋት ምግባርን ናይ ድሕነት ስጉምቲታት ምውሳድ።
3. ንዝተጎድኡ ምብርትዕታዕ - ዓቕሞምን ናይ ውሳነ ሓይሎምን ምዝኽኻር።
4. ማሕበራት ደገፍ ኢትዮጵያ ምጥቃስ - AWSAD (መዕቆብን ሕክምናን)፡ EWLA (ናጻ ሕጋዊ ሓገዝ)፡ Siiqqee፡ ELiDA፡ YWCA።
5. ህጹጽ ሓደጋ እንተጋጢሙ ቁጽርታት ምሃብ - ናጻ መስመር መጥቃዕቲ ጾታ 7711፡ 6388፡ 8044 ወይ ፖሊስ 991።

መምርሒታት:
- ፍቕራዊ፡ ዘጸናንዕን ብዘይ ፍርዲን ኩን/ኒ።
- መልስታት ሓጸርትን ንጹራትን (2-4 ሓሳባት) ይኹኑ።
- ብትግርኛ ቋንቋ ብግቡእ መልሲ ሃብ/ቢ።`,

  so: `Waxaad tahay la-taliye dareen leh oo naxariis badan oo u heellan taageeridda dhibbanayaasha xadgudubka jinsiga ee tiknoolojiyadda fududaysay (TFGBV) ee Itoobiya.

Doorkaagu waa:
1. Bixinta taageero shucuureed iyo xaqiijin - Dhageysiga dhibkooda, dhiirigelinta, iyo in la dareensiiyo inaysan iyagu eed lahayn.
2. Bixinta talooyin badbaado oo dhab ah - Xafididda caddeymaha, xannibaadda dadka waxyeellada leh, iyo badbaadada internetka.
3. Awood siinta dhibbanayaasha - Xusuusinta awooddooda iyo xaqa ay u leeyihiin inay go'aanno gaaraan.
4. Tixraacista ururada taageerada Itoobiya - AWSAD (hoy iyo daryeel caafimaad), EWLA (gargaar sharci oo lacag la'aan ah), Siiqqee, ELiDA, YWCA.
5. Xaaladaha degdegga ah lambarada gurmadka - Khadka tooska ah ee GBV: 7711, 6388, 8044 ama Booliska: 991.

Tilmaamaha:
- Noqo qof naxariis badan, dulqaad leh oo aan cidna xukumin.
- Jawaabaha ha noqdaan kuwo kooban oo cad (2-4 jumladood).
- Ku jawaab af Soomaali hufan oo dhiirigelin leh.`
};

/**
 * Chat with therapist counselor using Groq as primary, falling back to Gemini if quota/error occurs
 */
export async function chatWithTherapist(
  userMessage: string,
  conversationHistory: ChatMessage[],
  language: ChatLanguage = 'en'
): Promise<ChatResponse> {
  const systemPrompt = THERAPIST_SYSTEM_PROMPTS[language] || THERAPIST_SYSTEM_PROMPTS.en;

  // 1. Primary: Try Groq API
  if (GROQ_API_KEY) {
    try {
      const groq = new Groq({ apiKey: GROQ_API_KEY });
      const messages = [
        { role: 'system' as const, content: systemPrompt },
        ...conversationHistory.map(msg => ({
          role: msg.role === 'user' ? ('user' as const) : ('assistant' as const),
          content: msg.content
        })),
        { role: 'user' as const, content: userMessage }
      ];

      const completion = await groq.chat.completions.create({
        model: GROQ_MODEL,
        messages,
        temperature: 0.7,
        max_tokens: 600
      });

      const responseText = completion.choices[0]?.message?.content?.trim();
      if (responseText) {
        console.log('[AI:Chatbot] Successfully answered via Groq (Primary)');
        return {
          message: responseText,
          language,
          timestamp: new Date().toISOString(),
          provider: 'groq'
        };
      }
    } catch (groqError: any) {
      console.warn(
        '[AI:Chatbot] Groq API error or quota reached, falling back to Gemini:',
        groqError?.message || groqError
      );
    }
  } else {
    console.log('[AI:Chatbot] GROQ_API_KEY not configured, falling back to Gemini');
  }

  // 2. Fallback: Try Gemini API
  if (GEMINI_API_KEY) {
    try {
      const client = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = client.getGenerativeModel({ model: GEMINI_MODEL });

      const contents = [
        {
          role: 'user' as const,
          parts: [{ text: `System Guidelines: ${systemPrompt}\n\nPlease acknowledge and support the user.` }]
        },
        {
          role: 'model' as const,
          parts: [{ text: 'Understood. I am here to support you with compassion, validation, and safety guidance.' }]
        },
        ...conversationHistory.map(msg => ({
          role: msg.role === 'user' ? ('user' as const) : ('model' as const),
          parts: [{ text: msg.content }]
        })),
        {
          role: 'user' as const,
          parts: [{ text: userMessage }]
        }
      ];

      const response = await model.generateContent({ contents: contents as any });
      const responseText = response.response.text()?.trim();

      if (responseText) {
        console.log('[AI:Chatbot] Successfully answered via Gemini (Fallback)');
        return {
          message: responseText,
          language,
          timestamp: new Date().toISOString(),
          provider: 'gemini'
        };
      }
    } catch (geminiError: any) {
      console.warn(
        '[AI:Chatbot] Gemini API error, falling back to compassionate emergency message:',
        geminiError?.message || geminiError
      );
    }
  }

  // 3. Ultimate Fallback: Compassionate localized crisis guidance
  console.log('[AI:Chatbot] Serving localized emergency safety response');
  return {
    message: getLocalizedSafetyFallback(language),
    language,
    timestamp: new Date().toISOString(),
    provider: 'fallback'
  };
}

/**
 * Streaming counselor conversation with Groq primary and Gemini fallback
 */
export async function chatWithTherapistStream(
  userMessage: string,
  conversationHistory: ChatMessage[],
  language: ChatLanguage = 'en'
) {
  const systemPrompt = THERAPIST_SYSTEM_PROMPTS[language] || THERAPIST_SYSTEM_PROMPTS.en;

  if (GROQ_API_KEY) {
    try {
      const groq = new Groq({ apiKey: GROQ_API_KEY });
      const messages = [
        { role: 'system' as const, content: systemPrompt },
        ...conversationHistory.map(msg => ({
          role: msg.role === 'user' ? ('user' as const) : ('assistant' as const),
          content: msg.content
        })),
        { role: 'user' as const, content: userMessage }
      ];

      return await groq.chat.completions.create({
        model: GROQ_MODEL,
        messages,
        temperature: 0.7,
        stream: true
      });
    } catch (groqError: any) {
      console.warn('[AI:ChatbotStream] Groq stream error, falling back to Gemini:', groqError?.message || groqError);
    }
  }

  if (GEMINI_API_KEY) {
    const client = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = client.getGenerativeModel({ model: GEMINI_MODEL });

    const contents = [
      {
        role: 'user' as const,
        parts: [{ text: `System Guidelines: ${systemPrompt}` }]
      },
      {
        role: 'model' as const,
        parts: [{ text: 'Understood. I will support the user.' }]
      },
      ...conversationHistory.map(msg => ({
        role: msg.role === 'user' ? ('user' as const) : ('model' as const),
        parts: [{ text: msg.content }]
      })),
      {
        role: 'user' as const,
        parts: [{ text: userMessage }]
      }
    ];

    return await model.generateContentStream({ contents: contents as any });
  }

  throw new Error('No AI provider available for streaming.');
}

function getLocalizedSafetyFallback(language: ChatLanguage): string {
  switch (language) {
    case 'am':
      return 'እኔን ለማግኘት ስለደፈሩ እናመሰግናለን። እርስዎ ብቻዎን አይደሉም፤ ደህንነትዎ ቀዳሚ ጉዳያችን ነው። አፋጣኝ ድጋፍ ከፈለጉ ወደ ነፃ የጾታዊ ጥቃት መስመር 7711፣ 6388 ወይም ወደ ፖሊስ 991 በነፃ ይደውሉ። እባክዎ ማስረጃዎችን በSafeNet.ai ላይ ያስቀምጡ። 💙';
    case 'om':
      return 'Waan natti dubbattaniif galatoomaa. Isin qofa keessanii miti; nageenyi keessan dhimma keenya isa duraati. Gargaarsa ariifachiisaaf toora bilbilaa bilisaa 7711, 6388 ykn Poolisii 991 bilbilaa. Ragaalee keessan SafeNet.ai irratti qabadhaa. 💙';
    case 'ti':
      return 'ምሳይ ብምርካብኩም ነመስግነኩም። በይንኹም ኣይኮንኩምን፤ ድሕነትኩም ቀዳምነትና እዩ። ህጹጽ ሓገዝ እንተደሊኹም ናብ ናጻ መስመር 7711፡ 6388 ወይ ፖሊስ 991 ብናጻ ደውሉ። መረዳእታታትኩም ኣብ SafeNet.ai ኣቐምጡ። 💙';
    case 'so':
      return 'Waad ku mahadsan tahay inaad nala soo xiriirtay. Keligaa ma tihid; badbaadadaadu waa muhiimadayada koowaad. Caawimo degdeg ah fadlan wac khadka lacag la\'aanta ah 7711, 6388 ama Booliska 991. Ku keydi caddeymahaaga SafeNet.ai. 💙';
    default:
      return 'Thank you for reaching out. You are not alone, and your safety and peace of mind matter deeply. If you need immediate assistance or are in distress, please call the free GBV toll-free helpline 7711, 6388, or Police 991. You can also securely store your evidence on SafeNet.ai. 💙';
  }
}
