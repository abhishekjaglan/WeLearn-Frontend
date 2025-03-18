import React, { useState } from 'react';
import { FaLink, FaSpinner } from 'react-icons/fa';
import { URLInputProps } from '../types';

const URLInput: React.FC<URLInputProps> = React.memo(({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url);
      setUrl('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <div className="relative flex-1">
        <FaLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true" />
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter a URL"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          aria-label="URL input"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center disabled:bg-gray-400"
        disabled={isLoading}
        aria-label="Fetch URL"
      >
        {isLoading ? <FaSpinner className="animate-spin" /> : 'Fetch'}
      </button>
    </form>
  );
});

export default URLInput;