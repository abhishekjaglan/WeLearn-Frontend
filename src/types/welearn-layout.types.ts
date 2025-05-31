export interface WelLearnLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  sidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
}

export interface WelLearnNavigationItem {
  id: string;
  label: string;
  route: string;
  requiresAuth?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface WelLearnResponsiveProps {
  mobile?: number;
  tablet?: number;
  desktop?: number;
}

export interface WelLearnThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
}