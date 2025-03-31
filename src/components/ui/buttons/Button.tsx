import React, { ButtonHTMLAttributes } from 'react';
import colorSystem from '@/styles/colorSystem';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'link'
  | 'danger'
  | 'success'
  | 'warning'
  | 'info';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  isFullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isFullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  children,
  disabled,
  ...rest
}) => {
  const baseClasses =
    'inline-flex items-center justify-center rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const sizeClasses = {
    xs: 'text-xs px-2 py-1',
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-5 py-2.5',
    xl: 'text-xl px-6 py-3',
  };

  const variantClasses = {
    primary: colorSystem.light.button.primary,
    secondary: colorSystem.light.button.secondary,
    outline: colorSystem.light.button.outline,
    ghost: colorSystem.light.button.ghost,
    link: `${colorSystem.light.text.link} px-0 py-0`,
    danger: colorSystem.light.button.danger,
    success: `bg-yinmn-blue hover:bg-rich-black ${colorSystem.light.text.inverse}`,
    warning: `bg-glaucous ${colorSystem.light.text.inverse} hover:bg-silver-lake-blue ${colorSystem.light.interactive.focus}`,
    info: `bg-silver-lake-blue ${colorSystem.light.text.inverse} hover:bg-glaucous ${colorSystem.light.interactive.focus}`,
  };

  const loadingClass = isLoading ? 'opacity-70 cursor-not-allowed' : '';
  const widthClass = isFullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const classes = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${loadingClass}
    ${widthClass}
    ${disabledClass}
    ${className}
  `.trim();

  return (
    <button className={classes} disabled={isLoading || disabled} {...rest}>
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}

      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
