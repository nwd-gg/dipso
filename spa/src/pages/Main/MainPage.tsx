import clsx from 'clsx'

import { BasePage } from '../../components/BasePage'
import { Button, ButtonSize } from '../../components/ui/Button'
import waves from '../../imgs/waves.png'; 

import styles from './MainPage.module.scss'

export const MainPage = () => {
  return (
    <BasePage>
      <div className={clsx(styles.title)}>Give us chance to suggest drink or another stuff for homechill.</div>
      <div className={clsx(styles.desc)}>
        <p>
          Simple fun pet project across ChatGPT and Google Lens functionality to make homechill a bit more pleasant.
        </p>
        <p>
          Give us chance to suggest drink or another stuff for homechill.
        </p>
        <img
          src={waves}
          className={clsx(styles.wavesImg)}
          alt="new waves"
        />
      </div>
      <div className={clsx(styles.actions)}>
        <Button
          size={ButtonSize.Large}
          href="prep"
        >
          Guide me
        </Button>
      </div>
    </BasePage>
  )
}