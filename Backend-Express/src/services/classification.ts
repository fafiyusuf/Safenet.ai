import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

const THREAT_KEYWORDS = [
  // Direct violence threats
  'kill', 'murder', 'die', 'death', 'attack', 'hurt', 'harm', 'destroy',
  'burn', 'rape', 'assault', 'beat', 'stab', 'shoot', 'bomb', 'torture',
  'strangle', 'suffocate', 'poison', 'cut', 'slash', 'punch', 'kick',
  'slap', 'strike', 'choke', 'hang', 'drown', 'kidnap', 'abduct',
  // Threatening phrases
  'i will kill', 'gonna kill', 'going to kill', 'will hurt', 'gonna hurt',
  'will destroy', 'watch your back', 'better watch out', 'you\'re dead',
  'you\'re finished', 'end you', 'make you pay', 'make you suffer',
  'teach you a lesson', 'punish you', 'make you regret',
  // Amharic threats
  'ግደል', 'ሞት', 'አጥፋ', 'አቃጥል', 'ደፈረ', 'እገድላለሁ', 'እመታለሁ',
  'እቀጣሃለሁ', 'ታጠፋለህ', 'ታሳዝናለህ'
];

const STALKING_INDICATORS = [
  // Location tracking
  'watching you', 'following', 'i see you', 'i know where',
  'your address', 'your house', 'your family', 'your work',
  'followed you', 'watching your', 'know where you live', 'know where you go',
  'track you', 'tracking you', 'found you', 'located you',
  // Surveillance
  'been watching', 'always watching', 'can see you', 'see everything',
  'monitoring you', 'keeping tabs', 'know your schedule', 'know your routine',
  'everywhere you go', 'follow you home', 'outside your',
  // Personal information threats
  'know where your kids', 'know your children', 'know your mother',
  'know your father', 'know your sister', 'know your brother',
  // Amharic stalking
  'እከታተልሃለሁ', 'አውቃለሁ የት እንዳለህ', 'እመለከትሃለሁ', 'እከታተላለሁ',
  'አየሁህ', 'አገኘሁህ', 'የቤትህን አድራሻ አውቃለሁ'
];

interface ClassificationResult {
  category: string;
  severity: number;
  risk_level: string;
  confidence: number;
  rationale: string;
  highlighted_phrases: string[];
  advice?: string;
  is_conversational?: boolean;
}

export const classifyContent = async (
  text: string, 
  language: string = 'en', 
  hasEvidence: boolean = false
): Promise<ClassificationResult> => {
  if (GEMINI_API_KEY) {
    try {
      // Use different prompts based on whether there's evidence
      if (hasEvidence) {
        return await classifyWithGemini(text, language);
      } else {
        return await conversationalAnalysis(text, language);
      }
    } catch (error) {
      console.error('Gemini API error:', error);
      return classifyWithRules(text, hasEvidence);
    }
  }
  return classifyWithRules(text, hasEvidence);
};

const classifyWithGemini = async (text: string, language: string): Promise<ClassificationResult> => {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `You are an expert analyst specializing in technology-facilitated gender-based violence (TFGBV). Analyze the following text extracted from evidence (screenshot/image).

Text to analyze:
"""
${text}
"""

Language: ${language === 'am' ? 'Amharic' : 'English'}

IMPORTANT CONTEXT:
- This text was extracted from a screenshot or image evidence
- Look for patterns of abuse, threats, harassment, stalking, or sexual content
- Consider cultural and linguistic context
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
  "rationale": "<detailed explanation of why this is categorized as such, referencing specific content>",
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
  const severity = Math.max(0, Math.min(100, parseInt(classification.severity) || 0));
  const category = classification.category || 'non_abusive';
  
  return {
    category,
    severity,
    risk_level: calculateRiskLevel(category, severity, text),
    confidence: Math.max(0, Math.min(1, parseFloat(classification.confidence) || 0.5)),
    rationale: classification.rationale || '',
    highlighted_phrases: classification.highlighted_phrases || [],
    is_conversational: false
  };
};

// New function for conversational analysis (text-only, no evidence)
const conversationalAnalysis = async (text: string, language: string): Promise<ClassificationResult> => {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `You are a supportive counselor helping someone who may be experiencing technology-facilitated gender-based violence (TFGBV). They have shared some text content with you.

Text shared:
"""
${text}
"""

Language: ${language === 'am' ? 'Amharic' : 'English'}

Your role is to:
1. Assess if this content shows signs of abuse, harassment, threats, or inappropriate behavior
2. Provide supportive, non-judgmental feedback
3. Offer practical safety advice if needed
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
  "rationale": "<brief, supportive explanation of what you observe in the content>",
  "highlighted_phrases": ["<concerning phrase1>", "<concerning phrase2>"],
  "advice": "<practical, empowering safety advice based on the assessment. Include resources or next steps if abuse is detected. Be supportive if content is unclear or non-abusive.>"
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
  const severity = Math.max(0, Math.min(100, parseInt(classification.severity) || 0));
  const category = classification.category || 'non_abusive';
  
  return {
    category,
    severity,
    risk_level: calculateRiskLevel(category, severity, text),
    confidence: Math.max(0, Math.min(1, parseFloat(classification.confidence) || 0.5)),
    rationale: classification.rationale || '',
    highlighted_phrases: classification.highlighted_phrases || [],
    advice: classification.advice || 'If you feel unsafe, please reach out to local support services.',
    is_conversational: true
  };
};

const classifyWithRules = (text: string, hasEvidence: boolean = false): ClassificationResult => {
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

  // Add advice for conversational mode (no evidence)
  if (!hasEvidence) {
    if (severity >= 60) {
      result.advice = 'This content shows concerning patterns. Consider documenting this behavior, reaching out to local support services, and creating a safety plan. You deserve to feel safe.';
    } else if (severity >= 30) {
      result.advice = 'While this may be concerning, trust your instincts. If you feel uncomfortable or unsafe, consider setting clear boundaries or seeking support from trusted friends or professionals.';
    } else {
      result.advice = 'Based on this text alone, there are no clear indicators of abuse. However, if you have concerns about your safety or well-being, it\'s always valid to seek support.';
    }
  }

  return result;
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

  const immediateDanger = ['i will kill', 'going to kill', 'will hurt you', 'coming for you'];
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
