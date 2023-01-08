import clsx from 'clsx';
import { Button, ButtonSize } from '../../components/ui/Button';

import styles from './MainPage.module.css';

export const MainPage = () => {
  return (
    <div className={clsx(styles.mainPage)}>
      <div className={clsx(styles.inner)}>
        <h1 className={clsx(styles.title)}>NEW WAVE DIPSO</h1>
        <div className={clsx(styles.desc)}>
          <p>
            Simple fun pet project across ChatGPT and Google Lens functionality to make homechill a bit more pleasant.
          </p>
          <p>
            Give us chance to suggest drink or another stuff for homechill.
          </p>
        </div>
        <div className={clsx(styles.actions)}>
          <Button
            size={ButtonSize.Large}
          >
            Guide me
          </Button>
        </div>
      </div>
    </div>
  )
};