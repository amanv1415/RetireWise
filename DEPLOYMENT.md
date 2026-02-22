# RetireWise Deployment Guide

## Overview
This project uses:
- **Frontend:** Vite + React
- **Backend:** Node.js + Express
- **Database:** MongoDB Atlas + Mongoose

## Backend Deployment (Production)

### 1) Prerequisites
- Node.js 18+
- MongoDB Atlas cluster (or local MongoDB)
- A process manager (PM2/systemd) or container runtime

### 2) Environment Configuration
Create `backend/.env` from `backend/.env.example` and set production values:

```dotenv
NODE_ENV=production

MAX_PORT_RETRIES=10
JSON_LIMIT=1mb
URL_ENCODED_LIMIT=1mb
TRUST_PROXY=true

MONGODB_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/retirewise?retryWrites=true&w=majority

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

## Render Backend Setup

### Service Settings
- **Environment:** `Node`
- **Root Directory:** `backend`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

### Environment Variables (Render Dashboard)
Set the following values from `backend/.env.render.example`:

```dotenv
NODE_ENV=production
MAX_PORT_RETRIES=10
JSON_LIMIT=1mb
URL_ENCODED_LIMIT=1mb
TRUST_PROXY=true
MONGODB_URL=<your_mongodb_atlas_connection_string>
JWT_SECRET=<long_random_secret>
JWT_EXPIRE=7d
CORS_ORIGIN=<your_frontend_url>
```

### Verify After Deploy
- `https://<your-backend>.onrender.com/api/health`
- `https://<your-backend>.onrender.com/api/ready`

### Troubleshooting: `secretOrPrivateKey must have a value`
- In Render backend service, set `JWT_SECRET` to a long random value and redeploy.
- If you use alternative key names, backend also supports `SECRET_KEY` or `JWT_PRIVATE_KEY`.
- Ensure you redeploy backend after changing environment variables.

## Render Frontend Setup

If using the repo blueprint (`render.yaml`), Render will create `retirewise-frontend` automatically.

### Frontend Environment Variable
- `VITE_API_BASE_URL=https://<your-backend>.onrender.com/api`

### Verify After Deploy
- Open frontend URL from Render dashboard
- Confirm API calls succeed (register/login/calculator)

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
- Serve backend over HTTPS behind reverse proxy.
- Restrict `CORS_ORIGIN` to trusted domains.
- Rotate `JWT_SECRET` periodically.
- Use MongoDB Atlas backups and monitoring.

## Quick Verification Checklist
- [ ] Backend starts with no DB errors
- [ ] `GET /api/health` returns success
- [ ] `GET /api/ready` returns success (HTTP 200)
- [ ] Frontend can call backend APIs from deployed domain
- [ ] Auth login/register works in production
