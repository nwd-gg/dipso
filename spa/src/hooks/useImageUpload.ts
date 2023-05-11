import axios from 'axios'
import { useCallback, useState } from 'react'

import { RequestStatus } from '../types/request'

const API_URL: string = process.env.REACT_APP_API_URL || ''

export const useImageUpload = () => {
  const [files, setFiles] = useState<FileList | null>(null)
  const [status, setStatus] = useState<RequestStatus>(RequestStatus.Idle)

  const uploadFiles = useCallback(async () => {
    if (!files) return

    setStatus(RequestStatus.Pending)

    // todo validation
    const formData = new FormData()

    Array.from(files).forEach((file) => {
      formData.append('upload', file)
    })

    try {
      const resp = await axios.post<{ message: string }>(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setStatus(RequestStatus.Success)

      const message = resp.data && resp.data.message ? resp.data.message : undefined
      return message
    } catch (err) {
      console.error('[useImageUpload]: error during file uploading', err)
      setStatus(RequestStatus.Failure)
    }
  }, [files])

  return {
    files,
    status,
    setFiles,
    uploadFiles,
  }
}
