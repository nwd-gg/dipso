import clsx from 'clsx'
import { Caption } from '../../../../components/ui/Caption'
import { Title } from '../../../../components/ui/Title'
import { prepPageText } from '../../../../constants/texts'
import { useTextTyping } from '../../../../hooks/typing/useTextTyping'

import styles from './ResultStep.module.scss'

export interface ResultStepProps {
  result: string
}

export const ResultStep = ({ result }: ResultStepProps) => {
  const typing = useTextTyping(result)

  return (
    <div className={clsx(styles.root)}>
      <Title tag="h3">{prepPageText.result.title}</Title>
      <Caption className={clsx(styles.caption)}>
        {prepPageText.result.caption}
      </Caption>
      <div className={clsx(styles.content)}>
        {typing}
      </div>
    </div>
  )
}