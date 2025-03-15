import React from 'react';

const variants = {
  default: 'border-grayshade-50 dark:border-grayshade-300',
  error: 'border-red-500',
};

const sizes = {
  sm: 'p-2 text-sm',
  md: 'p-3 text-base',
  lg: 'p-4 text-lg',
};

export default function Input({
  type = 'text',
  label,
  error,
  size = 'md',
  fullWidth = true,
  className = '',
  id,
  ...props
}) {
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
} 