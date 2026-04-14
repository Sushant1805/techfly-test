import React from 'react';

type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'Active' | 'Pending' | 'Paid' | 'Inactive' | 'Trial' | 'Partial' | 'default' | 'success' | 'warning' | 'info' | 'danger' | 'purple' | 'Warning';
  dot?: boolean;
  icon?: string;
};

export const Badge = ({ className = '', variant = 'default', dot, icon, children, ...props }: BadgeProps) => {
  const variants: Record<string, string> = {
    Active: "bg-green-50 text-green-600 border border-green-100/50",
    Paid: "bg-green-50 text-green-600 border border-green-100/50",
    success: "bg-green-50 text-green-600 border border-green-100/50",
    Pending: "bg-orange-50 text-orange-600 border border-orange-100/50",
    Trial: "bg-orange-50 text-orange-600 border border-orange-100/50",
    Partial: "bg-orange-50 text-orange-600 border border-orange-100/50",
    warning: "bg-yellow-50 text-yellow-600 border border-yellow-100/50",
    Warning: "bg-yellow-50 text-yellow-600 border border-yellow-100/50",
    Inactive: "bg-red-50 text-red-600 border border-red-100/50",
    danger: "bg-red-50 text-red-600 border border-red-100/50",
    purple: "bg-purple-50 text-purple-700 border border-purple-100/50",
    info: "bg-blue-50 text-blue-600 border border-blue-100/50",
    default: "bg-slate-soft text-gray-500 border border-gray-100/50"
  };

  const selectedVariant = variants[variant] || variants.default;

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${selectedVariant} ${className}`}
      {...props}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />}
      {icon && <span>{icon}</span>}
      {children}
    </div>
  );
};
