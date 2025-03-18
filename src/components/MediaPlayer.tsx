import React from 'react';

interface MediaPlayerProps {
  src: string;
  type: 'audio' | 'video';
}

const MediaPlayer: React.FC<MediaPlayerProps> = React.memo(({ src, type }) => {
  return (
    <div className="w-full">
      {type === 'audio' ? (
        <audio controls className="w-full" aria-label="Audio player">
          <source src={src} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      ) : (
        <video controls className="w-full rounded-lg" aria-label="Video player">
          <source src={src} type="video/mp4" />
          Your browser does not support the video element.
        </video>
      )}
    </div>
  );
});

export default MediaPlayer;