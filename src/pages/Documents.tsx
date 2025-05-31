import React, { useState, useEffect } from 'react';
import WeLearnLayout from '../components/layout/WeLearnLayout';
import WeLearnSidebar from '../components/layout/WeLearnSidebar';
import WeLearnCard from '../components/ui/WeLearnCard';
import WeLearnButton from '../components/ui/WeLearnButton';
import WeLearnInput from '../components/ui/WeLearnInput';
import { WeLearnDocument } from '../types/welearn-api.types';
import { useWeLearnResponsive } from '../hooks/useWeLearnResponsive';
import { WELEARN_ROUTES } from '../utils/welearn-constants';

const Documents: React.FC = () => {
  const [activeRoute, setActiveRoute] = useState<string>(WELEARN_ROUTES.DOCUMENTS);
  const [documents, setDocuments] = useState<WeLearnDocument[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { isMobile } = useWeLearnResponsive();
    const handleNavigation = (route: string) => {
    setActiveRoute(route);
    console.log('Navigating to:', route);
  };
    useEffect(() => {
    // TODO: Fetch documents from API
    setTimeout(() => {
      setDocuments([
                {
          id: '1',
          title: 'AI Research Paper',
          url: 'https://example.com/ai-paper.pdf',
          status: 'completed',
                    createdAt: new Date('2024-01-15'),
          summary: 'Comprehensive overview of artificial intelligence methodologies...'
        },
        {
                          id: '2',
              title: 'Machine Learning Guide',
              fileName: 'ml-guide.pdf',
              fileSize: 2048000,
                                status: 'processing',
                  createdAt: new Date('2024-01-20')
                }
              ]);
                                setIsLoading(false);
                }, 1000);
              }, []);
                            const filteredDocuments = documents.filter(doc =>
                doc.title.toLowerCase().includes(searchTerm.toLowerCase())
              );
                            const containerStyle: React.CSSProperties = {
                display: 'flex',
                minHeight: '100vh',
                backgroundColor: 'var(--wl-light-surface)'
                                  };
                
                  const mainStyle: React.CSSProperties = {
                    flex: 1,
                    padding: isMobile ? '16px' : '24px'
                                          };
                    
                      return (
                        <WeLearnLayout>
                          <div style={containerStyle}>
                                                        <WeLearnSidebar
                              activeRoute={activeRoute}
                              onNavigate={handleNavigation}
                            />
                                                        <main style={mainStyle}>
                              <div style={{ marginBottom: '24px' }}>
                                <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0 0 16px 0' }}>
                                  My Documents
                                                                  </h1>
                                <WeLearnInput
                                  placeholder="Search documents..."
                                  value={searchTerm}
                                  onChange={(e) => setSearchTerm(e.target.value)}
                                                                        fullWidth
                                      style={{ maxWidth: '400px' }}
                                    />
                                  </div>
                                                                    {isLoading ? (
                                    <WeLearnCard padding="large">
                                      <p style={{ textAlign: 'center', color: 'var(--wl-text-secondary)' }}>
                                                                                        Loading documents...
                                              </p>
                                            </WeLearnCard>
                                          ) : (
                                                                                        <div className="wl-grid-auto">
                                              {filteredDocuments.length === 0 ? (
                                                <WeLearnCard padding="large">
                                                  <p style={{ textAlign: 'center', color: 'var(--wl-text-secondary)' }}>
                                                                                                                No documents found.
                                                          </p>
                                                        </WeLearnCard>
                                                      ) : (
                                                                                                                filteredDocuments.map(doc => (
                                                          <WeLearnCard key={doc.id} variant="elevated" padding="large">
                                                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>
                                                                                                                                  {doc.title}
                                                                </h3>
                                                                <div style={{ marginBottom: '12px' }}>
                                                                  <span style={{
                                                                                                                                        padding: '4px 8px',
                                                                    borderRadius: '4px',
                                                                    fontSize: '12px',
                                                                    fontWeight: 'bold',
                                                                    backgroundColor: doc.status === 'completed' ? '#dcfce7' : '#fef3c7',
                                                                                                                                            color: doc.status === 'completed' ? '#166534' : '#92400e'
                                                                      }}>
                                                                        {doc.status.toUpperCase()}
                                                                      </span>
                                                                                                                                          </div>
                                                                    <p style={{ fontSize: '14px', color: 'var(--wl-text-secondary)', marginBottom: '16px' }}>
                                                                      Created: {doc.createdAt.toLocaleDateString()}
                                                                                                                                          </p>
                                                                    <div style={{ display: 'flex', gap: '8px' }}>
                                                                      <WeLearnButton size="small" variant="primary">
                                                                        View Summary
                                                                                                                                                  </WeLearnButton>
                                                                          <WeLearnButton size="small" variant="secondary">
                                                                            Download
                                                                          </WeLearnButton>
                                                                        </div>
                                                                                                                                                                  </WeLearnCard>
                                                                                        ))
                                                                                      )}
                                                                                    </div>
                                                                                  )}
                                                                                </main>
                                                                              </div>
                                                                            </WeLearnLayout>
                                                                          );
                                                                        };
                                                                        
                                                                        export default Documents;