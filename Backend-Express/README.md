# Safenet.ai Backend - Express.js + TypeScript

REST API backend for the Safenet.ai TFGBV analysis platform.

## 🚀 Current Status

- **Server:** ✅ Running on http://localhost:8000
- **Framework:** Express.js 4.18.2
- **Runtime:** Node.js 24.8.0
- **Language:** TypeScript 5.3.3
- **Database:** ⚠️ Neon PostgreSQL (connection pending)

## 📁 Project Structure

```
src/
├── server.ts              # Main Express application & startup
├── models/
│   ├── index.ts          # TypeScript interfaces & enums
│   └── repositories.ts   # Database operations (ReportModel, FileModel)
├── routes/
│   ├── upload.ts         # POST /api/upload - File upload & analysis
│   ├── reports.ts        # GET /api/reports/:id
│   ├── evidence.ts       # GET /api/evidence/:id/pdf
│   ├── complaint.ts      # GET /api/complaint/:id/pdf
│   ├── platforms.ts      # GET /api/platforms
│   ├── resources.ts      # GET /api/resources
│   └── admin.ts          # GET /api/admin/*
├── services/
│   ├── classification.ts # AI classification (Gemini + rules)
│   ├── ocr.ts           # Tesseract.js text extraction
│   └── pdf.ts           # PDFKit document generation
└── utils/
    └── database.ts       # PostgreSQL connection pool
```

## 🔌 API Endpoints

### Public Endpoints

| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| `GET` | `/health` | Health check | ✅ |
| `POST` | `/api/upload` | Upload screenshot for analysis | ⚠️ Needs DB |
| `GET` | `/api/reports/:id` | Get report details | ⚠️ Needs DB |
| `GET` | `/api/evidence/:id/pdf` | Download evidence PDF | ⚠️ Needs DB |
| `GET` | `/api/complaint/:id/pdf` | Download complaint PDF | ⚠️ Needs DB |
| `GET` | `/api/platforms` | List supported platforms | ✅ |
| `GET` | `/api/resources` | Get Ethiopian resources | ✅ |

### Admin Endpoints (Basic Auth)

| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| `GET` | `/api/admin/stats` | Dashboard statistics | ⚠️ Needs DB |
| `GET` | `/api/admin/reports` | List all reports (paginated) | ⚠️ Needs DB |

**Authentication:** Basic Auth
- Username: `admin`
- Password: `admin_1234` (change in `.env`)

## 🛠️ Setup

### Prerequisites
- Node.js 24.8+ (or latest LTS)
- npm 10+
- Neon PostgreSQL account (free tier)
- Google Gemini API key

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env

# 3. Edit .env with your credentials
nano .env  # or use your preferred editor

# 4. Start development server
npm run dev

# 5. Server runs on http://localhost:8000
```

## 🔐 Environment Variables

Required variables in `.env`:

```env
# Server
PORT=8000
NODE_ENV=development

# Database (from Neon console)
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# AI/ML
GEMINI_API_KEY=your_google_gemini_api_key

# Admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin_1234

# Security
JWT_SECRET=your_random_secret_key_here

# CORS
CORS_ORIGIN=http://localhost:3000
```

### Get Credentials

1. **Neon Database:** https://console.neon.tech/
   - Create new project
   - Copy connection string
   - Use pooled connection URL

2. **Gemini API:** https://aistudio.google.com/app/apikey
   - Create API key
   - Free tier: 60 requests/minute

## 🧪 Testing

### Health Check
```bash
curl http://localhost:8000/health
```

### Get Platforms (No DB required)
```bash
curl http://localhost:8000/api/platforms
```

### Get Resources (No DB required)
```bash
# English
curl "http://localhost:8000/api/resources?language=en"

# Amharic
curl "http://localhost:8000/api/resources?language=am"
```

### Upload File (Requires DB)
```bash
curl -X POST http://localhost:8000/api/upload \
  -F "file=@screenshot.png" \
  -F "platform_id=facebook" \
  -F "language=en"
```

### Admin Stats (Requires DB + Auth)
```bash
curl http://localhost:8000/api/admin/stats \
  -u admin:admin_1234
