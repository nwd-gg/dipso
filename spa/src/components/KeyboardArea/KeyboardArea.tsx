import { useEffect, useState } from 'react'
import clsx from 'clsx'

import { TextareaField } from '../ui/Textarea'
import keyboardImg from '../../imgs/keyboard_horizontal.png'

import styles from './KeyboardArea.module.scss'

export interface KeyboardAreaProps {
  value?: string
  onFocus?: () => void
  onChange?: (event: React.FormEvent<HTMLTextAreaElement>) => void
  onImageLoad?: () => void
}

export const KeyboardArea = ({ onFocus, onChange, value, onImageLoad }: KeyboardAreaProps) => {
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
        <img src={keyboardImg} alt="keyboard" className={clsx(styles.img)} onLoad={onImageLoad} />
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
