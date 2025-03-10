import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import StatsCard from '../components/StatsCard';
import UploadSection from '../components/UploadSection';
import { FaFileAlt, FaHeadphones, FaVideo } from 'react-icons/fa';

const Dashboard: React.FC = () => {
  const { uploads } = useSelector((state: RootState) => state.media);

  const stats = [
    { title: 'Total Uploads', value: uploads.length, icon: <FaFileAlt /> },
    {
      title: 'Documents',
      value: uploads.filter((u) => u.type.startsWith('application')).length,
      icon: <FaFileAlt />,
    },
    {
      title: 'Audio',
      value: uploads.filter((u) => u.type.startsWith('audio')).length,
      icon: <FaHeadphones />,
    },
    {
      title: 'Video',
      value: uploads.filter((u) => u.type.startsWith('video')).length,
      icon: <FaVideo />,
    },
  ];

  return (
    <div className="p-6 md:p-10 lg:p-12 bg-[#EDF2F7] min-h-screen">
      <h1 className="text-4xl font-bold text-[#2B2D42] mb-8">Welcome to Your Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <StatsCard key={stat.title} title={stat.title} value={stat.value} icon={stat.icon} />
        ))}
      </div>

      {/* Upload Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-10">
        <h2 className="text-2xl font-semibold text-[#2B2D42] mb-4">Upload Your Media</h2>
        <UploadSection />
      </div>

      {/* Recent Activity Section */}
      <div>
        <h2 className="text-2xl font-semibold text-[#2B2D42] mb-4">Recent Activity</h2>
        {uploads.length === 0 ? (
          <p className="text-gray-600 italic">No recent uploads yet. Start by uploading a file!</p>
        ) : (
          <div className="space-y-4">
            {uploads.map((upload) => (
              <div
                key={upload.id}
                className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center transition-transform duration-200 hover:scale-[1.01]"
              >
                <div>
                  <p className="text-sm font-medium text-[#2B2D42] truncate max-w-xs">
                    {upload.name}
                  </p>
                  <p className="text-xs text-gray-500">{upload.type}</p>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    upload.status === 'done'
                      ? 'bg-green-100 text-green-800'
                      : upload.status === 'uploading'
                      ? 'bg-yellow-100 text-yellow-800'
                      : upload.status === 'error'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {upload.status.charAt(0).toUpperCase() + upload.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

Dashboard.displayName = 'Dashboard';

export default Dashboard;