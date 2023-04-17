import { useState } from 'react'

import { IngredientsArea } from './IngredientsArea'
import { ResultStep } from './Result'

export const PrepSteps = () => {
  const [ingredients, setIngredients] = useState<null | string>(null)
  const [message, setMessage] = useState<null | string>(null)

  const handleOnChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setIngredients((event.target as HTMLInputElement).value)
  }

  const handleUpload = (text: string) => {
    setMessage(text)
  }

  return (
    <>
      {!Boolean(message) && <IngredientsArea onChange={handleOnChange} />}
      {(message && Boolean(message)) && <ResultStep result={message} />}
    </>
  )
}