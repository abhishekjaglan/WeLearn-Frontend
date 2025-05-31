import React, { useState } from 'react';
import WeLearnLayout from '../components/layout/WeLearnLayout';
import WeLearnSidebar from '../components/layout/WeLearnSidebar';
import WeLearnWelcomeBar from '../components/features/WeLearnWelcomeBar';
import WeLearnCard from '../components/ui/WeLearnCard';
import { WELEARN_ROUTES } from '../utils/welearn-constants';
import { useWeLearnResponsive } from '../hooks/useWeLearnResponsive';
import '../styles/welearn-responsive.css';
import WeLearnDocumentUpload from '../components/features/WeLearnDocumentUpload';
import WeLearnUrlParsing from '../components/features/WeLearnUrlParsing';
import WeLearnSummaryDisplay from '../components/features/WeLearnSummaryDisplay';

const Home: React.FC = () => {
  const [activeRoute, setActiveRoute] = useState<string>(WELEARN_ROUTES.HOME);
  const [documentUrl, setDocumentUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
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

  const handleFileUploaded = (file: File) => {
    setUploadedFile(file);
    console.log('File uploaded:', file.name);
  };

  const handleDocumentProcessed = (documentId: string) => {
    setSelectedDocumentId(documentId);
    console.log('Document processed:', documentId);
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <WeLearnUrlParsing onDocumentProcessed={handleDocumentProcessed} />
                <div style={{
                  borderTop: '1px solid var(--wl-border-subtle)',
                  paddingTop: '24px'
                }}>
                  <WeLearnDocumentUpload onFileUploaded={handleFileUploaded} />
                </div>
              </div>
            </WeLearnCard>

            <WeLearnSummaryDisplay
              documentId={selectedDocumentId || undefined}
              className="wl-summary-section"
            />
          </div>
        </main>
      </div>
    </WeLearnLayout>
  );
}

export default Home;