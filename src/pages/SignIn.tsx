import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WeLearnLayout from '../components/layout/WeLearnLayout';
import WeLearnCard from '../components/ui/WeLearnCard';
import WeLearnButton from '../components/ui/WeLearnButton';
import WeLearnInput from '../components/ui/WeLearnInput';
import { useWeLearnAuth } from '../hooks/useWeLearnAuth';
import { WELEARN_ROUTES } from '../utils/welearn-constants';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, isLoading, error, clearError } = useWeLearnAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await signIn(email, password);
    if (success) {
      navigate(WELEARN_ROUTES.HOME);
    }
  };
  
  const handleInputChange = () => {
    if (error) {
      clearError();
    }
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
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <WeLearnCard variant="elevated" padding="large">
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '24px' }}>
              Sign In to WeLearn
            </h1>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <WeLearnInput
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); handleInputChange(); }}
                  required
                  fullWidth
                  placeholder="Enter your email"
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <WeLearnInput
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); handleInputChange(); }}
                  required
                  fullWidth
                  placeholder="Enter your password"
                />
              </div>
              {error && (
                <div style={{
                  color: '#ef4444',
                  fontSize: '14px',
                  marginBottom: '16px',
                  padding: '8px',
                  backgroundColor: '#fef2f2',
                  borderRadius: 'var(--wl-radius-standard)'
                }}>
                  {error}
                </div>
              )}
              <WeLearnButton
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isLoading}
                disabled={!email || !password}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </WeLearnButton>
            </form>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <p style={{ color: 'var(--wl-text-secondary)', fontSize: '14px' }}>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate(WELEARN_ROUTES.SIGN_UP)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--wl-primary-dark)',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  }}
                >
                  Sign up here
                </button>
              </p>
            </div>
          </WeLearnCard>
        </div>
      </div>
    </WeLearnLayout>
  );
};

export default SignIn;