import { motion } from 'framer-motion';
import HeroSection from '../components/dashboard/HeroSection';
import ActivityFeed from '../components/dashboard/ActivityFeed';
const Dashboard = () => {
    return (
        <motion.div
            className="min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <HeroSection />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <ActivityFeed />
            </div>
        </motion.div>
    );
};

export default Dashboard;