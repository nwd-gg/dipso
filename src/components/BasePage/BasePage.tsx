import { ReactNode } from 'react'
import clsx from 'clsx'

import { Header } from '../Header'
import styles from './BasePage.module.css'
import { Footer } from '../Footer'

export interface BasePageProps {
  children: ReactNode
}

export const BasePage = ({ children }: BasePageProps) => {
  return (
    <div className={clsx(styles.root)}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}