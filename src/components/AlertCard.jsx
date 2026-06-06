import React from 'react';
import { AlertCircle, AlertTriangle, Info, Clock } from 'lucide-react';

const AlertCard = ({ alert }) => {
  const { type, title, description, category, timestamp } = alert;

  const getTypeStyles = (type) => {
    switch (type) {
      case 'crítico':
        return { border: 'border-l-red-500', icon: <AlertCircle className="text-red-500" size={24} /> };
      case 'atenção':
        return { border: 'border-l-yellow-500', icon: <AlertTriangle className="text-yellow-500" size={24} /> };
      case 'informativo':
      default:
        return { border: 'border-l-blue-500', icon: <Info className="text-blue-500" size={24} /> };
    }
  };

  const styles = getTypeStyles(type);

  return (
    <div className={`bg-[var(--color-bg-secondary)] border border-[var(--color-accent)] border-l-[3px] ${styles.border} rounded-lg p-4 mb-3 shadow-md hover:bg-opacity-80 transition-colors`}>
      <div className="flex items-start gap-4">
        <div className="mt-1">
          {styles.icon}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-bold text-white text-lg">{title}</h4>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock size={12} />
              {timestamp}
            </span>
          </div>
          <p className="text-[var(--color-text-light)] text-sm mb-3">{description}</p>
          <div className="flex gap-2">
            {category.map((cat, idx) => (
              <span key={idx} className="px-2 py-1 bg-[var(--color-bg-primary)] border border-[var(--color-accent)] text-xs rounded text-[var(--color-highlight)]">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
