'use client';
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, showLabel = true, className = "" }) => {
  const percentage = total === 0 ? 0 : Math.round((current / total) * 100);
  
  let fillColor = "bg-red-500";
  if (percentage >= 80) fillColor = "bg-green-500";
  else if (percentage >= 50) fillColor = "bg-amber-500";

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5 text-xs font-medium text-gray-600">
          <span>{current} / {total} submitted</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 ${fillColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
