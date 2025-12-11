import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

const THREAT_KEYWORDS = [
  'kill', 'murder', 'die', 'death', 'attack', 'hurt', 'harm', 'destroy',
  'burn', 'rape', 'assault', 'beat', 'stab', 'shoot', 'bomb',
  'ግደል', 'ሞት', 'አጥፋ', 'አቃጥል', 'ደፈረ'
];

const STALKING_INDICATORS = [
  'watching you', 'following', 'i see you', 'i know where',
  'your address', 'your house', 'your family', 'your work',
  'እከታተልሃለሁ', 'አውቃለሁ የት እንዳለህ'
];

interface ClassificationResult {
  category: string;
  severity: number;
  risk_level: string;
  confidence: number;
  rationale: string;
  highlighted_phrases: string[];
}

export const classifyContent = async (text: string, language: string = 'en'): Promise<ClassificationResult> => {
  if (GEMINI_API_KEY) {
    try {
      return await classifyWithGemini(text, language);
    } catch (error) {
      console.error('Gemini API error:', error);
      return classifyWithRules(text);
    }
  }
  return classifyWithRules(text);
};

const classifyWithGemini = async (text: string, language: string): Promise<ClassificationResult> => {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Analyze the following text for technology-facilitated gender-based violence (TFGBV).

Text to analyze:
"""
${text}
"""

Language: ${language === 'am' ? 'Amharic' : 'English'}

Respond ONLY with valid JSON in this exact format:
{
  "category": "harassment" | "threats" | "stalking" | "image_based_abuse" | "hate_speech" | "sexual_content" | "non_abusive",
  "severity": <number 0-100>,
  "confidence": <number 0-1>,
  "rationale": "<brief explanation>",
  "highlighted_phrases": ["<phrase1>", "<phrase2>"]
}

Category definitions:
- harassment: Repeated unwanted contact, insults, degradation
- threats: Direct or implied threats of violence or harm
- stalking: Monitoring, tracking, or surveillance behavior
- image_based_abuse: Non-consensual sharing/threats of intimate images
- hate_speech: Gender-based discriminatory or dehumanizing language
- sexual_content: Unwanted sexual messages or solicitation
- non_abusive: Content that does not constitute abuse`;

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
    highlighted_phrases: classification.highlighted_phrases || []
  };
};

const classifyWithRules = (text: string): ClassificationResult => {
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

  return {
    category,
    severity,
    risk_level: calculateRiskLevel(category, severity, text),
    confidence,
    rationale,
    highlighted_phrases: Array.from(new Set(highlighted_phrases))
  };
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
