import clsx from 'clsx'

import { Mascot } from '../Mascot'
import { SpeechBubble } from '../SpeechBubble'
import { KeyboardArea } from '../KeyboardArea'
import { Button, ButtonSize } from '../ui/Button'

import styles from './MascotScene.module.scss'

export const MascotScene = () => {
  return (
    <div className={clsx(styles.root)}>
      <div className={clsx(styles.monitorWrap)}>
        <Mascot className={clsx(styles.mascot)} />
        <SpeechBubble text="Some generic text" className={clsx(styles.dialog)} />
      </div>
      <KeyboardArea />
      <div className={clsx(styles.btnWrap)}>
        <div className={clsx(styles.arrow)}></div>
        <Button size={ButtonSize.Large}>Beep Boop</Button>
      </div>
    </div>
  )
}
