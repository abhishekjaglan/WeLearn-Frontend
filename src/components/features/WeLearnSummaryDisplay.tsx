import React, { useState, useEffect } from 'react';
import WeLearnCard from '../ui/WeLearnCard';
import WeLearnButton from '../ui/WeLearnButton';
import { WeLearnSummary } from '../../types/welearn-api.types';
import { useWeLearnApi } from '../../hooks/useWeLearnApi';

interface WeLearnSummaryDisplayProps {
    documentId?: string;
    summary?: WeLearnSummary;
    className?: string;
}

const WeLearnSummaryDisplay: React.FC<WeLearnSummaryDisplayProps> = ({
    documentId,
    summary: initialSummary,
    className = ''
}) => {
    const [summary, setSummary] = useState<WeLearnSummary | null>(initialSummary || null);
    const [summaryType, setSummaryType] = useState<'SHORT' | 'MEDIUM' | 'DETAILED'>('MEDIUM');
    const { isLoading, generateSummary } = useWeLearnApi();
    useEffect(() => {
        if (initialSummary) {
            setSummary(initialSummary);
        }
    }, [initialSummary]);

    const handleGenerateSummary = async () => {
        if (!documentId) return;

        const newSummary = await generateSummary(documentId, summaryType);
        if (newSummary) {
            setSummary(newSummary);
        }
    };
    if (!documentId && !summary) {
        return (
            <WeLearnCard className={className} padding="large">
                <div style={{ textAlign: 'center', color: 'var(--wl-text-secondary)' }}>
                    <p>No document selected for summary generation.</p>
                </div>
            </WeLearnCard>
        );
    }

    return (
        <WeLearnCard className={className} variant="elevated" padding="large">
            <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
                    Document Summary
                </h3>

                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                    {(['SHORT', 'MEDIUM', 'DETAILED'] as const).map((type) => (
                        <WeLearnButton
                            key={type}
                            variant={summaryType === type ? 'primary' : 'secondary'}
                            size="small"
                            onClick={() => setSummaryType(type)}
                        >
                            {type}
                        </WeLearnButton>
                    ))}
                </div>

                <WeLearnButton
                    onClick={handleGenerateSummary}
                    isLoading={isLoading}
                    disabled={!documentId}
                >
                    {isLoading ? 'Generating...' : 'Generate Summary'}
                </WeLearnButton>
            </div>
            {summary && (
                <div style={{
                    padding: '20px',
                    backgroundColor: 'var(--wl-light-surface)',
                    borderRadius: 'var(--wl-radius-standard)',
                    borderLeft: '4px solid var(--wl-primary-dark)'
                }}>
                    <div style={{ marginBottom: '12px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--wl-text-secondary)' }}>
                            {summary.summaryType} SUMMARY
                        </span>
                    </div>
                    <div style={{ lineHeight: '1.6', color: 'var(--wl-text-dark)' }}>
                        {summary.content}
                    </div>
                </div>
            )}
        </WeLearnCard>
    );
};

export default WeLearnSummaryDisplay;