import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { query } from '../utils/database';

dotenv.config();

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'safenet-jwt-secret-key-change-in-production';

// Admin login endpoint (public)
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const result = await query(
      'SELECT * FROM admins WHERE username = $1 AND is_active = true',
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const admin = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, admin.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    await query(
      'UPDATE admins SET last_login = NOW() WHERE id = $1',
      [admin.id]
    );

    const token = jwt.sign(
      { id: admin.id, username: admin.username, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      success: true,
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email
      }
    });
  } catch (error: any) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Login failed', message: error.message });
  }
});

// Admin authentication middleware (supports Bearer JWT token & legacy Basic auth)
const adminAuth = async (req: Request, res: Response, next: Function) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized: missing authorization header' });
  }

  // 1. Bearer Token Authentication (Preferred)
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      (req as any).admin = decoded;
      return next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  }

  // 2. Fallback: Basic Authentication
  if (authHeader.startsWith('Basic ')) {
    try {
      const base64Credentials = authHeader.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
      const [username, password] = credentials.split(':');

      const result = await query(
        'SELECT * FROM admins WHERE username = $1 AND is_active = true',
        [username]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const admin = result.rows[0];
      const passwordMatch = await bcrypt.compare(password, admin.password_hash);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      (req as any).admin = admin;
      return next();
    } catch (error) {
      console.error('Admin basic auth error:', error);
      return res.status(401).json({ error: 'Invalid authorization header' });
    }
  }

  return res.status(401).json({ error: 'Unauthorized: invalid authorization format' });
};

// Apply auth middleware to all routes below
router.use(adminAuth);

// Get statistics
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const totalReports = await query('SELECT COUNT(*) as count FROM reports');
    
    const categoryStats = await query(`
      SELECT category, COUNT(*) as count 
      FROM reports 
      GROUP BY category
      ORDER BY count DESC
    `);
    
    const riskStats = await query(`
      SELECT risk_level, COUNT(*) as count 
      FROM reports 
      GROUP BY risk_level
      ORDER BY count DESC
    `);
    
    const platformStats = await query(`
      SELECT platform_id, COUNT(*) as count 
      FROM reports 
      GROUP BY platform_id
      ORDER BY count DESC
    `);

    const severityStats = await query(`
      SELECT 
        CASE 
          WHEN severity >= 80 THEN 'High (80-100)'
          WHEN severity >= 50 THEN 'Medium (50-79)'
          ELSE 'Low (0-49)'
        END as range,
        COUNT(*) as count
      FROM reports
      GROUP BY range
      ORDER BY range
    `);

    res.json({
      total_reports: parseInt(totalReports.rows[0].count),
      reports_by_category: categoryStats.rows.map(row => ({
        category: row.category,
        count: parseInt(row.count)
      })),
      reports_by_risk: riskStats.rows.map(row => ({
        risk_level: row.risk_level,
        count: parseInt(row.count)
      })),
      reports_by_platform: platformStats.rows.map(row => ({
        platform: row.platform_id,
        count: parseInt(row.count)
      })),
      severity_distribution: severityStats.rows.map(row => ({
        range: row.range,
        count: parseInt(row.count)
      }))
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
