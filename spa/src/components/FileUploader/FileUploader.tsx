import { useState } from 'react';
import clsx from 'clsx';

import styles from './FileUploader.module.scss'

export interface FileUploaderProps {
  onChange: (file: File) => void
}

export const FileUploader = ({ onChange }: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const uploadedFile = e.target.files[0]

    setFile(uploadedFile)
    onChange(uploadedFile)
  }


  return (
    <div className={clsx(styles.root)}>
      <input
        type="file"
        className={clsx(styles.input)}
        onChange={handleChange}
      />
      {(file && Boolean(file)) && (
        <img
          src={URL.createObjectURL(file)}
          alt="preview"
          title="preview"
          className={clsx(styles.preview)}
        />
      )}
    </div>
  );
};