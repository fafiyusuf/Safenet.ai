#!/bin/bash
# Safenet.ai - Quick Start Script
# This script helps you get the application running quickly

set -e  # Exit on error

echo "🚀 Safenet.ai Setup & Run Script"
echo "================================"
echo ""

# Check if we're in the right directory
if [ ! -d "Backend" ] || [ ! -d "Frontend" ]; then
    echo "❌ Error: Please run this script from the safenet-ai-project-plan directory"
    exit 1
fi

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

echo "📋 Step 1: Checking Prerequisites..."
echo ""

# Check Python
if command_exists python3; then
    PYTHON_VERSION=$(python3 --version)
    echo "✅ Python found: $PYTHON_VERSION"
else
    echo "❌ Python 3 not found. Please install Python 3.9 or higher"
    exit 1
fi

# Check Node.js
if command_exists node; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js found: $NODE_VERSION"
else
    echo "❌ Node.js not found. Please install Node.js 18 or higher"
    exit 1
fi

# Check pnpm
if command_exists pnpm; then
    echo "✅ pnpm found"
    PACKAGE_MANAGER="pnpm"
elif command_exists npm; then
    echo "⚠️  pnpm not found, using npm instead"
    PACKAGE_MANAGER="npm"
else
    echo "❌ Neither pnpm nor npm found"
    exit 1
fi

echo ""
echo "📋 Step 2: Setting up Backend..."
echo ""

cd Backend/scripts

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found in Backend/scripts/"
    echo "📝 Creating .env from template..."
    cp .env.example .env
    echo ""
    echo "⚠️  IMPORTANT: You need to configure your .env file!"
    echo ""
    echo "Required configuration:"
    echo "1. DATABASE_URL - Get from https://console.neon.tech/"
    echo "2. GEMINI_API_KEY - Get from https://makersuite.google.com/app/apikey"
    echo "3. Change ADMIN_PASSWORD to something secure"
    echo ""
    read -p "Press Enter when you've updated Backend/scripts/.env with your credentials..."
fi

# Install Python dependencies
echo "📦 Installing Python dependencies..."
if pip3 install -r requirements.txt; then
    echo "✅ Python dependencies installed"
else
    echo "❌ Failed to install Python dependencies"
    exit 1
fi

echo ""
echo "📋 Step 3: Initializing Database..."
echo ""

# Initialize database
if python3 init_db.py; then
    echo "✅ Database initialized successfully"
else
    echo "❌ Database initialization failed"
    echo "Please check your DATABASE_URL in .env"
    exit 1
fi

cd ../..

echo ""
echo "📋 Step 4: Setting up Frontend..."
echo ""

cd Frontend

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  No .env.local file found in Frontend/"
    echo "📝 Creating .env.local from template..."
    cp .env.example .env.local
    echo "✅ Created .env.local"
    echo "⚠️  Make sure NEXT_PUBLIC_API_URL=http://localhost:8000"
fi

# Install Node dependencies
echo "📦 Installing Node.js dependencies..."
if $PACKAGE_MANAGER install; then
    echo "✅ Node.js dependencies installed"
else
    echo "❌ Failed to install Node.js dependencies"
    exit 1
fi

cd ..

echo ""
echo "✅ Setup Complete!"
echo ""
echo "🚀 Starting Application..."
echo "================================"
echo ""
echo "Starting Backend on http://localhost:8000"
echo "Starting Frontend on http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Create a cleanup function
cleanup() {
    echo ""
    echo "🛑 Shutting down servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Start Backend
cd Backend/scripts
python3 main.py &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"

# Wait a moment for backend to start
sleep 3

# Start Frontend
cd ../../Frontend
$PACKAGE_MANAGER dev &
FRONTEND_PID=$!
echo "✅ Frontend started (PID: $FRONTEND_PID)"

echo ""
echo "================================"
echo "🎉 Application is running!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:8000"
echo "📖 API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop"
echo "================================"

# Wait for processes
wait
