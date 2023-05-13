import clsx from 'clsx'

import styles from './Recommendation.module.scss'

export interface RecommendationProps {
  text: string
}

export const Recommendation = ({ text }: RecommendationProps) => {
  return <div className={clsx(styles.content)}>{text}</div>
}
