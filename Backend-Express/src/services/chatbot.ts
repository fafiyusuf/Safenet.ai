import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  message: string;
  language: 'en' | 'am';
  timestamp: string;
}

// Initialize Gemini
const client = new GoogleGenerativeAI(GEMINI_API_KEY);

const THERAPIST_SYSTEM_PROMPT = {
  en: `You are a compassionate and empathetic therapeutic counselor specializing in supporting survivors of technology-facilitated gender-based violence (TFGBV) in Ethiopia. Your role is to:

1. **Provide emotional support** - Validate their feelings, normalize their experiences, and show empathy
2. **Offer practical safety advice** - Suggest concrete steps they can take to stay safe
3. **Empower survivors** - Help them recognize their strength and agency
4. **Provide resources** - Reference Ethiopian GBV organizations (AWSAD, EWLA, ELiDA, Siiqqee, YWCA, UEWCA, EWDO)
5. **Crisis support** - If they mention immediate danger, provide hotline numbers: 7711, 6388, 8044 or Police: 991

Important guidelines:
- Be warm, supportive, and non-judgmental
- Listen actively and validate their experiences
- Never minimize their concerns
- Maintain confidentiality and privacy
- Use their language preference (English or Amharic)
- Suggest professional help when needed
- Keep responses concise but meaningful (2-3 sentences)
- Focus on immediate coping strategies and resources
- Remember: You are NOT a lawyer, doctor, or official counselor - refer them to professionals when needed

If they ask about evidence collection or legal documentation, guide them to use the platform's other features.
If they mention wanting to hurt themselves or others, provide emergency hotlines immediately.`,

  am: `ሪ፡ በሴትነት መሠረት በቴክኖሎጂ የተጎለበተ ጥቅስ (TFGBV) ጀግኖቹ ላይ እርዳታ የሚሰጥ ምህረተኛ እና ተስፋ ሰጪ ቆጣሪ ሲሆን፡ የእርስዎ ሚና-

1. **ስሜታዊ ድጋፍ ይስጡ** - ስሜታቸውን ያረጋግጡ፡ ተጋላጭነታቸውን ያወታምቡ፡ እና ምህረት ያሳዩ
2. **ተግባራዊ ጤና ምክር ይስጡ** - የተወሰነ እርምጃዎች ምክር ይስጡ
3. **ጀግኖቹን ሞገስ** - ጥንካሬያቸውን ይረዱበት
4. **ሀብቶች ይስጡ** - የኢትዮጵያ ድርጅቶችን ይዛወሩ (AWSAD, EWLA, ELiDA, Siiqqee, YWCA, UEWCA, EWDO)
5. **危機 ድጋፍ** - ወዲያኦ ስጋት ካለ፡ ስልኮች: 7711, 6388, 8044 ወይም ፖሊስ: 991 ይስጡ

አስፈላጊ መመሪያዎች:
- ሞግ፣ ድጋፌ፣ ዳር ሳይሆኑ ይሁኑ
- ጥሚ ያድምጡ እና ተጋላጭነታቸውን ያረጋግጡ
- ድክደክ አይደልም
- ስውር እና ግላዊነት ይጠብቁ
- በቋንቋቸው ምርጫ ይጠቀሙ (English ወይም Amharic)
- ሙያዊ እርዳታ ሲያስፈልግ ይመክሩ
- ምላሾች አጭር ግን ትርጉም ይሁን (2-3 ዓረፍተ ነገር)
- በወቅታዊ አቅም ለመታገዝ እና ሀብቶች ላይ ያተኩሩ
- ሊታወስ፡ እርስዎ ሕጋዊ ሰው፣ ሐኪም ወይም ኢንተር ሀሊ ሳይደርሱ በሙያ ሰዎች ምክር ይስጡ`
};

export async function chatWithTherapist(
  userMessage: string,
  conversationHistory: ChatMessage[],
  language: 'en' | 'am' = 'en'
): Promise<ChatResponse> {
  try {
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const model = client.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Build conversation with system prompt
    const systemMessage = THERAPIST_SYSTEM_PROMPT[language];

    // Prepare messages for Gemini
    const messages = [
      {
        role: 'user' as const,
        parts: [{ text: systemMessage }],
      },
      ...conversationHistory.map(msg => ({
        role: msg.role === 'user' ? ('user' as const) : ('model' as const),
        parts: [{ text: msg.content }],
      })),
      {
        role: 'user' as const,
        parts: [{ text: userMessage }],
      },
    ];

    // Call Gemini API
    const response = await model.generateContent({
      contents: messages as any,
    });

    const assistantMessage = response.response.text();

    return {
      message: assistantMessage,
      language,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error in chatbot:', error);
    throw error;
  }
}

export async function chatWithTherapistStream(
  userMessage: string,
  conversationHistory: ChatMessage[],
  language: 'en' | 'am' = 'en'
) {
  try {
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const model = client.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const systemMessage = THERAPIST_SYSTEM_PROMPT[language];

    const messages = [
      {
        role: 'user' as const,
        parts: [{ text: systemMessage }],
      },
      ...conversationHistory.map(msg => ({
        role: msg.role === 'user' ? ('user' as const) : ('model' as const),
        parts: [{ text: msg.content }],
      })),
      {
        role: 'user' as const,
        parts: [{ text: userMessage }],
      },
    ];

    const stream = await model.generateContentStream({
      contents: messages as any,
    });

    return stream;
  } catch (error) {
    console.error('Error in chatbot stream:', error);
    throw error;
  }
}
