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
    <div className="pt-20">
      {/* Landing Section */}
      <div className="bg-gray-100 p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to WeLearn</h1>
        <button
          onClick={() => setPage('summarize')}
          className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
        >
          Start Summarizing
        </button>
      </div>
      {/* Activity Section */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Activity</h2>
        <div className="space-y-4">
          {activity.map(item => (
            <div key={item.id} className="p-4 bg-white shadow rounded">
              <p className="font-medium">{item.title}</p>
              <p className="text-gray-600 text-sm">{item.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;