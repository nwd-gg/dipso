import { useEffect, useState } from 'react'
import clsx from 'clsx'

import { TextareaField } from '../ui/Textarea'

import styles from './KeyboardArea.module.scss'

export interface KeyboardAreaProps {
  value?: string
  onFocus?: () => void
  onChange?: (event: React.FormEvent<HTMLTextAreaElement>) => void
}

export const KeyboardArea = ({ onFocus, onChange, value }: KeyboardAreaProps) => {
  const [isTextAreaShown, setIsTextAreaShown] = useState(false)

  useEffect(() => {
    if (value && !isTextAreaShown) {
      setIsTextAreaShown(true)
    }
  }, [value, isTextAreaShown])

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
          value={value}
          onFocus={onFocus}
          onChange={onChange}
          name="ingredients"
          placeholder="Type your ingredients here"
          className={clsx(styles.textarea)}
        />
      </div>
    </div>
  )
}
