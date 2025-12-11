import {
    CreateFileInput,
    CreateReportInput,
    FileRecord,
    PaginationParams,
    PaginationResult,
    Report
} from '../models';
import { query } from '../utils/database';

// Report operations
export class ReportModel {
  // Create a new report
  static async create(data: CreateReportInput): Promise<Report> {
    const reportId = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 90); // 90 days retention

    const result = await query(
      `INSERT INTO reports (
        id, expires_at, platform_id, language, extracted_text, 
        category, severity, risk_level, confidence, rationale, 
        highlighted_phrases, file_hash, original_text
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *`,
      [
        reportId,
        expiresAt,
        data.platform_id,
        data.language,
        data.extracted_text,
        data.category,
        data.severity,
        data.risk_level,
        data.confidence,
        data.rationale,
        JSON.stringify(data.highlighted_phrases || []),
        data.file_hash,
        data.original_text
      ]
    );

    return result.rows[0];
  }

  // Find report by ID
  static async findById(id: string): Promise<Report | null> {
    const result = await query(
      'SELECT * FROM reports WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const report = result.rows[0];
    
    // Parse JSON fields
    if (typeof report.highlighted_phrases === 'string') {
      report.highlighted_phrases = JSON.parse(report.highlighted_phrases);
    }
    
    return report;
  }

  // Find report with files
  static async findByIdWithFiles(id: string): Promise<(Report & { files: FileRecord[] }) | null> {
    const result = await query(
      `SELECT r.*, 
        json_agg(
          json_build_object(
            'id', f.id,
            'filename', f.filename,
            'mime_type', f.mime_type,
            'file_size', f.file_size,
            'file_hash', f.file_hash,
            'uploaded_at', f.uploaded_at
          )
        ) FILTER (WHERE f.id IS NOT NULL) as files
      FROM reports r
      LEFT JOIN files f ON r.id = f.report_id
      WHERE r.id = $1
      GROUP BY r.id`,
      [id]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const report = result.rows[0];
    
    // Parse JSON fields
    if (typeof report.highlighted_phrases === 'string') {
      report.highlighted_phrases = JSON.parse(report.highlighted_phrases);
    }
    
    report.files = report.files || [];
    
    return report;
  }

  // Get all reports with pagination
  static async findAll(params: PaginationParams): Promise<PaginationResult<Report>> {
    const { page = 1, limit = 20 } = params;
    const offset = (page - 1) * limit;

    const [dataResult, countResult] = await Promise.all([
      query(
        `SELECT id, platform_id, category, severity, risk_level, language, created_at 
         FROM reports 
         ORDER BY created_at DESC 
         LIMIT $1 OFFSET $2`,
        [limit, offset]
      ),
      query('SELECT COUNT(*) as count FROM reports')
    ]);

    const total = parseInt(countResult.rows[0].count);

    return {
      data: dataResult.rows,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  // Delete report
  static async delete(id: string): Promise<boolean> {
    const result = await query(
      'DELETE FROM reports WHERE id = $1 RETURNING id',
      [id]
    );

    return result.rowCount !== null && result.rowCount > 0;
  }

  // Get statistics
  static async getStats() {
    const [totalResult, categoryResult, riskResult, platformResult, recentResult] = await Promise.all([
      query('SELECT COUNT(*) as count FROM reports'),
      query(`SELECT category, COUNT(*) as count FROM reports GROUP BY category`),
      query(`SELECT risk_level, COUNT(*) as count FROM reports GROUP BY risk_level`),
      query(`SELECT platform_id, COUNT(*) as count FROM reports GROUP BY platform_id`),
      query(`SELECT id, category, severity, risk_level, created_at FROM reports ORDER BY created_at DESC LIMIT 10`)
    ]);

    return {
      total_reports: parseInt(totalResult.rows[0].count),
      by_category: categoryResult.rows.reduce((acc: any, row: any) => {
        acc[row.category] = parseInt(row.count);
        return acc;
      }, {}),
      by_risk_level: riskResult.rows.reduce((acc: any, row: any) => {
        acc[row.risk_level] = parseInt(row.count);
        return acc;
      }, {}),
      by_platform: platformResult.rows.reduce((acc: any, row: any) => {
        acc[row.platform_id] = parseInt(row.count);
        return acc;
      }, {}),
      recent_reports: recentResult.rows
    };
  }
}

// File operations
export class FileModel {
  // Create a new file record
  static async create(data: CreateFileInput): Promise<FileRecord> {
    const result = await query(
      `INSERT INTO files (report_id, filename, mime_type, file_size, file_hash, storage_path)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        data.report_id,
        data.filename,
        data.mime_type,
        data.file_size,
        data.file_hash,
        data.storage_path
      ]
    );

    return result.rows[0];
  }

  // Find files by report ID
  static async findByReportId(reportId: string): Promise<FileRecord[]> {
    const result = await query(
      'SELECT * FROM files WHERE report_id = $1 ORDER BY uploaded_at DESC',
      [reportId]
    );

    return result.rows;
  }

  // Delete file
  static async delete(id: number): Promise<boolean> {
    const result = await query(
      'DELETE FROM files WHERE id = $1 RETURNING id',
      [id]
    );

    return result.rowCount !== null && result.rowCount > 0;
  }
}
