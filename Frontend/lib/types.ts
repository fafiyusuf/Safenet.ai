// Core type definitions for Safenet.ai

export type AbuseCategory =
  | "harassment"
  | "threats"
  | "stalking"
  | "image_based_abuse"
  | "hate_speech"
  | "sexual_content"
  | "non_abusive"

export type RiskLevel = "low" | "medium" | "high"

export type Language = "en" | "am"

export interface Report {
  id: string
  created_at: string
  platform_id: string
  language: Language
  original_text?: string
  extracted_text: string
  category: AbuseCategory
  severity: number
  risk_level: RiskLevel
  confidence: number
  rationale: string
  highlighted_phrases: string[]
  file_hash?: string
  file_url?: string
  expires_at: string
  advice?: string // NEW: Advice for conversational mode
  is_conversational?: boolean // NEW: Indicates if this was text-only analysis
}

export interface UploadedFile {
  id: string
  report_id: string
  filename: string
  mime_type: string
  sha256_hash: string
  storage_path: string
  created_at: string
}

export interface Resource {
  id: string
  name: string
  name_am: string
  type: "ngo" | "legal_aid" | "helpline" | "shelter"
  phone?: string
  email?: string
  website?: string
  region: string
  description: string
  description_am: string
}

export interface Platform {
  id: string
  name: string
  icon: string
}

export interface ClassificationResult {
  category: AbuseCategory
  severity: number
  confidence: number
  rationale: string
  highlighted_phrases: string[]
  advice?: string // NEW: Advice for text-only analysis
  is_conversational?: boolean // NEW: Indicates conversational mode
}

export interface UploadRequest {
  text?: string
  platform_id: string
  language: Language
  timestamp?: string
  anonymous: boolean
}

export interface AdminStats {
  total_reports: number
  reports_by_platform: { platform: string; count: number }[]
  reports_by_category: { category: AbuseCategory; count: number }[]
  severity_distribution: { range: string; count: number }[]
  trend: { date: string; count: number }[]
}