```

## 📊 Database Schema

### Reports Table
```sql
CREATE TABLE reports (
  id VARCHAR(255) PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL,
  platform_id VARCHAR(50) NOT NULL,
  language VARCHAR(10) NOT NULL,
  extracted_text TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  severity INTEGER CHECK (severity >= 0 AND severity <= 100),
  risk_level VARCHAR(20) NOT NULL,
  confidence DECIMAL(3,2) CHECK (confidence >= 0 AND confidence <= 1),
  rationale TEXT,
  highlighted_phrases JSONB DEFAULT '[]'::jsonb,
  file_hash VARCHAR(64)
);
```

### Files Table
```sql
CREATE TABLE files (
  id SERIAL PRIMARY KEY,
  report_id VARCHAR(255) REFERENCES reports(id) ON DELETE CASCADE,
  filename VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  file_size INTEGER NOT NULL,
  file_hash VARCHAR(64) NOT NULL,
  uploaded_at TIMESTAMP DEFAULT NOW()
);
```

## 🔍 How It Works

### Upload Flow
1. **File Upload** → Multer receives image (max 10MB)
2. **OCR** → Tesseract.js extracts text
3. **Classification** → Gemini AI analyzes content
4. **Storage** → Save to PostgreSQL
5. **Response** → Return report ID & analysis

### PDF Generation
1. **Fetch Report** → Get from database
2. **Generate PDF** → PDFKit creates document
3. **Stream** → Send to client

### AI Classification
1. **Primary:** Google Gemini API
2. **Fallback:** Rule-based keyword matching
3. **Output:** Category, severity, risk level, confidence

## 🛡️ Security Features

- ✅ Helmet security headers
- ✅ CORS protection
- ✅ File type validation (images only)
- ✅ File size limits (10MB)
- ✅ SHA-256 file hashing
- ✅ SQL injection protection (parameterized queries)
- ✅ Basic authentication for admin
- ✅ Request compression
- ⚠️ Rate limiting (TODO)
- ⚠️ Request validation (TODO)

## 📦 Dependencies

### Core (291 packages)
- `express` 4.18.2 - Web framework
- `typescript` 5.3.3 - Type safety
- `pg` 8.11.3 - PostgreSQL driver
- `@google/generative-ai` 0.21.0 - Gemini API
- `tesseract.js` 5.0.4 - OCR engine
- `sharp` 0.33.2 - Image processing
- `pdfkit` 0.15.0 - PDF generation
- `multer` 1.4.5 - File uploads
- `helmet` 8.0.0 - Security headers
- `cors` 2.8.5 - CORS handling
- `compression` 1.7.4 - Response compression
- `morgan` 1.10.0 - HTTP logging
- `dotenv` 16.4.1 - Environment variables
- `tsx` 4.7.1 - TypeScript execution

## 🐛 Troubleshooting

### Database Connection Fails

**Error:** `ECONNRESET` or `Connection timeout`

**Solutions:**
1. Check internet connection: `ping google.com`
2. Wake Neon database (free tier sleeps)
3. Verify `DATABASE_URL` in `.env`
4. Test connection:
   ```bash
   node -e "const {Client}=require('pg');const c=new Client({connectionString:process.env.DATABASE_URL,ssl:{rejectUnauthorized:false}});c.connect().then(()=>console.log('✅')).catch(e=>console.error('❌',e.message))"
   ```
5. Use local PostgreSQL as alternative

### Port Already in Use

**Error:** `EADDRINUSE`

**Solution:**
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Or change port in .env
PORT=8001
```

### Tesseract.js Slow

**Issue:** OCR takes too long

**Solution:**
- First run downloads language data (~6MB)
- Subsequent runs are faster
- Consider using worker pool for production

### Gemini API Quota Exceeded

**Error:** `429 Too Many Requests`

**Solution:**
- Free tier: 60 requests/minute
- Wait 60 seconds
- Or use rule-based fallback (automatic)

## 🚀 Deployment

### Build for Production

```bash
# Compile TypeScript
npm run build

# Start production server
npm start
```

### Deploy to Railway

```bash
railway login
railway init
railway up

# Add environment variables in Railway dashboard
```

### Deploy to Render

1. Create new Web Service
2. Connect GitHub repository
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables

### Deploy to Fly.io

```bash
fly launch
fly secrets set DATABASE_URL=...
fly secrets set GEMINI_API_KEY=...
fly deploy
```

## 📝 Development Scripts

```bash
npm run dev      # Start dev server with hot reload
npm run build    # Compile TypeScript to JavaScript
npm start        # Run compiled JavaScript
npm run lint     # Run ESLint (if configured)
npm run test     # Run tests (if configured)
```

## 🔄 Upgrade Path from FastAPI

This Express.js backend replaces the original FastAPI implementation:

| Feature | FastAPI (Old) | Express (New) | Status |
|---------|---------------|---------------|--------|
| OCR | python-tesseract | tesseract.js | ✅ Improved |
| PDF | ReportLab | PDFKit | ✅ Equal |
| AI | Gemini API | Gemini API | ✅ Same |
| DB Driver | psycopg2 | pg | ✅ Better |
| Runtime | Python 3.13 | Node 24.8 | ✅ Faster |
| Dependencies | Had conflicts | All working | ✅ Fixed |

## 📖 Additional Documentation

- [STATUS.md](./STATUS.md) - Current status & issues
- [../README.md](../README.md) - Main project README
- [../HOW_TO_RUN.md](../HOW_TO_RUN.md) - Quick start guide

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## 📧 Support

For issues or questions, check:
1. [STATUS.md](./STATUS.md) for known issues
2. Terminal output for error messages
3. Neon dashboard for database status

---

**Built with TypeScript & Express.js for the Safenet.ai platform**
