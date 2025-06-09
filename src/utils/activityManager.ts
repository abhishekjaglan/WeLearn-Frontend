import type { ActivityItem } from '../types';

export const saveActivity = (activity: Omit<ActivityItem, 'id' | 'timestamp'>) => {
    const newActivity: ActivityItem = {
        ...activity,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
    };
    const existing = getActivities();
    const updated = [newActivity, ...existing].slice(0, 50); // Keep only last 50
    localStorage.setItem('welearn-activities', JSON.stringify(updated));
    return newActivity;
};

export const getActivities = (): ActivityItem[] => {
    try {
        const stored = localStorage.getItem('welearn-activities');
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};