import axios from 'axios';
import { useState } from 'react';

import { RequestStatus } from '../types/request';

const API_URL: string = process.env.REACT_APP_API_URL || ""

export const useTextUpload = () => {
  const [text, setText] = useState<string | null>(null)
  const [status, setStatus] = useState<RequestStatus>(RequestStatus.Idle)

  const uploadText = async () => {
    if (!text) return

    setStatus(RequestStatus.Pending)

    try {
      const resp = await axios.post<{message: string}>(`${API_URL}/text`, text)

      setStatus(RequestStatus.Success)

      const message = (resp.data && resp.data.message) ? resp.data.message : undefined
      return message
    } catch (err) {
      console.error("[useTextUpload]: error during text uploading", err)
      setStatus(RequestStatus.Failure)
    }
  }

  return {
    text,
    status,
    setText,
    uploadText
  }
}