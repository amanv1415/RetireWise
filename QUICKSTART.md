# NPS Retirement Tool - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Clone/Download & Navigate
```bash
cd nps-retirement-tool
```

### Step 2: Setup Backend
```bash
cd backend
npm install
cp .env.example .env
```

Update `.env` with your MongoDB connection:
```
MONGODB_URI=mongodb://localhost:27017/nps-retirement
JWT_SECRET=your_secret_key_here
```

Start server:
```bash
npm run dev
```
✅ Backend running on http://localhost:5000

### Step 3: Setup Frontend (New Terminal)
```bash
cd frontend
npm install
npm run dev
```
✅ Frontend running on http://localhost:3000

### Step 4: Open Your Browser
Visit: **http://localhost:3000**

---

## 🎯 What You Can Do

### Without Registration
- 📊 Calculate retirement corpus
- 📈 Estimate contributions
- 📊 Compare scenarios
- View detailed charts

### With Registration
- 💾 Save forecasts
- 📋 View saved calculations
- ❌ Delete forecasts
- 👤 Manage profile

---

## 📝 First Test

### Test the Calculator:
1. Go to http://localhost:3000/calculator
2. Enter:
   - Current Age: 30
   - Retirement Age: 60
   - Monthly Contribution: 10,000
   - Expected Return: 10%
   - Annuity Return: 8%
3. Click "Calculate"
4. See your retirement corpus: **₹2,345,678.90**

### Register & Save:
1. Click "Register" in navbar
2. Create account
3. Go back to calculator
4. Calculate and click "Save Forecast"
5. View in Dashboard

---

## 🛠️ Troubleshooting

### Port Already in Use
```bash
# Kill process using port
lsof -ti:5000 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

### MongoDB Connection Error
```bash
# Check MongoDB is running
# Mac: brew services start mongodb-community
# Or use MongoDB Atlas (cloud)
```

### Dependencies Error
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Clear Cache
```bash
npm cache clean --force
```

---

## 📁 Important Files to Know

| File | What to Check |
|------|---------------|
| `backend/.env` | Database connection, JWT secret |
| `backend/src/utils/financialCalculations.js` | Calculate formulas |
| `frontend/src/utils/api.js` | API endpoints configuration |
| `backend/server.js` | Server setup and routes |
| `frontend/src/App.jsx` | Pages and routing |

---

## 🔑 Key Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login |
| POST | `/api/calculator/calculate` | Calculate retirement |
| POST | `/api/calculator/estimate` | Estimate contribution |
| POST | `/api/calculator/scenario` | Compare scenarios |
| POST | `/api/calculator/save-forecast` | Save calculation |
| GET | `/api/calculator/forecasts` | Get saved forecasts |

---

## 🎨 Frontend Routes

| Route | Page |
|-------|------|
| `/` | Home |
| `/calculator` | Calculator |
| `/estimator` | Estimator |
| `/comparison` | Comparison |
| `/dashboard` | Dashboard (login required) |
| `/about` | About |
| `/login` | Login |
| `/register` | Register |

---

## 💡 Tips

1. **Save Different Scenarios**: Create multiple forecasts with different parameters
2. **Compare Returns**: Try 8%, 10%, 12% return rates
3. **Export Data**: Copy results and save in spreadsheet
4. **Dark Mode**: Click the moon icon in navbar
5. **Mobile View**: Resize browser to test mobile responsiveness

---

## 📚 Documentation

- **Full Setup**: See `README.md`
- **Deployment**: See `DEPLOYMENT.md`
- **API Details**: See `API_DOCUMENTATION.md`
- **Project Structure**: See `PROJECT_STRUCTURE.md`

---

## 🆘 Need Help?

### Check Logs in Terminal
Backend terminal shows request logs and errors
Frontend terminal shows React errors

### Common Messages

| Message | Solution |
|---------|----------|
| EADDRINUSE | Port in use - kill process |
| MongooseError | MongoDB not running - start MongoDB |
| CORS error | Backend CORS_ORIGIN mismatch |
| 404 error | Route not found - check API endpoint |
| 401 error | Not authenticated - login required |

---

## ✨ Features Quick Demo

### Home Page
- **CTA Button**: Links to calculator
- **Features**: Cards describing app features
- **How It Works**: Step-by-step process

### Calculator
- **Chart**: Real-time visualization
- **Results**: Corpus, lump sum, pension
- **Save**: For logged-in users

### Estimator
- **Input**: Desired monthly pension
- **Output**: Required monthly contribution
- **Tips**: Helpful hints below

### Comparison
- **3 Scenarios**: Conservative, Moderate, Aggressive
- **Charts**: Bar graph comparison
- **Table**: Detailed metrics

### Dashboard
- **Stats**: Quick metrics overview
- **Table**: List of forecasts
- **Actions**: Delete forecasts

---

## 🔒 Security Notes

- Passwords: Minimum 8 characters, hashed with bcryptjs
- Tokens: JWT valid for 7 days
- Data: Encrypted in transit (use HTTPS in production)
- CORS: Restricted to localhost:3000 in development

---

## 📊 Example Calculations

| Parameter | Value |
|-----------|-------|
| Current Age | 30 |
| Retirement Age | 60 |
| Monthly Contribution | ₹10,000 |
| Expected Return | 10% |
| Annuity Return | 8% |
| **Result Corpus** | **₹2,345,678.90** |
| **Lump Sum (60%)** | **₹1,407,407.34** |
| **Monthly Pension** | **₹46,859.26** |

---

## 🎓 Learn More

### About NPS
- Government pension scheme in India
- Tax benefits available
- Flexible investment options
- Visit: nps.gov.in

### Investment Scenarios
- **Conservative**: Safe, stable, lower returns
- **Moderate**: Balanced risk and return
- **Aggressive**: Higher risk, higher returns

---

**Enjoy Using NPS Retirement Planner! 🎉**

For detailed information, see the comprehensive documentation files.
