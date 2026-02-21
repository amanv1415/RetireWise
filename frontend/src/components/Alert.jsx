import React from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX } from 'react-icons/fi';

const Alert = ({ type = 'info', message, onClose, dismissible = true }) => {
  const normalizedMessage = (() => {
    if (message === null || message === undefined) {
      return 'Something went wrong';
    }

    if (typeof message === 'string') {
      return message;
    }

    if (Array.isArray(message)) {
      return message
        .map((item) => (typeof item === 'string' ? item : JSON.stringify(item)))
        .join(', ');
    }

    if (typeof message === 'object') {
      return message.message || JSON.stringify(message);
    }

    return String(message);
  })();

  const alertStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const iconMap = {
    success: <FiCheckCircle className="text-lg" />,
    error: <FiAlertCircle className="text-lg" />,
    warning: <FiAlertCircle className="text-lg" />,
    info: <FiInfo className="text-lg" />,
  };

  return (
    <div
      className={`flex items-center gap-3 p-4 border rounded-lg ${alertStyles[type]} animate-fade-in`}
    >
      <span className="flex-shrink-0">{iconMap[type]}</span>
      <span className="flex-1">{normalizedMessage}</span>
      {dismissible && (
        <button
          onClick={onClose}
          className="flex-shrink-0 hover:opacity-70 transition"
        >
          <FiX />
        </button>
      )}
    </div>
  );
};

export default Alert;
