import React from 'react';
import WeLearnLayout from '../components/layout/WeLearnLayout';
import WeLearnCard from '../components/ui/WeLearnCard';
import WeLearnButton from '../components/ui/WeLearnButton';
import { useNavigate } from 'react-router-dom';
import { WELEARN_ROUTES } from '../utils/welearn-constants';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate(WELEARN_ROUTES.HOME);
    };

    return (
        <WeLearnLayout>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: 'var(--wl-light-surface)',
                padding: '20px'
            }}>
                <div style={{ textAlign: 'center', maxWidth: '500px' }}>
                    <WeLearnCard variant="elevated" padding="large">
                        <div style={{ fontSize: '72px', fontWeight: 'bold', color: 'var(--wl-primary-dark)', marginBottom: '16px' }}>
                            404
                        </div>
                        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px' }}>
                            Page Not Found
                        </h1>
                        <p style={{ color: 'var(--wl-text-secondary)', marginBottom: '24px' }}>
                            The page you're looking for doesn't exist or has been moved.
                        </p>
                        <WeLearnButton variant="primary" onClick={handleGoHome}>
                            Go Back Home
                        </WeLearnButton>
                    </WeLearnCard>
                </div>
            </div>
        </WeLearnLayout>
    );
};

export default NotFound;
