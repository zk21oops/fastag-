import { ButtonHTMLAttributes } from 'react';
import { colors, animations } from '../styles/design-tokens';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantStyles = {
  primary: `bg-[${colors.primary.main}] hover:bg-[${colors.primary.light}] active:bg-[${colors.primary.dark}] text-white`,
  secondary: `bg-[${colors.secondary.main}] hover:bg-[${colors.secondary.light}] active:bg-[${colors.secondary.dark}] text-white`,
  accent: `bg-[${colors.accent.main}] hover:bg-[${colors.accent.light}] active:bg-[${colors.accent.dark}] text-white`,
  outline: `border-2 border-[${colors.primary.main}] text-[${colors.primary.main}] hover:bg-[${colors.primary.main}] hover:text-white`,
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = `
    font-semibold rounded-lg
    ${animations.button.default}
    hover:${animations.button.hover}
    active:${animations.button.pressed}
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0F4C81]
  `;

  return (
    <button
      className={`
        ${baseStyles}
        ${variant === 'primary' ? 'bg-[#0F4C81] hover:bg-[#1976D2] active:bg-[#0A3659]' : ''}
        ${variant === 'secondary' ? 'bg-[#2E7D32] hover:bg-[#4CAF50] active:bg-[#1B5E20]' : ''}
        ${variant === 'accent' ? 'bg-[#F57C00] hover:bg-[#FF9800] active:bg-[#E65100]' : ''}
        ${variant === 'outline' ? 'border-2 border-[#0F4C81] text-[#0F4C81] hover:bg-[#0F4C81] hover:text-white' : ''}
        ${variant !== 'outline' ? 'text-white' : ''}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
