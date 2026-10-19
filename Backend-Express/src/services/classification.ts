import Groq from 'groq-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const GROQ_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash';

export const getLanguageName = (code: string): string => {
  switch (code) {
    case 'am':
      return 'Amharic (አማርኛ)';
    case 'om':
      return 'Afaan Oromoo';
    case 'ti':
      return 'Tigrinya (ትግርኛ)';
    case 'so':
      return 'Somali (Soomaali)';
    default:
      return 'English';
  }
};

const THREAT_KEYWORDS = [
  // English violence threats
  'kill', 'murder', 'die', 'death', 'attack', 'hurt', 'harm', 'destroy',
  'burn', 'rape', 'assault', 'beat', 'stab', 'shoot', 'bomb', 'torture',
  'strangle', 'suffocate', 'poison', 'cut', 'slash', 'punch', 'kick',
  'slap', 'strike', 'choke', 'hang', 'drown', 'kidnap', 'abduct',
  'i will kill', 'gonna kill', 'going to kill', 'will hurt', 'gonna hurt',
  'will destroy', 'watch your back', 'better watch out', 'you\'re dead',
  'you\'re finished', 'end you', 'make you pay', 'make you suffer',
  'teach you a lesson', 'punish you', 'make you regret',

  // Amharic threats
  'ግደል', 'ሞት', 'አጥፋ', 'አቃጥል', 'ደፈረ', 'እገድላለሁ', 'እመታለሁ',
  'እቀጣሃለሁ', 'ታጠፋለህ', 'ታሳዝናለህ', 'አጠፋሃለሁ', 'አጠፋሻለሁ', 'አልተውህም',
  'ዋጋህን ታገኛለህ', 'እገድልሻለሁ', 'አስገድዳለሁ',

  // Afaan Oromoo threats
  'ajjeesuu', 'si ajjeesa', 'nan ajjeesa', 'du\'a', 'si miidha', 'sin miidha',
  'si dhabamsiisa', 'sin dhiisu', 'si guba', 'si reeba', 'si balleessa',
  'bakkan si buusu', 'si rukuta', 'dhiiga kee', 'quba si qaba', 'wanti sirra ga\'u',
  'nan si adaba', 'si dhabsiisa', 'si gidirsa', 'si salphisa',

  // Tigrinya threats
  'ክቐትለካ', 'ክቐትለኪ', 'ሞት', 'ክቀትል', 'ክትጠፍእ ኢኺ', 'ክሃርመኪ',
  'ክሃርመካ', 'ኣይገድፈክን', 'ኣይገድፈካን', 'ክቐጽዓኪ', 'ክቐጽዓካ', 'ክቐጥቅጠኪ',
  'ክቐጥቅጠካ', 'ጥፍኣት', 'መቕጻዕቲ', 'ክድፍረኪ', 'ዋጋኺ ክትረኽብዮ ኢኺ',

  // Somali threats
  'waan ku dili', 'dil', 'dhimasho', 'dhib ayaan kuu geysanayaa', 'waan ku garaaci',
  'waan ku gubi', 'kuuma dhaafi doono', 'waan ku baabi\'in', 'waan ku ceebeeyaa',
  'nolosha ayaan kugu ciqaabayaa', 'waan ku weerari', 'waxaad la kulmi doontaa ciqaab'
];

