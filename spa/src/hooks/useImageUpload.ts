import axios from 'axios';
import { useCallback, useState } from 'react';

// todo: move to envs
const API_URL = 'http://localhost:8080/api/upload'

export const useImageUpload = () => {
  const [files, setFiles] = useState<FileList | null>(null);

  const uploadFiles = useCallback(async () => {
    if (!files) return

    // todo validation
    const formData = new FormData();

    Array.from(files).forEach((file) => {
      formData.append(file.name, file);
    })

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