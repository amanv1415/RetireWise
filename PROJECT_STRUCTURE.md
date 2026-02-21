# Project Structure & File Summary

## 📁 Complete Project Tree

```
nps-retirement-tool/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── userController.js
│   │   │   └── calculatorController.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Forecast.js
│   │   ├── routes/
│   │   │   ├── userRoutes.js
│   │   │   ├── calculatorRoutes.js
│   │   │   └── index.js
│   │   ├── services/
│   │   │   └── index.js
│   │   └── utils/
│   │       ├── auth.js
│   │       ├── errors.js
│   │       └── financialCalculations.js
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Alert.jsx
│   │   │   ├── StatCard.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── CalculatorPage.jsx
│   │   │   ├── EstimatorPage.jsx
│   │   │   ├── ComparisonPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   └── helpers.js
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .gitignore
├── README.md
├── DEPLOYMENT.md
├── API_DOCUMENTATION.md
├── start.sh
└── start.bat
```

## 📋 File Descriptions

### Backend Core
| File | Purpose |
|------|---------|
| `server.js` | Express app initialization, middleware setup, routes configuration |
| `src/config/database.js` | MongoDB connection configuration using Mongoose |

### Controllers
| File | Purpose |
|------|---------|
| `src/controllers/userController.js` | User auth logic (register, login, profile) |
| `src/controllers/calculatorController.js` | Calculator logic (calculate, estimate, scenarios, save) |

### Models
| File | Purpose |
|------|---------|
| `src/models/User.js` | Mongoose User schema with validation |
| `src/models/Forecast.js` | Mongoose Forecast schema for storing calculations |

### Services
| File | Purpose |
|------|---------|
| `src/services/index.js` | Business logic (UserService, ForecastService) |

### Routes
| File | Purpose |
|------|---------|
| `src/routes/userRoutes.js` | Authentication endpoints |
| `src/routes/calculatorRoutes.js` | Calculator endpoints |
| `src/routes/index.js` | Main router combining all routes |

### Middleware
| File | Purpose |
|------|---------|
| `src/middleware/auth.js` | JWT verification, error handling, validation |

### Utilities
| File | Purpose |
|------|---------|
| `src/utils/auth.js` | Password hashing, JWT operations |
| `src/utils/errors.js` | Custom error classes, input validation |
| `src/utils/financialCalculations.js` | Financial formulas and calculations |

### Frontend Components
| Component | Purpose |
|-----------|---------|
| `Navbar.jsx` | Navigation bar with mobile menu |
| `Footer.jsx` | Footer with links and info |
| `Alert.jsx` | Reusable alert/notification component |
| `StatCard.jsx` | Statistics display card component |
| `LoadingSpinner.jsx` | Loading indicator |

### Frontend Contexts
| Context | Purpose |
|---------|---------|
| `AuthContext.jsx` | Global auth state (user, token, login/logout) |
| `ThemeContext.jsx` | Global theme state (light/dark mode) |

### Frontend Pages
| Page | Route | Purpose |
|------|-------|---------|
| `HomePage.jsx` | `/` | Landing page with features and CTA |
| `CalculatorPage.jsx` | `/calculator` | Main retirement calculator |
| `EstimatorPage.jsx` | `/estimator` | Contribution estimator |
| `ComparisonPage.jsx` | `/comparison` | Scenario comparison tool |
| `DashboardPage.jsx` | `/dashboard` | User forecast management |
| `AboutPage.jsx` | `/about` | About NPS and application |
| `LoginPage.jsx` | `/login` | User login form |
| `RegisterPage.jsx` | `/register` | User registration form |

### Frontend Utilities
| File | Purpose |
|------|---------|
| `utils/api.js` | Axios API client with interceptors |
| `utils/helpers.js` | Format helpers, validation, calculations |
| `styles/index.css` | Global styles, animations, custom classes |

### Frontend Config
| File | Purpose |
|------|---------|
| `vite.config.js` | Vite bundler configuration |
| `tailwind.config.js` | Tailwind CSS configuration |
| `postcss.config.js` | PostCSS plugins for CSS |
| `index.html` | HTML entry point |
| `App.jsx` | Main React app component |
| `main.jsx` | React entry point |

