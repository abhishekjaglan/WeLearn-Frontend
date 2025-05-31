import React, { useState } from 'react';
import WeLearnLayout from '../components/layout/WeLearnLayout';
import WeLearnSidebar from '../components/layout/WeLearnSidebar';
import WeLearnCard from '../components/ui/WeLearnCard';
import WeLearnButton from '../components/ui/WeLearnButton';
import { useWeLearnAuth } from '../hooks/useWeLearnAuth';
import { useWeLearnResponsive } from '../hooks/useWeLearnResponsive';
import { WELEARN_ROUTES } from '../utils/welearn-constants';

const Settings: React.FC = () => {
    const [activeRoute, setActiveRoute] = useState<string>(WELEARN_ROUTES.SETTINGS);
    const { user, updateProfile } = useWeLearnAuth();
    const [settings, setSettings] = useState({
        theme: user?.preferences?.theme || 'light',
        notifications: user?.preferences?.notifications || {
            email: true,
            push: false,
            summaryComplete: true
        }
    });
    const { isMobile } = useWeLearnResponsive();
    const handleNavigation = (route: string) => {
        setActiveRoute(route);
        console.log('Navigating to:', route);
    };
    const handleThemeChange = (theme: 'light' | 'dark' | 'auto') => {
        setSettings(prev => ({ ...prev, theme }));
        // TODO: Apply theme change
    };

    const handleNotificationChange = (key: string, value: boolean) => {
        setSettings(prev => ({
            ...prev,
            notifications: { ...prev.notifications, [key]: value }
        }));
    };
    const handleSaveSettings = async () => {
        const success = await updateProfile({
            preferences: {
                ...user?.preferences,
                theme: settings.theme,
                notifications: settings.notifications,
                language: user?.preferences?.language || 'en'
            }
        });
        if (success) {
            console.log('Settings saved successfully');
        }
    };
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
                    <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>
                        Settings
                    </h1>
                    <div style={{ marginBottom: '24px' }}>
                        <WeLearnCard variant="elevated" padding="large">
                            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
                                Theme Preferences
                            </h2>
                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                {(['light', 'dark', 'auto'] as const).map(theme => (
                                    <WeLearnButton
                                        key={theme}
                                        variant={settings.theme === theme ? 'primary' : 'secondary'}
                                        onClick={() => handleThemeChange(theme)}
                                    >
                                        {theme.charAt(0).toUpperCase() + theme.slice(1)}
                                    </WeLearnButton>
                                ))}
                            </div>
                        </WeLearnCard>
                    </div>

                    <WeLearnCard variant="elevated" padding="large">
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
                            Notification Settings
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <input
                                    type="checkbox"
                                    checked={settings.notifications.email}
                                    onChange={(e) => handleNotificationChange('email', e.target.checked)}
                                />
                                <span>Email Notifications</span>
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <input
                                    type="checkbox"
                                    checked={settings.notifications.push}
                                    onChange={(e) => handleNotificationChange('push', e.target.checked)}
                                />
                                <span>Push Notifications</span>
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <input
                                    type="checkbox"
                                    checked={settings.notifications.summaryComplete}
                                    onChange={(e) => handleNotificationChange('summaryComplete', e.target.checked)}
                                />
                                <span>Summary Completion Alerts</span>
                            </label>
                        </div>

                        <div style={{ marginTop: '24px' }}>
                            <WeLearnButton variant="primary" onClick={handleSaveSettings}>
                                Save Settings
                            </WeLearnButton>
                        </div>
                    </WeLearnCard>
                </main>
            </div>
        </WeLearnLayout>
    );
};

export default Settings;