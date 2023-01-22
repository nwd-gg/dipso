import clsx from 'clsx'

import { TextComponent, TextComponentProps } from "../Text";

import styles from './Caption.module.scss'

export type CaptionProps = Pick<TextComponentProps, 'tag' | 'children' | 'className'>

export const Caption = ({ tag = 'p', children, className }: CaptionProps) => {
  return (
    <TextComponent
      tag={tag}
      className={clsx(styles.caption, className)}
    >
      {children}
    </TextComponent>
  )
};