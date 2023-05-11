import clsx from 'clsx'

import { Mascot } from '../Mascot'

import styles from './MascotScene.module.scss'
import { SpeechBubble } from '../SpeechBubble'
import { KeyboardArea } from '../KeyboardArea'

export const MascotScene = () => {
  return (
    <div className={clsx(styles.root)}>
      <div className={clsx(styles.monitorWrap)}>
        <Mascot className={clsx(styles.mascot)} />
        <SpeechBubble text="Some generic text" className={clsx(styles.dialog)} />
      </div>
      <KeyboardArea />
    </div>
  )
}
