import React from 'react';

const MetricCard = ({ title, value, icon, trend }) => {
  return (
    <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-accent)] rounded-xl p-5 flex items-start justify-between shadow-lg">
      <div>
        <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
        {trend && (
          <p className={`text-xs mt-2 ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {trend.value} {trend.label}
          </p>
        )}
      </div>
      <div className="p-3 bg-[var(--color-bg-primary)] rounded-lg text-[var(--color-highlight)]">
        {icon}
      </div>
    </div>
  );
};

export default MetricCard;
