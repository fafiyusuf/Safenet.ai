# Safenet.ai

**Technology-Facilitated Gender-Based Violence Analysis Platform for Ethiopia**

A bilingual (English/Amharic) web platform that uses AI to analyze online abuse, generate legal evidence, and connect survivors with support resources.

![License](https://img.shields.io/badge/license-Private-red)
![Node.js](https://img.shields.io/badge/node.js-24.8-green)
![Next.js](https://img.shields.io/badge/next.js-16-black)
![Express](https://img.shields.io/badge/express-4.18-blue)
![TypeScript](https://img.shields.io/badge/typescript-5.3-blue)

## 🎯 Overview

Safenet.ai helps survivors of technology-facilitated gender-based violence (TFGBV) by:

- 🤖 **AI Analysis**: Automatically classifies abuse content using Google Gemini
- 🔍 **OCR Technology**: Extracts text from screenshots in English and Amharic
- 📄 **Legal Evidence**: Generates tamper-proof PDF documentation
- ⚖️ **Legal Support**: Creates formatted legal complaint forms
- 🆘 **Resource Directory**: Connects users with Ethiopian support organizations
- 🔒 **Privacy First**: Anonymous reporting, automatic data deletion after 30 days

## 📋 Features

### For Survivors
- Upload screenshots or paste text
- Get instant AI-powered risk assessment
- Download legal evidence PDFs
- Generate complaint forms for police
- Find local support resources
- Complete anonymity guaranteed

### For Organizations
- Admin dashboard with statistics
- Track abuse patterns and trends
- Export reports for research
- Platform and category analytics

### Technical Features
- Bilingual interface (English & Amharic)
- AI-powered classification
- OCR for image text extraction
- PostgreSQL database (Neon)
- PDF generation
- Dark/Light mode
- Mobile responsive
- Content warnings
- Safe exit button

## 🏗️ Architecture

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Frontend  │────────▶│   Backend   │────────▶│    Neon     │
│  (Next.js)  │         │ (Express.js)│         │ (PostgreSQL)│
└─────────────┘         └─────────────┘         └─────────────┘
                              │
                              │
                        ┌─────▼──────┐
                        │   Google   │
                        │   Gemini   │
                        │     AI     │
                        └────────────┘
```

### Technology Stack

**Frontend:**
- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS
- Radix UI Components
- React Hook Form

**Backend:**
- Express.js 4.18
- Node.js 24.8
- TypeScript 5.3
- Tesseract.js (OCR)
- PDFKit (PDF Generation)
- pg (PostgreSQL Driver)
- Sharp (Image Processing)

**Database:**
- Neon PostgreSQL (Serverless Cloud)

**AI/ML:**
- Google Generative AI (Gemini Pro)

## 🚀 Quick Start

### Prerequisites
- Node.js 24.8+ (or latest LTS)
- pnpm (for Frontend)
- Neon PostgreSQL account (free tier available)
- Google Gemini API key

### Standard Setup (Recommended)

```bash
# 1. Clone the repository
git clone <repository-url>
cd safenet-ai-project-plan

# 2. Set up Backend
cd Backend-Express
npm install                    # Install dependencies (291 packages)
cp .env.example .env          # Create environment file
# Edit .env with your credentials:
#   - DATABASE_URL (from Neon)
#   - GEMINI_API_KEY (from Google AI Studio)
#   - ADMIN_USERNAME and ADMIN_PASSWORD
npm run dev                    # Start backend on port 8000

# 3. Set up Frontend (in new terminal)
cd Frontend
pnpm install                   # Install dependencies
cp .env.example .env.local    # Create environment file
# Edit .env.local:
#   - NEXT_PUBLIC_API_URL=http://localhost:8000
pnpm dev                       # Start frontend on port 3000

# 4. Open http://localhost:3000
```

### Docker Setup (Alternative)

> **Note:** Docker configuration is available but needs updating for Express.js backend

```bash
# Update docker-compose.yml for Express backend
docker-compose up --build

# Access:
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
```

## 📚 Documentation

- **[HOW_TO_RUN.md](./HOW_TO_RUN.md)** - Quick start guide
- **[Backend-Express/STATUS.md](./Backend-Express/STATUS.md)** - Backend status & troubleshooting
- **[Frontend/README.md](./Frontend/README.md)** - Frontend development guide
- **[INTEGRATION_STATUS.md](./INTEGRATION_STATUS.md)** - Integration documentation

## 🔑 Required Credentials

### 1. Neon Database
- **What**: PostgreSQL database URL
- **Where**: https://console.neon.tech/
- **Cost**: Free tier available
- **Format**: `postgresql://user:pass@host/dbname?sslmode=require`

### 2. Google Gemini API Key
- **What**: AI classification API
- **Where**: https://aistudio.google.com/app/apikey
- **Cost**: Free tier available (60 requests/minute)
- **Required**: Yes (for AI features)
- **Alternative**: Rule-based classification fallback included

### 3. Admin Credentials
- **What**: Dashboard access
- **Set**: Choose your own username/password
- **Update**: In both `.env` files

## 📊 Database Schema

```sql
-- Reports table
CREATE TABLE reports (
  id VARCHAR(255) PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL,
  platform_id VARCHAR(50) NOT NULL,
  language VARCHAR(10) NOT NULL,
  original_text TEXT,
  extracted_text TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  severity INTEGER CHECK (severity >= 0 AND severity <= 100),
  risk_level VARCHAR(20) NOT NULL,
  confidence DECIMAL(3,2) CHECK (confidence >= 0 AND confidence <= 1),
  rationale TEXT,
  highlighted_phrases JSONB DEFAULT '[]'::jsonb,
  file_hash VARCHAR(64),
  anonymous BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Files table
CREATE TABLE files (
  id SERIAL PRIMARY KEY,
  report_id VARCHAR(255) REFERENCES reports(id) ON DELETE CASCADE,
  filename VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  file_size INTEGER NOT NULL,
  file_hash VARCHAR(64) NOT NULL,
  storage_path VARCHAR(500),
  uploaded_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_reports_created_at ON reports(created_at);
CREATE INDEX idx_reports_platform ON reports(platform_id);
CREATE INDEX idx_reports_category ON reports(category);
CREATE INDEX idx_reports_risk_level ON reports(risk_level);
CREATE INDEX idx_files_report_id ON files(report_id);
```

## 🛡️ Security Features

- ✅ Automatic data deletion (30 days)
- ✅ SHA-256 file hashing
- ✅ JWT authentication
- ✅ HTTP Basic Auth for admin
- ✅ CORS protection
- ✅ Input validation
- ✅ Anonymous reporting
- ✅ No tracking/analytics

## 🌍 Supported Platforms

- Telegram
- Facebook
- Instagram
- Twitter/X
- TikTok
- WhatsApp
- Email
- SMS
- Other

## 🆘 Support Resources (Ethiopia)

Built-in directory includes:
- Ethiopian Women Lawyers Association (EWLA)
- Association for Women's Sanctuary and Development
- National GBV Hotline (8383)
- Network of Ethiopian Women's Association
- Federal Police Cyber Crime Unit
- And more...

## 🔧 Development

### Backend Development
```bash
cd Backend-Express
npm run dev
# API: http://localhost:8000
# Health: http://localhost:8000/health
```

### Frontend Development
```bash
cd Frontend
pnpm dev
# App: http://localhost:3000
```

### Database Management
```bash
# Database initializes automatically on first backend start
# Access Neon dashboard: https://console.neon.tech/

# Manual connection test
cd Backend-Express
node -e "const {Pool}=require('pg');const p=new Pool({connectionString:process.env.DATABASE_URL,ssl:{rejectUnauthorized:false}});p.query('SELECT NOW()').then(r=>console.log('✅ Connected:',r.rows[0])).catch(e=>console.error('❌',e.message))"
```

## 🧪 Testing

### Test Backend Health
```bash
curl http://localhost:8000/health
# Expected: {"status":"healthy","timestamp":"..."}
```

### Test Static Endpoints (No DB Required)
```bash
# Get platforms list
curl http://localhost:8000/api/platforms

# Get resources (English)
curl http://localhost:8000/api/resources?language=en

# Get resources (Amharic)
curl http://localhost:8000/api/resources?language=am
```

### Test Upload (Requires DB)
```bash
curl -X POST http://localhost:8000/api/upload \
  -F "file=@screenshot.png" \
  -F "platform_id=facebook" \
  -F "language=en"
```

### Test Admin Endpoints (Requires Auth)
```bash
curl http://localhost:8000/api/admin/stats \
  -u admin:admin_1234
```

## 📦 Deployment

### Production Checklist

- [ ] Change default admin password in `.env`
- [ ] Generate strong JWT secret (32+ characters)
- [ ] Set `NODE_ENV=production`
- [ ] Configure production DATABASE_URL (Neon)
- [ ] Set up HTTPS/SSL certificates
- [ ] Enable rate limiting
- [ ] Set up monitoring (error tracking, uptime)
- [ ] Configure database backups
- [ ] Review CORS settings (`CORS_ORIGIN`)
- [ ] Set up CDN for static assets (optional)
- [ ] Add request logging
- [ ] Configure file storage (S3/R2/etc.)

### Deploy Backend to Cloud

**Railway:**
```bash
cd Backend-Express
railway login
railway init
railway up
```

**Render:**
```bash
# Create new Web Service
# Build: npm install
# Start: npm start
# Add environment variables from .env
```

**Vercel/Netlify (Frontend):**
```bash
cd Frontend
vercel --prod
# or
netlify deploy --prod
```

### Compatible Platforms
- **Railway** - Recommended for Express backend
- **Render** - Free tier available
- **Fly.io** - Global deployment
- **Vercel** - Best for Next.js frontend
- **Netlify** - Alternative for frontend
- **DigitalOcean App Platform**
- **AWS (ECS, EC2, Lambda)**
- **Google Cloud (Cloud Run)**

See [Backend-Express/STATUS.md](./Backend-Express/STATUS.md) for deployment guides.

## 🤝 Contributing

This is a private project. For access, contact the maintainers.

## 📝 License

Private - Safenet.ai Project

## 🙏 Acknowledgments

Built for survivors of technology-facilitated gender-based violence in Ethiopia.

Special thanks to:
- Ethiopian Women Lawyers Association (EWLA)
- All support organizations helping TFGBV survivors
- Open source community

## 📧 Support

For technical issues or questions, contact the development team.

## 🗺️ Roadmap

### Phase 1 - Current ✅
- [x] Express.js backend with TypeScript
- [x] AI classification with Gemini
- [x] OCR with Tesseract.js
- [x] PDF generation
- [x] Bilingual support (English/Amharic)
- [x] Admin dashboard
- [x] Neon PostgreSQL integration

### Phase 2 - In Progress 🔄
- [ ] Fix Neon database connectivity
- [ ] Add request validation (Zod/Joi)
- [ ] Implement rate limiting
- [ ] Add file storage (S3/Cloudflare R2)
- [ ] JWT authentication for admin
- [ ] API documentation (OpenAPI/Swagger)
- [ ] Unit & integration tests

### Phase 3 - Planned 📋
- [ ] Mobile app (React Native)
- [ ] SMS integration
- [ ] Additional languages (Oromo, Tigrinya, Somali)
- [ ] Real-time chat support
- [ ] Blockchain evidence verification
- [ ] Partner organization API
- [ ] Advanced ML models (fine-tuned)
- [ ] Offline mode support
- [ ] Browser extension

## ⚠️ Important Notes

### Data Privacy
- All reports are stored securely
- Automatic deletion after 30 days
- No tracking or user identification
- Encrypted database connections
- Anonymous by default

### Legal Disclaimer
This platform provides technology to document and analyze abuse. It does not provide legal advice. Users should consult with legal professionals and local authorities.

### Safety
- Use Safe Exit button if in danger
- Clear browser history after use
- Use private/incognito mode
- Never access from abuser's device

---

**Built with ❤️ for Ethiopian survivors of TFGBV**

*"You are not alone. Help is available."*
