import React from 'react';

interface NavbarProps {
  activeTab: 'dashboard' | 'summarize';
  setActiveTab: (tab: 'dashboard' | 'summarize') => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                WeLearn
              </h1>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('summarize')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'summarize'
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              Summarize
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;