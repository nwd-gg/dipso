import { useState } from 'react';
import clsx from 'clsx';

import styles from './FileUploader.module.scss'

export interface FileUploaderProps {
  onChange: (file: FileList) => void
}

export const FileUploader = ({ onChange }: FileUploaderProps) => {
  const [files, setFile] = useState<FileList | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const uploadedFiles = e.target.files

    setFile(uploadedFiles)
    onChange(uploadedFiles)
  }


  return (
    <div className={clsx(styles.root)}>
      <input
        multiple
        type="file"
        className={clsx(styles.input)}
        onChange={handleChange}
      />
      {(files && Boolean(files.length)) && (
        Array.from(files).map((file) => {
          return (
            <img
              key={file.name}
              src={URL.createObjectURL(file)}
              alt="preview"
              title="preview"
              className={clsx(styles.preview)}
            />
          )
        })
      )}
    </div>
  );
};