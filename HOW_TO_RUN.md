# 🚀 How to Run Safenet.ai

## Quick Start (Automated)

```bash
cd /home/newuser/codingFolders/safenet-ai-project-plan
./run.sh
```

The script will:
1. Check prerequisites
2. Install dependencies
3. Initialize database
4. Start both Backend and Frontend
5. Open at http://localhost:3000

---

## Manual Setup (Step by Step)

### STEP 1: Get Your Credentials

#### A. Neon Database (Required)
1. Go to https://console.neon.tech/
2. Sign up (free tier available)
3. Create new project
4. Create database named `safenet`
5. Copy connection string (looks like):
   ```
   postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/safenet?sslmode=require
   ```

#### B. Google Gemini API Key (Required)
1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the API key

### STEP 2: Configure Backend

```bash
cd Backend/scripts

# Create .env file
cp .env.example .env

# Edit .env file
nano .env  # or use any text editor
```

**Add your credentials to `.env`:**
```env
DATABASE_URL=postgresql://your_user:your_pass@ep-xxx.us-east-2.aws.neon.tech/safenet?sslmode=require
GEMINI_API_KEY=your_google_gemini_api_key_here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here
JWT_SECRET=generate_random_64_character_string_here
```

**Generate JWT Secret:**
```bash
# Option 1: Using openssl
openssl rand -base64 64

# Option 2: Using Python
python3 -c "import secrets; print(secrets.token_urlsafe(64))"
```

### STEP 3: Install Backend Dependencies

```bash
# Still in Backend/scripts/

# Install Python packages
pip3 install -r requirements.txt

# Install Tesseract OCR (for image text extraction)
# Ubuntu/Debian:
sudo apt update
sudo apt install tesseract-ocr tesseract-ocr-eng tesseract-ocr-amh

# macOS:
brew install tesseract tesseract-lang

# Verify Tesseract
tesseract --version
```

### STEP 4: Initialize Database

```bash
# Still in Backend/scripts/

# Run database initialization
python3 init_db.py
```

**Expected output:**
```
🔄 Initializing Safenet.ai Database...
📡 Connecting to: ep-xxx.us-east-2.aws.neon.tech/safenet
✅ Database initialized successfully!
📊 Current reports in database: 0
✨ Database is ready to use!
```

### STEP 5: Start Backend

```bash
# Still in Backend/scripts/

# Run the backend server
python3 main.py
```

**Expected output:**
```
Database connection pool initialized
Database tables created successfully
Database initialized successfully
INFO:     Started server process [12345]
INFO:     Uvicorn running on http://0.0.0.0:8000
```

**Backend is now running at:** http://localhost:8000

**Test it:**
```bash
# In a new terminal
curl http://localhost:8000/health
# Should return: {"status":"healthy","timestamp":"..."}
```

### STEP 6: Configure Frontend

```bash
# In a new terminal
cd Frontend

# Create .env.local file
cp .env.example .env.local

# Edit .env.local
nano .env.local
```

**Configure `.env.local`:**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here
JWT_SECRET=same_jwt_secret_as_backend
```

⚠️ **Important:** Use the SAME credentials as Backend!

### STEP 7: Install Frontend Dependencies

```bash
# Still in Frontend/

# Install Node packages (using pnpm)
pnpm install

# Or using npm
npm install
```

### STEP 8: Start Frontend

```bash
# Still in Frontend/

# Run development server
pnpm dev

# Or using npm
npm run dev
```

**Expected output:**
```
▲ Next.js 16.0.7
- Local:        http://localhost:3000
- Ready in 2.3s
```

**Frontend is now running at:** http://localhost:3000

---

## ✅ Verify It's Working

### 1. Open Browser
Go to: http://localhost:3000

### 2. Test Upload Flow
1. Click "Report Abuse"
2. Paste some test text (e.g., "This is a threatening message")
3. Select a platform (e.g., "Facebook")
4. Click "Analyze Content"
5. You should see analysis results!

### 3. Test PDF Download
After analysis, click "Download Evidence PDF"

### 4. Check Admin Dashboard
1. Go to: http://localhost:3000/admin/login
2. Login with your admin credentials
3. View statistics

---

## 🔧 Troubleshooting

### Backend won't start

**Error: "DATABASE_URL environment variable is not set"**
```bash
cd Backend/scripts
ls -la .env  # Make sure .env exists
cat .env | grep DATABASE_URL  # Check if it's set
```

**Error: "Module 'psycopg2' not found"**
```bash
pip3 install psycopg2-binary
```

**Error: Database connection failed**
- Check your DATABASE_URL is correct
- Verify Neon database is active
- Test connection:
  ```bash
  python3 -c "from database import initialize_database; initialize_database()"
  ```

### Frontend won't connect to Backend

**Error: "Failed to process upload"**
```bash
# Check Backend is running
curl http://localhost:8000/health

# Check Frontend .env.local
cat .env.local | grep NEXT_PUBLIC_API_URL
# Should be: NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Error: CORS issues**
- Make sure Backend `.env` has:
  ```
  FRONTEND_URL=http://localhost:3000
  ```

### Tesseract OCR not working

```bash
# Check Tesseract is installed
tesseract --version

# Check Amharic language pack
tesseract --list-langs | grep amh

# If not installed:
sudo apt install tesseract-ocr-amh
```

### Port already in use

**Backend (port 8000):**
```bash
# Find what's using port 8000
lsof -i :8000

# Kill the process
kill -9 <PID>

# Or change port in Backend/.env
PORT=8001
```

**Frontend (port 3000):**
```bash
# Frontend will automatically use next available port
# Or specify in package.json:
"dev": "next dev -p 3001"
```

---

## 📊 Quick Reference

### Backend
- **Location:** `Backend/scripts/`
- **Config:** `Backend/scripts/.env`
- **Start:** `python3 main.py`
- **URL:** http://localhost:8000
- **Docs:** http://localhost:8000/docs

### Frontend
- **Location:** `Frontend/`
- **Config:** `Frontend/.env.local`
- **Start:** `pnpm dev` or `npm run dev`
- **URL:** http://localhost:3000

### Required Services
- ✅ Neon PostgreSQL database
- ✅ Google Gemini API key
- ✅ Tesseract OCR installed

---

## 🐳 Alternative: Docker (Easier)

If you have Docker installed:

```bash
# Create .env file in project root
cp .env.example .env

# Edit .env with your credentials
nano .env

# Start everything with Docker
docker-compose up --build

# Access:
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
```

---

## 📝 Summary

**Minimum steps to run:**

1. Get Neon database URL
2. Get Gemini API key
3. Configure Backend `.env`
4. Run: `cd Backend/scripts && python3 init_db.py`
5. Run: `python3 main.py` (Backend starts)
6. Configure Frontend `.env.local`
7. Run: `cd Frontend && pnpm install && pnpm dev` (Frontend starts)
8. Visit: http://localhost:3000

**Or just run:** `./run.sh` (handles everything automatically!)

---

## 🎉 You're Done!

The application should now be running and fully functional!

**Need help?** Check the detailed documentation:
- Backend: `Backend/README.md`
- Frontend: `Frontend/README.md`
- Integration: `INTEGRATION_STATUS.md`
