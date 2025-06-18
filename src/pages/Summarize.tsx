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
    <div className="pt-20 p-8 max-w-4xl mx-auto animate-fade-in">
      {/* Option Selector */}
      <div className="flex justify-center space-x-4 mb-8 animate-slide-down">
        <button
          onClick={() => setOption('url')}
          className={`btn ${option === 'url' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Parse URL
        </button>
        <button
          onClick={() => setOption('file')}
          className={`btn ${option === 'file' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Select Document
        </button>
        <button
          onClick={() => setOption('text')}
          className={`btn ${option === 'text' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Paste Text
        </button>
      </div>

      {/* Input Sections */}
      <div className="animate-slide-up">
        {option === 'url' && (
          <div className="flex flex-col items-center">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL"
              className="input mb-6"
            />
            <button
              onClick={handleSubmit}
              className="btn btn-primary"
            >
              Summarize
            </button>
          </div>
        )}

        {option === 'file' && (
          <div className="flex flex-col items-center">
            <div className="w-full max-w-md mb-6">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                className="input"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="btn btn-primary"
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
              className="input h-32 mb-6"
            />
            <button
              onClick={handleSubmit}
              className="btn btn-primary"
            >
              Summarize
            </button>
          </div>
        )}
      </div>

      {/* Summary Output */}
      {summary && (
        <div className="mt-8 card p-6 animate-fade-in">
          <h3 className="text-xl font-display font-bold mb-4 text-secondary-900">Summary</h3>
          <p className="text-secondary-700 leading-relaxed">{summary}</p>
        </div>
      )}
    </div>
  );
};

export default Summarize;