import { Request, Response, Router } from 'express';
import { generateEvidencePDF } from '../services/pdf';
import { query } from '../utils/database';

const router = Router();

// Generate evidence PDF
router.get('/:id/pdf', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query('SELECT * FROM reports WHERE id = $1', [id]);

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

    const pdfStream = generateEvidencePDF(report);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="evidence-${id.substring(0, 8)}.pdf"`);

    pdfStream.pipe(res);

  } catch (error: any) {
    console.error('Evidence PDF error:', error);
    res.status(500).json({ 
      error: 'Failed to generate evidence PDF',
      message: error.message 
    });
  }
});

export default router;
