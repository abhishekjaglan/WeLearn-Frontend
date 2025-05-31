import React, { useEffect, useState } from 'react';

interface WeLearnToastProps {
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
    isVisible: boolean;
    onClose: () => void;
    className?: string;
}

const WeLearnToast: React.FC<WeLearnToastProps> = ({
    message,
    type = 'info',
    duration = 3000,
    isVisible,
    onClose,
    className = ''
}) => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setIsAnimating(true);
            const timer = setTimeout(() => {
                setIsAnimating(false);
                setTimeout(onClose, 300);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    const getTypeStyles = () => {
        switch (type) {
            case 'success':
                return { backgroundColor: '#10b981', color: 'white' };
            case 'error':
                return { backgroundColor: '#ef4444', color: 'white' };
            case 'warning':
                return { backgroundColor: '#f59e0b', color: 'white' };
            case 'info':
                return { backgroundColor: 'var(--wl-primary-dark)', color: 'var(--wl-text-primary)' };
            default:
                return { backgroundColor: 'var(--wl-primary-dark)', color: 'var(--wl-text-primary)' };
        }
    };

    if (!isVisible && !isAnimating) return null;
    return (
        <div
            className={`wl-toast ${className}`}
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                padding: '12px 16px',
                borderRadius: 'var(--wl-radius-standard)',
                ...getTypeStyles(),
                zIndex: 1001,
                transform: isAnimating ? 'translateX(0)' : 'translateX(100%)',
                transition: 'transform 0.3s ease-in-out',
                boxShadow: 'var(--wl-shadow-medium)',
                minWidth: '250px'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>{message}</span>
                <button
                    onClick={onClose}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'currentColor',
                        cursor: 'pointer',
                        marginLeft: '12px',
                        fontSize: '18px',
                        padding: '0 4px'
                    }}
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default WeLearnToast;