import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import URLInput from '../components/URLInput';
import SummaryDisplay from '../components/SummaryDisplay';
import { addURL, setURLSummary } from '../store/mediaSlice';

const URLsView: React.FC = () => {
  const dispatch = useDispatch();
  const urls = useSelector((state: RootState) => state.media.urls);
  const [selectedURLId, setSelectedURLId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate fetching URL preview
  const handleFetch = (url: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const preview = {
        id: Date.now().toString(),
        url,
        title: `Simulated Title for ${url}`,
        description: 'Simulated description',
        image: 'https://via.placeholder.com/150',
      };
      dispatch(addURL(preview));
      setIsLoading(false);
    }, 1000);
  };

  // Summarize URL with mock data
  const handleSummarize = (id: string) => {
    const summary = `This is a simulated summary for URL ${id}.`;
    dispatch(setURLSummary({ id, summary }));
    setSelectedURLId(id);
  };

  const selectedURL = urls.find((u) => u.id === selectedURLId);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">URLs</h2>
      <URLInput onSubmit={handleFetch} isLoading={isLoading} />
      <div className="mt-6 space-y-4">
        {urls.map((u) => (
          <div key={u.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{u.title}</h3>
            <p className="text-sm text-gray-600">{u.description}</p>
            <img src={u.image} alt={u.title} className="mt-2 w-32 h-32 object-cover" />
            <button
              onClick={() => handleSummarize(u.id)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Summarize
            </button>
          </div>
        ))}
      </div>
      {selectedURL && selectedURL.summary && (
        <div className="mt-6">
          <SummaryDisplay
            summary={selectedURL.summary}
            onDownload={(format) => console.log(`Download summary as ${format}`)}
          />
        </div>
      )}
    </div>
  );
};

export default URLsView;