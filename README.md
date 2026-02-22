# NPS Retirement Corpus & Pension Forecasting Tool

A fully functional, production-ready full-stack web application for National Pension System (NPS) retirement planning and pension forecasting.

## 🎯 Features

- **Retirement Calculator**: Calculate retirement corpus, lump sum, and pension amounts
- **Contribution Estimator**: Determine required monthly contributions for desired pension
- **Scenario Comparison**: Compare Conservative (8%), Moderate (10%), and Aggressive (12%) investment scenarios
- **Interactive Charts**: Visualize retirement corpus growth over time
- **User Authentication**: Secure login and registration with JWT tokens
- **Save Forecasts**: Store and manage multiple retirement forecasts
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode**: Toggle between light and dark themes
- **Professional UI**: Fintech-style dashboard with smooth animations

## 📋 Tech Stack

### Frontend
- **React 18** - UI library with functional components and hooks
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Interactive charts and graphs
- **Axios** - HTTP client
- **React Icons** - Icon library
- **Vite** - Modern bundler

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
nps-retirement-tool/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js           # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── userController.js     # User auth endpoints
│   │   │   └── calculatorController.js # Calculator endpoints
│   │   ├── middleware/
│   │   │   └── auth.js               # Authentication & error handling
│   │   ├── models/
│   │   │   ├── User.js               # User schema
│   │   │   └── Forecast.js           # Forecast schema
│   │   ├── routes/
│   │   │   ├── userRoutes.js         # User routes
│   │   │   ├── calculatorRoutes.js   # Calculator routes
│   │   │   └── index.js              # Main routes
│   │   ├── services/
│   │   │   └── index.js              # Business logic services
│   │   └── utils/
│   │       ├── auth.js               # Auth utilities
│   │       ├── errors.js             # Error handling
│   │       └── financialCalculations.js # Financial formulas
│   ├── server.js                     # Express app setup
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx            # Navigation bar
│   │   │   ├── Footer.jsx            # Footer
│   │   │   ├── Alert.jsx             # Alert component
│   │   │   ├── StatCard.jsx          # Statistics card
│   │   │   └── LoadingSpinner.jsx    # Loading indicator
│   │   ├── context/
│   │   │   ├── AuthContext.jsx       # Authentication state
│   │   │   └── ThemeContext.jsx      # Theme state
│   │   ├── pages/
│   │   │   ├── HomePage.jsx          # Home page
│   │   │   ├── CalculatorPage.jsx    # Calculator
│   │   │   ├── EstimatorPage.jsx     # Contribution estimator
│   │   │   ├── ComparisonPage.jsx    # Scenario comparison
│   │   │   ├── DashboardPage.jsx     # User dashboard
│   │   │   ├── AboutPage.jsx         # About page
│   │   │   ├── LoginPage.jsx         # Login
│   │   │   └── RegisterPage.jsx      # Registration
│   │   ├── utils/
│   │   │   ├── api.js                # API client
│   │   │   └── helpers.js            # Utility functions
│   │   ├── styles/
│   │   │   └── index.css             # Global styles
│   │   ├── App.jsx                   # Main app component
│   │   └── main.jsx                  # Entry point
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js 16+ and npm/yarn
- MongoDB Atlas (or local MongoDB)
- Git

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file:**
```bash
cp .env.example .env
```

4. **Configure environment variables in `.env`:**
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/retirewise
NODE_ENV=development
JWT_SECRET=your_secure_jwt_secret_key_here
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

5. **Ensure MongoDB is running (if local):**
```bash
# macOS with Homebrew
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# MongoDB should be running as a service
```

6. **Start the backend server:**
```bash
npm run dev
```

The backend will run on http://localhost:5000

### Frontend Setup

1. **Navigate to frontend directory (new terminal):**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

The frontend will run on http://localhost:3000

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires auth)

