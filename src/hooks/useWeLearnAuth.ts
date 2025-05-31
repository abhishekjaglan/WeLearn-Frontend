import { useState, useCallback, useEffect } from 'react';
import { WeLearnUser, WeLearnAuthState } from '../types/welearn-user.types';

interface AuthActions {
    signIn: (email: string, password: string) => Promise<boolean>;
    signUp: (email: string, password: string, name: string) => Promise<boolean>;
    signOut: () => void;
    updateProfile: (updates: Partial<WeLearnUser>) => Promise<boolean>;
    clearError: () => void;
}

export const useWeLearnAuth = (): WeLearnAuthState & AuthActions => {
    const [user, setUser] = useState<WeLearnUser | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isAuthenticated = !!user;
    const signIn = useCallback(async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);
        try {
            // TODO: Replace with actual API call
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            if (response.ok) {
                const userData = await response.json();
                setUser(userData.user);
                return true;
            } else {
                setError('Invalid credentials');
                return false;
            }
        } catch (err) {
            setError('Network error');
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const signUp = useCallback(async (email: string, password: string, name: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            // TODO: Replace with actual API call
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name })
            });

            if (response.ok) {
                const userData = await response.json();
                setUser(userData.user);
                return true;
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Registration failed');
                return false;
            }
        } catch (err) {
            setError('Network error');
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const signOut = useCallback(() => {
        setUser(null);
        setError(null);
        // TODO: Clear local storage/cookies
        localStorage.removeItem('welearn_token');
    }, []);
    const updateProfile = useCallback(async (updates: Partial<WeLearnUser>): Promise<boolean> => {
        if (!user) return false;
        setIsLoading(true);
        try {
            const response = await fetch(`/api/users/${user.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser);
                return true;
            }
            return false;
        } catch (err) {
            setError('Failed to update profile');
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [user]);
    const clearError = useCallback(() => {
        setError(null);
    }, []);
    return {
        user,
        isAuthenticated,
        isLoading,
        error,
        signIn,
        signUp,
        signOut,
        updateProfile,
        clearError
    };
};