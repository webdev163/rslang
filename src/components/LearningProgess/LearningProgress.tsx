import React, { FC } from 'react';
import { LearningProgressProps } from './types';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import styles from './LearningProgress.module.scss';
const LearningProgress: FC<LearningProgressProps> = ({ difficulty, progress, isLearned, answers }) => {
  if (isLearned) return <CheckCircleOutlineIcon sx={{ fontSize: 30, color: '#f3c139' }} />;

  const styleVariable = {
    '--progress': ` ${(100 * (progress || 0)) / (difficulty === 'hard' ? 5 : 3)}%`,
  } as React.CSSProperties;

  const answersEls = answers
    ? answers.map((answ, indx) => (
        <span
          key={indx}
          className={`${styles.answer} ${answ ? styles['answer-right'] : styles['answer-wrong']}`}
        ></span>
      ))
    : null;

  return (
    <div className={styles.progress} style={styleVariable}>
      <div className={styles.answers}>{answersEls}</div>
    </div>
  );
};
export default LearningProgress;
