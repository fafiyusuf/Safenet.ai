# Safenet.ai Backend - Express.js Implementation

## ✅ Current Status

### Server Status
- **Status:** ✅ **RUNNING**
- **URL:** http://localhost:8000
- **Port:** 8000
- **Environment:** development

### Database Status
- **Status:** ⚠️ **CONNECTION ISSUE**
- **Provider:** Neon PostgreSQL (Cloud)
- **Issue:** Network connectivity (ECONNRESET)
- **Impact:** Database-dependent endpoints will not work until connection is established

## 📁 Project Structure

```
Backend-Express/
├── src/
│   ├── server.ts              # Main Express application
│   ├── models/
│   │   ├── index.ts           # TypeScript interfaces & enums
│   │   └── repositories.ts    # Database operations (ReportModel, FileModel)
│   ├── routes/
│   │   ├── upload.ts          # POST /api/upload - File upload & analysis
│   │   ├── reports.ts         # GET /api/reports/:id - Fetch report
│   │   ├── evidence.ts        # GET /api/evidence/:id/pdf - Evidence PDF
│   │   ├── complaint.ts       # GET /api/complaint/:id/pdf - Complaint PDF
│   │   ├── platforms.ts       # GET /api/platforms - Platform list
│   │   ├── resources.ts       # GET /api/resources - Ethiopian resources
│   │   └── admin.ts           # GET /api/admin/* - Admin endpoints
│   ├── services/
│   │   ├── classification.ts  # AI content classification (Gemini API)
│   │   ├── ocr.ts             # Text extraction (Tesseract.js)
│   │   └── pdf.ts             # PDF generation (PDFKit)
│   └── utils/
│       └── database.ts        # PostgreSQL connection pool
├── .env                       # Environment variables
├── package.json               # Dependencies
└── tsconfig.json              # TypeScript configuration
```

## 🔌 API Endpoints

### Public Endpoints
| Method | Endpoint | Description | Status |
|--------|----------|-------------|---------|
| GET | `/health` | Health check | ✅ Working |
| POST | `/api/upload` | Upload & analyze screenshot | ⚠️ Needs DB |
| GET | `/api/reports/:id` | Get report by ID | ⚠️ Needs DB |
| GET | `/api/evidence/:id/pdf` | Generate evidence PDF | ⚠️ Needs DB |
| GET | `/api/complaint/:id/pdf` | Generate complaint PDF | ⚠️ Needs DB |
| GET | `/api/platforms` | List social platforms | ✅ Working |
| GET | `/api/resources` | Ethiopian support resources | ✅ Working |

### Admin Endpoints (Basic Auth Required)
| Method | Endpoint | Description | Status |
|--------|----------|-------------|---------|
| GET | `/api/admin/stats` | Dashboard statistics | ⚠️ Needs DB |
| GET | `/api/admin/reports` | List all reports (paginated) | ⚠️ Needs DB |

**Admin Credentials:**
- Username: `admin`
- Password: `admin_1234`
- Auth Type: Basic Authentication

## 🛠️ Technologies

### Core Stack
- **Runtime:** Node.js v24.8.0
- **Framework:** Express.js 4.18.2
- **Language:** TypeScript 5.3.3
- **Database Driver:** pg 8.11.3 (PostgreSQL)

### AI & Processing
- **AI:** Google Generative AI (Gemini Pro)
- **OCR:** Tesseract.js 5.0.4
- **Image Processing:** Sharp 0.33.2
- **PDF Generation:** PDFKit 0.15.0

### Security & Middleware
- **Security Headers:** Helmet
- **CORS:** cors
- **File Upload:** Multer
- **Compression:** compression
- **Logging:** Morgan

## 📊 Database Models

### Reports Table
```typescript
interface Report {
  id: string;                    // UUID
  created_at: Date;
  expires_at: Date;              // 90 days retention
  platform_id: string;           // facebook, instagram, etc.
  language: string;              // 'en' or 'am'
  extracted_text: string;        // OCR result
  category: string;              // harassment, threats, etc.
  severity: number;              // 0-100
  risk_level: string;            // critical, high, medium, low
  confidence: number;            // 0.0-1.0
  rationale: string;             // AI explanation
  highlighted_phrases: string[]; // Flagged content
  file_hash: string;             // SHA-256
}
```

### Files Table
```typescript
interface FileRecord {
  id: number;
  report_id: string;             // Foreign key to reports
  filename: string;
  mime_type: string;
  file_size: number;
  file_hash: string;             // SHA-256
  uploaded_at: Date;
}
```

## 🚀 How to Use

### 1. Start the Backend
```bash
cd Backend-Express
npm run dev
```

### 2. Test Health Endpoint
```bash
curl http://localhost:8000/health
```

### 3. Test Static Endpoints (No DB Required)
```bash
# Get platforms list
curl http://localhost:8000/api/platforms

# Get resources (English)
curl http://localhost:8000/api/resources?language=en

# Get resources (Amharic)
curl http://localhost:8000/api/resources?language=am
```

