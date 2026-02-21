# RetireWise Deployment Guide

## Overview
This project uses:
- **Frontend:** Vite + React
- **Backend:** Node.js + Express
- **Database:** MySQL + Sequelize

## Backend Deployment (Production)

### 1) Prerequisites
- Node.js 18+
- MySQL 8+
- A process manager (PM2/systemd) or container runtime

### 2) Environment Configuration
Create `backend/.env` from `backend/.env.example` and set production values:

```dotenv
PORT=5000
NODE_ENV=production

MAX_PORT_RETRIES=10
JSON_LIMIT=1mb
URL_ENCODED_LIMIT=1mb
TRUST_PROXY=true

DB_HOST=your-mysql-host
DB_PORT=3306
DB_NAME=retirewise
DB_USER=retirewise_user
DB_PASSWORD=strong_password
DB_SYNC_ALTER=false

JWT_SECRET=replace_with_long_random_secret
JWT_EXPIRE=7d

CORS_ORIGIN=https://your-frontend-domain.com
```

### 3) Install and Start
```bash
cd backend
npm install
npm start
```

### 4) Health/Readiness Checks
- Health: `GET /api/health`
- Readiness: `GET /api/ready`

Use `/api/ready` for load balancer and orchestration probes.

## Frontend Deployment

### 1) Build
```bash
cd frontend
npm install
npm run build
```

### 2) API Base URL
Set:
```dotenv
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

Deploy `frontend/dist` to your host (Vercel, Netlify, S3+CloudFront, Nginx, etc.).

## Recommended Production Practices
- Keep `DB_SYNC_ALTER=false` in production.
- Serve backend over HTTPS behind reverse proxy.
- Restrict `CORS_ORIGIN` to trusted domains.
- Rotate `JWT_SECRET` periodically.
- Use managed MySQL backups and monitoring.

## Quick Verification Checklist
- [ ] Backend starts with no DB errors
- [ ] `GET /api/health` returns success
- [ ] `GET /api/ready` returns success (HTTP 200)
- [ ] Frontend can call backend APIs from deployed domain
- [ ] Auth login/register works in production
