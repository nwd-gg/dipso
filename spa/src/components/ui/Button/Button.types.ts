import { ButtonHTMLAttributes } from 'react'

export const enum ButtonMod {
  Outline = 'outline',
  Solid = 'solid',
}

export const enum ButtonSize {
  Default = 'default',
  Small = 'small',
  Large = 'large',
}

export const enum ButtonColor {
  Primary = 'primary',
}

export type ButtonTypes = ButtonHTMLAttributes<HTMLButtonElement>['type']
export interface IButtonProps {
  children: React.ReactNode
  onClick?: (event: React.MouseEvent) => void
  isDisabled?: boolean
  fullWith?: boolean
  mod?: ButtonMod
  size?: ButtonSize
  color?: ButtonColor
  className?: string
  href?: string
  alt?: string
  type?: ButtonTypes
  isLoading?: boolean
}
