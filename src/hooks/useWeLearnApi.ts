import { useState, useCallback } from 'react';
import { WeLearnApiResponse, WeLearnDocument, WeLearnSummary } from '../types/welearn-api.types';
interface ApiState {
    isLoading: boolean;
    error: string | null;
    processDocument: (url: string) => Promise<WeLearnDocument | null>;
    generateSummary: (documentId: string, type: string) => Promise<WeLearnSummary | null>;
    clearError: () => void;
}
export const useWeLearnApi = (): ApiState => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const processDocument = useCallback(async (url: string): Promise<WeLearnDocument | null> => {
        setIsLoading(true);
        setError(null);
        try {
            // TODO: Replace with actual API call
            const response = await fetch('/api/documents/process', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });
            if (!response.ok) {
                throw new Error('Failed to process document');
            }

            const data: WeLearnApiResponse<WeLearnDocument> = await response.json();
            return data.data || null;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const generateSummary = useCallback(async (documentId: string, type: string): Promise<WeLearnSummary | null> => {
        setIsLoading(true);
        setError(null);

        try {
            // TODO: Replace with actual API call
            const response = await fetch(`/api/documents/${documentId}/summary`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ summaryType: type })
            });

            if (!response.ok) {
                throw new Error('Failed to generate summary');
            }
            const data: WeLearnApiResponse<WeLearnSummary> = await response.json();
            return data.data || null;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);
    const clearError = useCallback(() => {
        setError(null);
    }, []);
    return {
        isLoading,
        error,
        processDocument,
        generateSummary,
        clearError
    };
};