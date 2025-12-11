import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

// Load environment variables
dotenv.config();

// Import routes
import adminRoutes from './routes/admin.js';
import complaintRoutes from './routes/complaint.js';
import evidenceRoutes from './routes/evidence.js';
import platformRoutes from './routes/platforms.js';
import reportRoutes from './routes/reports.js';
import resourceRoutes from './routes/resources.js';
import uploadRoutes from './routes/upload.js';

// Import database
import { initializeDatabase } from './utils/database.js';

const app: Application = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.use('/api/upload', uploadRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/evidence', evidenceRoutes);
app.use('/api/complaint', complaintRoutes);
app.use('/api/platforms', platformRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/admin', adminRoutes);

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
const startServer = async () => {
  // Start the server first
  const server = app.listen(PORT, () => {
    console.log(`🚀 Safenet.ai Backend running on http://localhost:${PORT}`);
    console.log(`📖 Health check: http://localhost:${PORT}/health`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  });

  // Try to initialize database in the background
  initializeDatabase()
    .then(() => {
      console.log('✅ Database initialized successfully');
    })
    .catch((dbError) => {
      console.warn('⚠️  Database initialization failed. Some features may not work.');
      console.warn('   Error:', dbError instanceof Error ? dbError.message : dbError);
      console.warn('   Check your DATABASE_URL and internet connection.');
      console.warn('   You can still test the API endpoints that don\'t require database.');
    });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
    });
  });
};

startServer();

export default app;
