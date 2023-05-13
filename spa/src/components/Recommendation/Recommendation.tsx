import clsx from 'clsx'

import styles from './Recommendation.module.scss'

export interface RecommendationProps {
  text: string
  className?: string
}

export const Recommendation = ({ text, className }: RecommendationProps) => {
  return (
    <div className={clsx(styles.root, className)}>
      <div className={clsx(styles.content)}>{text}</div>
      <div className={clsx(styles.cat)} />
    </div>
  )
}
