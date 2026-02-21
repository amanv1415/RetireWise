import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

const StatCard = ({ icon, label, value, change, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="card cursor-pointer hover:scale-105 transform transition"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p className="text-xs text-green-600 mt-2">
              {change > 0 ? '+' : ''}{change}%
            </p>
          )}
        </div>
        <div className="text-3xl text-blue-600 opacity-20">{icon}</div>
      </div>
      <div className="flex items-center gap-1 text-blue-600 text-sm mt-4 hover:gap-2 transition">
        View Details
        <FiArrowRight />
      </div>
    </div>
  );
};

export default StatCard;
