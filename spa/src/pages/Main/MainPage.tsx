import clsx from 'clsx'

import { BasePage } from '../../components/BasePage'
import { Button, ButtonSize } from '../../components/ui/Button'
import { Caption } from '../../components/ui/Caption'
import { Title } from '../../components/ui/Title'
import { mainPageText } from '../../constants/texts'
import waves from '../../imgs/waves.png'

import styles from './MainPage.module.scss'

export const MainPage = () => {
  const { title, caption } = mainPageText

  return (
    <BasePage>
      <Title className={clsx(styles.title)}>{title}</Title>
      <div className={clsx(styles.desc)}>
        <Caption>{caption}</Caption>
        <img src={waves} className={clsx(styles.wavesImg)} alt="new waves" />
      </div>
      <div className={clsx(styles.actions)}>
        <Button size={ButtonSize.Large} href="mix">
          Guide me
        </Button>
      </div>
    </BasePage>
  )
}
