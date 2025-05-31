import React, { useRef } from 'react';
import WeLearnButton from '../ui/WeLearnButton';
import WeLearnProgressBar from '../ui/WeLearnProgressBar';
import { useWeLearnFileUpload } from '../../hooks/useWeLearnFileUpload';
import { formatFileSize } from '../../utils/welearn-helpers';
interface WeLearnDocumentUploadProps {
    onFileUploaded?: (file: File) => void;
    className?: string;
}
const WeLearnDocumentUpload: React.FC<WeLearnDocumentUploadProps> = ({
    onFileUploaded,
    className = ''
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { file, progress, isUploading, error, uploadFile, resetUpload } = useWeLearnFileUpload();
    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            uploadFile(selectedFile);
            onFileUploaded?.(selectedFile);
        }
    };
    const containerStyle: React.CSSProperties = {
        padding: '24px',
        border: '2px dashed var(--wl-border-subtle)',
        borderRadius: 'var(--wl-radius-standard)',
        textAlign: 'center',
        backgroundColor: 'var(--wl-light-surface)',
        transition: 'border-color 0.3s ease'
    };

    return (
        <div className={`wl-document-upload ${className}`} style={containerStyle}>
            <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            {!file && (
                <div style={{ marginBottom: '16px' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        margin: '0 auto 12px',
                        backgroundColor: 'var(--wl-primary-dark)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <span style={{ color: 'white', fontSize: '24px' }}>📄</span>
                    </div>
                    <h3 style={{ margin: '0 0 8px 0' }}>Upload Document</h3>
                    <p style={{ color: 'var(--wl-text-secondary)', margin: '0 0 16px 0' }}>
                        Drag and drop or click to select PDF, DOC files
                    </p>
                </div>
            )}

            {!isUploading && !file && (
                <WeLearnButton onClick={handleButtonClick}>
                    Choose File
                </WeLearnButton>
            )}

            {file && (
                <div style={{ textAlign: 'left', marginBottom: '16px' }}>
                    <p style={{ fontWeight: 'bold', margin: '0 0 4px 0' }}>{file.name}</p>
                    <p style={{ fontSize: '14px', color: 'var(--wl-text-secondary)', margin: 0 }}>
                        {formatFileSize(file.size)}
                    </p>
                </div>
            )}
            {isUploading && (
                <WeLearnProgressBar
                    progress={progress}
                    label="Uploading..."
                    showPercentage
                />
            )}

            {error && (
                <div style={{
                    color: '#ef4444',
                    fontSize: '14px',
                    marginTop: '8px',
                    padding: '8px',
                    backgroundColor: '#fef2f2',
                    borderRadius: 'var(--wl-radius-standard)'
                }}>
                    {error}
                </div>
            )}

            {file && !isUploading && (
                <div style={{ marginTop: '16px' }}>
                    <WeLearnButton variant="secondary" onClick={resetUpload}>
                        Upload Different File
                    </WeLearnButton>
                </div>
            )}
        </div>
    );
};

export default WeLearnDocumentUpload;