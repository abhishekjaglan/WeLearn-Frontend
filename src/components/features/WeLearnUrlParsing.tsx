import React, { useState } from 'react';
import WeLearnInput from '../ui/WeLearnInput';
import { validateUrl } from '../../utils/welearn-validators';
import { useWeLearnApi } from '../../hooks/useWeLearnApi';
import WeLearnButton from '../ui/WeLearnButton';

interface WeLearnUrlParsingProps {
    onDocumentProcessed?: (documentId: string) => void;
    className?: string;
}

const WeLearnUrlParsing: React.FC<WeLearnUrlParsingProps> = ({
    onDocumentProcessed,
    className = ''
}) => {
    const [url, setUrl] = useState('');
    const [urlError, setUrlError] = useState('');
    const { isLoading, error, processDocument, clearError } = useWeLearnApi();
    
    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUrl(value);
        if (value && !validateUrl(value)) {
            setUrlError('Please enter a valid URL');
        } else {
            setUrlError('');
        }
        if (error) {
            clearError();
        }
    };

    const handleSubmit = async () => {
    if (!url.trim() || urlError) return;

    const document = await processDocument(url);
    if (document) {
        onDocumentProcessed?.(document.id);
        setUrl('');
    }
};

return (
    <div className={`wl-url-parsing ${className}`}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>
            Process Document from URL
        </h3>
        <div style={{ marginBottom: '16px' }}>
            <WeLearnInput
                label="Document URL"
                placeholder="https://example.com/document.pdf"
                value={url}
                onChange={handleUrlChange}
                error={urlError}
                fullWidth
            />
        </div>

        {error && (
            <div style={{
                color: '#ef4444',
                fontSize: '14px',
                marginBottom: '16px',
                padding: '12px',
                backgroundColor: '#fef2f2',
                borderRadius: 'var(--wl-radius-standard)',
                border: '1px solid #fecaca'
            }}>
                {error}
            </div>
        )}
        <WeLearnButton
            variant="primary"
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={!url.trim() || !!urlError}
            fullWidth
        >
            {isLoading ? 'Processing...' : 'Process Document'}
        </WeLearnButton>
    </div>
);
};

export default WeLearnUrlParsing;