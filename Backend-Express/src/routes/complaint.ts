import { Request, Response, Router } from 'express';
import { generateComplaintPDF } from '../services/pdf';
import { query } from '../utils/database';

const router = Router();

// Generate complaint PDF
router.get('/:id/pdf', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const language = (req.query.language as string) || 'en';

    const result = await query('SELECT * FROM reports WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Report not found' });
    }

    const report = result.rows[0];

    const pdfStream = generateComplaintPDF(report, language);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="complaint-${id.substring(0, 8)}-${language}.pdf"`);

    pdfStream.pipe(res);

  } catch (error: any) {
    console.error('Complaint PDF error:', error);
    res.status(500).json({ 
      error: 'Failed to generate complaint PDF',
      message: error.message 
    });
  }
});

export default router;
