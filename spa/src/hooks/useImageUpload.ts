import axios from 'axios';
import { useCallback, useState } from 'react';

// todo: move to envs
const API_URL = 'http://localhost:8080/api/upload'

export const useImageUpload = () => {
  const [files, setFiles] = useState<File | null>(null);

  const uploadFiles = useCallback(async () => {
    if (!files) return

    // todo validation
    const formData = new FormData();
    formData.append('files', files);

    await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
  }, [files]);

  return {
    files,
    setFiles,
    uploadFiles,
  };
}