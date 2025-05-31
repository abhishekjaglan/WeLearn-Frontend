import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface WeLearnButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const WeLearnButton: React.FC<WeLearnButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--wl-primary-dark)',
          color: 'var(--wl-text-primary)',
          border: '1px solid var(--wl-primary-dark)'
        };
      case 'secondary':
        return {
          backgroundColor: 'var(--wl-pure-white)',
          color: 'var(--wl-text-dark)',
          border: '1px solid var(--wl-border-subtle)'
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: 'var(--wl-text-dark)',
          border: '1px solid transparent'
        };
      case 'danger':
        return {
          backgroundColor: '#dc2626',
          color: 'var(--wl-text-primary)',
          border: '1px solid #dc2626'
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { padding: '8px 16px', fontSize: '14px' };
      case 'medium':
        return { padding: '12px 24px', fontSize: '16px' };
      case 'large':
        return { padding: '16px 32px', fontSize: '18px' };
      default:
        return {};
    }
  };

  const buttonStyles: React.CSSProperties = {
    ...getVariantStyles(),
    ...getSizeStyles(),
    borderRadius: 'var(--wl-radius-standard)',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    transition: 'var(--wl-transition-smooth)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled || isLoading ? 0.6 : 1
  };

  return (
    <button
      style={buttonStyles}
      className={`wl-button ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span style={{ marginRight: '8px' }}>⟳</span>
      ) : null}
      {children}
    </button>
  );
};

export default WeLearnButton;