import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-gray-50">
      <div className="max-w-lg w-full text-center card">
        <p className="text-sm font-semibold text-blue-600 mb-2">404 Error</p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Page not found</h1>
        <p className="text-gray-600 mb-6">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>
        <Link to="/" className="btn btn-primary inline-flex">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
