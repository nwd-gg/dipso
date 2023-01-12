import { useCallback, useState } from 'react'
import clsx from 'clsx'

import { FileUploader } from '../../../../components/FileUploader'
import { useImageUpload } from '../../../../hooks/useImageUpload'

import styles from './UploadingStep.module.scss'
import { Button, ButtonSize } from '../../../../components/ui/Button'

export const UploadingStep = () => {
  const { setFiles, uploadFiles } = useImageUpload()
  const [hasFiles, setHasFiles] = useState(false)

  const handleUpload = useCallback((files: FileList) => {
    setFiles(files)
    setHasFiles(true)
  }, [setFiles])

  const handleOnClick = useCallback(() => {
    uploadFiles();
  }, [uploadFiles])

  return (
    <div className={clsx(styles.root)}>
      <FileUploader
        onChange={handleUpload}
      />
      {hasFiles && (
        <div className={clsx(styles.row)}>
          <div className={clsx(styles.title)}>What's next?</div>
          <p className={clsx(styles.caption)}>
            Look at the downloaded files, if that's all then let's move on. Press the button and send it to Google Lens AI to figure out what we could suggest
          </p>
          <Button
            size={ButtonSize.Large}
            onClick={handleOnClick}
          >
            Beep Boop
          </Button>
        </div>
      )}
    </div>
  )
}