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
}

router.post('/', upload.single('file'), async (req: Request<{}, {}, UploadRequestBody>, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const platform_id = req.body.platform_id || 'other';
    const language = req.body.language || 'en';

    // Calculate file hash for evidence integrity
    const fileHash = crypto.createHash('sha256').update(req.file.buffer).digest('hex');

    // Step 1: Extract text using OCR
    console.log('Extracting text from image...');
    const extractedText = await extractTextFromImage(req.file.buffer, language);

    if (!extractedText || extractedText.trim().length < 10) {
      return res.status(400).json({ 
        error: 'Could not extract sufficient text from image',
        extractedText 
      });
    }

    // Step 2: Classify content using AI
    console.log('Classifying content...');
    const classification = await classifyContent(extractedText, language);

    // Step 3: Generate report ID
    const reportId = crypto.randomUUID();

    // Step 4: Save to database
    const reportResult = await query(
      `INSERT INTO reports (
        id, platform_id, language, extracted_text, category, 
        severity, risk_level, confidence, rationale, file_hash
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`,
      [
        reportId,
        platform_id,
        language,
        extractedText,
        classification.category,
        classification.severity,
        classification.risk_level,
        classification.confidence,
        classification.rationale,
        fileHash
      ]
    );

    // Save file record
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
