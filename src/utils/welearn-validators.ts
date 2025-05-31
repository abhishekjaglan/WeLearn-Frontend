export const validateUrl = (url: string): boolean => {
    try {
        new URL(url);

        return true;
    } catch {
        return false;
    }
};
export const validateFileType = (file: File): boolean => {
    const allowedTypes = ['application/pdf', 'application/msword'];
    return allowedTypes.includes(file.type);
};

export const validateFileSize = (file: File, maxSizeMB: number = 10): boolean => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxSizeBytes;
};

export const getFileExtension = (fileName: string): string => {
    return fileName.split('.').pop()?.toLowerCase() || '';
};

export const validateDocumentUrl = (url: string): { isValid: boolean; message?: string } => {
    if (!validateUrl(url)) {
        return { isValid: false, message: 'Invalid URL format' };
    }

    const supportedExtensions = ['.pdf', '.doc', '.docx'];
    const hasValidExtension = supportedExtensions.some(ext => url.toLowerCase().includes(ext));
    if (!hasValidExtension) {
        return { isValid: false, message: 'URL must point to a PDF or DOC file' };
    }

    return { isValid: true };
};
