import { useRef } from 'react'
import clsx from 'clsx'

import { useEyesMovement } from './Mascot.hooks'
import mascotImage from '../../imgs/mascot-cat.png'
import styles from './Mascot.module.scss'

export interface MascotProps {
  className?: string
  isSad?: boolean
  onImageLoad?: () => void
}

export const Mascot = ({ onImageLoad, className, isSad = false }: MascotProps) => {
  const leftEyeRef = useRef<HTMLDivElement>(null)
  const rightEyeRef = useRef<HTMLDivElement>(null)

  useEyesMovement([leftEyeRef, rightEyeRef])

  return (
    <div className={clsx(styles.container, className, { [styles.sad]: isSad })}>
      <img src={mascotImage} alt="mascot" onLoad={onImageLoad} className={clsx(styles.img)} />
      <div ref={leftEyeRef} className={clsx(styles.eye, { [styles.left]: true })} />
      <div ref={rightEyeRef} className={clsx(styles.eye, { [styles.right]: true })} />
      <div className={clsx(styles.mouth)} />
    </div>
  )
}