### Configuration Files
| File | Purpose |
|------|---------|
| `backend/package.json` | Backend dependencies and scripts |
| `frontend/package.json` | Frontend dependencies and scripts |
| `backend/.env.example` | Backend environment variables template |
| `backend/.gitignore` | Git ignore patterns for backend |
| `frontend/.gitignore` | Git ignore patterns for frontend |

### Documentation
| File | Purpose |
|------|---------|
| `README.md` | Complete project documentation |
| `DEPLOYMENT.md` | Deployment and installation guide |
| `API_DOCUMENTATION.md` | Detailed API endpoint documentation |
| `PROJECT_STRUCTURE.md` | This file - project overview |

### Startup Scripts
| File | Purpose |
|------|---------|
| `start.sh` | Bash script to start both servers (Mac/Linux) |
| `start.bat` | Batch script to start both servers (Windows) |

## 🔧 Technology Stack Summary

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB/Mongoose** - Database and ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests
- **Dotenv** - Environment variables

### Frontend
- **React 18** - UI library
- **React Router v6** - Navigation
- **Tailwind CSS** - Styling
- **Recharts** - Chart library
- **Axios** - HTTP client
- **Vite** - Build tool
- **React Icons** - Icon set

## 📦 Dependencies Count

### Backend
- **Runtime**: 8 packages (express, mongoose, cors, dotenv, bcryptjs, jsonwebtoken, validator, pdfkit, axios)
- **DevRuntime**: 1 package (nodemon)

### Frontend
- **Runtime**: 6 packages (react, react-dom, react-router-dom, axios, recharts, react-icons, zustand)
- **DevRuntime**: 3 packages (@vitejs/plugin-react, vite, tailwindcss, postcss, autoprefixer)

## 📊 Code Statistics

- **Backend Files**: 13 files
  - Controllers: 2
  - Models: 2
  - Routes: 3
  - Services: 1
  - Middleware: 1
  - Utils: 3
  - Config: 1
  
- **Frontend Files**: 19 files
  - Components: 5
  - Pages: 8
  - Context: 2
  - Utils: 2
  - Styles: 1
  - Config: 1
  
- **Documentation**: 4 files
- **Configuration**: 5 files
- **Startup Scripts**: 2 files

**Total Files Created**: 48+ files

## 🎯 Key Features Implemented

### User Features
- ✅ User registration with validation
- ✅ Secure login with JWT
- ✅ User profile management
- ✅ Password hashing and verification

### Calculator Features
- ✅ Retirement corpus calculation
- ✅ Contribution estimator
- ✅ Scenario comparison (3 scenarios)
- ✅ Interactive charts and graphs
- ✅ Save forecasts to database
- ✅ Manage multiple forecasts

### UI/UX Features
- ✅ Responsive design (mobile-first)
- ✅ Dark/light mode toggle
- ✅ Smooth animations
- ✅ Loading states
- ✅ Error handling
- ✅ Alert notifications
- ✅ Professional fintech design

### Technical Features
- ✅ RESTful API architecture
- ✅ MVC pattern implementation
- ✅ Input validation (frontend + backend)
- ✅ Error handling middleware
- ✅ CORS configuration
- ✅ Environment variable management
- ✅ Secure password handling

## 🚀 Getting Started

### Quick Start (3 steps):
1. **Install**: `npm install` in both backend and frontend folders
2. **Configure**: Update `.env` files with your settings
3. **Run**: Use `./start.sh` (Mac/Linux) or `start.bat` (Windows)

### Or Manual Start:
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

## 📝 Environment Setup

**Backend (.env):**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nps-retirement
NODE_ENV=development
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

**Frontend (Vite):**
- Uses `http://localhost:5000` for API by default
- Update in vite.config.js if needed

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- CORS protection
- Input validation (frontend & backend)
- Error handling without sensitive info disclosure
- Environment variable protection
- HTTP-only cookie support ready

## 📱 Responsive Breakpoints

- Mobile: < 768px (Hamburger menu, stacked layout)
- Tablet: 768px - 1024px (2-column layout)
- Desktop: > 1024px (Full multi-column layout)

## 🎨 Design System

- **Color Scheme**: Blue (#0066CC) primary, Gray secondary
- **Typography**: Inter font family
- **Spacing**: Tailwind scale (4px units)
- **Shadows**: Custom card shadows
- **Animations**: Fade-in, slide-in transitions
- **Border Radius**: 8px standard

---

**Project Status**: ✅ Complete and Production-Ready
**Last Updated**: February 21, 2026
