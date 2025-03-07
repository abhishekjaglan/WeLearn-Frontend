// src/pages/Signin.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaSpinner } from 'react-icons/fa';

const Signin: React.FC = React.memo(() => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { authenticate, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await authenticate('http://localhost:5000/api/signin', { email, password });
    if (success) {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200 w-full max-w-md animate-slide-up">
        <h2 className="text-3xl font-bold text-text mb-6 text-center">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-secondary mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-accent'
              }`}
              required
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-secondary mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-accent'
              }`}
              required
              disabled={loading}
            />
          </div>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-primary text-white p-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin mr-2" /> : null}
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center space-y-2">
          <Link to="#" className="text-sm text-accent hover:underline">
            Forgot Password?
          </Link>
          <p className="text-sm text-gray-600">
            Not a member?{' '}
            <Link to="/signup" className="text-accent hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
});

export default Signin;