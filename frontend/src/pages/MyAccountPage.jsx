import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiUser, FiHash, FiLogOut, FiPhone, FiMapPin, FiBriefcase, FiCalendar } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext.jsx';
import { userApi } from '../utils/api.js';
import Alert from '../components/Alert.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const MyAccountPage = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await userApi.getProfile();
        setProfile(response?.data?.data || user);
      } catch {
        setProfile(user);
        setAlert({
          type: 'warning',
          message: 'Unable to fetch latest profile details. Showing saved account data.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, navigate, user]);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="card">
          <h1 className="text-3xl font-bold mb-2">My Account</h1>
          <p className="text-gray-600 mb-6">Manage your account information.</p>

          {alert && (
            <div className="mb-6">
              <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 bg-white">
              <FiUser className="mt-0.5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-semibold">{profile?.name || 'Not available'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 bg-white">
              <FiMail className="mt-0.5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-semibold break-all">{profile?.email || 'Not available'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 bg-white">
              <FiPhone className="mt-0.5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="font-semibold break-all">{profile?.phone || 'Not available'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 bg-white">
              <FiUser className="mt-0.5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-semibold">{profile?.gender || 'Not available'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 bg-white">
              <FiCalendar className="mt-0.5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-semibold">{profile?.dateOfBirth || 'Not available'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 bg-white">
              <FiMapPin className="mt-0.5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">City</p>
                <p className="font-semibold">{profile?.city || 'Not available'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 bg-white">
              <FiBriefcase className="mt-0.5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Occupation</p>
                <p className="font-semibold">{profile?.occupation || 'Not available'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 bg-white">
              <FiHash className="mt-0.5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">User ID</p>
                <p className="font-semibold break-all">{profile?.id || 'Not available'}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-2 inline-flex items-center gap-2 btn btn-primary"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountPage;
