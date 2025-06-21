import React, { useState } from 'react';

type InputMethod = 'url' | 'document' | 'text';

interface SummaryResult {
  summary: string;
  originalLength: number;
  summaryLength: number;
}

const Summarize: React.FC = () => {
  const [activeMethod, setActiveMethod] = useState<InputMethod>('url');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [error, setError] = useState<string>('');

  // Form states
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      let endpoint = '';
      let body: FormData | string = '';
      let headers: HeadersInit = {};

      if (activeMethod === 'url') {
        endpoint = 'http://localhost:5000/api/summarize/url';
        headers = { 'Content-Type': 'application/json' };
        body = JSON.stringify({ url });
      } else if (activeMethod === 'text') {
        endpoint = 'http://localhost:5000/api/summarize/text';
        headers = { 'Content-Type': 'application/json' };
        body = JSON.stringify({ text });
      } else if (activeMethod === 'document' && file) {
        endpoint = 'http://localhost:5000/api/summarize/document';
        const formData = new FormData();
        formData.append('document', file);
        body = formData;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body,
      });

      if (!response.ok) {
        throw new Error('Failed to generate summary');
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
    if (activeMethod === 'url') return !url.trim();
    if (activeMethod === 'text') return !text.trim();
    if (activeMethod === 'document') return !file;
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
            className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
              activeMethod === method
                ? 'border-transparent bg-gradient-to-r ' + getMethodColor(method) + ' text-white shadow-lg transform scale-105'
                : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
            }`}
          >
            <div className="text-3xl mb-2">{getMethodIcon(method)}</div>
            <h3 className="font-semibold text-lg capitalize mb-1">{method}</h3>
            <p className={`text-sm ${activeMethod === method ? 'text-white/80' : 'text-gray-600'}`}>
              {method === 'url' && 'Paste any URL to summarize'}
              {method === 'document' && 'Upload PDF, TXT, or DOCX'}
              {method === 'text' && 'Type or paste your text'}
            </p>
          </button>
        ))}
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
        {activeMethod === 'url' && (
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              🔗 Enter URL to Summarize
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/article"
              className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
        )}

        {activeMethod === 'document' && (
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
                  <p className="text-lg text-green-600 font-medium">{file.name}</p>
                ) : (
                  <>
                    <p className="text-lg text-gray-600 mb-2">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PDF, TXT, DOCX files supported</p>
                  </>
                )}
              </label>
            </div>
          </div>
        )}

        {activeMethod === 'text' && (
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              📝 Enter Text to Summarize
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your text here..."
              rows={8}
              className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-purple-500 focus:outline-none transition-colors resize-none"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitDisabled()}
          className={`w-full mt-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
            isSubmitDisabled()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r ' + getMethodColor(activeMethod) + ' text-white hover:shadow-lg transform hover:-translate-y-1'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent mr-3"></div>
              Generating Summary...
            </div>
          ) : (
            'Generate Summary ✨'
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
            <p className="text-gray-800 leading-relaxed text-lg">{result.summary}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{result.originalLength}</div>
              <div className="text-sm text-gray-600">Original Length</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{result.summaryLength}</div>
              <div className="text-sm text-gray-600">Summary Length</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Summarize;