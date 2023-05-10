import clsx from 'clsx';
import { useMouseMove } from '../../hooks/useMouseMove';

import styles from './Mascot.module.scss';

export interface MascotProps {
  className?: string
}

export const Mascot = ({ className }: MascotProps) => {
  useMouseMove()

  return (
    <div className={clsx(styles.container, className)}>
      <div className={clsx(styles.eye, {[styles.left]: true })} />
      <div className={clsx(styles.eye, {[styles.right]: true })} />
      <div className={clsx(styles.mouth)} />
    </div>
  )
}