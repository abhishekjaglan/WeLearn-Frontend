import React from 'react';

interface WeLearnSettingsIconProps {
  className?: string;
}

const WeLearnSettingsIcon: React.FC<WeLearnSettingsIconProps> = ({ 
  className = '' 
}) => {
  return (
        <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
            className={className}
    >
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 1v6M12 17v6" stroke="currentColor" strokeWidth="2"/>
          </svg>
  );
};

export default WeLearnSettingsIcon;