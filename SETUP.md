# Safenet.ai - Quick Start Guide

This guide will help you set up the complete Safenet.ai platform with Neon database.

## 🚀 Quick Setup (5 minutes)

### Prerequisites
- Python 3.9+
- Node.js 18+
- pnpm (or npm)
- Neon account (free tier available)

### Step 1: Clone and Setup Neon Database

1. **Create Neon Database**
   - Go to https://console.neon.tech/
   - Sign up/Login
   - Create new project
   - Create database named `safenet`
   - Copy your connection string (looks like: `postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/safenet?sslmode=require`)

### Step 2: Backend Setup

```bash
cd Backend/scripts

# Create environment file
cp .env.example .env

# Edit .env and add:
# - DATABASE_URL (from Neon)
# - GEMINI_API_KEY (from https://makersuite.google.com/app/apikey)
# - Change ADMIN_PASSWORD

# Install dependencies
pip install -r requirements.txt

# Install Tesseract OCR
# Ubuntu/Debian:
sudo apt install tesseract-ocr tesseract-ocr-eng tesseract-ocr-amh

# macOS:
brew install tesseract tesseract-lang

# Run backend (creates database tables automatically)
python main.py
```

Backend should now be running at http://localhost:8000

### Step 3: Frontend Setup

```bash
cd Frontend

# Create environment file
cp .env.example .env.local

# Edit .env.local:
# - NEXT_PUBLIC_API_URL=http://localhost:8000
# - Use same ADMIN credentials as backend
# - Use same JWT_SECRET as backend

# Install dependencies
pnpm install
# or: npm install

# Run development server
pnpm dev
# or: npm run dev
```

Frontend should now be running at http://localhost:3000

### Step 4: Test the Application

1. Open http://localhost:3000
2. Click "Report Abuse"
3. Upload a screenshot or paste text
4. Select a platform
5. Click "Analyze Content"
6. View results and download PDF

## 🔑 Getting API Keys

### Google Gemini API Key (Required for AI Classification)
1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key
4. Add to `Backend/scripts/.env`: `GEMINI_API_KEY=your_key_here`

## 🐳 Docker Setup (Alternative)

```bash
# Create .env file in root directory with all credentials
cp Backend/.env.example .env

# Edit .env with your credentials

# Build and run with Docker Compose
docker-compose up --build

# Access:
# - Frontend: http://localhost:3000
# - Backend: http://localhost:8000
```

## 📋 Environment Variables Checklist

### Backend (.env)
- [x] DATABASE_URL - From Neon
- [x] GEMINI_API_KEY - From Google AI Studio
- [x] ADMIN_USERNAME - Set your username
- [x] ADMIN_PASSWORD - Set secure password
- [x] JWT_SECRET - Generate random 64 char string
- [x] FRONTEND_URL - http://localhost:3000

### Frontend (.env.local)
- [x] NEXT_PUBLIC_API_URL - http://localhost:8000
- [x] ADMIN_USERNAME - Same as backend
- [x] ADMIN_PASSWORD - Same as backend
- [x] JWT_SECRET - Same as backend

## 🧪 Verify Setup

### Test Backend
```bash
# Health check
curl http://localhost:8000/health

# Get platforms
curl http://localhost:8000/api/platforms
```

### Test Frontend
```bash
# Visit in browser
open http://localhost:3000

# Check if backend is reachable
curl http://localhost:3000/api/platforms
```

### Test Database
```bash
cd Backend/scripts
python -c "from database import initialize_database; initialize_database(); print('✅ Database connected!')"
```

### Test OCR
```bash
tesseract --version
tesseract --list-langs | grep amh
```

## 🔧 Troubleshooting

### Backend won't start
```bash
# Check Python version
python --version  # Should be 3.9+

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall

# Check database connection
python -c "import os; print(os.getenv('DATABASE_URL'))"
```

### Frontend won't build
```bash
# Clear cache
rm -rf .next node_modules
pnpm install
pnpm dev
```

### Database connection fails
- ✅ Check DATABASE_URL is correct
- ✅ Check internet connection
- ✅ Verify Neon project is active
- ✅ Check firewall settings

### OCR not working
```bash
# Install Tesseract
sudo apt install tesseract-ocr tesseract-ocr-amh

# Verify installation
tesseract --list-langs
```

### API calls failing
- ✅ Check Backend is running (port 8000)
- ✅ Check Frontend .env has correct API_URL
- ✅ Check no CORS errors in browser console

## 📚 Next Steps

1. **Secure your installation**
   - Change default passwords
   - Generate strong JWT secret
   - Enable HTTPS in production

2. **Customize the platform**
   - Add more Ethiopian support organizations
   - Customize translations
   - Add more social media platforms

3. **Deploy to production**
   - See `deployment/README.md`
   - Use Docker for easy deployment
   - Set up monitoring

## 🆘 Getting Help

### Documentation
- Backend: `Backend/README.md`
- Frontend: `Frontend/README.md`
- Deployment: See Docker compose setup

### Common Issues
1. **Port already in use**: Change PORT in .env
2. **Module not found**: Run pip install / pnpm install
3. **Database error**: Check DATABASE_URL format
4. **CORS error**: Check FRONTEND_URL matches

## 📊 Admin Dashboard

Access at: http://localhost:3000/admin/login

- Username: (from ADMIN_USERNAME)
- Password: (from ADMIN_PASSWORD)

View:
- Total reports
- Risk distribution
- Platform statistics
- Category breakdown

## ✅ Success Checklist

- [ ] Neon database created and connected
- [ ] Backend running on port 8000
- [ ] Frontend running on port 3000
- [ ] Can upload and analyze content
- [ ] Can download PDFs
- [ ] Admin dashboard accessible
- [ ] OCR working for images
- [ ] AI classification working

## 🎉 You're All Set!

The platform is now ready to use. Visit http://localhost:3000 to start analyzing content.

For production deployment, see the Docker setup or individual README files in Backend/ and Frontend/.
