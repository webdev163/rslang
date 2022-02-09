import React, { FC } from 'react';
import SelectDifficulty from '../SelectDifficulty';
import SelectPage from '../SelectPage';
import SelectGame from '../SelectGame';
import ButtonHard from '../ButtonHard';

import styles from './GuideHeader.module.scss';

const GuideHeader: FC = () => {
  return (
    <div className={styles.wrapper}>
      <SelectDifficulty />
      <SelectPage />
      <SelectGame />
      <ButtonHard />
    </div>
  );
};

export default GuideHeader;
