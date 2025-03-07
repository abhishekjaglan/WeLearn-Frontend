// src/components/Navbar.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/authSlice';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import { useSidebar } from '../hooks/useSidebar';

const Navbar: React.FC = React.memo(() => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthenticated, userId } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toggleSidebar } = useSidebar();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
    setIsDropdownOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-primary text-white px-6 py-4 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/home" className="text-2xl font-bold tracking-tight flex items-center">
          <span className="bg-accent w-2 h-2 rounded-full mr-2" />
          WeLearn
        </Link>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Sidebar Toggle */}
          <button
            onClick={toggleSidebar}
            className="text-2xl text-accent hover:text-white transition-colors duration-300 focus:outline-none"
            aria-label="Toggle Sidebar"
          >
            <FaBars />
          </button>

          {/* User Avatar & Dropdown */}
          {isAuthenticated && (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="flex items-center space-x-2 focus:outline-none"
                aria-label="User Menu"
              >
                <FaUserCircle className="text-3xl text-secondary border-2 border-secondary rounded-full" />
                <span className="hidden md:block text-sm font-medium">
                  {userId?.substring(0, 8) || 'User'}
                </span>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-neutral text-text rounded-lg shadow-xl border border-gray-200 animate-dropdown">
                  <Link
                    to="/user"
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          {!isAuthenticated && (
            <Link
              to="/signin"
              className="text-accent hover:underline transition-colors duration-200"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
});

export default Navbar;