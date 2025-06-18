import React, { useState, useEffect } from 'react';
import type { Page } from '../App';

interface ActivityItem {
  id: number;
  title: string;
  timestamp: string;
}

interface DashboardProps {
  setPage: (page: Page) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setPage }) => {
  const [activity, setActivity] = useState<ActivityItem[]>([]);

  useEffect(() => {
    // Mock API call for activity
    setActivity([
      { id: 1, title: "Example.com", timestamp: "Oct 20, 2023, 3:45 PM" },
      { id: 2, title: "Pasted Text", timestamp: "Oct 19, 2023, 10:12 AM" }
    ]);
  }, []);

  return (
    <div className="pt-20 animate-fade-in">
      {/* Landing Section */}
      <div className="bg-primary-50 p-8 text-center animate-slide-down">
        <h1 className="text-4xl font-display font-bold mb-6 text-primary-900">Welcome to WeLearn</h1>
        <p className="text-secondary-600 mb-8 max-w-2xl mx-auto">
          Your AI-powered learning companion. Get instant summaries and insights from any content.
        </p>
        <button
          onClick={() => setPage('summarize')}
          className="btn btn-primary text-lg px-8 py-3"
        >
          Start Summarizing
        </button>
      </div>

      {/* Activity Section */}
      <div className="p-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-display font-bold mb-6 text-secondary-900">Your Activity</h2>
        <div className="space-y-4">
          {activity.map(item => (
            <div 
              key={item.id} 
              className="card p-6 hover:shadow-lg transition-all duration-200 animate-slide-up"
            >
              <p className="font-medium text-lg text-secondary-900">{item.title}</p>
              <p className="text-secondary-500 text-sm mt-1">{item.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;