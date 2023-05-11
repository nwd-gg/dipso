import clsx from 'clsx'
import styles from './SimpleLoader.module.scss'

export interface ISimpleLoaderProps {
  className?: string
}

export const SimpleLoader = ({ className }: ISimpleLoaderProps) => {
  return (
    <div className={clsx(styles.root, className)}>
      {Array.from([1, 2, 3]).map((val) => {
        return <span key={val} className={clsx(styles.circle)} />
      })}
    </div>
  )
}
