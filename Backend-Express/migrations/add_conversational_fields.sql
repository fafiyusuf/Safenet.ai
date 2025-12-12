-- Migration: Add conversational mode fields to reports table
-- Date: 2025-12-12
-- Description: Adds 'advice' and 'is_conversational' columns to support text-only analysis mode

-- Add advice column for storing safety recommendations
ALTER TABLE reports 
ADD COLUMN IF NOT EXISTS advice TEXT;

-- Add is_conversational flag to distinguish text-only from evidence-based reports
ALTER TABLE reports 
ADD COLUMN IF NOT EXISTS is_conversational BOOLEAN DEFAULT false;

-- Create index for filtering conversational reports (optional, for analytics)
CREATE INDEX IF NOT EXISTS idx_reports_conversational ON reports(is_conversational);

-- Update existing reports to mark them as non-conversational (evidence-based)
-- This ensures backward compatibility
UPDATE reports 
SET is_conversational = false 
WHERE is_conversational IS NULL;

-- Confirm migration
SELECT 
  COUNT(*) as total_reports,
  SUM(CASE WHEN is_conversational = true THEN 1 ELSE 0 END) as conversational_reports,
  SUM(CASE WHEN is_conversational = false THEN 1 ELSE 0 END) as evidence_based_reports
FROM reports;
