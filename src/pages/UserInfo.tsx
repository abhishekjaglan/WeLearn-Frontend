import React from 'react';
import WeLearnLayout from '../components/layout/WeLearnLayout';
import WeLearnCard from '../components/ui/WeLearnCard';
import WeLearnButton from '../components/ui/WeLearnButton';
import { useWeLearnAuth } from '../hooks/useWeLearnAuth';
import { useNavigate } from 'react-router-dom';
import { WELEARN_ROUTES } from '../utils/welearn-constants';

const UserInfo: React.FC = () => {
  const { user, signOut } = useWeLearnAuth();
  const navigate = useNavigate();
  
  const handleSignOut = () => {
    signOut();
    navigate(WELEARN_ROUTES.LANDING);
  };
  
  const handleEditProfile = () => {
    navigate(WELEARN_ROUTES.PROFILE);
  };
  
  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: 'var(--wl-light-surface)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
  };
  
  return (
    <WeLearnLayout>
      <div style={containerStyle}>
        <div style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <WeLearnCard variant="elevated" padding="large">
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: 'var(--wl-primary-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              fontSize: '40px',
              color: 'white',
              fontWeight: 'bold'
            }}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
              {user?.name || 'User'}
            </h1>
            <p style={{ color: 'var(--wl-text-secondary)', marginBottom: '24px' }}>
              {user?.email || 'user@example.com'}
            </p>
            <div style={{ marginBottom: '24px' }}>
              <span style={{
                padding: '4px 12px',
                backgroundColor: 'var(--wl-light-surface)',
                borderRadius: 'var(--wl-radius-standard)',
                fontSize: '12px',
                fontWeight: 'bold',
                color: 'var(--wl-primary-dark)'
              }}>
                {user?.role || 'USER'}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <WeLearnButton variant="primary" fullWidth onClick={handleEditProfile}>
                Edit Profile
              </WeLearnButton>
              <WeLearnButton variant="secondary" fullWidth onClick={() => navigate(WELEARN_ROUTES.SETTINGS)}>
                Settings
              </WeLearnButton>
              <WeLearnButton variant="ghost" fullWidth onClick={handleSignOut}>
                Sign Out
              </WeLearnButton>
            </div>
          </WeLearnCard>
        </div>
      </div>
    </WeLearnLayout>
  );
};

export default UserInfo;