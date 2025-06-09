import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { ActivityItem } from '../../types';
import ActivityCard from './ActivityCard';
const ActivityFeed = () => {
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load activities from localStorage
        const loadActivities = () => {
            try {
                const stored = localStorage.getItem('welearn-activities');
                const parsedActivities = stored ? JSON.parse(stored) : [];
                setActivities(parsedActivities);
            } catch (error) {
                console.error('Error loading activities:', error);
                setActivities([]);
            } finally {
                setLoading(false);
            }
        };
        loadActivities();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (activities.length === 0) {
        return (
            <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-gray-400 text-6xl mb-4">📋</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No activity yet</h3>
                <p className="text-gray-500 mb-6">Start summarizing content to see your activity here.</p>
            </motion.div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="grid gap-4">
                {activities.map((activity, index) => (
                    <ActivityCard key={activity.id} activity={activity} index={index} />
                ))}
            </div>
        </div>
    );
};

export default ActivityFeed;