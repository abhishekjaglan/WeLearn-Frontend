import React, { ReactNode } from 'react';

interface GridProps {
  children: ReactNode;
  className?: string;
}

interface ColProps {
  children: ReactNode;
  mobile?: number;
  tablet?: number;
  desktop?: number;
  className?: string;
};

export const WeLearnRow: React.FC<GridProps> = ({ children, className = '' }) => {
  return (
    <div className={`wl-row ${className}`} style={{
      display: 'flex',
      flexWrap: 'wrap',
      margin: '0 -8px'
    }}>
      {children}
    </div>
  );
};

export const WeLearnCol: React.FC<ColProps> = ({ 
  children, 
  mobile = 12, 
  tablet = 6, 
  desktop = 4, 
  className = '' 
}) => {
  const colStyle: React.CSSProperties = {
    padding: '0 8px',
    width: `${(mobile / 12) * 100}%`,
    transition: 'var(--wl-transition-smooth)'
  };

  return (
    <div 
      className={`wl-col ${className}`} 
      style={colStyle}
    >
      <style>
        {`
          @media (min-width: 768px) {
            .wl-col {
              width: ${(tablet / 12) * 100}% !important;
            }
          }
          @media (min-width: 1024px) {
            .wl-col {
              width: ${(desktop / 12) * 100}% !important;
            }
          }
        `}
      </style>
      {children}
    </div>
  );
};