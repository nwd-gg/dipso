import clsx from 'clsx';

import styles from './Mascot.module.scss';

export interface MascotProps {
  className?: string
}

export const Mascot = ({ className }: MascotProps) => {

  return (
    <div className={clsx(styles.container, className)}>
      <div className={clsx(styles.eye, {[styles.left]: true })} />
      <div className={clsx(styles.eye, {[styles.right]: true })} />
      <div className={clsx(styles.mouth)} />
    </div>
  )
}