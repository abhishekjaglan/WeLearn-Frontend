import React, { useEffect, useState } from 'react';

interface ActivityItem {
  id: string;
  type: 'url' | 'document' | 'text';
  title: string;
  summary: string;
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      // Replace with your actual backend endpoint
      const response = await fetch('http://localhost:5000/api/activities');
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'url':
        return '🔗';
      case 'document':
        return '📄';
      case 'text':
        return '📝';
      default:
        return '📄';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'url':
        return 'from-blue-400 to-cyan-400';
      case 'document':
        return 'from-green-400 to-emerald-400';
      case 'text':
        return 'from-purple-400 to-pink-400';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-12">
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to WeLearn! 🚀
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl">
            Transform any content into concise, intelligent summaries. Paste URLs, upload documents, or input text directly.
          </p>
        </div>
      </div>

      {/* Activity Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="mr-3">📊</span>
          Your Activity
        </h2>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌟</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No summaries yet!</h3>
            <p className="text-gray-500">Start by creating your first summary using the Summarize tab.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getTypeColor(activity.type)} flex items-center justify-center text-2xl`}>
                    {getTypeIcon(activity.type)}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(activity.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                  {activity.title}
                </h3>
                
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {activity.summary}
                </p>
                
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getTypeColor(activity.type)} text-white`}>
                  {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;