import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UploadItem {
  id: string;
  name: string;
  type: string;
  progress: number;
  status: 'pending' | 'uploading' | 'done' | 'error';
}

interface MediaState {
  uploads: UploadItem[];
}

const initialState: MediaState = {
  uploads: [],
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    addUpload(state, action: PayloadAction<UploadItem>) {
      state.uploads.push(action.payload);
    },
    updateUploadStatus(
      state,
      action: PayloadAction<{ id: string; status?: UploadItem['status']; progress?: number }>
    ) {
      const upload = state.uploads.find((u) => u.id === action.payload.id);
      if (upload) {
        upload.status = action.payload.status ?? upload.status;
        upload.progress = action.payload.progress ?? upload.progress;
      }
    },
  },
});

export const { addUpload, updateUploadStatus } = uploadSlice.actions;
export const uploadReduce = uploadSlice.reducer;