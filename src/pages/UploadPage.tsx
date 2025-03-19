import React, { useState, useCallback, useRef, useMemo, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store'; // From index.ts

import { FaFileAlt, FaLink, FaHeadphones, FaVideo, FaUpload } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion'; // For animations
import { addUpload, updateUploadStatus } from '../store/uploadSlice';

// Define supported media types
const mediaTypes: Record<string, string[]> = {
  document: ['.pdf', '.doc', '.docx', '.txt'],
  url: [],
  audio: ['.mp3', '.wav'],
  video: ['.mp4', '.mov'],
};

// Interface for upload items (assuming this matches mediaSlice)
interface UploadItem {
  id: string;
  name: string;
  type: string;
  progress: number;
  status: 'pending' | 'uploading' | 'done' | 'error';
}

const UploadPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const uploads = useSelector((state: RootState) => state.upload.uploads || []);
  const [selectedType, setSelectedType] = useState<'document' | 'url' | 'audio' | 'video'>('document');
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Memoize accepted file types to avoid recalculating
  const acceptedTypes = useMemo(() => mediaTypes[selectedType].join(','), [selectedType]);

  // Handle file upload with simulated progress
  const handleFileUpload = useCallback(
    (files: FileList) => {
      Array.from(files).forEach((file) => {
        const id = `${Date.now()}-${file.name}`;
        const uploadItem: UploadItem = { id, name: file.name, type: file.type, progress: 0, status: 'pending' };
        dispatch(addUpload(uploadItem));

        // Simulate upload process
        setTimeout(() => {
          dispatch(updateUploadStatus({ id, status: 'uploading' }));
          let progress = 0;
          const interval = setInterval(() => {
            progress += 20;
            dispatch(updateUploadStatus({ id, progress }));
            if (progress >= 100) {
              clearInterval(interval);
              dispatch(updateUploadStatus({ id, status: 'done', progress: 100 }));
            }
          }, 500);
        }, 1000);
      });
    },
    [dispatch]
  );

  // Handle URL submission with simulated progress
  const handleUrlSubmit = useCallback(() => {
    if (!urlInput.trim()) return;
    const id = `${Date.now()}-${urlInput}`;
    const uploadItem: UploadItem = { id, name: urlInput, type: 'url', progress: 0, status: 'pending' };
    dispatch(addUpload(uploadItem));

    // Simulate URL processing
    setTimeout(() => {
      dispatch(updateUploadStatus({ id, status: 'uploading' }));
      let progress = 0;
      const interval = setInterval(() => {
        progress += 25;
        dispatch(updateUploadStatus({ id, progress }));
        if (progress >= 100) {
          clearInterval(interval);
          dispatch(updateUploadStatus({ id, status: 'done', progress: 100 }));
        }
      }, 400);
    }, 1000);

    setUrlInput('');
  }, [dispatch, urlInput]);

  // Trigger file input click
  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Upload Media</h2>

      {/* Media Type Selection */}
      <div className="flex flex-wrap gap-4 mb-6">
        {(['document', 'url', 'audio', 'video'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
              selectedType === type
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {type === 'document' && <FaFileAlt className="mr-2" />}
            {type === 'url' && <FaLink className="mr-2" />}
            {type === 'audio' && <FaHeadphones className="mr-2" />}
            {type === 'video' && <FaVideo className="mr-2" />}
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Upload Input */}
      {selectedType === 'url' ? (
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Enter URL (e.g., https://example.com)"
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleUrlSubmit}
            disabled={!urlInput.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 transition-colors duration-200"
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="mb-6">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
            accept={acceptedTypes}
            className="hidden"
            multiple
          />
          <button
            onClick={triggerFileInput}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            <FaUpload className="mr-2" />
            Upload {selectedType}
          </button>
        </div>
      )}

      {/* Upload Queue */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Upload Queue</h3>
        <AnimatePresence>
          {uploads.length === 0 ? (
            <p className="text-gray-500">No uploads in progress.</p>
          ) : (
            uploads.map((upload) => (
              <motion.div
                key={upload.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-4 p-4 bg-white rounded-md shadow-sm mb-4"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{upload.name}</p>
                  <p className="text-xs text-gray-500">{upload.type || selectedType}</p>
                </div>
                <div className="w-1/3">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${upload.progress}%` }}
                      className="h-full bg-blue-500 transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="text-sm capitalize min-w-[80px] text-right">
                  {upload.status === 'done' ? (
                    <span className="text-green-600">✓ Done</span>
                  ) : upload.status === 'error' ? (
                    <span className="text-red-600">✗ Error</span>
                  ) : (
                    <span className="text-blue-600">{upload.status}</span>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(UploadPage);