### 4. Test Upload (Requires DB Connection)
```bash
curl -X POST http://localhost:8000/api/upload \
  -F "file=@screenshot.png" \
  -F "platform_id=facebook" \
  -F "language=en"
```

### 5. Test Admin Endpoints (Requires DB + Auth)
```bash
curl http://localhost:8000/api/admin/stats \
  -u admin:admin_1234
```

## 🔧 Database Connection Issue

### Problem
The Neon PostgreSQL database is not accessible:
```
Error: read ECONNRESET
```

### Possible Causes
1. **No Internet Connection** - Check if your machine has internet access
2. **Firewall Blocking** - Port 5432 might be blocked
3. **Neon Service Down** - Check Neon dashboard
4. **Database Hibernated** - Neon free tier databases sleep after inactivity
5. **SSL Certificate Issue** - Certificate validation failing

### Solutions

#### Option 1: Wake Up Neon Database
```bash
# Visit Neon console and wake the database
# Or make a test query from Neon dashboard
```

#### Option 2: Test Connection Manually
```bash
npm install -g pg
node -e "const {Client}=require('pg');const c=new Client({connectionString:'postgresql://neondb_owner:npg_WCueGI8DtfP7@ep-steep-sunset-ah2myycl-pooler.us-east-1.aws.neon.tech/neondb',ssl:{rejectUnauthorized:false}});c.connect().then(()=>console.log('✅ Connected')).catch(e=>console.error('❌',e.message))"
```

#### Option 3: Use Local PostgreSQL (Alternative)
```bash
# Install PostgreSQL locally
sudo apt install postgresql postgresql-contrib

# Create database
createdb safenet

# Update .env
DATABASE_URL=postgresql://localhost:5432/safenet
```

#### Option 4: Skip Database for Now
The server will start without the database. Static endpoints work:
- `/health`
- `/api/platforms`
- `/api/resources`

## 🔐 Environment Variables

Current `.env` configuration:
```env
PORT=8000
NODE_ENV=development
DATABASE_URL=postgresql://neondb_owner:npg_WCueGI8DtfP7@ep-steep-sunset-ah2myycl-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
GEMINI_API_KEY=AIzaSyDcQ8g2fJFsyerhKUPAs-coBc2rpN9tS6E
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin_1234
JWT_SECRET=e976ce634d42e94b702266debcd38e41
CORS_ORIGIN=http://localhost:3000
```

## 📝 Next Steps

### To Fix Database Connection:
1. Check internet connectivity
2. Visit Neon dashboard and wake database
3. Test connection with `psql` or pgAdmin
4. Consider using local PostgreSQL for development

### To Test Full Stack:
1. Fix database connection
2. Start Frontend: `cd Frontend && pnpm dev`
3. Test upload flow end-to-end
4. Generate PDFs
5. Test admin dashboard

### To Deploy:
1. Fix database connection
2. Add production environment variables
3. Build TypeScript: `npm run build`
4. Deploy to hosting (Railway, Render, Heroku, etc.)

## 📦 Dependencies (291 packages installed)

### Main Dependencies
- express: 4.18.2
- typescript: 5.3.3
- @google/generative-ai: 0.21.0
- tesseract.js: 5.0.4
- sharp: 0.33.2
- pdfkit: 0.15.0
- pg: 8.11.3
- multer: 1.4.5-lts.1
- helmet: 8.0.0
- cors: 2.8.5

### Dev Dependencies
- tsx: 4.7.1 (TypeScript execution)
- @types/* (TypeScript definitions)

## 🎯 Key Features Implemented

✅ **File Upload** - Multer middleware with 10MB limit
✅ **OCR** - Tesseract.js with image preprocessing  
✅ **AI Classification** - Gemini API with rule-based fallback
✅ **PDF Generation** - Evidence + Complaint PDFs (bilingual)
✅ **Database Models** - TypeScript interfaces + repositories
✅ **Admin API** - Statistics and report management
✅ **Security** - Helmet, CORS, file validation
✅ **Error Handling** - Comprehensive error messages
✅ **Logging** - Morgan HTTP request logging
✅ **Graceful Degradation** - Server starts even if DB fails

## 🐛 Known Issues

1. **Database Connection** - ECONNRESET error (network issue)
2. **No File Storage** - Files stored in memory only (need disk/S3)
3. **Basic Auth** - Admin auth is simple (should use JWT)
4. **No Rate Limiting** - API is unprotected from abuse
5. **No Validation** - Request body validation needed (use Joi/Zod)

## 📖 Documentation

- **API Docs:** Create OpenAPI/Swagger documentation
- **Deployment Guide:** Add Docker/Railway/Render instructions
- **Testing Guide:** Add unit/integration tests

---

**Status:** Server running ✅ | Database pending ⚠️ | Ready for testing static endpoints ✅
