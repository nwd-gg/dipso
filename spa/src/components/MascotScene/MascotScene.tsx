import { useCallback, useEffect, useState } from 'react'
import clsx from 'clsx'

import { Mascot } from '../Mascot'
import { SpeechBubble } from '../SpeechBubble'
import { KeyboardArea } from '../KeyboardArea'
import { Button, ButtonSize } from '../ui/Button'
import { Recommendation } from '../Recommendation'
import { RobotLoader } from '../RobotLoader/RobotLoader'
import { useBubbleText } from './MascotScene.hooks'
import { bubbleDialog } from '../../constants/texts'
import { useTextUpload } from '../../hooks/useTextUpload'
import { RequestStatus } from '../../types/request'

import styles from './MascotScene.module.scss'

export const MascotScene = () => {
  const [recommendation, setRecommendation] = useState('')
  const [isTextaredFocused, setIsTextareaFocused] = useState(false)
  const [isOnFocusTextShwon, setIsOnFocusTextShwon] = useState(false)
  const { phrase, setPharse, isOnboardingFinished } = useBubbleText()
  const { text, status, setText, uploadText, clear } = useTextUpload()

  useEffect(() => {
    if (isOnboardingFinished) {
      setIsOnFocusTextShwon(true)
    }

    if (isTextaredFocused && isOnboardingFinished && !isOnFocusTextShwon) {
      setPharse(bubbleDialog.onFocus)
      setIsOnFocusTextShwon(true)
    }
  }, [isTextaredFocused, isOnboardingFinished, setPharse, isOnFocusTextShwon])

  useEffect(() => {
    switch (status) {
      case RequestStatus.Pending:
        setPharse(bubbleDialog.onLoading)
        break
      case RequestStatus.Success:
        setPharse(bubbleDialog.onSuccess)
        break
      case RequestStatus.Failure:
        setPharse(bubbleDialog.onFailure)
        break
      default:
        break
    }
  }, [status, setPharse])

  const handleTextareaFocus = useCallback(() => {
    setIsTextareaFocused(true)
  }, [setIsTextareaFocused])

  const handleOnChange = useCallback(
    (event: React.FormEvent<HTMLTextAreaElement>) => {
      const text = (event.target as HTMLInputElement).value
      setText(text)
    },
    [setText]
  )

  const handleSubmit = useCallback(async () => {
    const result = await uploadText()

    if (result) {
      setRecommendation(result)
    }
  }, [uploadText])

  const handClear = useCallback(() => {
    clear()
    setPharse(bubbleDialog.intro[bubbleDialog.intro.length - 1].text)
  }, [clear, setPharse])

  return (
    <div className={clsx(styles.root)}>
      <div className={clsx(styles.monitorWrap)}>
        <Mascot className={clsx(styles.mascot)} isSad={status === RequestStatus.Failure} />
        <SpeechBubble text={phrase} className={clsx(styles.dialog)} />
      </div>
      <div className={clsx(styles.bottom)}>
        {status === RequestStatus.Pending && <RobotLoader />}
        {(status === RequestStatus.Idle || status === RequestStatus.Failure) && (
          <>
            <KeyboardArea onFocus={handleTextareaFocus} onChange={handleOnChange} />
            <div className={clsx(styles.btnWrap)}>
              <Button size={ButtonSize.Large} onClick={handleSubmit} isDisabled={Boolean(!text)}>
                Beep Boop
              </Button>
            </div>
          </>
        )}
        {recommendation && status === RequestStatus.Success && (
          <>
            <Recommendation text={recommendation} className={clsx(styles.response)} />
            <div className={clsx(styles.btnWrap)}>
              <Button size={ButtonSize.Large} onClick={handClear}>
                Try one more time
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
