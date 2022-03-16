import React, { FC } from 'react';
import SelectDifficulty from '../SelectDifficulty';
import SelectPage from '../SelectPage';
import SelectGame from '../SelectGame';
import ButtonHard from '../ButtonHard';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

import styles from './GuideHeader.module.scss';

const GuideHeader: FC = () => {
  const { isAuthorized } = useTypedSelector(state => state.auth);

  return (
    <div className={styles.wrapper}>
      <div className={styles.selectWrapper}>
        <SelectDifficulty />
        <SelectPage />
      </div>
      <div className={styles.btnWrapper}>
        <SelectGame />
        {isAuthorized ? <ButtonHard /> : ''}
      </div>
    </div>
  );
};

export default GuideHeader;
