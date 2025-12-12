// Quick migration script to add conversational mode columns
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function runMigration() {
  const client = await pool.connect();
  
  try {
    console.log('📦 Running migration: add_conversational_fields');
    
    // Add advice column
    await client.query('ALTER TABLE reports ADD COLUMN IF NOT EXISTS advice TEXT;');
    console.log('✅ Added advice column');
    
    // Add is_conversational column
    await client.query('ALTER TABLE reports ADD COLUMN IF NOT EXISTS is_conversational BOOLEAN DEFAULT false;');
    console.log('✅ Added is_conversational column');
    
    // Create index
    await client.query('CREATE INDEX IF NOT EXISTS idx_reports_conversational ON reports(is_conversational);');
    console.log('✅ Created index on is_conversational');
    
    // Update existing reports
    await client.query('UPDATE reports SET is_conversational = false WHERE is_conversational IS NULL;');
    console.log('✅ Updated existing reports');
    
    // Verify
    const result = await client.query(`
      SELECT 
        COUNT(*) as total_reports,
        SUM(CASE WHEN is_conversational = true THEN 1 ELSE 0 END) as conversational_reports,
        SUM(CASE WHEN is_conversational = false THEN 1 ELSE 0 END) as evidence_based_reports
      FROM reports;
    `);
    
    console.log('📊 Migration Results:', result.rows[0]);
    console.log('\n✨ Migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

runMigration()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
