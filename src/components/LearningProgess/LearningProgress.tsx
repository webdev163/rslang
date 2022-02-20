import React, { FC } from 'react';
import { LearningProgressProps } from './types';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import styles from './LearningProgress.module.scss';
import { useTypedSelector } from '../../hooks/useTypedSelector';
const LearningProgress: FC<LearningProgressProps> = ({ isLearned, answers, wordId }) => {
  if (isLearned) return <CheckCircleOutlineIcon sx={{ fontSize: 30, color: '#f3c139' }} />;

  const { words } = useTypedSelector(state => state.userWords);

  const curUserWord = words.find(word => word.wordId === wordId);
  if (!curUserWord) return null;

  const progress = curUserWord.optional && curUserWord.optional.rightChain;
  const difficulty = curUserWord.difficulty;

  const chain =
    curUserWord.optional &&
    curUserWord.optional.answersChain &&
    curUserWord.optional.answersChain.split(',').map(a => +a);

  if (chain) chain.shift(); // TODO findout why there is always first zero element

  const styleVariable = {
    '--progress': ` ${(100 * (progress || 0)) / (difficulty === 'hard' ? 5 : 3)}%`,
  } as React.CSSProperties;

  const answersEls = chain
    ? chain.map((answ, indx) => (
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
