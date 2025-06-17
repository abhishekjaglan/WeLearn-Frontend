import React from 'react';
import type { Page } from '../App';

interface NavbarProps {
  setPage: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setPage }) => {
  return (
    <nav className="fixed top-0 w-full bg-gray-800 text-white p-4 flex justify-around items-center shadow-md">
      <button onClick={() => setPage('dashboard')} className="hover:text-teal-300 transition duration-200">
        Dashboard
      </button>
      <button onClick={() => setPage('summarize')} className="hover:text-teal-300 transition duration-200">
        Summarize
      </button>
    </nav>
  );
};

export default Navbar;