import clsx from 'clsx'

import { BasePage } from '../../components/BasePage'
import { Title } from '../../components/ui/Title'
import { Caption } from '../../components/ui/Caption'
import donda from '../../imgs/donda_logo.png'

import styles from './AboutPage.module.scss'

export const AboutPage = () => {
  return (
    <BasePage>
      <div className={clsx(styles.container)}>
        <div className={clsx(styles.imgWrap)}>
          <img src={donda} title="Donda" alt="Donda" />
        </div>
        <div className={clsx(styles.content)}>
          <Title className={clsx(styles.title)}>Elevate Your Cocktail Experience with AI</Title>
          <Caption>
            Current website is a labor of love dedicated to bringing you delightful and refreshing
            concoctions right in the comfort of your home. Discover with us a world of mixology
            excellence, leveraging the{' '}
            <a href="https://openai.com/" target="blank">
              OpenAI&nbsp;Chat&nbsp;API
            </a>{' '}
            to provide personalized cocktail recommendations based on your available ingredients. To
            enhance your browsing experience, we have collaborated with{' '}
            <a href="https://www.midjourney.com/" target="blank">
              Midjourney&nbsp;AI
            </a>{' '}
            to generate stunning visual assets. Exercise caution and engage your critical thinking
            when utilizing AI recommendations, as their outcomes can occasionally yield unexpected
            results, necessitating the use of your own discernment.
          </Caption>
          <Caption>
            We value your feedback and suggestions! If you have any ideas, recommendations, or
            requests, we would love to hear from you. Please feel free to reach out to us via{' '}
            <a href="mailto:mostalt.mail@gmail.com">email</a>.
          </Caption>
          <Caption>
            Let's elevate your home mixology game together! Cheers to creating memorable cocktail
            moments!
          </Caption>
        </div>
      </div>
    </BasePage>
  )
}
