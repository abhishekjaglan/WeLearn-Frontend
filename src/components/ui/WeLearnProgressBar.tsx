import React from 'react';

interface WeLearnProgressBarProps {
    progress: number;
    label?: string;
    showPercentage?: boolean;
    variant?: 'default' | 'success' | 'error';
}

const WeLearnProgressBar: React.FC<WeLearnProgressBarProps> = ({
    progress,
    label,
    showPercentage = true,
    variant = 'default'
}) => {
    const getProgressColor = () => {
        switch (variant) {
            case 'success':
                return '#10b981';
            case 'error':
                return '#ef4444';
            default:
                return 'var(--wl-primary-dark)';
        }
    };
    const containerStyle: React.CSSProperties = {
        width: '100%',
        marginBottom: '8px'
    };

    const barStyle: React.CSSProperties = {
        width: '100%',
        height: '8px',
        backgroundColor: 'var(--wl-border-subtle)',
        borderRadius: '4px',
        overflow: 'hidden'
    };

    const fillStyle: React.CSSProperties = {
        width: `${Math.min(100, Math.max(0, progress))}%`,
        height: '100%',
        backgroundColor: getProgressColor(),
        transition: 'width 0.3s ease-in-out'
    };

    return (
        <div style={containerStyle}>
            {label && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '4px',
                    fontSize: '14px'
                }}>
                    <span>{label}</span>
                    {showPercentage && (
                        <span>{Math.round(progress)}%</span>
                    )}
                </div>
            )}
            <div style={barStyle}></div>
            <div style={fillStyle} />
        </div>
    );
};

export default WeLearnProgressBar;
