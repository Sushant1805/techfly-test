import React from 'react';

interface CustomerAvatarProps {
  name: string;
  initials: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const CustomerAvatar = ({ name, initials, size = 'md', className = '' }: CustomerAvatarProps) => {
  const getAvatarColor = (name: string) => {
    const firstChar = name.charAt(0).toUpperCase();
    if (firstChar >= 'A' && firstChar <= 'E') return 'bg-purple-100 text-purple-700 border-purple-200';
    if (firstChar >= 'F' && firstChar <= 'J') return 'bg-blue-100 text-blue-700 border-blue-200';
    if (firstChar >= 'K' && firstChar <= 'O') return 'bg-green-100 text-green-700 border-green-200';
    if (firstChar >= 'P' && firstChar <= 'T') return 'bg-orange-100 text-orange-700 border-orange-200';
    return 'bg-teal-100 text-teal-700 border-teal-200';
  };

  const sizeClasses: Record<string, string> = {
    xs: 'w-5 h-5 text-[8px]',
    sm: 'w-6 h-6 text-[10px]',
    md: 'w-9 h-9 text-xs',
    lg: 'w-12 h-12 text-sm',
    xl: 'w-14 h-14 text-base',
  };

  return (
    <div className={`flex items-center justify-center font-black rounded-full border shrink-0 ${getAvatarColor(name)} ${sizeClasses[size]} ${className}`}>
      {initials}
    </div>
  );
};
