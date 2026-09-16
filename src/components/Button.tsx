import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5 font-bold',
  };

  const variantStyles = {
    primary: 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-black font-bold hover:from-amber-400 hover:to-yellow-400 shadow-lg shadow-amber-500/25 active:scale-[0.98]',
    secondary: 'bg-slate-900/90 text-amber-300 hover:bg-slate-800 border border-amber-500/30',
    danger: 'bg-rose-600 text-white hover:bg-rose-500 shadow-md shadow-rose-600/20',
    outline: 'border border-amber-500/50 text-amber-400 hover:bg-amber-500/10',
    ghost: 'text-slate-300 hover:text-amber-400 hover:bg-amber-500/10',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
