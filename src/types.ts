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
export interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  url: string;
  summary?: string;
}

export interface URLPreview {
  id: string;
  url: string;
  title: string;
  description: string;
  image: string;
  summary?: string;
}

export interface Audio {
  id: string;
  name: string;
  type: string;
  date: string;
  url: string;
  transcription?: string;
  summary?: string;
}

export interface Video {
  id: string;
  name: string;
  type: string;
  date: string;
  url: string;
  transcription?: string;
  summary?: string;
}

export interface MediaState {
  uploads: MediaItem[];
  documents: Document[];
  urls: URLPreview[];
  audios: Audio[];
  videos: Video[];
}

export interface PrivateRouteProps {
  element: React.ReactElement;
}

export interface MediaCardProps {
  id: string;
  name: string;
  type: string;
  date: string;
  onView: () => void;
  onDownload: () => void;
  onSummarize: () => void;
}

export interface URLInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}