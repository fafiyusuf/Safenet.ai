# Safenet.ai

**Technology-Facilitated Gender-Based Violence Analysis Platform for Ethiopia**

A bilingual (English/Amharic) web platform that uses AI to analyze online abuse, generate legal evidence, and connect survivors with support resources.

![License](https://img.shields.io/badge/license-Private-red)
![Python](https://img.shields.io/badge/python-3.9+-blue)
![Next.js](https://img.shields.io/badge/next.js-16-black)
![FastAPI](https://img.shields.io/badge/fastapi-0.109-green)

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
│  (Next.js)  │         │  (FastAPI)  │         │ (PostgreSQL)│
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
- TypeScript
- Tailwind CSS
- Radix UI
- React Hook Form

**Backend:**
- FastAPI
- Python 3.11
- Tesseract OCR
- ReportLab (PDF)
- psycopg2 (PostgreSQL)

**Database:**
- Neon PostgreSQL (serverless)

**AI/ML:**
- Google Gemini Pro

## 🚀 Quick Start

### Option 1: Standard Setup (Recommended for Development)

See **[SETUP.md](./SETUP.md)** for detailed instructions.

Quick version:

```bash
# 1. Set up Neon database
# Go to https://console.neon.tech/ and create a database

# 2. Backend setup
cd Backend/scripts
cp .env.example .env
# Edit .env with your credentials
pip install -r requirements.txt
python init_db.py  # Initialize database
python main.py     # Start backend

# 3. Frontend setup (in new terminal)
cd Frontend
cp .env.example .env.local
# Edit .env.local
pnpm install
pnpm dev

# 4. Open http://localhost:3000
```

### Option 2: Docker Setup (Recommended for Production)

```bash
# 1. Create environment file
cp .env.example .env
# Edit .env with your credentials

# 2. Build and run
docker-compose up --build

# 3. Access:
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
```

## 📚 Documentation

- **[SETUP.md](./SETUP.md)** - Quick start guide
- **[Backend/README.md](./Backend/README.md)** - Backend API documentation
- **[Frontend/README.md](./Frontend/README.md)** - Frontend development guide

## 🔑 Required Credentials

### 1. Neon Database
- **What**: PostgreSQL database URL
- **Where**: https://console.neon.tech/
- **Cost**: Free tier available
- **Format**: `postgresql://user:pass@host/dbname?sslmode=require`

### 2. Google Gemini API Key
- **What**: AI classification API
- **Where**: https://makersuite.google.com/app/apikey
- **Cost**: Free tier available (60 requests/minute)
- **Required**: Yes (for AI features)

### 3. Admin Credentials
- **What**: Dashboard access
- **Set**: Choose your own username/password
- **Update**: In both `.env` files

## 📊 Database Schema

```sql
-- Reports table
reports (
  id VARCHAR PRIMARY KEY,
  created_at TIMESTAMP,
  platform_id VARCHAR,
  language VARCHAR,
  extracted_text TEXT,
  category VARCHAR,
  severity INTEGER (0-100),
  risk_level VARCHAR (low/medium/high),
  confidence DECIMAL,
  highlighted_phrases JSONB,
  file_hash VARCHAR,
  expires_at TIMESTAMP
)

-- Files table
files (
  id SERIAL PRIMARY KEY,
  report_id VARCHAR REFERENCES reports,
  filename VARCHAR,
  sha256_hash VARCHAR,
  file_size INTEGER
)
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
cd Backend/scripts
python main.py
# API: http://localhost:8000
# Docs: http://localhost:8000/docs
```

### Frontend Development
```bash
cd Frontend
pnpm dev
# App: http://localhost:3000
```

### Database Management
```bash
# Initialize/reset database
cd Backend/scripts
python init_db.py

# Access Neon dashboard
# https://console.neon.tech/
```

## 🧪 Testing

### Test Backend Connection
```bash
curl http://localhost:8000/health
```

### Test Frontend
```bash
curl http://localhost:3000/api/platforms
```

### Test Database
```bash
cd Backend/scripts
python -c "from database import initialize_database; initialize_database()"
```

## 📦 Deployment

### Production Checklist

- [ ] Change default admin password
- [ ] Generate strong JWT secret
- [ ] Set up HTTPS/SSL
- [ ] Configure production DATABASE_URL
- [ ] Set environment to `production`
- [ ] Enable rate limiting
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Review CORS settings
- [ ] Set up CDN (optional)

### Deploy with Docker

```bash
docker-compose up -d
```

### Deploy to Cloud

Compatible with:
- AWS (ECS, EC2)
- Google Cloud (Cloud Run)
- Azure (App Service)
- DigitalOcean (App Platform)
- Railway
- Render

See individual README files for platform-specific instructions.

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

- [ ] Mobile app (iOS/Android)
- [ ] SMS integration
- [ ] Multi-language support (Oromo, Tigrinya)
- [ ] Real-time chat support
- [ ] Blockchain evidence verification
- [ ] API for partner organizations
- [ ] Machine learning improvements
- [ ] Offline mode support

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
