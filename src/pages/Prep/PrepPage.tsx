import clsx from 'clsx'

import { BasePage } from "../../components/BasePage"
import { Button, ButtonSize } from '../../components/ui/Button'

import styles from './PrepPage.module.css'

export const PrepPage = () => {
  const handleOnClick = () => null

  return (
    <BasePage>
      <h3 className={clsx(styles.title)}>
        Let see what you got here
      </h3>
      <div className={clsx(styles.caption)}>
        Make photos of your products and send it to Google Lens AI
      </div>
      <div className={clsx(styles.actions)}>
        <Button
          size={ButtonSize.Large}
          onClick={handleOnClick}
        >
          Beep boop
        </Button>
      </div>
    </BasePage>
  )
}