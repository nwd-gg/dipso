import clsx from 'clsx'
import { Link } from "react-router-dom"

import styles from './Header.module.css'

export const Header = () => {
  return (
    <header className={clsx(styles.header)}>
      <div className={clsx(styles.container)}>
        <div className={clsx(styles.inner)}>
          <h1 className={clsx(styles.name)}>
            <Link to="/">
              NEW WAVE DIPSO
            </Link>
          </h1>
          <nav className={clsx(styles.nav)}>
            <Link to="/" className={clsx(styles.link)}>
              <span className={clsx(styles.linkContent)}>Home</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}