import React from 'react';
import type { Page } from '../App';

interface NavbarProps {
  setPage: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setPage }) => {
  return (
    <nav className="fixed top-0 w-full bg-secondary-800 text-white p-4 flex justify-around items-center shadow-md animate-fade-in">
      <button 
        onClick={() => setPage('dashboard')} 
        className="btn btn-secondary text-white hover:bg-secondary-700 transition-all duration-200"
      >
        Dashboard
      </button>
      <button 
        onClick={() => setPage('summarize')} 
        className="btn btn-secondary text-white hover:bg-secondary-700 transition-all duration-200"
      >
        Summarize
      </button>
    </nav>
  );
};

export default Navbar;