import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addUpload, updateUploadStatus } from '../store/mediaSlice';
import axios from 'axios';

export const useMediaUpload = () => {
  const dispatch = useDispatch();

  const uploadMedia = useCallback(
    async (file: File) => {
      const id = `${Date.now()}-${file.name}`; // Unique ID
      dispatch(addUpload({ id, name: file.name, type: file.type }));

      try {
        dispatch(updateUploadStatus({ id, status: 'uploading' }));
        const formData = new FormData();
        formData.append('file', file);

        // Replace with your actual backend endpoint
        const response = await axios.post('http://localhost:5000/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              console.log(`Upload progress for ${file.name}: ${percent}%`);
            }
          },
        });

        if (response.status === 200) {
          dispatch(updateUploadStatus({ id, status: 'done' }));
        }
      } catch (error) {
        console.error(`Upload failed for ${file.name}:`, error);
        dispatch(updateUploadStatus({ id, status: 'error' }));
      }
    },
    [dispatch]
  );

  return { uploadMedia };
};