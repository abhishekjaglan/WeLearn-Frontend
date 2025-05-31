import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WeLearnLayout from '../components/layout/WeLearnLayout';
import WeLearnCard from '../components/ui/WeLearnCard';
import WeLearnButton from '../components/ui/WeLearnButton';
import WeLearnInput from '../components/ui/WeLearnInput';
import { useWeLearnAuth } from '../hooks/useWeLearnAuth';
import { WELEARN_ROUTES } from '../utils/welearn-constants';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const { signUp, isLoading, error, clearError } = useWeLearnAuth();
  const navigate = useNavigate();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) clearError();
    if (passwordError) setPasswordError('');
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    const success = await signUp(formData.email, formData.password, formData.name);
    if (success) {
      navigate(WELEARN_ROUTES.HOME);
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
              Join WeLearn
            </h1>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <WeLearnInput
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  placeholder="Enter your full name"
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <WeLearnInput
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  placeholder="Enter your email"
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <WeLearnInput
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  placeholder="Create a password"
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <WeLearnInput
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  placeholder="Confirm your password"
                  error={passwordError}
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
                disabled={!formData.name || !formData.email || !formData.password || !formData.confirmPassword}
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </WeLearnButton>
            </form>
            
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <p style={{ color: 'var(--wl-text-secondary)', fontSize: '14px' }}>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate(WELEARN_ROUTES.SIGN_IN)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--wl-primary-dark)',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  }}
                >
                  Sign in here
                </button>
              </p>
            </div>
          </WeLearnCard>
        </div>
      </div>
    </WeLearnLayout>
  );
};

export default SignUp;