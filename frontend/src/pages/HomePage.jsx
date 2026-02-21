import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiTarget,
  FiTrendingUp,
  FiShield,
  FiBarChart2,
  FiArrowRight,
  FiCheckCircle,
  FiUser,
  FiEdit3,
  FiCompass,
} from 'react-icons/fi';
import retirewiseLogo from '../assets/retirewise-logo.png';

const HomePage = () => {
  const highlights = [
    'Trusted retirement projections',
    'Scenario-based planning',
    'Clean and secure experience',
  ];

  const features = [
    {
      icon: <FiTarget className="text-3xl text-[#1E2A27]" />,
      title: 'Accurate Forecasting',
      description:
        'Precise retirement corpus calculations based on your contribution patterns and expected returns.',
    },
    {
      icon: <FiTrendingUp className="text-3xl text-[#1E2A27]" />,
      title: 'Scenario Planning',
      description:
        'Compare conservative, moderate, and aggressive investment outcomes for smarter decisions.',
    },
    {
      icon: <FiShield className="text-3xl text-[#1E2A27]" />,
      title: 'Secure & Private',
      description:
        'Your data remains encrypted and protected. Information is never shared with third parties.',
    },
    {
      icon: <FiBarChart2 className="text-3xl text-[#1E2A27]" />,
      title: 'Visual Analytics',
      description:
        'Interactive charts make long-term retirement projections easy to understand and compare.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#EEEFE0]">
      <section className="px-4 pt-10 pb-14 sm:pt-14 sm:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="animate-slide-in-left">
              <span className="inline-flex items-center rounded-full bg-[#D1D8BE] px-4 py-1.5 text-sm font-semibold text-[#1E2A27] mb-5">
                Retirement Planning Simplified
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-[#1E2A27] mb-5">
                Build a stronger retirement plan with confidence
              </h1>
              <p className="text-lg sm:text-xl text-[#1E2A27] mb-8 max-w-2xl">
                Estimate your NPS retirement corpus, understand pension outcomes,
                and compare investment scenarios in one clear, reliable dashboard.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link
                  to="/calculator"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-[#A7C1A8] text-[#16211f] font-semibold border border-[#1E2A27]/20 hover:bg-[#D1D8BE] transition"
                >
                  Start Planning <FiArrowRight />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-7 py-3 rounded-lg border border-[#1E2A27] text-[#1E2A27] font-semibold hover:bg-[#D1D8BE] transition"
                >
                  Learn More
                </Link>
              </div>

              <div className="space-y-2">
                {highlights.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-[#1E2A27]">
                    <FiCheckCircle className="text-[#1E2A27]" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-slide-in-right">
              <div className="relative rounded-2xl bg-white border border-[#D1D8BE] shadow-card p-7 sm:p-8">
                <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-[#D1D8BE] opacity-60" />
                <div className="relative space-y-6">
                  <div className="rounded-xl bg-[#EEEFE0] p-4 border border-[#D1D8BE] flex items-center justify-center">
                    <img
                      src={retirewiseLogo}
                      alt="RetireWise"
                      className="h-20 sm:h-24 w-auto object-contain"
                    />
                  </div>

                  <div className="rounded-xl bg-[#EEEFE0] p-5 border border-[#D1D8BE]">
                    <p className="text-sm font-semibold text-[#1E2A27] mb-3">Estimated Retirement Corpus</p>
                    <p className="text-3xl font-bold text-[#1E2A27]">₹2.84 Cr</p>
                    <p className="text-sm mt-2 text-[#1E2A27]">Based on your contribution plan</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-[#EEEFE0] p-4 border border-[#D1D8BE]">
                      <p className="text-sm text-[#1E2A27]">Monthly Pension</p>
                      <p className="text-xl font-bold text-[#1E2A27] mt-1">₹84,500</p>
                    </div>
                    <div className="rounded-xl bg-[#EEEFE0] p-4 border border-[#D1D8BE]">
                      <p className="text-sm text-[#1E2A27]">Lump Sum</p>
                      <p className="text-xl font-bold text-[#1E2A27] mt-1">₹1.14 Cr</p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#D1D8BE] border border-[#A7C1A8] p-4">
                    <p className="text-sm text-[#1E2A27]">Plan Health</p>
                    <p className="text-xl font-semibold mt-1 text-[#1E2A27]">On track for early retirement goals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-[#D1D8BE]/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-[#1E2A27]">
            Why Choose RetireWise?
          </h2>
          <p className="text-center text-[#1E2A27] mb-10 max-w-2xl mx-auto">
            Everything you need to calculate, compare, and optimize your retirement strategy.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl bg-white border border-[#D1D8BE] p-6 shadow-card hover:shadow-md transition"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-[#1E2A27]">{feature.title}</h3>
                <p className="text-[#1E2A27] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-[#EEEFE0]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-[#1E2A27]">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl bg-white border border-[#D1D8BE] p-6 text-center shadow-card">
              <div className="w-12 h-12 rounded-full bg-[#D1D8BE] flex items-center justify-center mx-auto mb-4">
                <FiUser className="text-[#1E2A27] text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#1E2A27]">Enter Your Details</h3>
              <p className="text-[#1E2A27]">
                Add your current age, retirement target, monthly contribution, and expected returns.
              </p>
            </div>

            <div className="rounded-xl bg-white border border-[#D1D8BE] p-6 text-center shadow-card">
              <div className="w-12 h-12 rounded-full bg-[#D1D8BE] flex items-center justify-center mx-auto mb-4">
                <FiEdit3 className="text-[#1E2A27] text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#1E2A27]">Get Calculations</h3>
              <p className="text-[#1E2A27]">
                Instantly view corpus estimates, lump sum projections, and expected monthly pension.
              </p>
            </div>

            <div className="rounded-xl bg-white border border-[#D1D8BE] p-6 text-center shadow-card">
              <div className="w-12 h-12 rounded-full bg-[#D1D8BE] flex items-center justify-center mx-auto mb-4">
                <FiCompass className="text-[#1E2A27] text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#1E2A27]">Plan Ahead</h3>
              <p className="text-[#1E2A27]">
                Compare scenarios, track progress, and refine your strategy as your goals evolve.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto rounded-2xl bg-gradient-to-br from-[#D1D8BE] to-[#EEEFE0] border border-[#A7C1A8] text-center p-8 sm:p-10 shadow-lg">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#1E2A27]">Ready to Plan Your Retirement?</h2>
          <p className="text-lg sm:text-xl mb-8 text-[#1E2A27]">
            Use our free calculator to build a clear retirement roadmap and make better financial decisions today.
          </p>
          <Link
            to="/calculator"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#A7C1A8] text-[#16211f] font-semibold rounded-lg border border-[#1E2A27]/20 hover:bg-[#D1D8BE] transition shadow-md hover:shadow-lg"
          >
            Get Started Now <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
