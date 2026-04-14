import React from 'react';

export const Card = ({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`bg-white rounded-3xl shadow-soft border border-white/40 overflow-hidden ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`px-6 py-5 flex flex-col space-y-1.5 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ className = '', children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h3 className={`font-semibold text-lg leading-none tracking-tight text-text-slate ${className}`} {...props}>
      {children}
    </h3>
  );
};

export const CardContent = ({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`px-6 pb-6 ${className}`} {...props}>
      {children}
    </div>
  );
};
