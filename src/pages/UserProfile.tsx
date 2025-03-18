import React, { useState, useEffect, useCallback, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { FaUser, FaHistory, FaChartBar } from 'react-icons/fa';
import { updateProfile } from '../store/authSlice';

interface MediaItem {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'uploading' | 'done' | 'error';
}

const UserProfile: React.FC = () => {
  const dispatch = useDispatch();

  // Access name and email directly from state.auth
  const nameFromStore = useSelector((state: RootState) => state.auth.name);
  const emailFromStore = useSelector((state: RootState) => state.auth.email);
  const uploads = useSelector((state: RootState) => state.media.uploads);

  // Local state for form inputs
  const [name, setName] = useState(nameFromStore || '');
  const [email, setEmail] = useState(emailFromStore || '');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Sync local state with Redux store
  useEffect(() => {
    setName(nameFromStore || '');
    setEmail(emailFromStore || '');
  }, [nameFromStore, emailFromStore]);

  // Handle profile update with validation
  const handleUpdateProfile = useCallback(() => {
    if (!name || !email) {
      setError('Name and email are required.');
      return;
    }
    setError(null);
    setSuccess(null);
    dispatch(updateProfile({ name, email }));
    setSuccess('Profile updated successfully!');
    setTimeout(() => setSuccess(null), 3000); // Clear success message after 3 seconds
  }, [dispatch, name, email]);

  // Calculate statistics
  const totalUploads = uploads.length;
  const completedUploads = uploads.filter((u) => u.status === 'done').length;
  const failedUploads = uploads.filter((u) => u.status === 'error').length;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">User Profile</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">{success}</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Account Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <FaUser className="mr-2 text-blue-500" /> Account Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Enter your email"
              />
            </div>
            <button
              onClick={handleUpdateProfile}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Update Profile
            </button>
          </div>
        </div>

        {/* Upload History */}
        <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <FaHistory className="mr-2 text-blue-500" /> Upload History
          </h3>
          {uploads.length === 0 ? (
            <p className="text-gray-600">No uploads yet.</p>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              <ul className="space-y-4">
                {uploads.map((upload: MediaItem) => (
                  <li
                    key={upload.id}
                    className="border-b border-gray-200 pb-2 flex justify-between items-center"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-800">{upload.name}</p>
                      <p className="text-xs text-gray-500">
                        {upload.type} -{' '}
                        <span
                          className={
                            upload.status === 'done'
                              ? 'text-green-500'
                              : upload.status === 'error'
                              ? 'text-red-500'
                              : 'text-yellow-500'
                          }
                        >
                          {upload.status}
                        </span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Activity Statistics */}
        <div className="bg-white p-6 rounded-lg shadow-md md:col-span-3">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <FaChartBar className="mr-2 text-blue-500" /> Activity Statistics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-md">
              <p className="text-2xl font-bold text-blue-500">{totalUploads}</p>
              <p className="text-sm text-gray-600">Total Uploads</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-md">
              <p className="text-2xl font-bold text-green-500">{completedUploads}</p>
              <p className="text-sm text-gray-600">Completed Uploads</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-md">
              <p className="text-2xl font-bold text-red-500">{failedUploads}</p>
              <p className="text-sm text-gray-600">Failed Uploads</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(UserProfile);