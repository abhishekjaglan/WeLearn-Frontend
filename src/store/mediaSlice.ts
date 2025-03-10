import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MediaState } from '../types';

const initialState: MediaState = {
  uploads: [],
};

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
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
      }
    },
    clearUploads: (state) => {
      state.uploads = [];
    },
  },
});

export const { addUpload, updateUploadStatus, clearUploads } = mediaSlice.actions;
export const mediaReducer = mediaSlice.reducer;