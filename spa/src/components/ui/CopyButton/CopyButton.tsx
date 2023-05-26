import { useState } from 'react'
import clsx from 'clsx'
import copy from 'copy-to-clipboard'

import { ReactComponent as Icon } from '../../../imgs/copy-icon.svg'
import styles from './CopyButton.module.scss'

export interface CopyButtonProps {
  text: string
  onCopy?: () => void
  className?: string
}

export const CopyButton = ({ text, className, onCopy }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleOnClick = () => {
    const result = copy(text)

    if (!result) return

    setIsCopied(true)

    if (onCopy) {
      onCopy()
    }

    setTimeout(() => setIsCopied(false), 1500)
  }

  return (
    <button onClick={handleOnClick} className={clsx(styles.btn, className)}>
      <Icon className={styles.icon} />
      {isCopied && <span className={clsx(styles.caption)}>Copied!</span>}
    </button>
  )
}
