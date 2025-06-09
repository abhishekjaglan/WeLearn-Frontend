import { motion, AnimatePresence } from 'framer-motion';
import UrlInput from './UrlInput';
import DocumentUpload from './DocumentUpload';
import TextInput from './TextInput';
type InputMethod = 'url' | 'document' | 'text';

interface DynamicContentAreaProps {
    selectedMethod: InputMethod;
    isProcessing: boolean;
    hasSummary: boolean;
    onSubmit: (content: string, type: InputMethod) => void;
}

const DynamicContentArea = ({ selectedMethod, isProcessing, hasSummary, onSubmit }: DynamicContentAreaProps) => {
    const containerHeight = hasSummary ? 'h-48' : 'h-96';

    return (
        <motion.div
            className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-all duration-300 ${containerHeight}`}
            layout
        >
            <AnimatePresence mode="wait">
                {selectedMethod === 'url' && (
                    <UrlInput key="url" onSubmit={(url: any) => onSubmit(url, 'url')} isProcessing={isProcessing} />
                )}
                {selectedMethod === 'document' && (
                    <DocumentUpload key="document" onSubmit={(file: any) => onSubmit(file, 'document')} isProcessing={isProcessing} />
                )}
                {selectedMethod === 'text' && (
                    <TextInput key="text" onSubmit={(text: any) => onSubmit(text, 'text')} isProcessing={isProcessing} />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default DynamicContentArea;