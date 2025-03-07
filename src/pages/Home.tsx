import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Home: React.FC = () => {
  const [summary, setSummary] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState('');

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) formData.append('file', file);
    if (url) formData.append('url', url);
    try {
      const response = await fetch('http://localhost:5000/api/summarize', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setSummary(data.summary || 'Sample summary generated.');
    } catch (error) {
      alert('Upload failed!');
    }
  };

  const handleDownload = (format: string) => {
    const blob = new Blob([summary], { type: `text/${format}` });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `summary.${format}`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />
      <div className="p-6 ml-0 md:ml-64 flex flex-col items-center pt-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Upload Media</h1>
        {!summary ? (
          <form onSubmit={handleUpload} className="w-full max-w-md">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              className="mb-4 w-full p-2 border rounded"
            />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL"
              className="mb-4 w-full p-2 border rounded"
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
              Generate Summary
            </button>
          </form>
        ) : (
          <div className="w-full max-w-2xl">
            <p className="text-gray-800 mb-4 bg-white p-4 rounded shadow-md">{summary}</p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleDownload('txt')}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Download Text
              </button>
            </div>
            <button
              onClick={() => setSummary('')}
              className="mt-4 text-blue-500 hover:underline"
            >
              Upload Another
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;