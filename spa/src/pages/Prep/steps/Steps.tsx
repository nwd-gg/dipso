import { useCallback, useState } from 'react'
import { SimpleLoader } from '../../../components/ui/SimpleLoader'

import { Title } from '../../../components/ui/Title'
import { prepPageText } from '../../../constants/texts'
import { useTextUpload } from '../../../hooks/useTextUpload'
import { RequestStatus } from '../../../types/request'
import { IngredientsArea } from './IngredientsArea'
import { ResultStep } from './Result'

export const PrepSteps = () => {
  const [message, setMessage] = useState<null | string>(null)
  const { status, setText, uploadText } = useTextUpload()

  const handleOnChange = useCallback((event: React.FormEvent<HTMLTextAreaElement>) => {
    const text = (event.target as HTMLInputElement).value
    setText(text)
  }, [setText])

  const handleOnClick = useCallback(async () => {
    const result = await uploadText();

    if (result) {
      setMessage(result)
    }
  }, [uploadText])

  const isLoading = status === RequestStatus.Pending
  const isFailure = status === RequestStatus.Failure

  if (isFailure) {
    return <Title>{prepPageText.error}</Title>
  }

  if (isLoading) {
    return <SimpleLoader />
  }

  return (
    <>
      {!Boolean(message) && (
        <IngredientsArea
          onChange={handleOnChange}
          onBtnClick={handleOnClick}
        />)}
      {(message && Boolean(message)) && <ResultStep result={message} />}
    </>
  )
}