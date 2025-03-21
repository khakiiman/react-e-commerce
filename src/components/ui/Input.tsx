import React, { InputHTMLAttributes } from 'react';

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
    default: 'border-grayshade-50 dark:border-grayshade-300',
    error: 'border-red-500',
  };

  const sizes: SizeStyles = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg',
  };

  const baseClasses = 'border rounded-md dark:bg-grayshade-600 focus:outline-none focus:ring-1 focus:ring-gray-700';
  
  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label 
          htmlFor={id} 
          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
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
      {error && (
        <p className="mt-1 text-xs font-medium text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input; 