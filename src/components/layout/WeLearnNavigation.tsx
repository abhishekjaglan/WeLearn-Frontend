import React from 'react';
import WeLearnHomeIcon from '../icons/WeLearnHomeIcon';
import WeLearnDocumentIcon from '../icons/WeLearnDocumentIcon';
import WeLearnSettingsIcon from '../icons/WeLearnSettingsIcon';
import WeLearnUserIcon from '../icons/WeLearnUserIcon';
import { NAVIGATION_ITEMS } from '../../utils/welearn-constants';

interface WeLearnNavigationProps {
  isCollapsed: boolean;
  activeRoute: string;
  onNavigate: (route: string) => void;
}

const iconMap = {
  dashboard: WeLearnHomeIcon,
  documents: WeLearnDocumentIcon,
  profile: WeLearnUserIcon,
  settings: WeLearnSettingsIcon,
  };

const WeLearnNavigation: React.FC<WeLearnNavigationProps> = ({
  isCollapsed,
  activeRoute,
  onNavigate
  }) => {
  return (
    <nav className="wl-navigation">
      {NAVIGATION_ITEMS.map((item) => {
        const IconComponent = iconMap[item.id as keyof typeof iconMap];
                const isActive = activeRoute === item.route;
        
        return (
          <div
            key={item.id}
                        className={`wl-nav-item ${isActive ? 'wl-nav-item-active' : ''}`}
            onClick={() => onNavigate(item.route)}
          >
            {IconComponent && (
                              <IconComponent className="wl-nav-icon" />
            )}
            {!isCollapsed && (
              <span className="wl-nav-text">{item.label}</span>
                          )}
          </div>
        );
      })}
    </nav>
  );
};

export default WeLearnNavigation;