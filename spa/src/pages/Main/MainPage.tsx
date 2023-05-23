import clsx from 'clsx'

import { BasePage } from '../../components/BasePage'
import { Button, ButtonSize } from '../../components/ui/Button'
import { Caption } from '../../components/ui/Caption'
import { Title } from '../../components/ui/Title'
import glass from '../../imgs/glass.png'

import styles from './MainPage.module.scss'

export const MainPage = () => {
  return (
    <BasePage>
      <Title className={clsx(styles.title)}>
        Savor&nbsp;the&nbsp;Swells: Unleash the&nbsp;Wave&nbsp;of&nbsp;Flavor
      </Title>
      <div className={clsx(styles.desc)}>
        <Caption>
          We combines the latest in AI&nbsp;technology to suggest personalized cocktail recipes
          based on the ingredients you have. Our website utilizes{' '}
          <a href="https://openai.com/" target="blank">
            OpenAI&nbsp;Chat&nbsp;API
          </a>{' '}
          to make it easy and enjoyable for you to explore new flavors and create drinks at home.
        </Caption>
        <img src={glass} className={clsx(styles.img)} alt="new waves" />
      </div>
      <div className={clsx(styles.actions)}>
        <Button size={ButtonSize.Large} href="mix">
          Guide me
        </Button>
      </div>
    </BasePage>
  )
}
