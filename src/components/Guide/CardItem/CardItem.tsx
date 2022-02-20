import React, { FC, useState, useEffect } from 'react';
import { CardItemProps } from './types';
import { API_URL } from '../../../utils/constants';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { addUserWord, updateUserWord } from '../../../utils/API';
import { useActions } from '../../../hooks/useActions';
import { playSound, getColor } from '../../../utils/utils';
import Button from '@mui/material/Button';
import { getUserStatistic, updateUserStatistic } from '../../../utils/API';

import styles from './CardItem.module.scss';
import LearningProgress from '../../LearningProgess';

const CardItem: FC<CardItemProps> = ({
  wordId,
  isAuthorized,
  userData,
  audio,
  audioExample,
  audioMeaning,
  image,
  textExample,
  textExampleTranslate,
  textMeaning,
  textMeaningTranslate,
  transcription,
  word,
  wordTranslate,
  hardArr,
  learntArr,
}) => {
  const { group } = useTypedSelector(state => state.guide);
  const { user } = useTypedSelector(state => state.auth);
  const { incDoneCounter, decDoneCounter } = useActions();
  const { words } = useTypedSelector(state => state.userWords);

  const [isHard, setHard] = useState(false);
  const [isLearnt, setLearnt] = useState(false);
  const [counter, setCounter] = useState(0);
  const [countOnce, setCountOnce] = useState(0);

  useEffect(() => {
    if (isAuthorized && hardArr.includes(wordId) && !countOnce) {
      setCountOnce(1);
      setHard(true);
      incDoneCounter();
    } else if (isAuthorized && learntArr.includes(wordId) && !countOnce) {
      setCountOnce(1);
      setLearnt(true);
      incDoneCounter();
    }
  }, [hardArr, learntArr]);

  const toggleHard = () => {
    setHard(isHard => !isHard);
    setCounter(1);
  };

  const toggleLearnt = () => {
    setLearnt(isLearnt => !isLearnt);
    setCounter(1);
  };

  useEffect(() => {
    if (isAuthorized && counter) {
      const current = words.filter(el => el.wordId === wordId)[0];
      if (isHard && current && 'optional' in current) {
        incDoneCounter();
        updateUserWord(userData.userId, userData.token, wordId, 'hard', { ...current.optional, done: false });
      } else if (!isHard && current && 'optional' in current) {
        decDoneCounter();
        updateUserWord(userData.userId, userData.token, wordId, 'weak', { ...current.optional, done: false });
      } else if (isHard && current && !('optional' in current)) {
        incDoneCounter();
        updateUserWord(userData.userId, userData.token, wordId, 'hard');
      } else if (!isHard && current && !('optional' in current)) {
        decDoneCounter();
        updateUserWord(userData.userId, userData.token, wordId, 'weak');
      } else if (isHard) {
        incDoneCounter();
        addUserWord(userData.userId, userData.token, wordId, 'hard');
      } else if (!isHard) {
        decDoneCounter();
        addUserWord(userData.userId, userData.token, wordId, 'weak');
      }
    }
  }, [isHard]);

  useEffect(() => {
    if (isAuthorized && counter) {
      const current = words.filter(el => el.wordId === wordId)[0];
      if (isLearnt && current && 'optional' in current) {
        incDoneCounter();
        updateUserWord(userData.userId, userData.token, wordId, 'weak', { ...current.optional, done: true });
        updateStats('inc');
      } else if (!isLearnt && current && 'optional' in current) {
        decDoneCounter();
        updateUserWord(userData.userId, userData.token, wordId, 'weak', { ...current.optional, done: false });
        updateStats('dec');
      } else if (isLearnt && current && !('optional' in current)) {
        incDoneCounter();
        updateUserWord(userData.userId, userData.token, wordId, 'weak', { done: true });
        updateStats('inc');
      } else if (!isLearnt && current && !('optional' in current)) {
        decDoneCounter();
        updateUserWord(userData.userId, userData.token, wordId, 'weak', { done: false });
        updateStats('dec');
      } else if (isLearnt) {
        incDoneCounter();
        addUserWord(userData.userId, userData.token, wordId, 'weak', { done: true });
        updateStats('inc');
      } else if (!isLearnt) {
        decDoneCounter();
        addUserWord(userData.userId, userData.token, wordId, 'weak', { done: false });
        updateStats('dec');
      }
    }
  }, [isLearnt]);

  const updateStats = async (type: string) => {
    const prevStats = await getUserStatistic(user.userId, user.token);
    const date = new Date().toLocaleDateString('ru-RU');
    let currentNum: number;
    try {
      currentNum = prevStats.optional[date].guide.learnedWords;
    } catch {
      currentNum = 0;
    }
    currentNum = type === 'inc' ? currentNum + 1 : currentNum - 1;
    if (currentNum < 0) currentNum = 0;
    let totalLearned = prevStats.learnedWords;
    totalLearned = type === 'inc' ? totalLearned + 1 : totalLearned - 1;

    if (prevStats.optional) {
      updateUserStatistic(user.userId, user.token, totalLearned, {
        ...prevStats.optional,
        [date]: {
          ...prevStats.optional[date],
          // eslint-disable-next-line prettier/prettier
          guide: {
            learnedWords: currentNum,
          },
        },
      });
    } else {
      updateUserStatistic(user.userId, user.token, totalLearned, {
        [date]: {
          // eslint-disable-next-line prettier/prettier
          guide: {
            learnedWords: currentNum,
          },
        },
      });
    }
  };

  const generateCardButtons = () => {
    if (isAuthorized) {
      return (
        <div className={styles.cardButtonsWrapper}>
          <Button
            variant="outlined"
            onClick={toggleHard}
            sx={{ flexBasis: '48%', fontSize: 18, border: '1px solid #b9b9b9' }}
            disabled={isLearnt}
          >
            {isHard ? 'Убрать из сложных' : 'Добавить в сложные'}
          </Button>
          <Button
            variant="outlined"
            onClick={toggleLearnt}
            sx={{ flexBasis: '48%', fontSize: 18, border: '1px solid #b9b9b9' }}
            disabled={isHard}
          >
            {isLearnt ? 'Убрать из изученных' : 'Добавить в изученные'}
          </Button>
        </div>
      );
    }
  };

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.imgWrapper} style={{ backgroundImage: `url(${API_URL}/${image})` }}></div>
      <div className={styles.cardBody}>
        <div className={styles.cardHeaderWrapper}>
          <div className={styles.cardNameWrapper}>
            <div className={styles.label} style={{ backgroundColor: `${getColor(group)}` }}></div>
            <h2 className={styles.wordName}>{word}</h2>
            <p className={styles.transcription}>{transcription}</p>
            <button className={styles.btnSound} onClick={() => playSound(audio, audioExample, audioMeaning)}></button>
            <LearningProgress isLearned={isLearnt} wordId={wordId} />
          </div>
          <div className={styles.cardLabelsWrapper}>
            {isHard ? <div className={styles.labelHard}>Сложное</div> : ''}
            {isLearnt ? <div className={styles.labelLearnt}>Изучено</div> : ''}
          </div>
        </div>
        <p className={styles.translation}>{wordTranslate}</p>
        <div className={styles.examplesWrapper}>
          <p className={styles.textExample} dangerouslySetInnerHTML={{ __html: textExample }}></p>
          <p className={styles.textExampleTranslation}>{textExampleTranslate}</p>
          <p className={styles.textMeaning} dangerouslySetInnerHTML={{ __html: textMeaning }}></p>
          <p className={styles.textMeaningTranslation}>{textMeaningTranslate}</p>
        </div>
        {generateCardButtons()}
      </div>
    </div>
  );
};

export default CardItem;
