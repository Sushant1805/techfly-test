import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`flex h-11 w-full rounded-2xl border border-gray-100 bg-white px-4 py-2 text-sm font-medium text-text-slate placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue/30 shadow-sm transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
            error ? 'border-red-400 focus:ring-red-100 focus:border-red-400' : 'hover:border-brand-blue/20'
          } ${className}`}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-500">{error}</span>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
