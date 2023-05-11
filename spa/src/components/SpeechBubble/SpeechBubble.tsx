import clsx from 'clsx'

import { useTextTyping } from '../../hooks/typing/useTextTyping'
import styles from './SpeechBubble.module.scss'

export interface SpeechBubbleProps {
  text: string
  className?: string
}

export const SpeechBubble = ({ text, className }: SpeechBubbleProps) => {
  const typing = useTextTyping(text)

  return <div className={clsx(styles.bubble, className)}>{typing}</div>
}
