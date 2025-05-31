import React, { InputHTMLAttributes, forwardRef } from 'react';

interface WeLearnInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

const WeLearnInput = forwardRef<HTMLInputElement, WeLearnInputProps>(({
  label,
  error,
  helperText,
  fullWidth = false,
  className = '',
  ...props
}, ref) => {
  const inputStyles: React.CSSProperties = {
    width: fullWidth ? '100%' : 'auto',
    padding: '12px 16px',
    border: `1px solid ${error ? '#dc2626' : 'var(--wl-border-subtle)'}`,
    borderRadius: 'var(--wl-radius-standard)',
    fontSize: '16px',
    transition: 'var(--wl-transition-smooth)',
    backgroundColor: 'var(--wl-pure-white)',
    color: 'var(--wl-text-dark)'
  };

  const labelStyles: React.CSSProperties = {
    display: 'block',
    marginBottom: '6px',
    fontSize: '14px',
    fontWeight: '500',
    color: error ? '#dc2626' : 'var(--wl-text-dark)'
  };

  const helperStyles: React.CSSProperties = {
    marginTop: '4px',
    fontSize: '12px',
    color: error ? '#dc2626' : 'var(--wl-text-secondary)'
  };

  return (
    <div className={`wl-input-container ${className}`}>
      {label && (
        <label style={labelStyles}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        style={inputStyles}
        className="wl-input"
        {...props}
      />
      {(error || helperText) && (
        <div style={helperStyles}>
          {error || helperText}
        </div>
      )}
    </div>
  );
});

WeLearnInput.displayName = 'WelLearnInput';

export default WeLearnInput;