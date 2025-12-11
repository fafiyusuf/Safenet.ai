#!/bin/bash

# Safenet.ai Setup Helper Script
# This script helps you set up the complete platform

set -e

echo "🚀 Safenet.ai Setup Helper"
echo "=========================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -d "Backend" ] || [ ! -d "Frontend" ]; then
    echo -e "${RED}❌ Error: Run this script from the project root directory${NC}"
    exit 1
fi

echo -e "${BLUE}📋 Pre-flight Checks${NC}"
echo "-------------------"

# Check Python
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version | cut -d' ' -f2)
    echo -e "${GREEN}✅ Python ${PYTHON_VERSION} installed${NC}"
else
    echo -e "${RED}❌ Python 3 not found. Please install Python 3.9+${NC}"
    exit 1
fi

# Check Node
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✅ Node ${NODE_VERSION} installed${NC}"
else
    echo -e "${RED}❌ Node.js not found. Please install Node.js 18+${NC}"
    exit 1
fi

# Check pnpm
if command -v pnpm &> /dev/null; then
    PNPM_VERSION=$(pnpm --version)
    echo -e "${GREEN}✅ pnpm ${PNPM_VERSION} installed${NC}"
else
    echo -e "${YELLOW}⚠️  pnpm not found. Installing...${NC}"
    npm install -g pnpm
fi

# Check Tesseract
if command -v tesseract &> /dev/null; then
    TESSERACT_VERSION=$(tesseract --version | head -1)
    echo -e "${GREEN}✅ ${TESSERACT_VERSION} installed${NC}"
    
    # Check for Amharic
    if tesseract --list-langs | grep -q "amh"; then
        echo -e "${GREEN}✅ Amharic language pack installed${NC}"
    else
        echo -e "${YELLOW}⚠️  Amharic language pack not found${NC}"
        echo "   Install with: sudo apt install tesseract-ocr-amh"
    fi
else
    echo -e "${YELLOW}⚠️  Tesseract not found${NC}"
    echo "   Install with:"
    echo "   - Ubuntu: sudo apt install tesseract-ocr tesseract-ocr-amh"
    echo "   - macOS: brew install tesseract tesseract-lang"
fi

echo ""
echo -e "${BLUE}📦 Setting Up Backend${NC}"
echo "--------------------"

# Backend setup
cd Backend/scripts

if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  No .env file found. Creating from template...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✅ Created .env file${NC}"
    echo -e "${YELLOW}⚠️  IMPORTANT: Edit Backend/scripts/.env with your credentials!${NC}"
    echo ""
    echo "   You need:"
    echo "   1. DATABASE_URL from https://console.neon.tech/"
    echo "   2. GEMINI_API_KEY from https://makersuite.google.com/app/apikey"
    echo "   3. Change ADMIN_PASSWORD to something secure"
    echo ""
    read -p "Press Enter after you've updated .env file..."
else
    echo -e "${GREEN}✅ .env file exists${NC}"
fi

# Check if DATABASE_URL is set
if grep -q "DATABASE_URL=postgresql" .env; then
    echo -e "${GREEN}✅ DATABASE_URL is configured${NC}"
else
    echo -e "${RED}❌ DATABASE_URL not configured in .env${NC}"
    echo "   Get your connection string from: https://console.neon.tech/"
    exit 1
fi

# Install Python dependencies
echo ""
echo "Installing Python dependencies..."
pip install -r requirements.txt

echo ""
echo "Initializing database..."
python init_db.py

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Database initialized successfully${NC}"
else
    echo -e "${RED}❌ Database initialization failed${NC}"
    exit 1
fi

cd ../..

echo ""
echo -e "${BLUE}🎨 Setting Up Frontend${NC}"
echo "---------------------"

cd Frontend

if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  No .env.local file found. Creating from template...${NC}"
    cp .env.example .env.local
    echo -e "${GREEN}✅ Created .env.local file${NC}"
    echo -e "${YELLOW}⚠️  Make sure NEXT_PUBLIC_API_URL=http://localhost:8000${NC}"
else
    echo -e "${GREEN}✅ .env.local file exists${NC}"
fi

echo ""
echo "Installing Node dependencies..."
pnpm install

echo ""
echo -e "${GREEN}✅✅✅ Setup Complete! ✅✅✅${NC}"
echo ""
echo -e "${BLUE}🚀 Starting the Application${NC}"
echo "============================"
echo ""
echo "Option 1: Manual Start (Recommended for Development)"
echo "-----------------------------------------------------"
echo "Terminal 1 - Start Backend:"
echo "  cd Backend/scripts"
echo "  python main.py"
echo ""
echo "Terminal 2 - Start Frontend:"
echo "  cd Frontend"
echo "  pnpm dev"
echo ""
echo "Then visit: http://localhost:3000"
echo ""
echo "Option 2: Docker Start (Recommended for Production)"
echo "----------------------------------------------------"
echo "  docker-compose up --build"
echo ""
echo "Then visit: http://localhost:3000"
echo ""
echo -e "${YELLOW}📚 Documentation${NC}"
echo "  - Quick Start: SETUP.md"
echo "  - Backend API: Backend/README.md"
echo "  - Frontend Dev: Frontend/README.md"
echo "  - What's Fixed: FIXES_COMPLETE.md"
echo ""
echo -e "${GREEN}🎉 Ready to help survivors! 🎉${NC}"
