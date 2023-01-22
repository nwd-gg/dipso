import { useCallback, useState } from 'react'
import clsx from 'clsx'

import { FileUploader } from '../../../../components/FileUploader'
import { useImageUpload } from '../../../../hooks/useImageUpload'

import styles from './UploadingStep.module.scss'
import { Button, ButtonSize } from '../../../../components/ui/Button'
import { RequestStatus } from '../../../../types/request'
import { SimpleLoader } from '../../../../components/ui/SimpleLoader'

export interface UploadingStepProps {
  onFinish: (message: string) => void
}

export const UploadingStep = ({ onFinish }: UploadingStepProps) => {
  const { setFiles, uploadFiles, status } = useImageUpload()
  const [hasFiles, setHasFiles] = useState(false)

  const handleUpload = useCallback((files: FileList) => {
    setFiles(files)
    setHasFiles(true)
  }, [setFiles])

  const handleOnClick = useCallback(async () => {
    const result = await uploadFiles();

    if (result) {
      onFinish(result)
    }
  }, [uploadFiles, onFinish])

  const isLoading = status === RequestStatus.Pending
  const isFailure = status === RequestStatus.Failure

  return (
    <div className={clsx(styles.root)}>
      {isLoading && <SimpleLoader />}
      {isFailure && <h1>ERROR</h1>}
      {!isLoading &&
        <FileUploader
          onChange={handleUpload}
        />
      }
      {(!isLoading && hasFiles) && (
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