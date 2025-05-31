export interface WeLearnDocument {
    id: string;
    title: string;
    url?: string;
    fileName?: string;
    fileSize?: number;
    status: 'pending' | 'processing' | 'completed' | 'error';
    createdAt: Date;
    summary?: string;
}

export interface WeLearnSummary {
    id: string;
    documentId: string;
    content: string;
    summaryType: 'SHORT' | 'MEDIUM' | 'DETAILED';
    extractedText?: string;
}

export interface WeLearnApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}
