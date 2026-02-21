import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';

// Components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import ChatbotWidget from './components/ChatbotWidget.jsx';

// Pages
import HomePage from './pages/HomePage.jsx';
import CalculatorPage from './pages/CalculatorPage.jsx';
import EstimatorPage from './pages/EstimatorPage.jsx';
import ComparisonPage from './pages/ComparisonPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import MyAccountPage from './pages/MyAccountPage.jsx';

// Styles
import './styles/index.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ErrorBoundary>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-[#EEEFE0] text-gray-900 transition-colors duration-300">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/calculator" element={<CalculatorPage />} />
                <Route path="/estimator" element={<EstimatorPage />} />
                <Route path="/comparison" element={<ComparisonPage />} />
                <Route
                  path="/dashboard"
                  element={(
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  )}
                />
                <Route
                  path="/account"
                  element={(
                    <ProtectedRoute>
                      <MyAccountPage />
                    </ProtectedRoute>
                  )}
                />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
            <ChatbotWidget />
          </div>
        </ErrorBoundary>
      </AuthProvider>
    </Router>
  );
};

export default App;
