import React, { useState } from 'react';

type InputMethod = 'url' | 'document' | 'text';
type DetailLevel = 'short' | 'medium' | 'detailed';

interface SummaryResult {
  summary: string;
  recordId: number;
}

const Summarize: React.FC = () => {
  const [activeMethod, setActiveMethod] = useState<InputMethod>('document');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [error, setError] = useState<string>('');

  // Form states
  // const [url, setUrl] = useState('');
  // const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [detailLevel, setDetailLevel] = useState<DetailLevel>('medium');
  const [userId, setUserId] = useState('demo-user-123'); // For demo purposes

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      let endpoint = '';
      let body: FormData | string = '';
      // let headers: HeadersInit = {};

      if (activeMethod === 'document' && file) {
        endpoint = 'http://localhost:3001/api/summarize';
        const formData = new FormData();
        formData.append('file', file);
        formData.append('data', JSON.stringify({
          detailLevel,
          userId
        }));
        body = formData;
        // Don't set Content-Type header for FormData, let browser set it with boundary
      } else if (activeMethod === 'url') {
        // URL and text methods would need separate backend endpoints
        // For now, focusing on document upload as requested
        throw new Error('URL summarization not implemented yet');
      } else if (activeMethod === 'text') {
        throw new Error('Text summarization not implemented yet');
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        body,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to generate summary');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const isSubmitDisabled = () => {
    if (loading) return true;
    if (activeMethod === 'document') return !file || !userId.trim();
    // Other methods disabled for now
    return true;
  };

  const getMethodIcon = (method: InputMethod) => {
    switch (method) {
      case 'url': return '🔗';
      case 'document': return '📄';
      case 'text': return '📝';
    }
  };

  const getMethodColor = (method: InputMethod) => {
    switch (method) {
      case 'url': return 'from-blue-500 to-cyan-500';
      case 'document': return 'from-green-500 to-emerald-500';
      case 'text': return 'from-purple-500 to-pink-500';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          AI-Powered Summarization
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose your input method and let our AI create intelligent summaries for you.
        </p>
      </div>

      {/* Method Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {(['url', 'document', 'text'] as InputMethod[]).map((method) => (
          <button
            key={method}
            onClick={() => setActiveMethod(method)}
            disabled={method !== 'document'} // Only document method implemented
            className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
              activeMethod === method
                ? 'border-transparent bg-gradient-to-r ' + getMethodColor(method) + ' text-white shadow-lg transform scale-105'
                : method === 'document' 
                  ? 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
                  : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
            }`}
          >
            <div className="text-3xl mb-2">{getMethodIcon(method)}</div>
            <h3 className="font-semibold text-lg capitalize mb-1">{method}</h3>
            <p className={`text-sm ${activeMethod === method ? 'text-white/80' : method === 'document' ? 'text-gray-600' : 'text-gray-400'}`}>
              {method === 'url' && 'Coming soon...'}
              {method === 'document' && 'Upload PDF, TXT, or DOCX'}
              {method === 'text' && 'Coming soon...'}
            </p>
          </button>
        ))}
      </div>

      {/* Configuration Section */}
      <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-6">Configuration</h3>
        
        {/* Detail Level Selection */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-4">
            📊 Summary Detail Level
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(['short', 'medium', 'detailed'] as DetailLevel[]).map((level) => (
              <button
                key={level}
                onClick={() => setDetailLevel(level)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  detailLevel === level
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 bg-white hover:border-purple-300 text-gray-600'
                }`}
              >
                <div className="font-semibold capitalize">{level}</div>
                <div className="text-sm">
                  {level === 'short' && 'Quick overview'}
                  {level === 'medium' && 'Balanced summary'}
                  {level === 'detailed' && 'Comprehensive analysis'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* User ID Input */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-4">
            👤 User ID
          </label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter your user ID"
            className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-purple-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-4">
            📄 Upload Document
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 transition-colors">
            <input
              type="file"
              accept=".pdf,.txt,.docx"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="text-4xl mb-4">📁</div>
              {file ? (
                <div>
                  <p className="text-lg text-green-600 font-medium mb-2">{file.name}</p>
                  <p className="text-sm text-gray-500">Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              ) : (
                <>
                  <p className="text-lg text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PDF, TXT, DOCX files supported</p>
                </>
              )}
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitDisabled()}
          className={`w-full mt-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
            isSubmitDisabled()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg transform hover:-translate-y-1'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent mr-3"></div>
              Processing Document...
            </div>
          ) : (
            'Summarize Document ✨'
          )}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-8">
          <div className="flex items-center">
            <span className="text-2xl mr-3">❌</span>
            <div>
              <h3 className="font-semibold text-red-800">Error</h3>
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Results Display */}
      {result && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl p-8">
          <div className="flex items-center mb-6">
            <span className="text-3xl mr-3">✨</span>
            <h3 className="text-2xl font-bold text-gray-800">Summary Generated!</h3>
          </div>
          
          <div className="bg-white rounded-xl p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold text-gray-700">Summary</h4>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                Detail Level: {detailLevel}
              </span>
            </div>
            <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap">{result.summary}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{result.recordId}</div>
              <div className="text-sm text-gray-600">Record ID</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{result.summary.length}</div>
              <div className="text-sm text-gray-600">Summary Length (chars)</div>
            </div>
          </div>

          {file && (
            <div className="mt-4 bg-white rounded-xl p-4">
              <h5 className="font-semibold text-gray-700 mb-2">Document Info</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Filename:</span> {file.name}
                </div>
                <div>
                  <span className="font-medium">Size:</span> {(file.size / 1024 / 1024).toFixed(2)} MB
                </div>
                <div>
                  <span className="font-medium">Type:</span> {file.type}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Summarize;