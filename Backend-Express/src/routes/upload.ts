import crypto from 'crypto';
import { Request, Response, Router } from 'express';
import multer from 'multer';
import { classifyContent } from '../services/classification';
import { extractTextFromImage } from '../services/ocr';
import { query } from '../utils/database';

const router = Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and WebP are allowed.'));
    }
  }
});

interface UploadRequestBody {
  platform_id?: string;
  language?: string;
  text?: string;
}

router.post('/', upload.single('file'), async (req: Request<{}, {}, UploadRequestBody>, res: Response) => {
  try {
    const platform_id = req.body.platform_id || 'other';
    const language = req.body.language || 'en';
    const textInput = req.body.text;

    // Check if we have either a file or text input
    if (!req.file && !textInput) {
      return res.status(400).json({ error: 'No file or text content provided' });
    }

    let extractedText: string;
    let fileHash: string | null = null;

    // If file is uploaded, extract text from it
    if (req.file) {
      // Calculate file hash for evidence integrity
      fileHash = crypto.createHash('sha256').update(req.file.buffer).digest('hex');

      // Extract text using OCR
      console.log('Extracting text from image...');
      extractedText = await extractTextFromImage(req.file.buffer, language);

      if (!extractedText || extractedText.trim().length < 10) {
        return res.status(400).json({ 
          error: 'Could not extract sufficient text from image',
          extractedText 
        });
      }
    } else {
      // Use the text input directly
      console.log('Using text input directly...');
      extractedText = textInput!.trim();

      if (extractedText.length < 10) {
        return res.status(400).json({ 
          error: 'Text content must be at least 10 characters long'
        });
      }
    }

    // Classify content using AI
    console.log('Classifying content...');
    const classification = await classifyContent(extractedText, language);

    // Generate report ID
    const reportId = crypto.randomUUID();

    // Set expires_at (90 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 90); // 90 days retention

    // Save to database
    const reportResult = await query(
      `INSERT INTO reports (
        id, created_at, expires_at, platform_id, language, original_text, extracted_text, category, 
        severity, risk_level, confidence, rationale, highlighted_phrases, file_hash, anonymous, metadata
      ) VALUES ($1, NOW(), $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING *`,
      [
        reportId,
        expiresAt,
        platform_id,
        language,
        textInput || null, // original_text (store if text was pasted)
        extractedText,
        classification.category,
        classification.severity,
        classification.risk_level,
        classification.confidence,
        classification.rationale,
        JSON.stringify(classification.highlighted_phrases),
        fileHash,
        true, // anonymous
        {}    // metadata
      ]
    );

    // Save file record only if a file was uploaded
    if (req.file && fileHash) {
      await query(
        `INSERT INTO files (report_id, filename, file_size, mime_type, file_hash)
        VALUES ($1, $2, $3, $4, $5)`,
        [
          reportId,
          req.file.originalname,
          req.file.size,
          req.file.mimetype,
          fileHash
        ]
      );
    }

    // Save highlighted phrases if any
    if (classification.highlighted_phrases && classification.highlighted_phrases.length > 0) {
      // Store as JSON in the report or in a separate table (simplified here)
      await query(
        `UPDATE reports SET highlighted_phrases = $1 WHERE id = $2`,
        [JSON.stringify(classification.highlighted_phrases), reportId]
      );
    }

    const report = reportResult.rows[0];

    res.json({
      report_id: report.id,
      platform_id: report.platform_id,
      language: report.language,
      classification: {
        category: report.category,
        severity: report.severity,
        risk_level: report.risk_level,
        confidence: report.confidence,
        rationale: report.rationale,
        highlighted_phrases: classification.highlighted_phrases
      },
      extracted_text: report.extracted_text,
      file_hash: report.file_hash,
      created_at: report.created_at
    });

  } catch (error: any) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      error: 'Failed to process upload',
      message: error.message 
    });
  }
});

export default router;
