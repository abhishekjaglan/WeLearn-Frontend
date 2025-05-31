import React from 'react';

interface WeLearnHomeIconProps {
  className?: string;
}

const WeLearnHomeIcon: React.FC<WeLearnHomeIconProps> = ({ 
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
      <path
        d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
};

export default WeLearnHomeIcon;