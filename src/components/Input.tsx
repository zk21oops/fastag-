import { InputHTMLAttributes, forwardRef } from 'react';
import { colors } from '../styles/design-tokens';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium mb-2" style={{ color: colors.text.high }}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-lg border-2
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-2
            ${error
              ? 'border-[#D32F2F] focus:ring-[#D32F2F]'
              : 'border-[#E0E0E0] focus:border-[#0F4C81] focus:ring-[#0F4C81]'
            }
            ${className}
          `}
          style={{
            backgroundColor: colors.surface.main,
            color: colors.text.high,
          }}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm" style={{ color: colors.error.main }}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
