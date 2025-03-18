import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import MediaCard from '../components/MediaCard';
import UploadButton from '../components/UploadButton';
import SummaryDisplay from '../components/SummaryDisplay';
import { addUpload, setDocumentSummary, updateUploadStatus } from '../store/mediaSlice';

const DocumentsView: React.FC = () => {
  const dispatch = useDispatch();
  const documents = useSelector((state: RootState) => state.media.documents);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);

  // Handle document upload
  const handleUpload = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const id = `${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
      dispatch(addUpload({ id, name: file.name, type: file.type }));
      // Simulate upload process
      setTimeout(() => {
        dispatch(updateUploadStatus({ id, status: 'uploading' }));
        setTimeout(() => {
          dispatch(updateUploadStatus({ id, status: 'done' })); // Moves to documents in slice
        }, 2000);
      }, 1000);
    });
  };

  // Open document in new tab
  const handleView = (url: string) => {
    window.open(url, '_blank');
  };

  // Trigger document download
  const handleDownload = (url: string, name: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Summarize document with mock data
  const handleSummarize = (id: string) => {
    const summary = `This is a simulated summary for document ${id}.`;
    dispatch(setDocumentSummary({ id, summary }));
    setSelectedDocumentId(id);
  };

  const selectedDocument = documents.find((doc) => doc.id === selectedDocumentId);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Documents</h2>
      <UploadButton onUpload={handleUpload} accept=".pdf,.doc,.docx,.txt" />
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <MediaCard
            key={doc.id}
            id={doc.id}
            name={doc.name}
            type={doc.type}
            date={doc.date}
            onView={() => handleView(doc.url)}
            onDownload={() => handleDownload(doc.url, doc.name)}
            onSummarize={() => handleSummarize(doc.id)}
          />
        ))}
      </div>
      {selectedDocument && selectedDocument.summary && (
        <div className="mt-6">
          <SummaryDisplay
            summary={selectedDocument.summary}
            onDownload={(format) => console.log(`Download summary as ${format}`)}
          />
        </div>
      )}
    </div>
  );
};

export default DocumentsView;