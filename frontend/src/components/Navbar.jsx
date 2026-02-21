import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiLogOut, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext.jsx';
import retirewiseLogo from '../assets/retirewise-logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const profileMenuRef = useRef(null);

  useEffect(() => {
    setIsOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `pb-2 transition border-b-2 ${
      isActive
        ? 'text-white border-white'
        : 'text-gray-100 border-transparent hover:text-white'
    }`;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="bg-[#1E2A27] shadow-lg sticky top-0 z-50 border-b border-[#16211f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center overflow-visible">
            <Link to="/" className="flex items-center gap-2 overflow-visible">
              <img
                src={retirewiseLogo}
                alt="RetireWise"
                className="h-[7.5rem] w-auto sm:h-[10rem] object-contain max-w-none"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/calculator" className={navLinkClass}>
              Calculator
            </NavLink>
            <NavLink to="/estimator" className={navLinkClass}>
              Estimator
            </NavLink>
            <NavLink to="/comparison" className={navLinkClass}>
              Comparison
            </NavLink>
            {isAuthenticated && (
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
            )}
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-3 relative" ref={profileMenuRef}>
                <span className="text-sm text-gray-100">{user?.name}</span>
                <button
                  type="button"
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className="p-2 bg-[#16211f] text-white rounded-full hover:bg-[#24322e] transition"
                  aria-label="Open profile menu"
                >
                  <FiUser size={18} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 top-12 w-52 bg-[#EEEFE0] opacity-100 rounded-xl shadow-2xl border-2 border-[#1E2A27] z-50 p-2 animate-dropdown-in">
                    <Link
                      to="/account"
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[#1E2A27] hover:bg-[#D1D8BE] transition"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <FiUser size={16} /> My Account
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[#1E2A27] hover:bg-[#D1D8BE] transition"
                    >
                      <FiLogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-white border border-[#A7C1A8] rounded-lg hover:bg-[#24322e] transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-[#A7C1A8] text-[#16211f] rounded-lg hover:bg-[#D1D8BE] transition"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-[#16211f] rounded-lg"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <FiX size={24} className="text-white" /> : <FiMenu size={24} className="text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-fade-in border-t border-[#16211f] pt-3">
            <Link
              to="/"
              className="block px-4 py-2 text-white hover:bg-[#16211f] rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/calculator"
              className="block px-4 py-2 text-gray-100 hover:bg-[#16211f] rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Calculator
            </Link>
            <Link
              to="/estimator"
              className="block px-4 py-2 text-gray-100 hover:bg-[#16211f] rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Estimator
            </Link>
            <Link
              to="/comparison"
              className="block px-4 py-2 text-gray-100 hover:bg-[#16211f] rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Comparison
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-gray-100 hover:bg-[#16211f] rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            )}
            <Link
              to="/about"
              className="block px-4 py-2 text-gray-100 hover:bg-[#16211f] rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/account"
                  className="block px-4 py-2 text-gray-100 hover:bg-[#16211f] rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  My Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-white hover:bg-[#16211f] rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-white hover:bg-[#16211f] rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 text-white hover:bg-[#16211f] rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
