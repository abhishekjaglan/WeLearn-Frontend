import React, { useState } from 'react';
import WeLearnLayout from '../components/layout/WeLearnLayout';
import WeLearnSidebar from '../components/layout/WeLearnSidebar';
import WeLearnCard from '../components/ui/WeLearnCard';
import WeLearnButton from '../components/ui/WeLearnButton';
import WeLearnInput from '../components/ui/WeLearnInput';
import { useWeLearnAuth } from '../hooks/useWeLearnAuth';
import { useWeLearnResponsive } from '../hooks/useWeLearnResponsive';
import { WELEARN_ROUTES } from '../utils/welearn-constants';
const Profile: React.FC = () => {
    const [activeRoute, setActiveRoute] = useState<string>(WELEARN_ROUTES.PROFILE);
    const { user, updateProfile, isLoading } = useWeLearnAuth();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const { isMobile } = useWeLearnResponsive();
    const handleNavigation = (route: string) => {
        setActiveRoute(route);
        console.log('Navigating to:', route);
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        const success = await updateProfile(formData);
        if (success) {
            setIsEditing(false);
            console.log('Profile updated successfully');
        }
    };
    const handleCancel = () => {
        setFormData({
            name: user?.name || '',
            email: user?.email || ''
        });
        setIsEditing(false);
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
                        Profile Settings
                    </h1>
                    <div style={{ maxWidth: '500px' }}>
                        <WeLearnCard variant="elevated" padding="large">
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--wl-primary-dark)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: '20px'
                            }}>
                                <span style={{ color: 'white', fontSize: '32px', fontWeight: 'bold' }}>
                                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                                </span>
                            </div>
                            <div>
                                <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 4px 0' }}>
                                    {user?.name || 'User'}
                                </h2>
                                <p style={{ color: 'var(--wl-text-secondary)', margin: 0 }}>
                                    {user?.role || 'Member'}
                                </p>
                            </div>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <WeLearnInput
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                fullWidth
                            />
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <WeLearnInput
                                label="Email Address"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                                fullWidth
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            {!isEditing ? (
                                <WeLearnButton onClick={() => setIsEditing(true)}>
                                    Edit Profile
                                </WeLearnButton>
                            ) : (
                                <>
                                    <WeLearnButton
                                        variant="primary"
                                        onClick={handleSave}
                                        isLoading={isLoading}
                                    >
                                        Save Changes
                                    </WeLearnButton>
                                    <WeLearnButton
                                        variant="secondary"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </WeLearnButton>
                                </>
                            )}
                        </div>
                        </WeLearnCard>
                    </div>
                </main>
            </div>
        </WeLearnLayout>
    );
};

export default Profile;