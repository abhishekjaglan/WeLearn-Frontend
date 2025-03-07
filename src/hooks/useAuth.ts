// src/hooks/useAuth.ts
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthError, AuthResponse } from '../types';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const authenticate = useCallback(
    async (url: string, data: { email: string; password: string; username?: string }) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post<AuthResponse>(url, data, {
          headers: { 'Content-Type': 'application/json' },
        });
        const { userId, token } = response.data;
        Cookies.set('userId', userId, { expires: 7, secure: true });
        Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'strict' });
        dispatch(login({ userId, token }));
        return true;
      } catch (err) {
        const errorMsg = (err as AuthError).message || 'Authentication failed';
        setError(errorMsg);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  return { authenticate, loading, error };
};