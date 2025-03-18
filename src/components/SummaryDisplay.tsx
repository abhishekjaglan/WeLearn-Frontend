import React from 'react';
import { FaFileDownload } from 'react-icons/fa';

interface SummaryDisplayProps {
  summary: string;
  onDownload: (format: 'txt' | 'pdf' | 'docx') => void;
}

const SummaryDisplay: React.FC<SummaryDisplayProps> = React.memo(({ summary, onDownload }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg mt-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Summary</h3>
      <p className="text-gray-700 mb-4">{summary}</p>
      <div className="flex space-x-4">
        <button
          onClick={() => onDownload('txt')}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          aria-label="Download summary as TXT"
        >
          <FaFileDownload /> <span>TXT</span>
        </button>
        <button
          onClick={() => onDownload('pdf')}
          className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
          aria-label="Download summary as PDF"
        >
          <FaFileDownload /> <span>PDF</span>
        </button>
        <button
          onClick={() => onDownload('docx')}
          className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
          aria-label="Download summary as DOCX"
        >
          <FaFileDownload /> <span>DOCX</span>
        </button>
      </div>
    </div>
  );
});

export default SummaryDisplay;