import { generateText } from "ai"
import type { ClassificationResult, RiskLevel } from "../types"
import { THREAT_KEYWORDS, STALKING_INDICATORS } from "../constants"

const CLASSIFICATION_PROMPT = `You are an expert analyst specializing in identifying technology-facilitated gender-based violence (TFGBV). Analyze the following content and classify it.

Content to analyze:
"""
{content}
"""

Language: {language}

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
- non_abusive: Content that does not constitute abuse`

export async function classifyContent(content: string, language: "en" | "am"): Promise<ClassificationResult> {
  const prompt = CLASSIFICATION_PROMPT.replace("{content}", content).replace(
    "{language}",
    language === "am" ? "Amharic" : "English",
  )

  try {
    const { text } = await generateText({
      model: "anthropic/claude-sonnet-4-20250514",
      prompt,
      temperature: 0.1,
    })

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("No JSON found in response")
    }

    const result = JSON.parse(jsonMatch[0]) as ClassificationResult

    // Validate and clamp values
    result.severity = Math.max(0, Math.min(100, result.severity))
    result.confidence = Math.max(0, Math.min(1, result.confidence))

    return result
  } catch (error) {
    console.error("Classification error:", error)
    // Return conservative default on error
    return {
      category: "non_abusive",
      severity: 0,
      confidence: 0,
      rationale: "Unable to classify content. Please try again.",
      highlighted_phrases: [],
    }
  }
}

export function calculateRiskLevel(content: string, classification: ClassificationResult): RiskLevel {
  const lowerContent = content.toLowerCase()

  // Check for immediate threat indicators
  const hasThreatKeywords = THREAT_KEYWORDS.some((keyword) => lowerContent.includes(keyword.toLowerCase()))

  const hasStalkingIndicators = STALKING_INDICATORS.some((indicator) => lowerContent.includes(indicator.toLowerCase()))

  // High risk conditions
  if (
    classification.category === "threats" ||
    classification.severity >= 75 ||
    hasThreatKeywords ||
    (classification.category === "stalking" && hasStalkingIndicators)
  ) {
    return "high"
  }

  // Medium risk conditions
  if (
    classification.severity >= 40 ||
    classification.category === "stalking" ||
    classification.category === "image_based_abuse" ||
    hasStalkingIndicators
  ) {
    return "medium"
  }

  return "low"
}
