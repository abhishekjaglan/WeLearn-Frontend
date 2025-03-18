import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import MediaCard from '../components/MediaCard';
import UploadButton from '../components/UploadButton';
import MediaPlayer from '../components/MediaPlayer';
import SummaryDisplay from '../components/SummaryDisplay';
import { addUpload, setAudioSummary, setAudioTranscription, updateUploadStatus } from '../store/mediaSlice';

const AudioView: React.FC = () => {
  const dispatch = useDispatch();
  const audios = useSelector((state: RootState) => state.media.audios);
  const [selectedAudioId, setSelectedAudioId] = useState<string | null>(null);

  // Handle audio upload
  const handleUpload = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const id = `${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
      dispatch(addUpload({ id, name: file.name, type: file.type }));
      setTimeout(() => {
        dispatch(updateUploadStatus({ id, status: 'uploading' }));
        setTimeout(() => {
          dispatch(updateUploadStatus({ id, status: 'done' })); // Moves to audios in slice
        }, 2000);
      }, 1000);
    });
  };

  // Select audio for playback
  const handleView = (id: string) => {
    setSelectedAudioId(id);
  };

  // Download audio file
  const handleDownload = (url: string, name: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate mock transcription
  const handleTranscribe = (id: string) => {
    const transcription = `This is a simulated transcription for audio ${id}.`;
    dispatch(setAudioTranscription({ id, transcription }));
  };

  // Generate mock summary
  const handleSummarize = (id: string) => {
    const summary = `This is a simulated summary for audio ${id}.`;
    dispatch(setAudioSummary({ id, summary }));
  };

  const selectedAudio = audios.find((a) => a.id === selectedAudioId);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Audio</h2>
      <UploadButton onUpload={handleUpload} accept=".mp3,.wav" />
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {audios.map((audio) => (
          <MediaCard
            key={audio.id}
            id={audio.id}
            name={audio.name}
            type={audio.type}
            date={audio.date}
            onView={() => handleView(audio.id)}
            onDownload={() => handleDownload(audio.url, audio.name)}
            onSummarize={() => handleSummarize(audio.id)}
          />
        ))}
      </div>
      {selectedAudio && (
        <div className="mt-6">
          <MediaPlayer src={selectedAudio.url} type="audio" />
          <div className="mt-4 space-x-4">
            <button
              onClick={() => handleTranscribe(selectedAudio.id)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Transcribe
            </button>
          </div>
          {selectedAudio.transcription && (
            <p className="mt-4">Transcription: {selectedAudio.transcription}</p>
          )}
          {selectedAudio.summary && (
            <SummaryDisplay
              summary={selectedAudio.summary}
              onDownload={(format) => console.log(`Download summary as ${format}`)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AudioView;