import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Audio, Document, MediaState, URLPreview, Video } from '../types';

const initialState: MediaState = {
  uploads: [],
  documents: [],
  urls: [],
  audios: [],
  videos: [],
};

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    // Upload Management
    addUpload: (state, action: PayloadAction<{ id: string; name: string; type: string }>) => {
      state.uploads.push({ ...action.payload, status: 'pending' });
    },
    updateUploadStatus: (
      state,
      action: PayloadAction<{ id: string; status: 'uploading' | 'done' | 'error' }>
    ) => {
      const upload = state.uploads.find((u) => u.id === action.payload.id);
      if (upload) {
        upload.status = action.payload.status;
        if (upload.status === 'done') {
          const mediaType = upload.type.split('/')[0];
          if (mediaType === 'application') {
            state.documents.push({
              id: upload.id,
              name: upload.name,
              type: upload.type,
              date: new Date().toLocaleDateString(),
              url: `http://example.com/uploads/${upload.id}`,
            });
          } else if (mediaType === 'audio') {
            state.audios.push({
              id: upload.id,
              name: upload.name,
              type: upload.type,
              date: new Date().toLocaleDateString(),
              url: `http://example.com/uploads/${upload.id}`,
            });
          } else if (mediaType === 'video') {
            state.videos.push({
              id: upload.id,
              name: upload.name,
              type: upload.type,
              date: new Date().toLocaleDateString(),
              url: `http://example.com/uploads/${upload.id}`,
            });
          }
          // Optionally, remove from uploads after moving to library
          // state.uploads = state.uploads.filter((u) => u.id !== upload.id);
        }
      }
    },
    clearUploads: (state) => {
      state.uploads = [];
    },

    // Media Library Management
    addDocument: (state, action: PayloadAction<Document>) => {
      state.documents.push(action.payload);
    },
    setDocumentSummary: (state, action: PayloadAction<{ id: string; summary: string }>) => {
      const document = state.documents.find((doc) => doc.id === action.payload.id);
      if (document) {
        document.summary = action.payload.summary;
      }
    },
    addURL: (state, action: PayloadAction<URLPreview>) => {
      state.urls.push(action.payload);
    },
    setURLSummary: (state, action: PayloadAction<{ id: string; summary: string }>) => {
      const url = state.urls.find((u) => u.id === action.payload.id);
      if (url) {
        url.summary = action.payload.summary;
      }
    },
    addAudio: (state, action: PayloadAction<Audio>) => {
      state.audios.push(action.payload);
    },
    setAudioTranscription: (state, action: PayloadAction<{ id: string; transcription: string }>) => {
      const audio = state.audios.find((a) => a.id === action.payload.id);
      if (audio) {
        audio.transcription = action.payload.transcription;
      }
    },
    setAudioSummary: (state, action: PayloadAction<{ id: string; summary: string }>) => {
      const audio = state.audios.find((a) => a.id === action.payload.id);
      if (audio) {
        audio.summary = action.payload.summary;
      }
    },
    addVideo: (state, action: PayloadAction<Video>) => {
      state.videos.push(action.payload);
    },
    setVideoTranscription: (state, action: PayloadAction<{ id: string; transcription: string }>) => {
      const video = state.videos.find((v) => v.id === action.payload.id);
      if (video) {
        video.transcription = action.payload.transcription;
      }
    },
    setVideoSummary: (state, action: PayloadAction<{ id: string; summary: string }>) => {
      const video = state.videos.find((v) => v.id === action.payload.id);
      if (video) {
        video.summary = action.payload.summary;
      }
    },
  },
});

export const {
  addUpload,
  updateUploadStatus,
  clearUploads,
  addDocument,
  setDocumentSummary,
  addURL,
  setURLSummary,
  addAudio,
  setAudioTranscription,
  setAudioSummary,
  addVideo,
  setVideoTranscription,
  setVideoSummary,
} = mediaSlice.actions;

export const mediaReducer = mediaSlice.reducer;