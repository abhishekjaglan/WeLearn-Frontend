export interface AuthState {
    userId: string | null;
    token: string | null;
    isAuthenticated: boolean;
  }

export interface AuthResponse {
    userId: string;
    token: string;
  }
  
export interface AuthError {
    message: string;
  }

export interface authenticateData { 
    email: string; 
    password: string; 
    username?: string 
}

export interface NavItem {
  to: string;
  icon: React.ReactNode;
  label: string;
}

export interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export interface MediaItem {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'uploading' | 'done' | 'error';
}

export interface MediaState {
  uploads: MediaItem[];
}

export interface PrivateRouteProps {
  element: React.ReactElement;
}