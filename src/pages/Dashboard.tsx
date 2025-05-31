import React, { useState, useEffect } from 'react';
import WeLearnLayout from '../components/layout/WeLearnLayout';
import WeLearnSidebar from '../components/layout/WeLearnSidebar';
import WeLearnCard from '../components/ui/WeLearnCard';
import WeLearnButton from '../components/ui/WeLearnButton';
import { useWeLearnResponsive } from '../hooks/useWeLearnResponsive';
import { useWeLearnAuth } from '../hooks/useWeLearnAuth';
import { WELEARN_ROUTES } from '../utils/welearn-constants';


const Dashboard: React.FC = () => {
    const [activeRoute, setActiveRoute] = useState<string>(WELEARN_ROUTES.DASHBOARD);
    const { isMobile } = useWeLearnResponsive();
    const { user, isAuthenticated } = useWeLearnAuth();
    const [stats, setStats] = useState({
        documentsProcessed: 0,
        summariesGenerated: 0,
        totalTimeSpent: 0
    });
    const handleNavigation = (route: string) => {
        setActiveRoute(route);
        console.log('Navigating to:', route);
    };
    useEffect(() => {
        // TODO: Fetch user statistics
        setStats({
            documentsProcessed: 15,
            summariesGenerated: 23,
            totalTimeSpent: 180
        });
    }, []);
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
                        <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
                            Welcome back, {user?.name || 'User'}!
                        </h1>
                        <p style={{ color: 'var(--wl-text-secondary)', margin: 0 }}>
                            Here's your learning progress overview.
                        </p>
                    </div>

                    <div className="wl-grid-auto" style={{ marginBottom: '32px' }}>
                        <WeLearnCard variant="elevated" padding="large">
                            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
                                Documents Processed
                            </h3>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--wl-primary-dark)' }}>
                                {stats.documentsProcessed}
                            </div>
                        </WeLearnCard>

                        <WeLearnCard variant="elevated" padding="large">
                            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
                                Summaries Generated
                            </h3>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--wl-accent-dark)' }}>
                                {stats.summariesGenerated}
                            </div>
                        </WeLearnCard>

                        <WeLearnCard variant="elevated" padding="large">
                            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
                                Time Spent (min)
                            </h3>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--wl-secondary-dark)' }}>
                                {stats.totalTimeSpent}
                            </div>
                        </WeLearnCard>
                    </div>
                    <WeLearnCard variant="elevated" padding="large">
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
                            Recent Activity
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ padding: '12px', backgroundColor: 'var(--wl-light-surface)', borderRadius: 'var(--wl-radius-standard)' }}>
                                <p style={{ margin: '0 0 4px 0', fontWeight: '500' }}>Document processed: "AI Research Paper"</p>
                                <span style={{ fontSize: '12px', color: 'var(--wl-text-secondary)' }}>2 hours ago</span>
                            </div>
                            <div style={{ padding: '12px', backgroundColor: 'var(--wl-light-surface)', borderRadius: 'var(--wl-radius-standard)' }}>
                                <p style={{ margin: '0 0 4px 0', fontWeight: '500' }}>Summary generated: "Machine Learning Basics"</p>
                                <span style={{ fontSize: '12px', color: 'var(--wl-text-secondary)' }}>5 hours ago</span>
                            </div>
                        </div>

                        <div style={{ marginTop: '20px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>Quick Actions</h3>
                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                <WeLearnButton variant="primary" size="small">
                                    Process New Document
                                </WeLearnButton>
                                <WeLearnButton variant="secondary" size="small">
                                    View All Documents
                                </WeLearnButton>
                            </div>
                        </div>
                    </WeLearnCard>
                </main>
            </div>
        </WeLearnLayout>
    );
};

export default Dashboard;
