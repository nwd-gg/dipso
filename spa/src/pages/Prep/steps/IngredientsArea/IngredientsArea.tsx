import clsx from 'clsx'

import { prepPageText } from '../../../../constants/texts'
import { Title } from "../../../../components/ui/Title"
import { TextareaField, TextareaFieldProps } from '../../../../components/ui/Textarea'
import { Caption } from '../../../../components/ui/Caption'
import { Button, ButtonSize } from '../../../../components/ui/Button'

import styles from './IngredientsArea.module.scss'

export interface IngredientsAreaProps {
  onChange?: TextareaFieldProps['onChange']
  onBtnClick?: (event: React.MouseEvent) => void
}

export const IngredientsArea = ({ onChange, onBtnClick }: IngredientsAreaProps) => {
  return (
    <div className={styles.root}>
      <Title>{prepPageText.upload.title.intro}</Title>
      <div className={styles.inner}>
        <Caption>
          {prepPageText.upload.caption.intro}
        </Caption>
        <TextareaField name="ingredients" onChange={onChange} />
        <div className={clsx(styles.row)}>
          <div className={clsx(styles.arrow)}></div>
          <Button
            size={ButtonSize.Large}
            onClick={onBtnClick}
          >
            Beep Boop
          </Button>
        </div>
      </div>
    </div>
  )
}