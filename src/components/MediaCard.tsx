import React from 'react';
import { FaFileAlt, FaDownload, FaEye, FaMagic } from 'react-icons/fa';
import { MediaCardProps } from '../types';

const MediaCard: React.FC<MediaCardProps> = React.memo(
  ({ id, name, type, date, onView, onDownload, onSummarize }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center space-x-4">
          <FaFileAlt className="text-4xl text-gray-500" aria-hidden="true" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-600">{type}</p>
            <p className="text-xs text-gray-500">{date}</p>
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          <button
            onClick={onView}
            className="p-2 text-blue-500 hover:text-blue-700 transition-colors duration-200"
            aria-label={`View ${name}`}
          >
            <FaEye />
          </button>
          <button
            onClick={onDownload}
            className="p-2 text-green-500 hover:text-green-700 transition-colors duration-200"
            aria-label={`Download ${name}`}
          >
            <FaDownload />
          </button>
          <button
            onClick={onSummarize}
            className="p-2 text-purple-500 hover:text-purple-700 transition-colors duration-200"
            aria-label={`Summarize ${name}`}
          >
            <FaMagic />
          </button>
        </div>
      </div>
    );
  }
);

export default MediaCard;