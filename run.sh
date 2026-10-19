#!/bin/bash
# Safenet.ai - Quick Start Script (Node.js / TypeScript Stack)
set -e

echo "🚀 Safenet.ai Setup & Run Script"
echo "================================"
echo ""

# Check directory
if [ ! -d "Backend-Express" ] || [ ! -d "Frontend" ]; then
    echo "❌ Error: Please run this script from the Safenet.ai root directory"
    exit 1
fi

command_exists() {
    command -v "$1" >/dev/null 2>&1
}

echo "📋 Step 1: Checking Prerequisites..."
if command_exists node; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js found: $NODE_VERSION"
else
    echo "❌ Node.js not found. Please install Node.js 18 or higher."
    exit 1
fi

if command_exists pnpm; then
    echo "✅ pnpm found: $(pnpm --version)"
    FRONTEND_PM="pnpm"
elif command_exists npm; then
    echo "⚠️  pnpm not found, using npm for Frontend"
    FRONTEND_PM="npm"
else
    echo "❌ Neither pnpm nor npm found."
    exit 1
fi

echo ""
echo "📋 Step 2: Configuring Backend-Express..."
cd Backend-Express

if [ ! -f ".env" ]; then
    echo "📝 Creating Backend-Express/.env from .env.example..."
    cp .env.example .env 2>/dev/null || cat <<EOF > .env
PORT=8000
NODE_ENV=development
DATABASE_URL=
GEMINI_API_KEY=
GEMINI_MODEL=gemini-1.5-flash
JWT_SECRET=safenet-dev-jwt-secret-key-12345
CORS_ORIGIN=http://localhost:3000
EOF
    echo "⚠️  NOTE: Configure DATABASE_URL and GEMINI_API_KEY in Backend-Express/.env if needed."
fi

echo "📦 Installing Backend dependencies..."
npm install

cd ..

echo ""
echo "📋 Step 3: Configuring Frontend..."
cd Frontend

if [ ! -f ".env.local" ]; then
    echo "📝 Creating Frontend/.env.local..."
    cat <<EOF > .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
JWT_SECRET=safenet-dev-jwt-secret-key-12345
NODE_ENV=development
EOF
fi

echo "📦 Installing Frontend dependencies..."
$FRONTEND_PM install

cd ..

echo ""
echo "================================"
echo "🚀 Starting SafeNet.ai..."
echo "================================"

cleanup() {
    echo ""
    echo "🛑 Shutting down servers..."
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    exit 0
}

trap cleanup SIGINT SIGTERM

# Start Backend
cd Backend-Express
npm run dev &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID) on http://localhost:8000"

# Start Frontend
cd ../Frontend
$FRONTEND_PM dev &
FRONTEND_PID=$!
echo "✅ Frontend started (PID: $FRONTEND_PID) on http://localhost:3000"

echo ""
echo "🎉 SafeNet.ai is running!"
echo "   - Web App: http://localhost:3000"
echo "   - API: http://localhost:8000"
echo "   - Health Check: http://localhost:8000/health"
echo "Press Ctrl+C to stop both servers."

wait
