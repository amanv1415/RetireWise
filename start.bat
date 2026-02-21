@echo off
REM NPS Retirement Tool - Quick Start Script for Windows

echo.
echo 🚀 NPS Retirement Tool - Quick Start (Windows)
echo ============================================
echo.

REM Check if Node.js is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js v16 or higher.
    exit /b 1
)

echo ✓ Node.js found
for /f "tokens=*" %%i in ('node -v') do echo %%i

echo.
echo Setting up backend...
cd backend

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
)

REM Check if .env exists
if not exist ".env" (
    echo Creating .env file from .env.example...
    copy .env.example .env
    echo ⚠ Please update .env with your MongoDB URI
)

REM Start backend
echo ✓ Starting backend server...
start cmd /k npm run dev
echo ✓ Backend running on http://localhost:5000

REM Setup Frontend
echo.
echo Setting up frontend...
cd ..\frontend

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
)

REM Start frontend
echo ✓ Starting frontend server...
start cmd /k npm run dev
echo ✓ Frontend running on http://localhost:3000

echo.
echo ================================================
echo ✓ Application is starting!
echo ================================================
echo.
echo Frontend:  http://localhost:3000
echo Backend:   http://localhost:5000
echo.
echo Check the command prompts for server output
echo.
pause
