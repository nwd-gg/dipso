import clsx from 'clsx';

import styles from './Footer.module.scss';

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={clsx(styles.footer)}>
      <div className={clsx(styles.container)}>
        <div className={clsx(styles.inner)}>
          <div className={clsx(styles.contacts)}>
            <a
              className={clsx(styles.contactLink)}
              target="blank"
              href="https://github.com/nwd-gg"
            >
              <span className={clsx(styles.contactIcon, { [styles.github]: true })} />
              <span>github</span>
            </a>
        </div>
        <div className={clsx(styles.copyright)}>
          Copyright © {currentYear} NWD
        </div>
        </div>
      </div>
    </footer>
  )
}