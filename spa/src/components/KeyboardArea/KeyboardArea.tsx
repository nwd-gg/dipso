import { useState } from 'react'
import clsx from 'clsx'

import { TextareaField } from '../ui/Textarea'

import styles from './KeyboardArea.module.scss'

export const KeyboardArea = () => {
  const [isTextAreaShown, setIsTextAreaShown] = useState(false)

  const hanleUseClick = () => {
    setIsTextAreaShown(true)
  }

  const handleOnChange = () => {}

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
          name="ingredients"
          onChange={handleOnChange}
          placeholder="Type your ingredients here"
          className={clsx(styles.textarea)}
        />
      </div>
    </div>
  )
}
