import clsx from 'clsx'
import { Link } from "react-router-dom"

import styles from './Header.module.css'

export const Header = () => {
  return (
    <header className={clsx(styles.header)}>
      <div className={clsx(styles.container)}>
        <div className={clsx(styles.inner)}>
          <h1 className={clsx(styles.name)}>NEW WAVE DIPSO</h1>
          <nav className={clsx(styles.nav)}>
            <Link to="/">Home</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}