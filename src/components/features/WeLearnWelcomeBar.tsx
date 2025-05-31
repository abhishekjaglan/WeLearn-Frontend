import React from 'react';
import WeLearnCard from '../ui/WeLearnCard';
import { getTimeBasedGreeting, formatDateTime } from '../../utils/welearn-helpers';
interface WeLearnWelcomeBarProps {
    userName?: string;
    lastDocumentSummary?: string;
    className?: string;
}

const WeLearnWelcomeBar: React.FC<WeLearnWelcomeBarProps> = ({
    userName = 'User',
    lastDocumentSummary,
    className = ''
}) => {
    const currentTime = new Date();
    const greeting = getTimeBasedGreeting();
    return (

        <WeLearnCard
            variant="elevated"
            className={`wl-welcome-bar ${className}`}
        >
            <div className="wl-welcome-content" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div className="wl-welcome-text">
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
                        {greeting}, {userName}!
                    </h1>
                    <p style={{ fontSize: '14px', color: 'var(--wl-text-secondary)', margin: 0 }}>
                        {formatDateTime(currentTime)}
                    </p>
                </div>
                {lastDocumentSummary && (
                    <div className="wl-welcome-summary" style={{
                        maxWidth: '300px',
                        padding: '12px',
                        backgroundColor: 'var(--wl-light-surface)',
                        borderRadius: 'var(--wl-radius-standard)',
                        borderLeft: '4px solid var(--wl-primary-dark)'
                    }}>
                        <h3 style={{ fontSize: '12px', fontWeight: '600', margin: '0 0 4px 0' }}>
                            Last Summary
                        </h3>                            <p style={{ fontSize: '11px', color: 'var(--wl-text-secondary)', margin: 0 }}>
                            {lastDocumentSummary}
                        </p>
                    </div>
                )}
            </div>
        </WeLearnCard>
    );
};

export default WeLearnWelcomeBar;