import clsx from 'clsx'
import useTextTyping from '../../../../hooks/typing/useTextTyping'

import styles from './ResultStep.module.scss'

export interface ResultStepProps {
  result: string
}

export const ResultStep = ({ result }: ResultStepProps) => {
  const typing = useTextTyping(result)

  return (
    <div className={clsx(styles.root)}>
      {typing}
    </div>
  )
}