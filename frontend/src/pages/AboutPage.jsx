import React from 'react';
import { FiTarget, FiTrendingUp, FiShield, FiAward, FiCpu } from 'react-icons/fi';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">About RetireWise</h1>
          <p className="text-xl text-blue-100">
            Your trusted companion for National Pension System (NPS) retirement
            planning and financial forecasting.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Our Mission</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                RetireWise is dedicated to empowering individuals to
                take control of their financial future. We provide simplified,
                accurate tools for retirement planning under India's National
                Pension System (NPS).
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Our mission is to make retirement planning accessible to everyone,
                regardless of their financial literacy level. We believe that
                proper planning today leads to financial security tomorrow.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                By providing advanced analytics and intuitive tools, we help you
                make informed decisions about your retirement savings and pension
                requirements.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <FiTarget className="text-6xl text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3">What We Believe</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Everyone deserves a secure retirement</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Financial planning should be simple and transparent</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Data privacy and security are paramount</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Informed decisions lead to better outcomes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Why Choose Us?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <FiAward className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Accurate Calculations</h3>
              <p className="text-gray-600">
                Advanced financial formulas for precise retirement corpus
                estimation and pension calculations.
              </p>
            </div>

            <div className="text-center">
              <FiShield className="text-4xl text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your data is encrypted and never shared. We prioritize your
                privacy above all else.
              </p>
            </div>

            <div className="text-center">
              <FiTrendingUp className="text-4xl text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Scenario Planning</h3>
              <p className="text-gray-600">
                Compare multiple investment scenarios to find the best strategy
                for your needs.
              </p>
            </div>

            <div className="text-center">
              <FiTarget className="text-4xl text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Easy to Use</h3>
              <p className="text-gray-600">
                Intuitive interface designed for everyone, regardless of financial
                background.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Prediction */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">AI Prediction</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center gap-3 mb-4">
                <FiCpu className="text-3xl text-blue-600" />
                <h3 className="text-2xl font-bold">How RetireWise AI Helps</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                RetireWise uses an AI-based prediction layer to enrich your retirement calculations
                with confidence scoring, risk-level analysis, and projection ranges.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Instead of a single number, AI gives you cautious, realistic, and optimistic
                outcomes so you can plan with better visibility.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-4">What You Get</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>AI confidence score for each prediction</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Risk-level insights based on your inputs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Projection bands for corpus and monthly pension</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Actionable recommendations to improve retirement outcomes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About NPS */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Understanding NPS</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-lg text-gray-700 mb-4">
              The National Pension System (NPS) is India's government-backed
              pension scheme designed to provide financial security during
              retirement. It offers individuals the flexibility to choose their
              investment strategy and corpus allocation.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Key features of NPS:
            </p>
            <ul className="grid md:grid-cols-2 gap-4 mb-4">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span className="text-gray-700">
                  Tax benefits on contributions and corpus
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span className="text-gray-700">
                  Low-cost and transparent fee structure
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span className="text-gray-700">
                  Flexibility in fund selection (equity, debt, government
                  securities)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span className="text-gray-700">
                  Option to withdraw up to 50% of corpus before retirement
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span className="text-gray-700">
                  Choice of annuity provider for pension
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span className="text-gray-700">
                  Portability across employment sectors
                </span>
              </li>
            </ul>
            <p className="text-gray-700">
              Our tool helps you maximize your NPS benefits by providing
              comprehensive planning and projection capabilities.
            </p>
          </div>
        </div>
      </section>

      {/* Team/Contact */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Get in Touch</h2>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto text-center">
            <p className="text-lg text-gray-700 mb-6">
              Have questions or suggestions? We'd love to hear from you!
            </p>
            <div className="space-y-4">
              <p>
                <strong>Email:</strong> info@npsplanner.com
              </p>
              <p>
                <strong>Phone:</strong> +91-XXXX-XXXX-XX
              </p>
              <p>
                <strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM IST
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
