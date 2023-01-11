import { useCallback } from 'react'
import clsx from 'clsx'

import { FileUploader } from '../../../../components/FileUploader'
import { useImageUpload } from '../../../../hooks/useImageUpload'

import styles from './UploadingStep.module.scss'
import { Button, ButtonSize } from '../../../../components/ui/Button'

export const UploadingStep = () => {
  const { setFiles, uploadFiles } = useImageUpload()

  const handleUpload = useCallback((files: FileList) => {
    setFiles(files)
  }, [setFiles])

  const handleOnClick = useCallback(() => {
    uploadFiles();
  }, [uploadFiles])

  return (
    <div className={clsx(styles.root)}>
      <FileUploader
        onChange={handleUpload}
      />
      <div className={clsx(styles.actions)}>
        <Button
          size={ButtonSize.Large}
          onClick={handleOnClick}
        >
          Beep boop
        </Button>
      </div>
    </div>
  )
}