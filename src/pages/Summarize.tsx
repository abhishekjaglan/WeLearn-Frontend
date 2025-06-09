import { useState } from 'react';
import { motion } from 'framer-motion';

type InputMethod = 'url' | 'document' | 'text';
type DetailLevel = 'short' | 'medium' | 'detailed';
const Summarize = () => {
  const [selectedMethod, setSelectedMethod] = useState<InputMethod>('url');
  const [detailLevel, setDetailLevel] = useState<DetailLevel>('medium');
  const [isProcessing, setIsProcessing] = useState(false);
    const [summary, setSummary] = useState<string | null>(null);

  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-8"
            initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    ></motion.div>
)
}