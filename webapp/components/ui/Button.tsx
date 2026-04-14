import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost' | 'default';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  fullWidth?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', fullWidth = false, children, ...props }, ref) => {
    const baseStyle = "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-95";

    const variants: Record<string, string> = {
      primary: "bg-brand-blue text-white hover:bg-brand-blue-light shadow-soft hover:shadow-glow rounded-full",
      outline: "border-2 border-brand-blue/10 bg-white hover:bg-bg-soft text-brand-blue rounded-full",
      ghost: "bg-transparent hover:bg-bg-soft text-gray-600 hover:text-brand-blue rounded-full",
      default: "bg-white border border-gray-200 hover:bg-bg-soft text-gray-700 rounded-full shadow-sm"
    };

    const sizes: Record<string, string> = {
      sm: "h-9 px-4 text-xs tracking-wide",
      md: "h-11 px-6 text-sm tracking-wide",
      lg: "h-14 px-8 text-base tracking-wide",
      icon: "h-8 w-8 p-0 rounded-lg"
    };

    const classes = `${baseStyle} ${variants[variant] ?? variants.primary} ${sizes[size] ?? sizes.md} ${fullWidth ? 'w-full' : ''} ${className}`;

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
