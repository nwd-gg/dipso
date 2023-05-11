import { useMemo, useState } from 'react'
import clsx from 'clsx'

import styles from './FileUploader.module.scss'

export interface FileUploaderProps {
  onChange: (file: FileList) => void
}

export const FileUploader = ({ onChange }: FileUploaderProps) => {
  const [files, setFile] = useState<FileList | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const uploadedFiles = e.target.files

    setFile(uploadedFiles)
    onChange(uploadedFiles)
  }

  const hasFiles = useMemo(() => files && Boolean(files.length), [files])
  const actionText = hasFiles ? 'Replace' : 'Select'

  return (
    <div className={clsx(styles.root)}>
      <input
        id="file-upload"
        multiple
        type="file"
        className={clsx(styles.input)}
        onChange={handleChange}
      />
      <label htmlFor="file-upload" className={clsx(styles.label)}>
        {actionText}
      </label>
      <div
        className={clsx(styles.previewWrap, {
          [styles.active]: hasFiles,
        })}
      >
        {files &&
          Boolean(files.length) &&
          Array.from(files).map((file) => {
            return (
              <img
                key={file.name}
                src={URL.createObjectURL(file)}
                alt={file.name}
                title={file.name}
                className={clsx(styles.preview)}
              />
            )
          })}
      </div>
    </div>
  )
}
