import clsx from 'clsx'
import { Link } from 'react-router-dom'

import { Spinner, SpinnerSizes } from '../Spinner'
import styles from './Button.module.scss'
import { IButtonProps, ButtonMod, ButtonSize, ButtonColor } from './Button.types'

const ButtonSpinnerSizes = {
  [ButtonSize.Small]: SpinnerSizes.Small,
  [ButtonSize.Default]: SpinnerSizes.Small,
  [ButtonSize.Large]: SpinnerSizes.Default,
}

export const Button = ({
  href,
  onClick,
  children,
  alt,
  className = '',
  mod = ButtonMod.Solid,
  size = ButtonSize.Default,
  color = ButtonColor.Primary,
  isDisabled = false,
  type = 'button',
  isLoading = false,
  fullWith = false,
}: IButtonProps) => {
  const classes = [styles.button, styles[mod], styles[size], styles[color], className]

  const commonProps = {
    alt,
    className: clsx(...classes, {
      [styles.disabled]: isDisabled,
      [styles.fullWith]: fullWith,
    }),
  }

  if (href) {
    return (
      <Link to={href} {...commonProps}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={isDisabled} {...commonProps}>
      {isLoading ? <Spinner size={ButtonSpinnerSizes[size]} /> : children}
    </button>
  )
}
