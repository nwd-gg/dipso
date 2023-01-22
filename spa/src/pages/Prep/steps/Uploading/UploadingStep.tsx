import { useCallback, useState } from 'react'
import clsx from 'clsx'

import { FileUploader } from '../../../../components/FileUploader'
import { useImageUpload } from '../../../../hooks/useImageUpload'

import styles from './UploadingStep.module.scss'
import { Button, ButtonSize } from '../../../../components/ui/Button'
import { RequestStatus } from '../../../../types/request'
import { SimpleLoader } from '../../../../components/ui/SimpleLoader'
import { prepPageText } from '../../../../constants/texts'
import { Title } from '../../../../components/ui/Title'
import { Caption } from '../../../../components/ui/Caption'

const getText = (textType: 'caption' | 'title', hasFiles: boolean, isLoading: boolean) => {
  if (isLoading) {
    return prepPageText.upload[textType].uploading
  }

  if (hasFiles) {
    return prepPageText.upload[textType].review
  }

  return prepPageText.upload[textType].intro
}

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

  const title = getText('title', hasFiles, isLoading)
  const caption = getText('caption', hasFiles, isLoading)

  return (
    <div className={clsx(styles.root)}>
      {isFailure ?
        <Title>{prepPageText.error}</Title>
        : (
      <div className={clsx(styles.body)}>
        <Title tag="h3">{title}</Title>
        <Caption className={clsx(styles.caption)}>
          {caption}
        </Caption>
        {isLoading && <SimpleLoader />}
        {!isLoading &&
          <FileUploader
            onChange={handleUpload}
          />
        }
        {(!isLoading && hasFiles) && (
          <div className={clsx(styles.row)}>
            <div className={clsx(styles.arrow)}></div>
            <Button
              size={ButtonSize.Large}
              onClick={handleOnClick}
            >
              Beep Boop
            </Button>
        </div>
        )}
      </div>)}
    </div>
  )
}