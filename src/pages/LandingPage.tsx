import React from 'react';
import WeLearnLayout from '../components/layout/WeLearnLayout';
import WeLearnCard from '../components/ui/WeLearnCard';
import WeLearnButton from '../components/ui/WeLearnButton';
import { useNavigate } from 'react-router-dom';
import { WELEARN_ROUTES } from '../utils/welearn-constants';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate(WELEARN_ROUTES.SIGN_UP);
  };

  const handleSignIn = () => {
    navigate(WELEARN_ROUTES.SIGN_IN);
  };

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: 'var(--wl-light-surface)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 20px'
  };

  return (
    <WeLearnLayout>
      <div style={containerStyle}>
        <div style={{ textAlign: 'center', maxWidth: '600px' }}>
          <WeLearnCard variant="elevated" padding="large">
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px', color: 'var(--wl-primary-dark)' }}>
              WeLearn
            </h1>
            <p style={{ fontSize: '20px', color: 'var(--wl-text-secondary)', marginBottom: '32px' }}>
              Transform your documents into intelligent summaries with AI-powered analysis
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>📄</span>
                <span>Process PDF and DOC files instantly</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>🤖</span>
                <span>AI-powered intelligent summaries</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>🤖</span>
                <span>AI-powered intelligent summaries</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>⚡</span>
                <span>Fast and secure document processing</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <WeLearnButton variant="primary" size="large" onClick={handleGetStarted}>
                Get Started Free
              </WeLearnButton>
              <WeLearnButton variant="secondary" size="large" onClick={handleSignIn}>
                Sign In
              </WeLearnButton>
            </div>
          </WeLearnCard>
        </div>
      </div>
    </WeLearnLayout>
  );
};

export default LandingPage;
