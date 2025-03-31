import React, { InputHTMLAttributes } from 'react';
import colorSystem from '@/styles/colorSystem';

type InputSize = 'sm' | 'md' | 'lg';

interface SizeStyles {
  [key: string]: string;
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  type?: string;
  label?: string;
  error?: string;
  size?: InputSize;
  fullWidth?: boolean;
  className?: string;
  id?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  label,
  error,
  size = 'md',
  fullWidth = true,
  className = '',
  id,
  ...props
}) => {
  const variants = {
    default: colorSystem.light.border.input,
    error: 'border-rich-black',
  };

  const sizes: SizeStyles = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg',
  };

  const baseClasses = `${colorSystem.light.background.input.replace('border border-silver-lake-blue/50', '')} rounded-md focus:outline-none ${colorSystem.light.interactive.focus}`;

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label
          htmlFor={id}
          className={`block mb-2 text-sm font-medium ${colorSystem.light.text.secondary}`}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        className={`
          ${baseClasses}
          ${variants[error ? 'error' : 'default']}
          ${sizes[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className={`mt-1 text-xs font-medium text-rich-black`}>{error}</p>}
    </div>
  );
};

export default Input;
