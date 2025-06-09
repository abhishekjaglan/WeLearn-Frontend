import { useState } from 'react';
import { motion } from 'framer-motion';
import InputMethodSelector from '../components/summarize/InputMethodSelector';
import DynamicContentArea from '../components/summarize/DynamicContentArea';
import DetailLevelSelector from '../components/summarize/DetailLevelSelector';

type InputMethod = 'url' | 'document' | 'text';
type DetailLevel = 'short' | 'medium' | 'detailed';

const Summarize = () => {
  const [selectedMethod, setSelectedMethod] = useState<InputMethod>('url');
  const [detailLevel, setDetailLevel] = useState<DetailLevel>('medium');
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  const handleSubmit = (content: string, type: InputMethod) => {
    console.log('Submitting:', { content, type, detailLevel });
    // Will implement API calls in Phase 8
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Summarize Content</h1>
          <p className="text-gray-600">Choose your input method and get AI-powered summaries</p>
        </div>
        <div className="space-y-6">
          <InputMethodSelector
            selectedMethod={selectedMethod}
            onMethodChange={setSelectedMethod}
          />
          <DynamicContentArea
            selectedMethod={selectedMethod}
            isProcessing={isProcessing}
            hasSummary={!!summary}
            onSubmit={handleSubmit}
          />

          <DetailLevelSelector
            selectedLevel={detailLevel}
            onLevelChange={setDetailLevel}
            isCompressed={!!summary}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Summarize;
