import { prepPageText } from '../../../../constants/texts'
import { Title } from "../../../../components/ui/Title"
import { TextareaField, TextareaFieldProps } from '../../../../components/ui/Textarea'

import styles from './IngredientsArea.module.scss'
import { Caption } from '../../../../components/ui/Caption'

export interface IngredientsAreaProps {
  onChange?: TextareaFieldProps['onChange']
}

export const IngredientsArea = ({ onChange }: IngredientsAreaProps) => {
  return (
    <div className={styles.root}>
      <Title>{prepPageText.upload.title.intro}</Title>
      <div className={styles.inner}>
        <Caption>
          Write your available ingredients separated by commas
        </Caption>
        <TextareaField name="ingredients" onChange={onChange} />
      </div>
    </div>
  )
}