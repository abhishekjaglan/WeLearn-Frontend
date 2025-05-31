import { useState, useCallback } from 'react';
import { validateFileType, validateFileSize } from '../utils/welearn-validators';
interface FileUploadState {
    file: File | null;
    progress: number;
    isUploading: boolean;
    error: string | null;
    uploadFile: (file: File) => Promise<void>;
    resetUpload: () => void;
}

export const useWeLearnFileUpload = (): FileUploadState => {
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const uploadFile = useCallback(async (selectedFile: File) => {
        setError(null);
        setFile(selectedFile);
        if (!validateFileType(selectedFile)) {
            setError('Invalid file type. Please upload PDF or DOC files.');
            return;
        }
        if (!validateFileSize(selectedFile)) {
            setError('File size too large. Maximum size is 10MB.');
            return;
        }
        setIsUploading(true);
        setProgress(0);

        // Simulate upload progress
        const simulateProgress = () => {
            let currentProgress = 0;
            const interval = setInterval(() => {
                currentProgress += Math.random() * 15;
                if (currentProgress >= 100) {
                    currentProgress = 100;
                    clearInterval(interval);
                    setIsUploading(false);
                }
                setProgress(currentProgress);
            }, 200);
        };

        simulateProgress();
    }, []);
    const resetUpload = useCallback(() => {
        setFile(null);
        setProgress(0);
        setIsUploading(false);
        setError(null);
    }, []);

    return {
        file,
        progress,
        isUploading,
        error,
        uploadFile,
        resetUpload
    };
};