### Calculator
- `POST /api/calculator/calculate` - Calculate retirement corpus
- `POST /api/calculator/estimate` - Estimate required contribution
- `POST /api/calculator/scenario` - Get scenario comparison
- `POST /api/calculator/save-forecast` - Save forecast (requires auth)
- `GET /api/calculator/forecasts` - Get user forecasts (requires auth)
- `GET /api/calculator/forecasts/:forecastId` - Get specific forecast (requires auth)
- `DELETE /api/calculator/forecasts/:forecastId` - Delete forecast (requires auth)

## 📊 Financial Calculations

### Retirement Corpus Calculation
Uses Future Value of Annuity formula:
```
FV = P × [((1 + r)^n - 1) / r]
Where:
- P = Monthly contribution
- r = Monthly interest rate (annual rate / 12 / 100)
- n = Number of months
```

### Pension Calculation
```
Annual Pension = (Corpus × 40% × Annuity Rate) / 100
Monthly Pension = Annual Pension / 12
```

### Contribution Estimation
Reverse calculation to find monthly contribution needed for desired pension amount.

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- CORS configuration
- Input validation on frontend and backend
- Error handling middleware
- Environment variable protection

## 🎨 Design Features

- **Responsive Design**: Mobile-first approach, works on all devices
- **Smooth Animations**: Fade-in, slide-in transitions
- **Interactive Charts**: Recharts for visualization
- **Modern UI**: Card-based layout with shadows and hover effects
- **Color Scheme**: Professional blue and white fintech theme
- **Dark Mode**: Toggle-able dark theme
- **Loading States**: Loading spinners for async operations

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🧪 Demo Credentials

For testing purposes, create a test user via registration or login with:
- Email: test@example.com
- Password: password123

## 🚢 Deployment Guide

### Backend Deployment

1. **Create Heroku account and install CLI**

2. **Login to Heroku:**
```bash
heroku login
```

3. **Create app:**
```bash
heroku create your-app-name
```

4. **Set MongoDB and app environment variables:**
```bash
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret
CORS_ORIGIN=your_frontend_url
NODE_ENV=production
```

5. **Set other environment variables:**
```bash
heroku config:set JWT_SECRET=your_secret_key
heroku config:set CORS_ORIGIN=https://your-frontend-domain.com
```

6. **Deploy:**
```bash
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)

#### Vercel:
1. Push code to GitHub
2. Connect GitHub to Vercel
3. Set environment variables (API URL)
4. Deploy automatically

#### Environment variable for frontend:
```
VITE_API_BASE_URL=https://your-backend-url.herokuapp.com
```

## 📈 Performance Optimization

- Code splitting with React.lazy
- Image optimization
- CSS minification with Tailwind
- API request caching with localStorage
- Efficient re-renders with React hooks

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify network access if using MongoDB Atlas

### CORS Errors
- Ensure frontend URL is in CORS_ORIGIN
- Check that frontend is making requests to correct API URL

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

## 📚 API Request Examples

### Calculate Retirement
```bash
curl -X POST http://localhost:5000/api/calculator/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "currentAge": 30,
    "retirementAge": 60,
    "monthlyContribution": 10000,
    "expectedReturn": 10,
    "annuityReturn": 8
  }'
```

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

## 📝 Future Enhancements

- [ ] Multilingual support (English + Hindi)
- [ ] PDF report generation
- [ ] Advanced inflation adjustment
- [ ] Real-time market data integration
- [ ] Mobile app (React Native)
- [ ] Advanced filtering and search
- [ ] Email notifications
- [ ] Social sharing features
- [ ] Analytics dashboard for admins
- [ ] Integration with actual NPS providers

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created as a comprehensive MERN stack application for financial planning and retirement forecasting.

## 💬 Support

For issues, questions, or suggestions, please create an issue in the repository or contact us at info@npsplanner.com

## 📞 Contact

- **Email**: info@npsplanner.com
- **Phone**: +91-XXXX-XXXX-XX
- **Website**: Coming soon

---

**Last Updated**: February 21, 2026
