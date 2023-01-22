import clsx from 'clsx'

import { TextComponent, TextComponentProps } from "../Text";

import styles from './Title.module.scss'

export type TitleProps = Pick<TextComponentProps, 'tag' | 'children' | 'className'>

export const Title = ({ tag = 'h1', children, className }: TitleProps) => {
  return (
    <TextComponent
      tag={tag}
      className={clsx(styles.title, className)}
    >
      {children}
    </TextComponent>
  )
};