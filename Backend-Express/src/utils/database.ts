import dotenv from 'dotenv';
import { Pool, PoolClient } from 'pg';

dotenv.config();

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 30000, // Increased from 10s to 30s
  statement_timeout: 30000,
});

// Test connection
pool.on('connect', () => {
  console.log('📡 Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('💥 Unexpected error on idle client', err);
});

export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    if (process.env.LOG_LEVEL === 'debug') {
      console.log('Executed query', { text, duration, rows: res.rowCount });
    }
    return res;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

export const getClient = async (): Promise<PoolClient> => {
  return await pool.connect();
};

export const initializeDatabase = async () => {
  try {
    // Create reports table
    await query(`
      CREATE TABLE IF NOT EXISTS reports (
        id VARCHAR(255) PRIMARY KEY,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        expires_at TIMESTAMP NOT NULL,
        platform_id VARCHAR(50) NOT NULL,
        language VARCHAR(10) NOT NULL,
        original_text TEXT,
        extracted_text TEXT NOT NULL,
        category VARCHAR(50) NOT NULL,
        severity INTEGER NOT NULL CHECK (severity >= 0 AND severity <= 100),
        risk_level VARCHAR(20) NOT NULL,
        confidence DECIMAL(3, 2) NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
        rationale TEXT,
        highlighted_phrases JSONB DEFAULT '[]'::jsonb,
        file_hash VARCHAR(64),
        anonymous BOOLEAN DEFAULT true,
        metadata JSONB DEFAULT '{}'::jsonb
      );
    `);

    // Create files table
    await query(`
      CREATE TABLE IF NOT EXISTS files (
        id SERIAL PRIMARY KEY,
        report_id VARCHAR(255) REFERENCES reports(id) ON DELETE CASCADE,
        filename VARCHAR(255) NOT NULL,
        mime_type VARCHAR(100) NOT NULL,
        file_size INTEGER NOT NULL,
        file_hash VARCHAR(64) NOT NULL,
        storage_path VARCHAR(500),
        uploaded_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    // Create indexes
    await query('CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at DESC);');
    await query('CREATE INDEX IF NOT EXISTS idx_reports_platform ON reports(platform_id);');
    await query('CREATE INDEX IF NOT EXISTS idx_reports_category ON reports(category);');
    await query('CREATE INDEX IF NOT EXISTS idx_reports_risk_level ON reports(risk_level);');

    console.log('✅ Database tables created successfully');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  }
};

export default pool;
