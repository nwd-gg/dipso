import { ReactNode } from 'react';
import clsx from 'clsx';

import styles from './BasePage.module.css';

export interface BasePageProps {
  children: ReactNode
}

export const BasePage = ({ children }: BasePageProps) => {
  return (
    <div className={clsx(styles.root)}>
      {children}
    </div>
  )
}