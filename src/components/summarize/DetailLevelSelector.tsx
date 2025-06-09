import { motion } from 'framer-motion';
import { DETAIL_LEVELS } from '../../utils/constants.ts';

type DetailLevel = 'short' | 'medium' | 'detailed';
interface DetailLevelSelectorProps {
    selectedLevel: DetailLevel;
    onLevelChange: (level: DetailLevel) => void;
    isCompressed?: boolean;
}
const DetailLevelSelector = ({ selectedLevel, onLevelChange, isCompressed = false }: DetailLevelSelectorProps) => {
    const levels: DetailLevel[] = ['short', 'medium', 'detailed'];

    return (
        <motion.div
            className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 transition-all duration-300 ${isCompressed ? 'py-3' : 'py-6'
                }`}
            layout
        >
            <h3 className={`font-medium text-gray-900 mb-3 ${isCompressed ? 'text-sm' : 'text-base'}`}>
                Detail Level
            </h3>
            <div className="flex space-x-2">
                {levels.map((level) => (
                    <button
                        key={level}
                        onClick={() => onLevelChange(level)}
                        className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${selectedLevel === level
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {DETAIL_LEVELS[level]}
                    </button>
                ))}
            </div>
        </motion.div>
    );
};

export default DetailLevelSelector;