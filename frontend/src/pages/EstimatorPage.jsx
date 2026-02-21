import React, { useState } from 'react';
import { calculatorApi } from '../utils/api.js';
import { formatCurrency } from '../utils/helpers.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import Alert from '../components/Alert.jsx';
import { FiTrendingUp, FiSliders, FiTarget } from 'react-icons/fi';

const EstimatorPage = () => {
  const [formData, setFormData] = useState({
    desiredMonthlyPension: 50000,
    currentAge: 30,
    retirementAge: 60,
    expectedReturn: 10,
    annuityReturn: 8,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleEstimate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    try {
      const response = await calculatorApi.estimate(formData);
      setResult(response.data.data);
    } catch (error) {
      setAlert({
        type: 'error',
        message:
          error.response?.data?.message || 'Estimation failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEEFE0] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-2xl bg-gradient-to-br from-[#D1D8BE] to-[#EEEFE0] border border-[#A7C1A8] p-6 sm:p-8 mb-8">
          <h1 className="text-4xl font-bold mb-3 text-[#1E2A27]">Contribution Estimator</h1>
          <p className="text-[#1E2A27] text-lg max-w-3xl">
            Find out how much you need to invest each month to achieve your target pension with AI-assisted guidance.
          </p>
          <div className="mt-5 grid sm:grid-cols-3 gap-3">
            <div className="bg-white rounded-lg border border-[#D1D8BE] p-3 flex items-center gap-2">
              <FiTarget className="text-[#1E2A27]" />
              <span className="text-sm font-medium text-[#1E2A27]">Goal-based planning</span>
            </div>
            <div className="bg-white rounded-lg border border-[#D1D8BE] p-3 flex items-center gap-2">
              <FiTrendingUp className="text-[#1E2A27]" />
              <span className="text-sm font-medium text-[#1E2A27]">Projection insights</span>
            </div>
            <div className="bg-white rounded-lg border border-[#D1D8BE] p-3 flex items-center gap-2">
              <FiSliders className="text-[#1E2A27]" />
              <span className="text-sm font-medium text-[#1E2A27]">Flexible assumptions</span>
            </div>
          </div>
        </div>

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="card border border-[#D1D8BE]">
            <h2 className="text-2xl font-bold mb-2 text-[#1E2A27]">Your Parameters</h2>
            <p className="text-sm text-[#1E2A27] mb-5">Adjust values to estimate the monthly contribution needed.</p>
            <form onSubmit={handleEstimate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Desired Monthly Pension (₹)
                </label>
                <input
                  type="number"
                  name="desiredMonthlyPension"
                  value={formData.desiredMonthlyPension}
                  onChange={handleInputChange}
                  min="0"
                  className="input-field"
                />
                <p className="text-xs text-gray-500 mt-1">
                  The monthly amount you want after retirement
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Age
                </label>
                <input
                  type="number"
                  name="currentAge"
                  value={formData.currentAge}
                  onChange={handleInputChange}
                  min="18"
                  max="75"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Retirement Age
                </label>
                <input
                  type="number"
                  name="retirementAge"
                  value={formData.retirementAge}
                  onChange={handleInputChange}
                  min="30"
                  max="80"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expected Annual Return (%)
                </label>
                <input
                  type="number"
                  name="expectedReturn"
                  value={formData.expectedReturn}
                  onChange={handleInputChange}
                  min="0"
                  max="30"
                  step="0.5"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Annuity Return (%)
                </label>
                <input
                  type="number"
                  name="annuityReturn"
                  value={formData.annuityReturn}
                  onChange={handleInputChange}
                  min="0"
                  max="30"
                  step="0.5"
                  className="input-field"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#A7C1A8] text-[#16211f] font-semibold border border-[#1E2A27]/20 hover:bg-[#D1D8BE] transition disabled:opacity-50"
              >
                {loading ? 'Estimating...' : 'Estimate Contribution'}
              </button>
            </form>
          </div>

          {/* Results */}
          {result && !loading && (
            <div className="space-y-4 animate-fade-in">
              <div className="card bg-gradient-to-br from-[#D1D8BE] to-[#EEEFE0] border border-[#A7C1A8]">
                <h3 className="text-lg font-bold text-[#1E2A27] mb-3">
                  Your Required Monthly Contribution
                </h3>
                <p className="text-5xl font-bold text-[#1E2A27]">
                  {formatCurrency(result.requiredMonthlyContribution)}
                </p>
                <p className="text-sm text-[#1E2A27] mt-4">
                  This is the monthly amount you should contribute to achieve
                  your desired pension of {formatCurrency(
                    result.desiredMonthlyPension
                  )}
                </p>
              </div>

              <div className="card border border-[#D1D8BE]">
                <h3 className="text-sm font-bold text-[#1E2A27] mb-3">
                  Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#1E2A27]">Desired Monthly Pension:</span>
                    <span className="font-bold">
                      {formatCurrency(result.desiredMonthlyPension)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1E2A27]">Years to Retirement:</span>
                    <span className="font-bold">
                      {formData.retirementAge - formData.currentAge} years
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1E2A27]">Expected Return:</span>
                    <span className="font-bold">{formData.expectedReturn}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1E2A27]">Annuity Return:</span>
                    <span className="font-bold">{formData.annuityReturn}%</span>
                  </div>
                </div>
              </div>

              <div className="card bg-[#EEEFE0] border border-[#D1D8BE]">
                <p className="text-sm text-[#1E2A27]">
                  💡 <strong>Tip:</strong> Try adjusting your expected return or
                  retirement age to see how it affects the required contribution.
                </p>
              </div>

              {result.aiContributionInsights && (
                <div className="card border border-[#A7C1A8] bg-[#EEEFE0]">
                  <h3 className="text-lg font-bold mb-2 text-[#1E2A27]">AI Contribution Guidance</h3>
                  <p className="text-sm mb-3 text-[#1E2A27]">
                    {result.aiContributionInsights.summary}
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-center mb-3">
                    <div className="rounded-lg bg-white border border-[#D1D8BE] p-2">
                      <p className="text-xs text-[#1E2A27]">Lower</p>
                      <p className="font-semibold text-[#1E2A27]">
                        {formatCurrency(result.aiContributionInsights.recommendedContributionRange?.lower || 0)}
                      </p>
                    </div>
                    <div className="rounded-lg bg-white border border-[#D1D8BE] p-2">
                      <p className="text-xs text-[#1E2A27]">Target</p>
                      <p className="font-semibold text-[#1E2A27]">
                        {formatCurrency(result.aiContributionInsights.recommendedContributionRange?.target || 0)}
                      </p>
                    </div>
                    <div className="rounded-lg bg-white border border-[#D1D8BE] p-2">
                      <p className="text-xs text-[#1E2A27]">Upper</p>
                      <p className="font-semibold text-[#1E2A27]">
                        {formatCurrency(result.aiContributionInsights.recommendedContributionRange?.upper || 0)}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-[#1E2A27]">
                    <strong>Confidence:</strong> {result.aiContributionInsights.confidenceScore}%
                  </p>
                  <p className="text-sm mt-1 text-[#1E2A27]">{result.aiContributionInsights.strategicNote}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EstimatorPage;
