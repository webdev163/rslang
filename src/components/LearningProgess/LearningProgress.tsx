import React, { FC } from 'react';
import { LearningProgressProps } from './types';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import styles from './LearningProgress.module.scss';

const LearningProgress: FC<LearningProgressProps> = ({ isLearned, wordId, isHard }) => {
  // if (isLearned) return <CheckCircleOutlineIcon sx={{ fontSize: 30, color: '#f3c139' }} />;

  const { words } = useTypedSelector(state => state.userWords);

  const curUserWord = words.find(word => word.wordId === wordId);
  if (!curUserWord) return null; //<span className={styles.new}>new</span>;
  // const progress = curUserWord.optional && curUserWord.optional.rightChain;
  const difficulty = isHard ? 'hard' : 'weak';

  const chain =
    curUserWord.optional &&
    curUserWord.optional.answersChain &&
    curUserWord.optional.answersChain.split(',').map(a => +a);

  let progress = 0;

  if (chain) {
    chain.shift(); // first element zero - means viewed

    for (let i = chain.length - 1; i >= 0; i -= 1) {
      if (chain[i] === 1) {
        progress++;
      } else {
        break;
      }
    }
  }

  if (!isLearned && (!chain || chain.length === 0)) return <span className={styles.new}>new</span>;
  if (isLearned && (!chain || chain.length === 0)) return null; // checked as learnt without learning

  if ((progress >= 3 && !isHard) || (progress >= 5 && isHard))
    return <CheckCircleOutlineIcon sx={{ fontSize: 30, color: '#f3c139' }} />;
  const styleVariable = {
    '--progress': ` ${(100 * progress) / (difficulty === 'hard' ? 5 : 3)}%`,
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
      <div className={styles.answers}>
        {answersEls}
        {chain && chain.length === 1 && <span className={styles.new}>new</span>}
      </div>
    </div>
  );
};
export default LearningProgress;
