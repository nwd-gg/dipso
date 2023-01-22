import { useState } from 'react'

import { ResultStep } from './Result'
import { UploadingStep } from './Uploading'

export const PrepSteps = () => {
  const [message, setMessage] = useState<null | string>(null)

  const handleUpload = (text: string) => {
    setMessage(text)
  }

  return (
    <>
      {!Boolean(message) && <UploadingStep onFinish={handleUpload}/>}
      {(message && Boolean(message)) && <ResultStep result={message} />}
    </>
  )
}