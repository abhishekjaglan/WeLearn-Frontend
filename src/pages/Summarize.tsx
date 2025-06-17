import React, { useState } from 'react';

type SummarizeOption = 'url' | 'file' | 'text';

const Summarize: React.FC = () => {
  const [option, setOption] = useState<SummarizeOption>('url');
  const [url, setUrl] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>('');
  const [summary, setSummary] = useState<string>('');

  const handleSubmit = async () => {
    let data: any;
    if (option === 'url') data = { url };
    else if (option === 'file') data = { file: file ? file.name : '' };
    else data = { text };

    // Mock API call
    setSummary(`Summary of ${option === 'url' ? url : option === 'file' ? (file ? file.name : 'no file') : 'pasted text'}`);
  };

  return (
    <div className="pt-20 p-6">
      {/* Option Selector */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setOption('url')}
          className={`px-4 py-2 ${option === 'url' ? 'bg-teal-500 text-white' : 'bg-gray-200'}`}
        >
          Parse URL
        </button>
        <button
          onClick={() => setOption('file')}
          className={`px-4 py-2 ${option === 'file' ? 'bg-teal-500 text-white' : 'bg-gray-200'}`}
        >
          Select Document
        </button>
        <button
          onClick={() => setOption('text')}
          className={`px-4 py-2 ${option === 'text' ? 'bg-teal-500 text-white' : 'bg-gray-200'}`}
        >
          Paste Text
        </button>
      </div>
      {/* Input Sections */}
      {option === 'url' && (
        <div className="flex flex-col items-center">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            className="w-full max-w-md p-2 border rounded mb-4"
          />
          <button
            onClick={handleSubmit}
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
          >
            Summarize
          </button>
        </div>
      )}
      {option === 'file' && (
        <div className="flex flex-col items-center">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            className="mb-4"
          />
          <button
            onClick={handleSubmit}
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
          >
            Summarize
          </button>
        </div>
      )}
      {option === 'text' && (
        <div className="flex flex-col items-center">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here"
            className="w-full max-w-md p-2 border rounded mb-4 h-32"
          />
          <button
            onClick={handleSubmit}
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
          >
            Summarize
          </button>
        </div>
      )}
      {/* Summary Output */}
      {summary && (
        <div className="mt-6 p-4 bg-gray-100 rounded">{summary}</div>
      )}
    </div>
  );
};

export default Summarize;