# NPS Retirement Tool - Installation and Deployment Guide

## Quick Start

### Prerequisites
- Node.js v16+
- npm or yarn
- MongoDB (local or Atlas)
- Git

### Local Development Setup (5 minutes)

#### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

#### 2. Frontend Setup (new terminal)
```bash
cd frontend
npm install
npm run dev
```

Visit http://localhost:3000

---

## Detailed Installation

### MongoDB Setup

#### Option A: Local MongoDB (macOS)
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create account and cluster
3. Get connection string
4. Add to backend/.env as MONGODB_URI

### Backend Installation

```bash
cd backend
npm install
```

#### Environment Variables
Create `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nps-retirement
NODE_ENV=development
JWT_SECRET=your_very_secure_jwt_secret_key_change_in_production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

#### Start Backend
```bash
npm run dev
```

Server runs on: http://localhost:5000

### Frontend Installation

```bash
cd frontend
npm install
```

#### Start Frontend
```bash
npm run dev
```

Application runs on: http://localhost:3000

---

## Production Deployment

### Docker Deployment

#### Backend Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production

COPY src ./src
COPY server.js .

ENV PORT=5000
ENV NODE_ENV=production

EXPOSE 5000

CMD ["node", "server.js"]
```

#### Build and Run
```bash
docker build -t nps-backend .
docker run -p 5000:5000 -e MONGODB_URI=your_uri nps-backend
```

### Deployment Providers

#### Heroku Backend

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set variables:
```bash
heroku config:set MONGODB_URI=your_mongo_uri
heroku config:set JWT_SECRET=your_secret
heroku config:set CORS_ORIGIN=your_frontend_url
heroku config:set NODE_ENV=production
```
5. Deploy: `git push heroku main`

#### Vercel Frontend

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variable:
   - `VITE_API_BASE_URL=https://your-backend-url.com`
4. Deploy (automatic)

#### AWS Deployment

**Backend (EC2):**
- Launch Ubuntu instance
- Install Node.js and MongoDB
- Clone repository
- Configure environment
- Use PM2 for process management
- Set up SSL with Let's Encrypt

**Frontend (S3 + CloudFront):**
- Build: `npm run build`
- Upload dist to S3
- Set up CloudFront distribution
- Enable SSL

---

## Configuration

### Database Schema

#### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

#### Forecast Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  forecastName: String,
  currentAge: Number,
  retirementAge: Number,
  monthlyContribution: Number,
  expectedReturn: Number,
  annuityReturn: Number,
  totalRetirementCorpus: Number,
  lumpSum: Number,
  annualPension: Number,
  monthlyPension: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### API Configuration

Base URL (Development): `http://localhost:5000`
Base URL (Production): Update in frontend/.env

### Authentication

- JWT tokens valid for 7 days
- Tokens stored in localStorage
- Auto-logout on 401 response

---

## Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

---

## Maintenance

### Database Backup
```bash
# MongoDB Atlas backup (automatic)
# Local backup
mongodump --uri "mongodb://localhost:27017/nps-retirement"
```

### Update Dependencies
```bash
npm update
npm audit fix
```

### Monitor Logs
```bash
# Heroku
heroku logs --tail

# Local
# Check terminal output
```

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

### MongoDB Connection Failed
- Check MongoDB is running
- Verify connection string
- Check firewall/network access

### CORS Errors
- Verify CORS_ORIGIN in .env
- Check frontend is making correct API requests

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## Performance Tips

1. **Database**: Index frequently queried fields
2. **API**: Implement caching for calculations
3. **Frontend**: Use lazy loading for pages
4. **Images**: Optimize and compress
5. **Monitoring**: Set up error tracking (Sentry)

---

## Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Enable HTTPS/SSL
- [ ] Set secure CORS origin
- [ ] Use strong database passwords
- [ ] Enable MongoDB authentication
- [ ] Rate limit API endpoints
- [ ] Validate all inputs
- [ ] Use environment variables
- [ ] Regular security audits
- [ ] Keep dependencies updated

---

## Support

For issues or questions:
- Email: info@npsplanner.com
- GitHub Issues: [Create issue]
- Documentation: Full docs in README.md

---

Last Updated: February 21, 2026
