import { Request, Response, Router } from 'express';
import { query } from '../utils/database';

const router = Router();

// Simple admin authentication middleware
const adminAuth = (req: Request, res: Response, next: Function) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    // Simple hardcoded check (should be environment variables in production)
    if (username === 'admin' && password === 'admin_1234') {
      next();
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(401).json({ error: 'Invalid authorization header' });
  }
};

// Apply auth middleware to all admin routes
router.use(adminAuth);

// Get statistics
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const totalReports = await query('SELECT COUNT(*) as count FROM reports');
    
    const categoryStats = await query(`
      SELECT category, COUNT(*) as count 
      FROM reports 
      GROUP BY category
    `);
    
    const riskStats = await query(`
      SELECT risk_level, COUNT(*) as count 
      FROM reports 
      GROUP BY risk_level
    `);
    
    const platformStats = await query(`
      SELECT platform_id, COUNT(*) as count 
      FROM reports 
      GROUP BY platform_id
    `);

    const recentReports = await query(`
      SELECT id, category, severity, risk_level, created_at 
      FROM reports 
      ORDER BY created_at DESC 
      LIMIT 10
    `);

    res.json({
      total_reports: parseInt(totalReports.rows[0].count),
      by_category: categoryStats.rows.reduce((acc: any, row: any) => {
        acc[row.category] = parseInt(row.count);
        return acc;
      }, {}),
      by_risk_level: riskStats.rows.reduce((acc: any, row: any) => {
        acc[row.risk_level] = parseInt(row.count);
        return acc;
      }, {}),
      by_platform: platformStats.rows.reduce((acc: any, row: any) => {
        acc[row.platform_id] = parseInt(row.count);
        return acc;
      }, {}),
      recent_reports: recentReports.rows
    });

  } catch (error: any) {
    console.error('Stats error:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve statistics',
      message: error.message 
    });
  }
});

// Get all reports (paginated)
router.get('/reports', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;

    const reports = await query(
      `SELECT id, platform_id, category, severity, risk_level, created_at 
       FROM reports 
       ORDER BY created_at DESC 
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const totalCount = await query('SELECT COUNT(*) as count FROM reports');

    res.json({
      reports: reports.rows,
      pagination: {
        page,
        limit,
        total: parseInt(totalCount.rows[0].count),
        pages: Math.ceil(parseInt(totalCount.rows[0].count) / limit)
      }
    });

  } catch (error: any) {
    console.error('Admin reports error:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve reports',
      message: error.message 
    });
  }
});

export default router;
