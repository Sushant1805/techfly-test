import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', fullWidth = false, children, ...props }, ref) => {
    const baseStyle = "inline-flex items-center justify-center font-black transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-95 uppercase tracking-widest";

    const variants: Record<string, string> = {
      primary: "bg-brand-blue text-white hover:bg-brand-blue-light shadow-soft hover:shadow-glow rounded-3xl",
      outline: "border-2 border-gray-100 bg-white hover:bg-bg-soft text-text-slate rounded-3xl",
      ghost: "bg-transparent hover:bg-bg-soft text-gray-500 hover:text-brand-blue rounded-3xl"
    };

    const sizes: Record<string, string> = {
      xs: "h-7 px-3 text-[9px]",
      sm: "h-9 px-5 text-[10px]",
      md: "h-12 px-8 text-[11px]",
      lg: "h-14 px-10 text-xs"
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
