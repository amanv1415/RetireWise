import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1E2A27] text-[#EEEFE0] mt-8 border-t border-[#16211f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
          {/* About */}
          <div>
            <h3 className="text-white font-bold mb-2">About RetireWise</h3>
            <p className="text-xs sm:text-sm text-[#D1D8BE] leading-snug">
              Your trusted companion for retirement planning under the National
              Pension System (NPS).
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-2">Quick Links</h3>
            <ul className="space-y-1 text-xs sm:text-sm leading-snug">
              <li>
                <Link to="/" className="text-[#D1D8BE] hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="text-[#D1D8BE] hover:text-white transition">
                  Calculator
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-[#D1D8BE] hover:text-white transition">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#D1D8BE] hover:text-white transition">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-bold mb-2">Resources</h3>
            <ul className="space-y-1 text-xs sm:text-sm leading-snug">
              <li>
                <a href="#" className="text-[#D1D8BE] hover:text-white transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-[#D1D8BE] hover:text-white transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="mailto:info@npsplanner.com" className="text-[#D1D8BE] hover:text-white transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-[#D1D8BE] hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-2">Contact</h3>
            <p className="text-xs sm:text-sm text-[#D1D8BE] leading-snug">
              Email: info@npsplanner.com
              <br />
              Phone: +91-XXXX-XXXX-XX
              <br />
              Hours: 9 AM - 6 PM IST
            </p>
          </div>
        </div>

        <div className="border-t border-[#33443f] pt-3">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm">
            <p className="text-[#D1D8BE]">
              © {currentYear} RetireWise. Built for better retirement planning.
            </p>
            <div className="flex gap-3 mt-1.5 md:mt-0">
              <a href="#" className="text-[#D1D8BE] hover:text-white transition">
                Terms of Service
              </a>
              <a href="#" className="text-[#D1D8BE] hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className="text-[#D1D8BE] hover:text-white transition">
                Disclaimer
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
