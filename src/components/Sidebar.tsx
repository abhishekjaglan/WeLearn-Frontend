// src/components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaFileAlt, FaLink, FaHeadphones, FaVideo, FaUser } from 'react-icons/fa';
import { useSidebar } from '../hooks/useSidebar';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { to: '/home', icon: <FaHome />, label: 'Dashboard' },
  { to: '/home/documents', icon: <FaFileAlt />, label: 'Documents' },
  { to: '/home/urls', icon: <FaLink />, label: 'URLs' },
  { to: '/home/audio', icon: <FaHeadphones />, label: 'Audio' },
  { to: '/home/video', icon: <FaVideo />, label: 'Video' },
  { to: '/user', icon: <FaUser />, label: 'Profile' },
];

const Sidebar: React.FC = React.memo(() => {
  const { isSidebarOpen, closeSidebar, toggleSidebar } = useSidebar();

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-72 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h3 className="text-xl font-semibold">Menu</h3>
          <button
            onClick={toggleSidebar}
            className="text-2xl text-accent hover:text-white transition-colors duration-300 focus:outline-none"
            aria-label="Close Sidebar"
          >
            ✕
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={closeSidebar}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 hover:text-accent transition-all duration-200 active:bg-gray-600"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay for closing sidebar on click outside */}
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        />
      )}
    </>
  );
});

export default Sidebar;