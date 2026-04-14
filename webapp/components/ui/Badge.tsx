import React from 'react';

type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'Active' | 'Pending' | 'Paid' | 'Inactive' | 'Trial' | 'Partial' | 'default' | 'secondary' | 'destructive' | 'On Leave' | 'success' | 'warning' | 'info' | 'danger' | 'purple';
};

export const Badge = ({ className = '', variant = 'default', children, ...props }: BadgeProps) => {
  const variants: Record<string, string> = {
    Active: "bg-green-50 text-green-600 border border-green-100",
    Paid: "bg-green-50 text-green-600 border border-green-100",
    success: "bg-green-50 text-green-600 border border-green-100",
    Pending: "bg-orange-50 text-orange-600 border border-orange-100",
    Trial: "bg-orange-50 text-orange-600 border border-orange-100",
    Partial: "bg-orange-50 text-orange-600 border border-orange-100",
    warning: "bg-yellow-50 text-yellow-600 border border-yellow-100",
    'On Leave': "bg-yellow-50 text-yellow-600 border border-yellow-100",
    Inactive: "bg-red-50 text-red-600 border border-red-100",
    destructive: "bg-red-100 text-red-700 border border-red-200",
    danger: "bg-red-50 text-red-600 border border-red-100",
    secondary: "bg-purple-50 text-purple-700 border border-purple-100",
    purple: "bg-purple-50 text-purple-700 border border-purple-100",
    info: "bg-blue-50 text-blue-600 border border-blue-100",
    default: "bg-gray-50 text-gray-500 border border-gray-100"
  };

  const selectedVariant = variants[variant] || variants.default;

  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${selectedVariant} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
