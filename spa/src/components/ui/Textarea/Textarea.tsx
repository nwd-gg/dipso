import clsx from 'clsx'

import styles from './Textarea.module.scss'

export interface TextareaFieldProps extends React.HTMLProps<HTMLTextAreaElement> {
  name: string
  label?: string
}

export const TextareaField = ({ label, className, ...props }: TextareaFieldProps) => {
  return (
    <div className={styles.root}>
      {label && (
        <label className={styles.label} htmlFor={props.id || props.name}>
          {label}
        </label>
      )}
      <textarea
        className={clsx(styles.textarea, className)}
        {...props}
      />
    </div>
  )
}