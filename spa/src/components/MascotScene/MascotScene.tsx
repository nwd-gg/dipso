import clsx from 'clsx'

import { Mascot } from '../Mascot'

import styles from './MascotScene.module.scss'

export const MascotScene = () => {
  return (
    <div className={clsx(styles.root)}>
      <div className={clsx(styles.monitor)}>
        <Mascot className={clsx(styles.mascot)} />
      </div>
    </div>
  )
}
