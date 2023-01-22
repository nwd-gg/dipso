import { createElement } from 'react';
import clsx from 'clsx'

import { TextComponentProps } from './Text.types';
import styles from './Text.module.scss'

export const TextComponent = ({ children, tag = 'p', className }: TextComponentProps) => {
  const finalClassName = clsx(styles.root, className)

  return createElement(
    tag,
    {
      className: finalClassName,
    },
    children,
  );
}