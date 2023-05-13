import { useCallback, useEffect, useState } from 'react'
import clsx from 'clsx'

import { Mascot } from '../Mascot'
import { SpeechBubble } from '../SpeechBubble'
import { KeyboardArea } from '../KeyboardArea'
import { Button, ButtonSize } from '../ui/Button'
import { useBubbleText } from './MascotScene.hooks'
import { bubbleDialog } from '../../constants/texts'

import styles from './MascotScene.module.scss'

export const MascotScene = () => {
  const { phrase, setPharse, isOnboardingFinished } = useBubbleText()
  const [isTextaredFocused, setIsTextareaFocused] = useState(false)

  const handleTextareaFocus = useCallback(() => {
    setIsTextareaFocused(true)
  }, [setIsTextareaFocused])

  useEffect(() => {
    if (isTextaredFocused && isOnboardingFinished) {
      setPharse(bubbleDialog.submit)
    }
  }, [isTextaredFocused, isOnboardingFinished, setPharse])

  return (
    <div className={clsx(styles.root)}>
      <div className={clsx(styles.monitorWrap)}>
        <Mascot className={clsx(styles.mascot)} />
        <SpeechBubble text={phrase} className={clsx(styles.dialog)} />
      </div>
      <KeyboardArea onFocus={handleTextareaFocus} />
      <div className={clsx(styles.btnWrap)}>
        <div className={clsx(styles.arrow)}></div>
        <Button size={ButtonSize.Large}>Beep Boop</Button>
      </div>
    </div>
  )
}
