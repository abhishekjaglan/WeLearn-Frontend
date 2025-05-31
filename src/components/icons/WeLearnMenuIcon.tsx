import React from 'react';

interface WelLearnMenuIconProps {
    className?: string;
    isOpen?: boolean;
}

const WelLearnMenuIcon: React.FC<WelLearnMenuIconProps> = ({
    className = '',
    isOpen = false
}) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className={`wl-menu-icon ${className}`}
            style={{
                transition: 'transform 0.3s ease',
                transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)'
            }}
        >
            <path
                d="M3 12h18M3 6h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default WelLearnMenuIcon;