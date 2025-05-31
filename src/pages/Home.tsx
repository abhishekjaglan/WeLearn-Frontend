import React, { useState } from 'react';
import WeLearnLayout from '../components/layout/WeLearnLayout';
import WeLearnSidebar from '../components/layout/WeLearnSidebar';
import WeLearnWelcomeBar from '../components/features/WeLearnWelcomeBar';
import WeLearnCard from '../components/ui/WeLearnCard';
import { WELEARN_ROUTES } from '../utils/welearn-constants';
import { useWeLearnResponsive } from '../hooks/useWeLearnResponsive';
import '../styles/welearn-responsive.css';
import WeLearnInput from '../components/ui/WeLearnInput';
import WeLearnButton from '../components/ui/WeLearnButton';

const Home: React.FC = () => {
  const [activeRoute, setActiveRoute] = useState<string>(WELEARN_ROUTES.HOME);
  const [documentUrl, setDocumentUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { isMobile } = useWeLearnResponsive();
  const handleNavigation = (route: string) => {
    setActiveRoute(route);
    // TODO: Implement actual routing logic
    console.log('Navigating to:', route);
  };
  const handleDocumentProcess = async () => {
    if (!documentUrl.trim()) return;
    setIsProcessing(true);
    // TODO: Implement actual document processing
    setTimeout(() => {
      setIsProcessing(false);
      console.log('Processing document:', documentUrl);
    }, 2000);
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: 'var(--wl-light-surface)',
    flexDirection: isMobile ? 'column' : 'row'
  };

  const mainContentStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: isMobile ? '16px' : '24px',
    gap: '24px',
    marginLeft: isMobile ? '0' : '0',
    transition: 'margin-left 0.3s ease'
  };

  return (
    <WeLearnLayout>
      <div style={containerStyle}>
        <WeLearnSidebar
          activeRoute={activeRoute}
          onNavigate={handleNavigation}
        />
        <main style={mainContentStyle}>
          <WeLearnWelcomeBar
            userName="John Doe"
            lastDocumentSummary="Your last document was processed successfully. The summary contained key insights about project management methodologies."
          />
          <div className="wl-content-grid">
            <WeLearnCard variant="elevated" padding="large">
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
                Document Processing
              </h2>
              <p style={{ color: 'var(--wl-text-secondary)', marginBottom: '24px' }}>
                Enter a document URL or upload a file to generate an AI-powered summary.
              </p>
              <div style={{ marginBottom: '20px' }}>
                <WeLearnInput
                  label="Document URL"
                  placeholder="https://example.com/document.pdf"
                  value={documentUrl}
                  onChange={(e) => setDocumentUrl(e.target.value)}
                  fullWidth
                />
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <WeLearnButton
                  variant="primary"
                  onClick={handleDocumentProcess}
                  isLoading={isProcessing}
                  disabled={!documentUrl.trim()}
                >
                  {isProcessing ? 'Processing...' : 'Process Document'}
                </WeLearnButton>
                <WeLearnButton variant="secondary">
                  Upload File
                </WeLearnButton>
              </div>
            </WeLearnCard>

            <WeLearnCard variant="outlined" padding="large">
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
                Recent Activity
              </h3>
              <div style={{ color: 'var(--wl-text-secondary)', textAlign: 'center', padding: '40px 20px' }}>
                <p>No recent documents processed.</p>
                <p style={{ fontSize: '14px', marginTop: '8px' }}>
                  Start by processing your first document above.
                </p>
              </div>
            </WeLearnCard>
          </div>
        </main>
      </div>
    </WeLearnLayout>
  );
}

export default Home;