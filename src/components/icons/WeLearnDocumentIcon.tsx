import React from 'react';

interface WeLearnDocumentIconProps {
  className?: string;
}

const WeLearnDocumentIcon: React.FC<WeLearnDocumentIconProps> = ({ 
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
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        stroke="currentColor"
                strokeWidth="2"
        fill="none"
      />
    </svg>
  );
};

export default WeLearnDocumentIcon;