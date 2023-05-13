import { useState } from 'react'
import clsx from 'clsx'

import { TextareaField } from '../ui/Textarea'

import styles from './KeyboardArea.module.scss'

export interface KeyboardAreaProps {
  onFocus?: () => void
}

export const KeyboardArea = ({ onFocus }: KeyboardAreaProps) => {
  const [isTextAreaShown, setIsTextAreaShown] = useState(false)

  const hanleUseClick = () => {
    setIsTextAreaShown(true)
  }

  return (
    <div className={clsx(styles.root)}>
      <div className={clsx(styles.inner, { [styles.hidden]: isTextAreaShown })}>
        <div className={clsx(styles.img)} />
        <button className={clsx(styles.btn)} onClick={hanleUseClick}>
          Use
        </button>
      </div>
      <div className={clsx(styles.textareaWrap, { [styles.visible]: isTextAreaShown })}>
        <TextareaField
          onFocus={onFocus}
          name="ingredients"
          placeholder="Type your ingredients here"
          className={clsx(styles.textarea)}
        />
      </div>
    </div>
  )
}
