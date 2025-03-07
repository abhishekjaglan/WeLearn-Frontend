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