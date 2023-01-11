import clsx from 'clsx';

import styles from './Footer.module.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={clsx(styles.footer)}>
      <div className={clsx(styles.container)}>
        <div className={clsx(styles.inner)}>
          <div className={clsx(styles.contacts)}>
          <a
            href="mailto:mostalt.mail@gmail.com"
            className={clsx(styles.contactLink)}
          >
            <span className={clsx(styles.contactIcon, { [styles.gmail]: true })} />
            <span>mostalt.mail@gmail.com</span>
          </a>
          <a
            className={clsx(styles.contactLink)}
            target="blank"
            href="https://github.com/mostalt"
          >
            <span className={clsx(styles.contactIcon, { [styles.github]: true })} />
            <span>mostalt</span>
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