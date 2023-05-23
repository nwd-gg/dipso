import clsx from 'clsx'
import { NavLink, Link } from 'react-router-dom'

import styles from './Header.module.scss'

export const Header = () => {
  return (
    <header className={clsx(styles.header)}>
      <div className={clsx(styles.container)}>
        <div className={clsx(styles.inner)}>
          <h1 className={clsx(styles.name)}>
            <Link to="/">
              <span className={clsx(styles.wave)} />
              NEW WAVE DIPSO
            </Link>
          </h1>
          <nav className={clsx(styles.nav)}>
            <NavLink to="/" className={clsx(styles.link)}>
              <span className={clsx(styles.linkContent)}>Home</span>
            </NavLink>
            <NavLink
              to="/mix"
              className={({ isActive }) => clsx(styles.link, { [styles.active]: isActive })}
            >
              <span className={clsx(styles.linkContent)}>Mix</span>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => clsx(styles.link, { [styles.active]: isActive })}
            >
              <span className={clsx(styles.linkContent)}>About</span>
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  )
}
