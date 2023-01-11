import clsx from 'clsx'

import { PrepSteps } from './steps'
import { BasePage } from "../../components/BasePage"

import styles from './PrepPage.module.scss'

export const PrepPage = () => {
  return (
    <BasePage>
      <h3 className={clsx(styles.title)}>
        Let see what you got here
      </h3>
      <div className={clsx(styles.caption)}>
        Make photos of your products and send it to Google Lens AI
      </div>
      <PrepSteps />
    </BasePage>
  )
}