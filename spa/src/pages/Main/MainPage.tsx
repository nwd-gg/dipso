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
      <Title className={clsx(styles.title)}>New Wave Dipso</Title>
      <div className={clsx(styles.desc)}>
        <Caption>
          We combines the latest in AI&nbsp;technology to suggest personalized cocktail recipes
          based on the ingredients you have. Powered&nbsp;by{' '}
          <a href="https://openai.com/" target="blank">
            OpenAI&nbsp;Chat&nbsp;API
          </a>
          , our website makes it easy and fun to explore new flavors and create drinks at home. Dive
          into the world of cocktail creativity with just a few clicks and enjoy the wave of
          delicious possibilities.
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
