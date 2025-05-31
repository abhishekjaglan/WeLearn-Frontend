import { useState, useCallback } from 'react';

interface SidebarState {
  isCollapsed: boolean;
    isMobileOpen: boolean;
  toggleCollapse: () => void;
  toggleMobile: () => void;
  closeMobile: () => void;
}

export const useWeLearnSidebar = (): SidebarState => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
    const toggleCollapse = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  const toggleMobile = useCallback(() => {
        setIsMobileOpen(prev => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
      }, []);

  return {
    isCollapsed,
    isMobileOpen,
        toggleCollapse,
    toggleMobile,
    closeMobile
  };
};