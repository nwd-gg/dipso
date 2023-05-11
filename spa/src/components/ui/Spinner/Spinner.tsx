import clsx from 'clsx'

import styles from './Spinner.module.scss'

export enum SpinnerSizes {
  Small = 'small',
  Default = 'default',
  Medium = 'medium',
  Large = 'large',
}
interface ISpinnerProps {
  size?: SpinnerSizes
  hasOpacity?: boolean
  className?: string
  rootClassName?: string
}
export const Spinner = ({
  size = SpinnerSizes.Small,
  hasOpacity = false,
  className,
  rootClassName,
}: ISpinnerProps) => (
  <span
    className={clsx(styles.root, styles[size], rootClassName, {
      [styles.opacity]: hasOpacity,
    })}
  >
    <span className={clsx(styles.spinner, className)} />
  </span>
)
