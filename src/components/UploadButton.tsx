import React, { useRef } from 'react';
import { FaUpload } from 'react-icons/fa';

interface UploadButtonProps {
  onUpload: (files: FileList) => void;
  accept?: string;
}

const UploadButton: React.FC<UploadButtonProps> = React.memo(({ onUpload, accept }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onUpload(e.target.files);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        aria-label="Upload files"
      >
        <FaUpload /> <span>Upload</span>
      </button>
      <input
        type="file"
        ref={inputRef}
        onChange={handleChange}
        accept={accept}
        multiple
        className="hidden"
        aria-hidden="true"
      />
    </div>
  );
});

export default UploadButton;