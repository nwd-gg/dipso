import clsx from 'clsx'

import styles from './Recommendation.module.scss'
import { CopyButton } from '../ui/CopyButton'

export interface RecommendationProps {
  text: string
  className?: string
}

export const Recommendation = ({ text, className }: RecommendationProps) => {
  return (
    <div className={clsx(styles.root, className)}>
      <div className={clsx(styles.content)}>{text}</div>
      <div className={clsx(styles.cat)} />
      <CopyButton text={text} className={clsx(styles.copy)} />
    </div>
  )
}
