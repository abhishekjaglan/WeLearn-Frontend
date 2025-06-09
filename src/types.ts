export interface SummarizationRequest {
  content: string;
  type: 'url' | 'file' | 'text';
    detailLevel: 'short' | 'medium' | 'detailed';
}

export interface SummarizationResponse {
  summary: string;
    processingTime: number;
  timestamp: string;
}
export interface ActivityItem {
  id: string;
  fileName: string;
  type: 'url' | 'file' | 'text';
    timestamp: string;
  processingTime: number;
  summary?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
    error?: string;
  message?: string;
}
