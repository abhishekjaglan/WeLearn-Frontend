export interface WeLearnUser {
  id: string;
  email: string;
    name: string;
  avatar?: string;
  role: 'USER' | 'ADMIN';
    createdAt: Date;
  lastLoginAt?: Date;
  preferences: WeLearnUserPreferences;
}
export interface WeLearnUserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
    notifications: {
    email: boolean;
    push: boolean;
    summaryComplete: boolean;
  };
  }

export interface WeLearnAuthState {
  user: WeLearnUser | null;
  isAuthenticated: boolean;  isLoading: boolean;
  error: string | null;
}