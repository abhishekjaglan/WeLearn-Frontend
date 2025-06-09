import { motion } from 'framer-motion';
import type { ActivityItem } from '../../types';

interface ActivityCardProps {
    activity: ActivityItem;
    index: number;
}

const ActivityCard = ({ activity, index }: ActivityCardProps) => {
    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'url':
                return '🔗';
            case 'file':
                return '📄';
            case 'text':
                return '📝';
            default:
                return '📋';
        }
    };

    const formatTime = (timestamp: string) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    return (
        <motion.div
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
        >
            <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                    <span className="text-2xl">{getTypeIcon(activity.type)}</span>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                            {activity.fileName}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                            {formatTime(activity.timestamp)}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-end text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {activity.type.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                        {activity.processingTime}ms
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default ActivityCard;