import React, { useState } from 'react';
import { calculatorApi } from '../utils/api.js';
import { formatCurrency } from '../utils/helpers.js';
import Alert from '../components/Alert.jsx';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const ComparisonPage = () => {
  const [formData, setFormData] = useState({
    currentAge: 30,
    retirementAge: 60,
    monthlyContribution: 10000,
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

  const handleCompare = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    try {
      const response = await calculatorApi.getScenarios(formData);
      setResult(response.data.data);
    } catch (error) {
      setAlert({
        type: 'error',
        message:
          error.response?.data?.message || 'Comparison failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const chartData = result
    ? [
        {
          name: 'Conservative (8%)',
          corpus: result.conservative.totalRetirementCorpus,
          pension: result.conservative.monthlyPension,
        },
        {
          name: 'Moderate (10%)',
          corpus: result.moderate.totalRetirementCorpus,
          pension: result.moderate.monthlyPension,
        },
        {
          name: 'Aggressive (12%)',
          corpus: result.aggressive.totalRetirementCorpus,
          pension: result.aggressive.monthlyPension,
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Scenario Comparison</h1>
        <p className="text-gray-600 mb-8">
          Compare your retirement projections across different investment
          scenarios: Conservative, Moderate, and Aggressive.
        </p>

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Input Form */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">Enter Your Details</h2>
            <form onSubmit={handleCompare} className="space-y-4">
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
                {loading ? 'Comparing...' : 'Compare Scenarios'}
              </button>
            </form>
          </div>

          {/* Scenario Info */}
          <div className="space-y-4">
            <div className="card border-l-4 border-blue-600">
              <h3 className="text-lg font-bold text-blue-600 mb-2">
                Conservative (8%)
              </h3>
              <p className="text-sm text-gray-600">
                Lower risk investment approach. Suitable for investors who prefer
                stability over high returns. Focus on government securities and
                bonds.
              </p>
            </div>

            <div className="card border-l-4 border-orange-600">
              <h3 className="text-lg font-bold text-orange-600 mb-2">
                Moderate (10%)
              </h3>
              <p className="text-sm text-gray-600">
                Balanced investment approach. Mix of equity and debt. Suitable for
                most investors with medium risk tolerance.
              </p>
            </div>

            <div className="card border-l-4 border-red-600">
              <h3 className="text-lg font-bold text-red-600 mb-2">
                Aggressive (12%)
              </h3>
              <p className="text-sm text-gray-600">
                Higher risk, higher return approach. Suitable for young investors
                with high risk tolerance and long investment horizon.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Charts */}
        {result && (
          <>
            {result.aiScenarioInsights && (
              <div className="card animate-fade-in mb-6 border border-[#A7C1A8] bg-[#EEEFE0]">
                <h2 className="text-xl font-bold mb-2 text-[#1E2A27]">AI Scenario Intelligence</h2>
                <p className="text-sm mb-3 text-[#1E2A27]">{result.aiScenarioInsights.summary}</p>
                <p className="text-sm mb-3 text-[#1E2A27]">
                  <strong>Confidence:</strong> {result.aiScenarioInsights.confidenceScore}%
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-[#1E2A27]">
                  {(result.aiScenarioInsights.insights || []).map((insight) => (
                    <li key={insight}>{insight}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="card animate-fade-in">
              <h2 className="text-2xl font-bold mb-6">Corpus Projection Comparison</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Corpus (₹)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => `₹${(value / 100000).toFixed(2)}L`} />
                  <Legend />
                  <Bar dataKey="corpus" fill="#819A91" name="Retirement Corpus" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* Detailed Comparison Table */}
        {result && (
          <div className="mt-8 card animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Detailed Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-bold text-gray-700">
                      Metric
                    </th>
                    <th className="text-left py-4 px-4 font-bold text-blue-600">
                      Conservative (8%)
                    </th>
                    <th className="text-left py-4 px-4 font-bold text-orange-600">
                      Moderate (10%)
                    </th>
                    <th className="text-left py-4 px-4 font-bold text-red-600">
                      Aggressive (12%)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">Retirement Corpus</td>
                    <td className="py-4 px-4 font-bold">
                      {formatCurrency(result.conservative.totalRetirementCorpus)}
                    </td>
                    <td className="py-4 px-4 font-bold">
                      {formatCurrency(result.moderate.totalRetirementCorpus)}
                    </td>
                    <td className="py-4 px-4 font-bold">
                      {formatCurrency(result.aggressive.totalRetirementCorpus)}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">Lump Sum (60%)</td>
                    <td className="py-4 px-4">
                      {formatCurrency(result.conservative.lumpSum)}
                    </td>
                    <td className="py-4 px-4">
                      {formatCurrency(result.moderate.lumpSum)}
                    </td>
                    <td className="py-4 px-4">
                      {formatCurrency(result.aggressive.lumpSum)}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">Monthly Pension (40%)</td>
                    <td className="py-4 px-4 font-bold text-green-600">
                      {formatCurrency(result.conservative.monthlyPension)}
                    </td>
                    <td className="py-4 px-4 font-bold text-green-600">
                      {formatCurrency(result.moderate.monthlyPension)}
                    </td>
                    <td className="py-4 px-4 font-bold text-green-600">
                      {formatCurrency(result.aggressive.monthlyPension)}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-4 px-4">Annual Pension</td>
                    <td className="py-4 px-4">
                      {formatCurrency(result.conservative.annualPension)}
                    </td>
                    <td className="py-4 px-4">
                      {formatCurrency(result.moderate.annualPension)}
                    </td>
                    <td className="py-4 px-4">
                      {formatCurrency(result.aggressive.annualPension)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonPage;
