import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import MediaCard from '../components/MediaCard';
import UploadButton from '../components/UploadButton';
import MediaPlayer from '../components/MediaPlayer';
import SummaryDisplay from '../components/SummaryDisplay';
import { addUpload, setVideoSummary, setVideoTranscription, updateUploadStatus } from '../store/mediaSlice';

const VideoView: React.FC = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state: RootState) => state.media.videos);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  // Handle video upload
  const handleUpload = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const id = `${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
      dispatch(addUpload({ id, name: file.name, type: file.type }));
      setTimeout(() => {
        dispatch(updateUploadStatus({ id, status: 'uploading' }));
        setTimeout(() => {
          dispatch(updateUploadStatus({ id, status: 'done' })); // Moves to videos in slice
        }, 2000);
      }, 1000);
    });
  };

  // Select video for playback
  const handleView = (id: string) => {
    setSelectedVideoId(id);
  };

  // Download video file
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
    const transcription = `This is a simulated transcription for video ${id}.`;
    dispatch(setVideoTranscription({ id, transcription }));
  };

  // Generate mock summary
  const handleSummarize = (id: string) => {
    const summary = `This is a simulated summary for video ${id}.`;
    dispatch(setVideoSummary({ id, summary }));
  };

  const selectedVideo = videos.find((v) => v.id === selectedVideoId);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Videos</h2>
      <UploadButton onUpload={handleUpload} accept=".mp4,.mov" />
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <MediaCard
            key={video.id}
            id={video.id}
            name={video.name}
            type={video.type}
            date={video.date}
            onView={() => handleView(video.id)}
            onDownload={() => handleDownload(video.url, video.name)}
            onSummarize={() => handleSummarize(video.id)}
          />
        ))}
      </div>
      {selectedVideo && (
        <div className="mt-6">
          <MediaPlayer src={selectedVideo.url} type="video" />
          <div className="mt-4 space-x-4">
            <button
              onClick={() => handleTranscribe(selectedVideo.id)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Transcribe
            </button>
          </div>
          {selectedVideo.transcription && (
            <p className="mt-4">Transcription: {selectedVideo.transcription}</p>
          )}
          {selectedVideo.summary && (
            <SummaryDisplay
              summary={selectedVideo.summary}
              onDownload={(format) => console.log(`Download summary as ${format}`)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default VideoView;