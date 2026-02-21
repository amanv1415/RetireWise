#!/bin/bash

# NPS Retirement Tool - Quick Start Script
# This script sets up and starts both backend and frontend

echo "🚀 NPS Retirement Tool - Quick Start"
echo "===================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js v16 or higher.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js found: $(node -v)${NC}"

# Check if MongoDB is running
echo ""
echo "Checking MongoDB connection..."
if command -v mongosh &> /dev/null; then
    if mongosh --eval "db.adminCommand('ping')" &> /dev/null; then
        echo -e "${GREEN}✓ MongoDB is running${NC}"
    else
        echo -e "${YELLOW}⚠ MongoDB is not running. Please start MongoDB.${NC}"
    fi
else
    echo -e "${YELLOW}⚠ MongoDB CLI not found. Please ensure MongoDB is running.${NC}"
fi

# Setup Backend
echo ""
echo -e "${YELLOW}Setting up backend...${NC}"
cd backend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install > /dev/null 2>&1
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo -e "${YELLOW}⚠ Please update .env with your MongoDB URI${NC}"
fi

# Start backend in background
echo -e "${GREEN}✓ Starting backend server...${NC}"
npm run dev &
BACKEND_PID=$!
echo -e "${GREEN}✓ Backend running on http://localhost:5000${NC}"

# Setup Frontend
echo ""
echo -e "${YELLOW}Setting up frontend...${NC}"
cd ../frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install > /dev/null 2>&1
fi

# Start frontend in background
echo -e "${GREEN}✓ Starting frontend server...${NC}"
npm run dev &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Frontend running on http://localhost:3000${NC}"

echo ""
echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}✓ Application is running!${NC}"
echo -e "${GREEN}================================================${NC}"
echo ""
echo "Frontend:  http://localhost:3000"
echo "Backend:   http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Handle cleanup on exit
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM

# Wait for both processes
wait
