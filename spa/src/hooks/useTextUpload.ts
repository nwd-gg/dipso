import axios from 'axios'
import { useState } from 'react'

import { RequestStatus } from '../types/request'

const API_URL: string = process.env.REACT_APP_API_URL || ''

export const useTextUpload = () => {
  const [text, setText] = useState<string | null>(null)
  const [status, setStatus] = useState<RequestStatus>(RequestStatus.Idle)

  const uploadText = async () => {
    if (!text) return

    setStatus(RequestStatus.Pending)

    try {
      // const resp = await axios.post<{ message: string }>(`${API_URL}/text`, text)
      // const message = resp.data && resp.data.message ? resp.data.message : undefined

      const fakeFn = () => {
        return new Promise<string>((resolve) => {
          setTimeout(async () => {
            resolve(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis bibendum dui. Vestibulum sit amet magna in diam euismod ullamcorper quis quis odio. Nam at commodo neque. Aenean tincidunt lorem a sapien ultrices aliquam. Phasellus faucibus purus ante, vitae feugiat neque maximus nec. Sed eget accumsan metus, eget ultrices nibh. Vivamus et suscipit purus. Aliquam scelerisque volutpat tortor ut viverra. Duis eleifend mollis augue. Mauris venenatis molestie scelerisque. Donec vitae nibh vel nisi tincidunt imperdiet vel sit amet velit. Nunc dignissim enim a nunc scelerisque, eu auctor magna aliquam. Phasellus fringilla eros sed molestie sagittis. Sed et pellentesque nisl. Duis tempor maximus imperdiet. Vestibulum aliquet accumsan sapien sed pharetra. Nunc faucibus posuere erat, non scelerisque nisi posuere in. Morbi dictum laoreet mauris, eu vehicula turpis accumsan at. Duis aliquam consequat ex, in lobortis quam vulputate eget. Pellentesque posuere sagittis est eget vulputate. Donec in tempus ipsum.
      `)
          }, 5000)
        })
      }

      const message = await fakeFn()

      setStatus(RequestStatus.Success)
      setText(null)
      return message
    } catch (err) {
      console.error('[useTextUpload]: error during text uploading', err)
      setStatus(RequestStatus.Failure)
      setText(null)
    }
  }

  const clear = () => {
    setText(null)
    setStatus(RequestStatus.Idle)
  }

  return {
    text,
    status,
    setText,
    uploadText,
    clear,
  }
}
