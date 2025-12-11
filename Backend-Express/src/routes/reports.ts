import { Request, Response, Router } from 'express';
import { query } from '../utils/database';

const router = Router();

// Get report by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query(
      `SELECT r.*, 
        json_agg(
          json_build_object(
            'filename', f.filename,
            'file_size', f.file_size,
            'mime_type', f.mime_type,
            'uploaded_at', f.uploaded_at
          )
        ) as files
      FROM reports r
      LEFT JOIN files f ON r.id = f.report_id
      WHERE r.id = $1
      GROUP BY r.id`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Report not found' });
    }

    const report = result.rows[0];

    // Parse highlighted_phrases if stored as JSON string
    if (report.highlighted_phrases && typeof report.highlighted_phrases === 'string') {
      try {
        report.highlighted_phrases = JSON.parse(report.highlighted_phrases);
      } catch (e) {
        report.highlighted_phrases = [];
      }
    }

    res.json(report);

  } catch (error: any) {
    console.error('Get report error:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve report',
      message: error.message 
    });
  }
});

export default router;