const STALKING_INDICATORS = [
  // English location tracking & surveillance
  'watching you', 'following', 'i see you', 'i know where',
  'your address', 'your house', 'your family', 'your work',
  'followed you', 'watching your', 'know where you live', 'know where you go',
  'track you', 'tracking you', 'found you', 'located you',
  'been watching', 'always watching', 'can see you', 'see everything',
  'monitoring you', 'keeping tabs', 'know your schedule', 'know your routine',
  'everywhere you go', 'follow you home', 'outside your',
  'know where your kids', 'know your children', 'know your mother',
  'know your father', 'know your sister', 'know your brother',

  // Amharic stalking
  'እከታተልሃለሁ', 'አውቃለሁ የት እንዳለህ', 'እመለከትሃለሁ', 'እከታተላለሁ',
  'አየሁህ', 'አገኘሁህ', 'የቤትህን አድራሻ አውቃለሁ', 'የት እንደምትሄድ አውቃለሁ',
  'ሁልጊዜ አሳይሃለሁ', 'ከቤትህ ውጭ ነኝ', 'ስራ ቦታህ አውቃለሁ', 'ልጆችሽን አውቃለሁ',

  // Afaan Oromoo stalking
  'si hordofa', 'bakka ati jirtu nan beeka', 'teessoo kee', 'mana kee',
  'si argeera', 'yeroo hunda si ilaala', 'eessa akka deemtu nan beeka',
  'maatii kee nan beeka', 'hordoffii', 'balbala kee dura jira',
  'bakka hojii kee nan beeka', 'guyyaa hunda si arga',

  // Tigrinya stalking
  'እከታተለኪ ኣለኹ', 'እከታተለካ ኣለኹ', 'ኣበይ ከም ዘለኺ እፈልጥ', 'ኣበይ ከም ዘለኻ እፈልጥ',
  'ገዛኺ እፈልጦ', 'ገዛኻ እፈልጦ', 'ሪአኪ ኣለኹ', 'ሪአካ ኣለኹ', 'ስድራኺ እፈልጦም',
  'ስድራኻ እፈልጦም', 'ኣብ ደገ ገዛኺ ኣለኹ', 'ናበይ ከም ትኸዲ እፈልጥ',

  // Somali stalking
  'waan ku raadgacayaa', 'waan ku daawanayaa', 'waan ogahay meesha aad degan tahay',
  'cinwaankaaga', 'gurigaaga', 'meel kasta oo aad tagto', 'qoyskaaga waan aqaan',
  'waan ku daba socdaa', 'waxaan joogaa bannaanka gurigaaga', 'shaqadaada waan ogahay'
];

export interface ClassificationResult {
  category: string;
  severity: number;
  risk_level: string;
  confidence: number;
  rationale: string;
  highlighted_phrases: string[];
  advice?: string;
  is_conversational?: boolean;
  provider?: 'groq' | 'gemini' | 'rules';
}

/**
 * Classifies content using Groq as primary, falling back to Gemini if quota/error occurs,
 * and falling back to rule-based keyword matching if both AI services fail.
 */
export const classifyContent = async (
  text: string,
  language: string = 'en',
  hasEvidence: boolean = false
): Promise<ClassificationResult> => {
  // 1. Primary: Try Groq API
  if (GROQ_API_KEY) {
    try {
      if (hasEvidence) {
        const res = await classifyWithGroq(text, language);
        console.log('[AI:Classification] Successfully classified with Groq (Primary)');
        return { ...res, provider: 'groq' };
      } else {
        const res = await conversationalAnalysisWithGroq(text, language);
        console.log('[AI:Classification] Successfully analyzed conversation with Groq (Primary)');
        return { ...res, provider: 'groq' };
      }
    } catch (groqError: any) {
      console.warn(
        '[AI:Classification] Groq API error or quota reached, switching to Gemini fallback:',
        groqError?.message || groqError
      );
    }
  } else {
    console.log('[AI:Classification] GROQ_API_KEY not configured, falling back to Gemini');
  }

  // 2. Fallback: Try Google Gemini API
  if (GEMINI_API_KEY) {
    try {
      if (hasEvidence) {
        const res = await classifyWithGemini(text, language);
        console.log('[AI:Classification] Successfully classified with Gemini (Fallback)');
        return { ...res, provider: 'gemini' };
      } else {
        const res = await conversationalAnalysisWithGemini(text, language);
        console.log('[AI:Classification] Successfully analyzed conversation with Gemini (Fallback)');
        return { ...res, provider: 'gemini' };
      }
    } catch (geminiError: any) {
      console.warn(
        '[AI:Classification] Gemini API error, falling back to rule-based classification:',
        geminiError?.message || geminiError
      );
    }
  }

  // 3. Ultimate Fallback: Rule-based classification
  console.log('[AI:Classification] Using rule-based fallback classification');
  return {
    ...classifyWithRules(text, hasEvidence, language),
    provider: 'rules'
  };
};

/**
 * Evidence classification via Groq (Primary)
 */
