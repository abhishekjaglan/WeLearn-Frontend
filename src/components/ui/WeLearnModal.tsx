import React, { ReactNode, useEffect } from 'react';

interface WeLearnModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
    className?: string;
}

const WeLearnModal: React.FC<WeLearnModalProps> = ({
    isOpen,
    onClose, children,
    title,
    className = ''
}) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;
    return (
        <div
            className="wl-modal-backdrop"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000
            }}
            onClick={onClose}
        >
            <div
                className={`wl-modal-content ${className}`}
                style={{
                    backgroundColor: 'var(--wl-pure-white)',
                    borderRadius: 'var(--wl-radius-large)',
                    padding: '24px',
                    maxWidth: '500px',
                    width: '90%',
                    maxHeight: '80vh',
                    overflowY: 'auto'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {title && (
                    <div className="wl-modal-header" style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '20px',
                        paddingBottom: '12px',
                        borderBottom: '1px solid var(--wl-border-subtle)'
                    }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>
                            {title}
                        </h2>
                        <button
                            onClick={onClose}
                            style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '24px',
                                cursor: 'pointer',
                                color: 'var(--wl-text-secondary)',
                                padding: '4px'
                            }}
                        >
                            ×
                        </button>
                    </div>
                )}
                <div className="wl-modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default WeLearnModal;