import React from 'react';
import WeLearnMenuIcon from '../icons/WeLearnMenuIcon';
import WeLearnNavigation from './WeLearnNavigation'; import { useWeLearnSidebar } from '../../hooks/useWeLearnSidebar';
import { useWeLearnResponsive } from '../../hooks/useWeLearnResponsive';
import { WELEARN_CONFIG } from '../../utils/welearn-constants';

interface WelLearnSidebarProps {
    activeRoute: string;
    onNavigate: (route: string) => void;
    className?: string;
}

interface WelLearnSidebarProps {
    activeRoute: string;
    onNavigate: (route: string) => void;
    className?: string;
}

const WelLearnSidebar: React.FC<WelLearnSidebarProps> = ({
    activeRoute,
    onNavigate,
    className = '' }) => {
    const { isCollapsed, isMobileOpen, toggleCollapse, toggleMobile, closeMobile } = useWeLearnSidebar();
    const { isMobile } = useWeLearnResponsive(); const renderMobileOverlay = () => (
        isMobile && isMobileOpen && (
            <div
                className="wl-sidebar-overlay" style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 999
                }}
                onClick={closeMobile} />
        )
    );

    const sidebarWidth = isCollapsed ? WELEARN_CONFIG.SIDEBAR_WIDTH.COLLAPSED : WELEARN_CONFIG.SIDEBAR_WIDTH.EXPANDED; const sidebarStyle: React.CSSProperties = {
        width: isMobile ? '280px' : `${sidebarWidth}px`,
        transform: isMobile && !isMobileOpen ? 'translateX(-100%)' : 'translateX(0)',
    };

    return (
        <>
            {renderMobileOverlay()}
            <aside className={`wl-sidebar-container wl-sidebar-animate ${isMobile ? 'wl-sidebar-mobile' : 'wl-sidebar-desktop'
                } ${isCollapsed ? 'wl-sidebar-collapsed' : ''} ${className}`}
                style={sidebarStyle}                  >
                <div className="wl-sidebar-header" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between', padding: '16px',
                    borderBottom: '1px solid var(--wl-secondary-dark)'
                }}>
                    {!isCollapsed && !isMobile && (
                        <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>WeLearn</h2>)}
                    <button
                        onClick={isMobile ? toggleMobile : toggleCollapse}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--wl-text-primary)',
                            cursor: 'pointer',
                            padding: '8px',
                            borderRadius: 'var(--wl-radius-standard)'
                        }}
                    >
                        <WeLearnMenuIcon isOpen={isMobileOpen || isCollapsed} />
                    </button>
                </div>                            <div className="wl-sidebar-content" style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '16px 0'
                }}>
                    <WeLearnNavigation
                        isCollapsed={isCollapsed && !isMobile}
                        activeRoute={activeRoute}
                        onNavigate={(route) => {
                            onNavigate(route);
                            if (isMobile) {
                                closeMobile();
                            }
                        }} />
                </div>
            </aside>
        </>
    );
};

export default WelLearnSidebar;