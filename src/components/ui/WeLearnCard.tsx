import React, { ReactNode } from 'react';

interface WeLearnCardProps {
    children: ReactNode;
    className?: string; variant?: 'default' | 'elevated' | 'outlined';
    padding?: 'none' | 'small' | 'medium' | 'large';
    onClick?: () => void;
}const WeLearnCard: React.FC<WeLearnCardProps> = ({
    children,
    className = '',
    variant = 'default', padding = 'medium',
    onClick
}) => {
    const getVariantStyles = () => {
        switch (variant) {
            case 'elevated':
                return {
                    boxShadow: 'var(--wl-shadow-medium)',
                    border: 'none'
                };
            case 'outlined':
                return {
                    boxShadow: 'none',
                    border: '1px solid var(--wl-border-subtle)'
                };
            default:
                return {
                    boxShadow: 'var(--wl-shadow-soft)',
                    border: 'none'
                };
        }
    };

    const getPaddingStyles = () => {
        switch (padding) {
            case 'none':
                return { padding: '0' };
            case 'small':
                return { padding: '12px' };
            case 'medium': return { padding: '20px' };
            case 'large':
                return { padding: '32px' };
            default:
                return { padding: '20px' };
        }
    };

    const cardStyles: React.CSSProperties = {
        ...getVariantStyles(),
        ...getPaddingStyles(), backgroundColor: 'var(--wl-pure-white)',
        borderRadius: 'var(--wl-radius-standard)',
        transition: 'var(--wl-transition-smooth)',
        cursor: onClick ? 'pointer' : 'default'
    };

    return (
        <div
            className={`wl-card ${className}`}
            style={cardStyles} onClick={onClick}
        >
            {children}
        </div>
    );
};

export default WeLearnCard;