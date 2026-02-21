import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculatorApi } from '../utils/api.js';
import { formatCurrency } from '../utils/helpers.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import Alert from '../components/Alert.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const CalculatorPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    currentAge: 30,
    retirementAge: 60,
    monthlyContribution: 10000,
    expectedReturn: 10,
    annuityReturn: 8,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState(null);
  const [chartData, setChartData] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleCalculate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    try {
      const response = await calculatorApi.calculate(formData);
      setResult(response.data.data);

      // Generate chart data
      const yearsToRetirement = Math.ceil(
        formData.retirementAge - formData.currentAge
      );
      const monthlyRate = formData.expectedReturn / 100 / 12;
      const data = [];

      for (let year = 0; year <= yearsToRetirement; year++) {
        const months = year * 12;
        let value = 0;

        if (monthlyRate === 0) {
          value = formData.monthlyContribution * months;
        } else {
          value =
            formData.monthlyContribution *
            (((1 + monthlyRate) ** months - 1) / monthlyRate);
        }

        data.push({
          name: formData.currentAge + year,
          corpus: Math.round(value),
        });
      }

      setChartData(data);
    } catch (error) {
      setAlert({
        type: 'error',
        message:
          error.response?.data?.message || 'Calculation failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveForecast = async () => {
    if (!result) {
      return;
    }

    if (!isAuthenticated) {
      setAlert({
        type: 'warning',
        message: 'Please login first to save forecasts.',
      });
      setTimeout(() => navigate('/login', { state: { from: { pathname: '/calculator' } } }), 800);
      return;
    }

    const defaultName = `Forecast ${new Date().toLocaleDateString('en-IN')}`;
    const forecastName = window.prompt('Enter a name for this forecast:', defaultName);

    if (!forecastName || !forecastName.trim()) {
      return;
    }

    setSaving(true);
    try {
      await calculatorApi.saveForecast({
        forecastName: forecastName.trim(),
        ...formData,
      });
      setAlert({
        type: 'success',
        message: 'Forecast saved successfully. You can view it in Dashboard.',
      });
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.message || 'Failed to save forecast',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Retirement Calculator</h1>
        <p className="text-gray-600 mb-8">
          Calculate your retirement corpus and pension based on your contributions.
        </p>

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">Enter Your Details</h2>
            <form onSubmit={handleCalculate} className="space-y-4">
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
                  Monthly Contribution (₹)
                </label>
                <input
                  type="number"
                  name="monthlyContribution"
                  value={formData.monthlyContribution}
                  onChange={handleInputChange}
                  min="0"
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
                className="w-full btn btn-primary disabled:opacity-50"
              >
                {loading ? 'Calculating...' : 'Calculate'}
              </button>

              {result && (
                <button
                  type="button"
                  onClick={handleSaveForecast}
                  disabled={saving}
                  className="w-full btn btn-secondary disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Forecast'}
                </button>
              )}
            </form>
          </div>

          {/* Results */}
          {result && !loading && (
            <div className="space-y-4 animate-fade-in">
              <div className="card">
                <h3 className="text-lg font-bold text-gray-700 mb-3">
                  Retirement Corpus
                </h3>
                <p className="text-4xl font-bold text-blue-600">
                  {formatCurrency(result.totalRetirementCorpus)}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Total amount accumulated by retirement
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="card">
                  <h3 className="text-sm font-bold text-gray-700 mb-2">
                    Lump Sum (60%)
                  </h3>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(result.lumpSum)}
                  </p>
                </div>

                <div className="card">
                  <h3 className="text-sm font-bold text-gray-700 mb-2">
                    Monthly Pension (40%)
                  </h3>
                  <p className="text-2xl font-bold text-orange-600">
                    {formatCurrency(result.monthlyPension)}
                  </p>
                </div>
              </div>

              <div className="card">
                <h3 className="text-sm font-bold text-gray-700 mb-2">
                  Annual Pension
                </h3>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(result.annualPension)}
                </p>
              </div>

              <div className="card">
                <h3 className="text-sm font-bold text-gray-700 mb-2">
                  Total Contribution
                </h3>
                <p className="text-xl font-bold text-blue-600">
                  {formatCurrency(result.totalContribution)}
                </p>
              </div>

              {result.aiPrediction && (
                <div className="card border border-[#A7C1A8] bg-[#EEEFE0]">
                  <h3 className="text-lg font-bold text-[#1E2A27] mb-2">
                    AI Prediction Insights
                  </h3>
                  <p className="text-sm mb-3 text-[#1E2A27]">
                    {result.aiPrediction.summary}
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="rounded-lg bg-white p-3 border border-[#D1D8BE]">
                      <p className="text-xs text-[#1E2A27]">Confidence</p>
                      <p className="font-bold text-[#1E2A27]">{result.aiPrediction.confidenceScore}%</p>
                    </div>
                    <div className="rounded-lg bg-white p-3 border border-[#D1D8BE]">
                      <p className="text-xs text-[#1E2A27]">Risk Level</p>
                      <p className="font-bold text-[#1E2A27]">{result.aiPrediction.riskLevel}</p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-white p-3 border border-[#D1D8BE] mb-3">
                    <p className="text-xs text-[#1E2A27] mb-1">Realistic AI Projection</p>
                    <p className="text-sm font-semibold text-[#1E2A27]">
                      Corpus: {formatCurrency(result.aiPrediction.projectionBand?.realistic?.corpus || 0)}
                    </p>
                    <p className="text-sm font-semibold text-[#1E2A27]">
                      Monthly Pension: {formatCurrency(result.aiPrediction.projectionBand?.realistic?.monthlyPension || 0)}
                    </p>
                  </div>
                  <ul className="space-y-1 text-sm text-[#1E2A27] list-disc list-inside">
                    {(result.aiPrediction.recommendedActions || []).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Growth Chart */}
        {chartData.length > 0 && (
          <div className="mt-8 card">
            <h2 className="text-2xl font-bold mb-6">Corpus Growth Projection</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" label={{ value: 'Age', position: 'insideBottomRight', offset: -5 }} />
                <YAxis label={{ value: 'Corpus (₹)', angle: -90, position: 'insideLeft' }} />
                <Tooltip
                  formatter={(value) => `₹${(value / 100000).toFixed(2)}L`}
                  labelFormatter={(label) => `Age: ${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="corpus"
                  stroke="#819A91"
                  dot={false}
                  name="Retirement Corpus"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculatorPage;
