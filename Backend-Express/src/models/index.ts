// Database Models and Types

export interface Report {
  id: string;
  created_at: Date;
  expires_at: Date;
  platform_id: string;
  language: string;
  original_text?: string;
  extracted_text: string;
  category: string;
  severity: number;
  risk_level: string;
  confidence: number;
  rationale?: string;
  highlighted_phrases?: string[];
  file_hash?: string;
  anonymous: boolean;
  metadata?: Record<string, any>;
}

export interface FileRecord {
  id: number;
  report_id: string;
  filename: string;
  mime_type: string;
  file_size: number;
  file_hash: string;
  storage_path?: string;
  uploaded_at: Date;
}

export interface CreateReportInput {
  platform_id: string;
  language: string;
  extracted_text: string;
  category: string;
  severity: number;
  risk_level: string;
  confidence: number;
  rationale: string;
  highlighted_phrases?: string[];
  file_hash?: string;
  original_text?: string;
}

export interface CreateFileInput {
  report_id: string;
  filename: string;
  mime_type: string;
  file_size: number;
  file_hash: string;
  storage_path?: string;
}

// Report categories
export enum ReportCategory {
  SEXUAL_HARASSMENT = 'sexual_harassment',
  THREATS = 'threats',
  STALKING = 'stalking',
  DOXXING = 'doxxing',
  IMPERSONATION = 'impersonation',
  NON_CONSENSUAL_SHARING = 'non_consensual_sharing',
  HATE_SPEECH = 'hate_speech',
  NON_ABUSIVE = 'non_abusive'
}

// Risk levels
export enum RiskLevel {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  MINIMAL = 'minimal'
}

// Platform IDs
export enum Platform {
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
  TELEGRAM = 'telegram',
  WHATSAPP = 'whatsapp',
  TWITTER = 'twitter',
  TIKTOK = 'tiktok',
  SNAPCHAT = 'snapchat',
  EMAIL = 'email',
  OTHER = 'other'
}

// Language codes
export enum Language {
  ENGLISH = 'en',
  AMHARIC = 'am'
}

// Database operations helpers
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginationResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface AdminStats {
  total_reports: number;
  by_category: Record<string, number>;
  by_risk_level: Record<string, number>;
  by_platform: Record<string, number>;
  recent_reports: Array<{
    id: string;
    category: string;
    severity: number;
    risk_level: string;
    created_at: Date;
  }>;
}