const classifyWithGroq = async (text: string, language: string): Promise<ClassificationResult> => {
  if (!GROQ_API_KEY) throw new Error('GROQ_API_KEY is not configured');

  const groq = new Groq({ apiKey: GROQ_API_KEY });
  const langName = getLanguageName(language);

  const prompt = `You are an expert analyst specializing in technology-facilitated gender-based violence (TFGBV). Analyze the following text extracted from evidence (screenshot/image).

Text to analyze:
"""
${text}
"""

Target User Language: ${langName}

IMPORTANT CONTEXT:
- This text was extracted from a screenshot or image evidence
- Look for patterns of abuse, threats, harassment, stalking, hate speech, or sexual violence/exploitation
- Consider linguistic, regional, and cultural context for Ethiopia and the Horn of Africa (English, Amharic, Afaan Oromoo, Tigrinya, Somali)
- Pay attention to implicit threats, coercion, power dynamics, and blackmail
- Repeated contact or messages can indicate harassment even if individual messages seem mild

SEVERITY GUIDELINES:
- 80-100: Immediate danger (death threats, rape threats, explicit physical violence)
- 60-79: Serious harm (stalking with personal info/locations, blackmail, sustained severe harassment)
- 40-59: Moderate harm (sexual harassment, degrading slurs, intimidation)
- 20-39: Low-moderate (inappropriate comments, boundary violations)
- 0-19: Minimal or non-abusive

Respond ONLY with valid JSON in this exact format:
{
  "category": "harassment" | "threats" | "stalking" | "image_based_abuse" | "hate_speech" | "sexual_content" | "non_abusive",
  "severity": <number 0-100>,
  "confidence": <number 0-1>,
  "rationale": "<detailed explanation of why this is categorized as such, referencing specific content. Provide in ${langName}>",
  "highlighted_phrases": ["<concerning phrase1>", "<concerning phrase2>"]
}

Category definitions:
- harassment: Repeated unwanted contact, insults, degradation, persistent messages
- threats: Direct or implied threats of violence, harm, or negative consequences
- stalking: Monitoring, tracking, surveillance, mentioning locations or personal details
- image_based_abuse: Non-consensual sharing/threats of intimate images or videos
- hate_speech: Gender-based discriminatory, dehumanizing, or misogynistic language
- sexual_content: Unwanted sexual messages, solicitation, or explicit content
- non_abusive: Content that does not constitute abuse

Be thorough but concise. Return valid JSON only.`;

  const completion = await groq.chat.completions.create({
    model: GROQ_MODEL,
    messages: [
      {
        role: 'system',
        content: 'You are an expert TFGBV forensic analyst. You must return valid JSON only.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 0.1,
    response_format: { type: 'json_object' }
  });

  const responseText = completion.choices[0]?.message?.content || '{}';
  const classification = JSON.parse(responseText);
  const severity = Math.max(0, Math.min(100, parseInt(classification.severity, 10) || 0));
  const category = classification.category || 'non_abusive';

  return {
    category,
    severity,
    risk_level: calculateRiskLevel(category, severity, text),
    confidence: Math.max(0, Math.min(1, parseFloat(classification.confidence) || 0.5)),
    rationale: classification.rationale || '',
    highlighted_phrases: Array.isArray(classification.highlighted_phrases) ? classification.highlighted_phrases : [],
    is_conversational: false
  };
};

/**
 * Conversational text assessment via Groq (Primary)
 */
const conversationalAnalysisWithGroq = async (text: string, language: string): Promise<ClassificationResult> => {
  if (!GROQ_API_KEY) throw new Error('GROQ_API_KEY is not configured');

  const groq = new Groq({ apiKey: GROQ_API_KEY });
  const langName = getLanguageName(language);

  const prompt = `You are a supportive counselor helping someone who may be experiencing technology-facilitated gender-based violence (TFGBV). They have shared some text content with you.

Text shared:
"""
${text}
"""

Target User Language: ${langName}

Your role is to:
1. Assess if this content shows signs of abuse, harassment, threats, or inappropriate behavior
2. Provide supportive, non-judgmental feedback in ${langName}
3. Offer practical safety advice in ${langName}
4. Validate their concerns

SEVERITY GUIDELINES (be sensitive but realistic):
- 80-100: Immediate danger - urgent action needed
- 60-79: Serious concern - safety planning recommended
- 40-59: Concerning behavior - boundary setting advised
- 20-39: Potentially problematic - worth monitoring
- 0-19: Likely not abusive - may be misunderstanding

Respond ONLY with valid JSON in this exact format:
{
  "category": "harassment" | "threats" | "stalking" | "image_based_abuse" | "hate_speech" | "sexual_content" | "non_abusive" | "unclear",
  "severity": <number 0-100>,
  "confidence": <number 0-1>,
  "rationale": "<brief, supportive explanation in ${langName} of what you observe in the content>",
  "highlighted_phrases": ["<concerning phrase1>", "<concerning phrase2>"],
  "advice": "<practical, empowering safety advice in ${langName} based on the assessment. Mention Ethiopian resources (7711, 991, AWSAD, EWLA) if abuse is detected.>"
}`;

  const completion = await groq.chat.completions.create({
    model: GROQ_MODEL,
    messages: [
      {
        role: 'system',
        content: 'You are a compassionate, expert TFGBV support counselor. You must return valid JSON only.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 0.2,
    response_format: { type: 'json_object' }
  });

  const responseText = completion.choices[0]?.message?.content || '{}';
  const classification = JSON.parse(responseText);
  const severity = Math.max(0, Math.min(100, parseInt(classification.severity, 10) || 0));
  const category = classification.category || 'non_abusive';

  return {
    category,
    severity,
    risk_level: calculateRiskLevel(category, severity, text),
    confidence: Math.max(0, Math.min(1, parseFloat(classification.confidence) || 0.5)),
    rationale: classification.rationale || '',
    highlighted_phrases: Array.isArray(classification.highlighted_phrases) ? classification.highlighted_phrases : [],
    advice: classification.advice || 'If you feel unsafe, please reach out to local support services.',
    is_conversational: true
  };
};

/**
 * Evidence classification via Gemini (Fallback)
 */
const classifyWithGemini = async (text: string, language: string): Promise<ClassificationResult> => {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
  const model = genAI.getGenerativeModel({ model: modelName });
  const langName = getLanguageName(language);

  const prompt = `You are an expert analyst specializing in technology-facilitated gender-based violence (TFGBV). Analyze the following text extracted from evidence (screenshot/image).

Text to analyze:
"""
${text}
"""

Target User Language: ${langName}

IMPORTANT CONTEXT:
- This text was extracted from a screenshot or image evidence
- Look for patterns of abuse, threats, harassment, stalking, or sexual content
- Consider cultural and linguistic context in Ethiopia (English, Amharic, Afaan Oromoo, Tigrinya, Somali)
- Pay attention to implicit threats, coercion, and power dynamics
- Repeated contact or messages can indicate harassment even if individual messages seem mild

SEVERITY GUIDELINES:
- 80-100: Immediate danger (death threats, rape threats, explicit violence)
- 60-79: Serious harm (stalking with personal info, blackmail, sustained harassment)
- 40-59: Moderate harm (sexual harassment, degrading language, intimidation)
- 20-39: Low-moderate (inappropriate comments, boundary violations)
- 0-19: Minimal or non-abusive

Respond ONLY with valid JSON in this exact format:
{
  "category": "harassment" | "threats" | "stalking" | "image_based_abuse" | "hate_speech" | "sexual_content" | "non_abusive",
  "severity": <number 0-100>,
  "confidence": <number 0-1>,
  "rationale": "<detailed explanation in ${langName} of why this is categorized as such, referencing specific content>",
  "highlighted_phrases": ["<concerning phrase1>", "<concerning phrase2>"]
}

Category definitions:
- harassment: Repeated unwanted contact, insults, degradation, persistent messages
- threats: Direct or implied threats of violence, harm, or negative consequences
- stalking: Monitoring, tracking, surveillance, mentioning locations or personal details
- image_based_abuse: Non-consensual sharing/threats of intimate images or videos
- hate_speech: Gender-based discriminatory, dehumanizing, or misogynistic language
- sexual_content: Unwanted sexual messages, solicitation, or explicit content
- non_abusive: Content that does not constitute abuse

Be thorough but concise. Focus on evidence-based analysis.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const responseText = response.text();

  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('No JSON found in response');
  }

  const classification = JSON.parse(jsonMatch[0]);
  const severity = Math.max(0, Math.min(100, parseInt(classification.severity, 10) || 0));
  const category = classification.category || 'non_abusive';

  return {
    category,
    severity,
    risk_level: calculateRiskLevel(category, severity, text),
    confidence: Math.max(0, Math.min(1, parseFloat(classification.confidence) || 0.5)),
    rationale: classification.rationale || '',
    highlighted_phrases: Array.isArray(classification.highlighted_phrases) ? classification.highlighted_phrases : [],
    is_conversational: false
  };
};

/**
 * Conversational text assessment via Gemini (Fallback)
 */
const conversationalAnalysisWithGemini = async (text: string, language: string): Promise<ClassificationResult> => {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
  const model = genAI.getGenerativeModel({ model: modelName });
  const langName = getLanguageName(language);

  const prompt = `You are a supportive counselor helping someone who may be experiencing technology-facilitated gender-based violence (TFGBV). They have shared some text content with you.

Text shared:
"""
${text}
"""

Target User Language: ${langName}

Your role is to:
1. Assess if this content shows signs of abuse, harassment, threats, or inappropriate behavior
2. Provide supportive, non-judgmental feedback in ${langName}
3. Offer practical safety advice in ${langName} if needed
4. Validate their concerns

SEVERITY GUIDELINES (be sensitive but realistic):
- 80-100: Immediate danger - urgent action needed
- 60-79: Serious concern - safety planning recommended
- 40-59: Concerning behavior - boundary setting advised
- 20-39: Potentially problematic - worth monitoring
- 0-19: Likely not abusive - may be misunderstanding

Respond ONLY with valid JSON in this exact format:
{
  "category": "harassment" | "threats" | "stalking" | "image_based_abuse" | "hate_speech" | "sexual_content" | "non_abusive" | "unclear",
  "severity": <number 0-100>,
  "confidence": <number 0-1>,
  "rationale": "<brief, supportive explanation in ${langName} of what you observe in the content>",
  "highlighted_phrases": ["<concerning phrase1>", "<concerning phrase2>"],
  "advice": "<practical, empowering safety advice in ${langName} based on the assessment. Include resources (7711, 991) or next steps if abuse is detected.>"
}

Be compassionate, clear, and action-oriented in your advice.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const responseText = response.text();

  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('No JSON found in response');
  }

  const classification = JSON.parse(jsonMatch[0]);
  const severity = Math.max(0, Math.min(100, parseInt(classification.severity, 10) || 0));
  const category = classification.category || 'non_abusive';

  return {
    category,
    severity,
    risk_level: calculateRiskLevel(category, severity, text),
    confidence: Math.max(0, Math.min(1, parseFloat(classification.confidence) || 0.5)),
    rationale: classification.rationale || '',
    highlighted_phrases: Array.isArray(classification.highlighted_phrases) ? classification.highlighted_phrases : [],
    advice: classification.advice || 'If you feel unsafe, please reach out to local support services.',
    is_conversational: true
  };
};

/**
 * Keyword-based fallback classification when AI APIs are unreachable or exhausted
 */
const classifyWithRules = (
  text: string,
  hasEvidence: boolean = false,
  language: string = 'en'
): ClassificationResult => {
  const textLower = text.toLowerCase();
  let severity = 0;
  let category = 'non_abusive';
  const highlighted_phrases: string[] = [];
  const rationale_parts: string[] = [];

  // Check for threats
  for (const keyword of THREAT_KEYWORDS) {
    if (textLower.includes(keyword.toLowerCase())) {
      highlighted_phrases.push(keyword);
      severity += 30;
      if (category === 'non_abusive') category = 'threats';
      if (!rationale_parts.includes('Direct threat indicators detected')) {
        rationale_parts.push('Direct threat indicators detected');
      }
    }
  }

  // Check for stalking
  for (const indicator of STALKING_INDICATORS) {
    if (textLower.includes(indicator.toLowerCase())) {
      highlighted_phrases.push(indicator);
      severity += 20;
      if (category === 'non_abusive') category = 'stalking';
      if (!rationale_parts.includes('Stalking behavior patterns identified')) {
        rationale_parts.push('Stalking behavior patterns identified');
      }
    }
  }

  severity = Math.min(100, severity);
  const confidence = Math.min(0.95, 0.5 + (highlighted_phrases.length * 0.1));
  const rationale = rationale_parts.length > 0
    ? rationale_parts.join('. ') + '.'
    : 'No clear abuse indicators detected in the content.';

  const result: ClassificationResult = {
    category,
    severity,
    risk_level: calculateRiskLevel(category, severity, text),
    confidence,
    rationale,
    highlighted_phrases: Array.from(new Set(highlighted_phrases)),
    is_conversational: !hasEvidence
  };

  // Add advice for conversational mode
  if (!hasEvidence) {
    result.advice = getLocalizedFallbackAdvice(severity, language);
  }

  return result;
};

const getLocalizedFallbackAdvice = (severity: number, language: string): string => {
  if (language === 'am') {
    if (severity >= 60) {
      return 'ይህ ይዘት አስጊ ሁኔታዎችን ያሳያል። ማስረጃዎችን ይያዙ፣ ለህግ አስከባሪዎች ያሳውቁ፣ እና ወደ ነፃ የድጋፍ መስመር 7711 ወይም 991 ይደውሉ።';
    } else if (severity >= 30) {
      return 'ይህ ሁኔታ አሳሳቢ ሊሆን ይችላል። ስሜትዎን ያዳምጡ፣ ግልጽ ድንበር ያበጁ፣ እና የታመኑ ሰዎችን ወይም አማካሪዎችን ያማክሩ።';
    }
    return 'በዚህ ጽሁፍ ላይ ግልጽ የሆነ ጥቃት አልታየም። ሆኖም የደህንነት ስጋት ካለዎት ድጋፍ መፈለግ ሁልጊዜ ተገቢ ነው።';
  }

  if (language === 'om') {
    if (severity >= 60) {
      return 'Qabiyyichi balaa olaanaa agarsiisa. Ragaalee qabadhaa, toora bilbilaa bilisaa 7711 ykn Poolisii 991 bilbilaa.';
    } else if (severity >= 30) {
      return 'Kun yaaddessaa ta\'uu danda\'a. Daangaa ifa ta\'e kaa\'aa, gorsitoota ykn namoota amantan haasofsiisaa.';
    }
    return 'Qabiyyee kana irratti miidhaan ifa ta\'e hin mul\'atu. Garuu nageenyi keessan yoo isin yaaddesse deeggarsa barbaadaa.';
  }

  if (language === 'ti') {
    if (severity >= 60) {
      return 'እዚ ትሕዝቶ ከቢድ ሓደጋ የርኢ። መረዳእታታት ሓዙ፡ ናብ ናጻ መስመር 7711 ወይ ፖሊስ 991 ብምድዋል ሓገዝ ሕተቱ።';
    } else if (severity >= 30) {
      return 'እዚ ኩነታት ዘተሓሳስብ ክኸውን ይኽእል እዩ። ደረት ግበሩ፡ ምስ እትኣምንዎም ሰባት ወይ ኣማኸርቲ ተመያየጡ።';
    }
    return 'ኣብዚ ጽሑፍ ንጹር መጥቃዕቲ ኣይተረኽበን። ይኹን እምበር ድሕነትኩም ዘተሓሳስበኩም እንተኾይኑ ሓገዝ ምድላይ ቅኑዕ እዩ።';
  }

  if (language === 'so') {
    if (severity >= 60) {
      return 'Nuxurku wuxuu muujinayaa khatar sare. Hayso caddaymaha, la xiriir khadka degdegga ah 7711 ama Booliska 991.';
    } else if (severity >= 30) {
      return 'Tani waxay noqon kartaa mid walaac leh. Xuduud cad samee, la tasho dad aad ku kalsoon tahay ama la-taliyayaal.';
    }
    return 'Qoraalkan laguma arag xadgudub cad. Si kastaba, haddii aad ka walaacsan tahay badbaadadaada, caawimo raadso.';
  }

  // English fallback
  if (severity >= 60) {
    return 'This content shows concerning patterns. Consider documenting this behavior, reaching out to local support services (hotline 7711 or 991), and creating a safety plan.';
  } else if (severity >= 30) {
    return 'While this may be concerning, trust your instincts. If you feel uncomfortable or unsafe, consider setting clear boundaries or seeking support from trusted professionals.';
  }
  return 'Based on this text alone, there are no clear indicators of abuse. However, if you have concerns about your safety or well-being, it is always valid to seek support.';
};

export const calculateRiskLevel = (category: string, severity: number, text: string): string => {
  const textLower = text.toLowerCase();
  let riskScore = 0;

  if (severity >= 70) riskScore += 40;
  else if (severity >= 40) riskScore += 25;
  else if (severity >= 20) riskScore += 10;

  if (['threats', 'stalking', 'image_based_abuse'].includes(category)) {
    riskScore += 30;
  } else if (['sexual_content', 'harassment'].includes(category)) {
    riskScore += 15;
  }

  const immediateDanger = [
    'i will kill', 'going to kill', 'will hurt you', 'coming for you',
    'እገድልሃለሁ', 'እገድልሻለሁ', 'si ajjeesa', 'nan ajjeesa',
    'ክቐትለኪ', 'ክቐትለካ', 'waan ku dili'
  ];
  for (const phrase of immediateDanger) {
    if (textLower.includes(phrase)) {
      riskScore += 20;
      break;
    }
  }

  if (riskScore >= 50) return 'high';
  if (riskScore >= 25) return 'medium';
  return 'low';
};
