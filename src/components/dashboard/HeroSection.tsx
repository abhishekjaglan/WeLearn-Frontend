import { motion } from 'framer-motion';

const HeroSection = () => {
    return (
        <motion.section
            className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Welcome to WeLearn
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Transform your documents, URLs, and text into concise summaries with AI-powered intelligence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center">
                        <h3 className="font-semibold text-gray-800">Multiple Formats</h3>
                        <p className="text-sm text-gray-600">URLs, Documents & Text</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center">
                        <h3 className="font-semibold text-gray-800">AI Powered</h3>
                        <p className="text-sm text-gray-600">Advanced summarization</p>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default HeroSection;