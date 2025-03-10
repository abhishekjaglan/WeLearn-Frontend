import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMediaUpload } from '../hooks/useMediaUpload';
import { FaUpload } from 'react-icons/fa';

const UploadSection: React.FC = React.memo(() => {
  const { uploadMedia } = useMediaUpload();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => uploadMedia(file));
    },
    [uploadMedia]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc', '.docx'],
      'image/*': ['.jpg', '.jpeg', '.png'],
      'text/plain': ['.txt'],
      'audio/*': ['.mp3'],
      'video/*': ['.mp4'],
    },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`p-8 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all duration-300 ${
        isDragActive
          ? 'border-[#C3447A] bg-gray-100'
          : 'border-gray-300 hover:border-[#8D5524] hover:bg-gray-50'
      }`}
    >
      <input {...getInputProps()} />
      <FaUpload className="text-5xl text-[#8D5524] mx-auto mb-4" />
      <p className="text-lg font-semibold text-[#2B2D42]">
        {isDragActive ? 'Drop your files here' : 'Drag & drop or click to upload'}
      </p>
      <p className="text-sm text-gray-600 mt-2">
        Supports PDF, DOCX, JPG, PNG, TXT, MP3, MP4
      </p>
    </div>
  );
});

UploadSection.displayName = 'UploadSection';

export default UploadSection;