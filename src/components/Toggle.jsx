import React from 'react';

const Toggle = ({ label, checked, onChange, disabled = false }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-[var(--color-text-light)] text-sm">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-highlight)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg-primary)] ${
          checked ? 'bg-[var(--color-highlight)]' : 'bg-gray-600'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

export default Toggle;
