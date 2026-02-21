import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { calculatorApi } from '../utils/api.js';
import { formatCurrency, formatDate } from '../utils/helpers.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import Alert from '../components/Alert.jsx';
import StatCard from '../components/StatCard.jsx';
import { FiDownload, FiSearch, FiTrash2 } from 'react-icons/fi';

const DashboardPage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [forecasts, setForecasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const normalizeForecast = (forecast, index = 0) => ({
    id: String(forecast?.id || forecast?._id || `forecast-${index}`),
    forecastName: String(forecast?.forecastName || 'Untitled Forecast'),
    createdAt: forecast?.createdAt || null,
    totalRetirementCorpus: Number(forecast?.totalRetirementCorpus || 0),
    monthlyPension: Number(
      forecast?.monthlyPension ||
      forecast?.pensionAmount ||
      0
    ),
  });

  const safeFormatDate = (dateValue) => {
    if (!dateValue) {
      return 'N/A';
    }

    const parsedDate = new Date(dateValue);
    if (Number.isNaN(parsedDate.getTime())) {
      return 'N/A';
    }

    return formatDate(dateValue);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    fetchForecasts();
  }, [isAuthenticated]);

  const fetchForecasts = async () => {
    try {
      const response = await calculatorApi.getUserForecasts();
      const payload = response?.data?.data;
      setForecasts(
        Array.isArray(payload)
          ? payload.map((forecast, index) => normalizeForecast(forecast, index))
          : []
      );
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Failed to load forecasts',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (forecastId) => {
    if (!window.confirm('Are you sure you want to delete this forecast?')) {
      return;
    }

    try {
      await calculatorApi.deleteForecast(forecastId);
      setForecasts((prev) => prev.filter((f) => String(f?.id) !== String(forecastId)));
      setAlert({
        type: 'success',
        message: 'Forecast deleted successfully',
      });
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Failed to delete forecast',
      });
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const safeForecasts = Array.isArray(forecasts) ? forecasts : [];

  const stats = {
    totalForecasts: safeForecasts.length,
    averageCorpus:
      safeForecasts.reduce((acc, f) => acc + Number(f?.totalRetirementCorpus || 0), 0) /
      (safeForecasts.length || 1),
    averagePension:
      safeForecasts.reduce((acc, f) => acc + Number(f?.monthlyPension || 0), 0) /
      (safeForecasts.length || 1),
  };

  const aiDashboardInsight = (() => {
    if (safeForecasts.length < 2) {
      return {
        confidence: 62,
        summary: 'Add more forecasts to unlock stronger AI trend analysis for your retirement planning progress.',
        trend: 'Insufficient data',
      };
    }

    const sortedByDate = [...safeForecasts].sort((a, b) => {
      const aTime = Date.parse(a?.createdAt || 0) || 0;
      const bTime = Date.parse(b?.createdAt || 0) || 0;
      return aTime - bTime;
    });

    const firstCorpus = Number(sortedByDate[0]?.totalRetirementCorpus || 0);
    const lastCorpus = Number(sortedByDate[sortedByDate.length - 1]?.totalRetirementCorpus || 0);
    const changePct = firstCorpus > 0 ? ((lastCorpus - firstCorpus) / firstCorpus) * 100 : 0;

    const trend = changePct > 5 ? 'Improving' : changePct < -5 ? 'Declining' : 'Stable';

    return {
      confidence: Math.max(65, Math.min(93, 60 + safeForecasts.length * 4)),
      trend,
      summary:
        trend === 'Improving'
          ? `Your latest forecasts show a positive corpus trend of ${changePct.toFixed(1)}%. Keep your current strategy and review annually.`
          : trend === 'Declining'
            ? `Your latest forecasts show a decline of ${Math.abs(changePct).toFixed(1)}%. Consider increasing monthly contributions or retirement horizon.`
            : 'Your forecast trend is stable. A small annual contribution step-up may improve long-term outcomes.',
    };
  })();

  const normalizedSearch = String(searchTerm || '').trim().toLowerCase();

  const filteredForecasts = [...safeForecasts]
    .filter((forecast) => {
      if (!normalizedSearch) {
        return true;
      }

      return String(forecast?.forecastName || '')
        .toLowerCase()
        .includes(normalizedSearch);
    })
    .sort((a, b) => {
      const aTime = Date.parse(a?.createdAt || 0) || 0;
      const bTime = Date.parse(b?.createdAt || 0) || 0;

      if (sortBy === 'oldest') {
        return aTime - bTime;
      }

      if (sortBy === 'corpus-high') {
        return Number(b?.totalRetirementCorpus || 0) - Number(a?.totalRetirementCorpus || 0);
      }

      if (sortBy === 'corpus-low') {
        return Number(a?.totalRetirementCorpus || 0) - Number(b?.totalRetirementCorpus || 0);
      }

      return bTime - aTime;
    });

  const handleExport = () => {
    if (filteredForecasts.length === 0) {
      setAlert({
        type: 'warning',
        message: 'No forecast data available to export',
      });
      return;
    }

    const header = ['Name', 'Created On', 'Retirement Corpus', 'Monthly Pension'];
    const rows = filteredForecasts.map((forecast) => [
      forecast.forecastName,
      safeFormatDate(forecast.createdAt),
      Math.round(Number(forecast?.totalRetirementCorpus || 0)),
      Math.round(Number(forecast?.monthlyPension || 0)),
    ]);

    const csvContent = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nps-forecasts-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome, {user?.name}!</h1>
          <p className="text-gray-600">
            Manage your retirement forecasts and projections.
          </p>
        </div>

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <StatCard
            label="Total Forecasts"
            value={stats.totalForecasts}
            icon="📊"
          />
          <StatCard
            label="Avg. Retirement Corpus"
            value={formatCurrency(stats.averageCorpus)}
            icon="💰"
          />
          <StatCard
            label="Avg. Monthly Pension"
            value={formatCurrency(stats.averagePension)}
            icon="📈"
          />
        </div>

        <div className="card mb-8 border border-[#A7C1A8] bg-[#EEEFE0]">
          <h2 className="text-xl font-bold mb-2 text-[#1E2A27]">AI Portfolio Insight</h2>
          <p className="text-sm text-[#1E2A27] mb-2">{aiDashboardInsight.summary}</p>
          <p className="text-sm text-[#1E2A27]"><strong>Trend:</strong> {aiDashboardInsight.trend}</p>
          <p className="text-sm text-[#1E2A27]"><strong>Confidence:</strong> {aiDashboardInsight.confidence}%</p>
        </div>

        {/* Forecasts Table */}
        <div className="card">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold">Your Forecasts</h2>
            <button
              type="button"
              onClick={handleExport}
              className="btn btn-secondary inline-flex items-center gap-2"
            >
              <FiDownload /> Export CSV
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <label className="relative block">
              <span className="sr-only">Search forecast by name</span>
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search forecast by name"
                className="input-field pl-10"
              />
            </label>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field"
            >
              <option value="newest">Sort: Newest first</option>
              <option value="oldest">Sort: Oldest first</option>
              <option value="corpus-high">Sort: Highest corpus</option>
              <option value="corpus-low">Sort: Lowest corpus</option>
            </select>
          </div>

          {filteredForecasts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">
                {forecasts.length === 0
                  ? 'No forecasts yet. Start by creating a new forecast.'
                  : 'No forecast matched your search. Try a different keyword.'}
              </p>
              <button
                onClick={() => navigate('/calculator')}
                className="btn btn-primary"
              >
                Create Forecast
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-bold text-gray-700">
                      Name
                    </th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700">
                      Created
                    </th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700">
                      Retirement Corpus
                    </th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700">
                      Monthly Pension
                    </th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredForecasts.map((forecast) => (
                    <tr
                      key={forecast.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="py-4 px-4 font-medium">
                        {forecast.forecastName}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {safeFormatDate(forecast.createdAt)}
                      </td>
                      <td className="py-4 px-4 font-bold text-blue-600">
                        {formatCurrency(Number(forecast.totalRetirementCorpus || 0))}
                      </td>
                      <td className="py-4 px-4 font-bold text-green-600">
                        {formatCurrency(Number(forecast.monthlyPension || 0))}
                      </td>
                      <td className="py-4 px-4 flex gap-2">
                        <button
                          onClick={() => handleDelete(forecast.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete forecast"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
