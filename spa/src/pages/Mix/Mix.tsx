import { useCallback, useEffect, useState } from 'react'
import clsx from 'clsx'

import { BasePage } from '../../components/BasePage'
import { SimpleLoader } from '../../components/ui/SimpleLoader'
import { Mascot } from '../../components/Mascot'
import { RequestStatus } from '../../types/request'
import { SpeechBubble } from '../../components/SpeechBubble'
import { KeyboardArea } from '../../components/KeyboardArea'
import { RobotLoader } from '../../components/RobotLoader/RobotLoader'
import { Button, ButtonSize } from '../../components/ui/Button'
import { Recommendation } from '../../components/Recommendation'
import { useBubbleText } from './Mix.hooks'
import { useTextUpload } from '../../hooks/useTextUpload'
import { bubbleDialog } from '../../constants/texts'
import monitorImg from '../../imgs/monitor.png'

import styles from './Mix.module.scss'

export const MixPage = () => {
  const [recommendation, setRecommendation] = useState('')
  const [isTextaredFocused, setIsTextareaFocused] = useState(false)
  const [isOnFocusTextShwon, setIsOnFocusTextShwon] = useState(false)
  const [isMascotLoaded, setIsMascotLoaded] = useState<boolean>(false)

  const { phrase, setPharse, isOnboardingFinished } = useBubbleText()
  const { text, status, setText, uploadText, clear } = useTextUpload()

  useEffect(() => {
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

  const handleImageLoading = useCallback(() => {
    setIsMascotLoaded(true)
  }, [setIsMascotLoaded])

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
    setIsOnFocusTextShwon(false)
  }, [clear])

  return (
    <BasePage>
      <div className={clsx(styles.root)}>
        <SimpleLoader className={clsx(styles.spinner, { [styles.hidden]: isMascotLoaded })} />
        <div className={clsx(styles.container, { [styles.visible]: isMascotLoaded })}>
          <div className={clsx(styles.monitorWrap)}>
            <img src={monitorImg} alt="monitor" className={clsx(styles.monitor)} />
            <Mascot
              className={clsx(styles.mascot)}
              isSad={status === RequestStatus.Failure}
              onImageLoad={handleImageLoading}
            />
            <SpeechBubble text={phrase} className={clsx(styles.dialog)} />
          </div>
          <div className={clsx(styles.bottom)}>
            {status === RequestStatus.Pending && <RobotLoader />}
            {(status === RequestStatus.Idle || status === RequestStatus.Failure) && (
              <>
                <KeyboardArea
                  value={text || ''}
                  onFocus={handleTextareaFocus}
                  onChange={handleOnChange}
                />
                <div className={clsx(styles.btnWrap)}>
                  <Button
                    size={ButtonSize.Large}
                    onClick={handleSubmit}
                    isDisabled={Boolean(!text)}
                    className={clsx(styles.submitBtn)}
                  >
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
      </div>
    </BasePage>
  )
}
