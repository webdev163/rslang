import React, { FC, useState, useEffect } from 'react';
import { CardItemProps } from './types';
import { API_URL } from '../../../utils/constants';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { addUserWord, updateUserWord } from '../../../utils/API';
import { useActions } from '../../../hooks/useActions';
import Button from '@mui/material/Button';

import styles from './CardItem.module.scss';

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
  const { group, page, doneCounter } = useTypedSelector(state => state.guide);
  const { incDoneCounter, decDoneCounter } = useActions();
  const { words } = useTypedSelector(state => state.userWords);

  const [isHard, setHard] = useState(false);
  const [isLearnt, setLearnt] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (isAuthorized) {
      if (hardArr.includes(wordId)) {
        setHard(true);
        incDoneCounter();
      } else if (learntArr.includes(wordId)) {
        setLearnt(true);
        incDoneCounter();
      }
    }
  }, [hardArr, learntArr]);

  const playSound = () => {
    const audioElem = new Audio();
    audioElem.src = `${API_URL}/${audio}`;
    audioElem.play();
    audioElem.addEventListener(
      'ended',
      () => {
        audioElem.src = `${API_URL}/${audioExample}`;
        audioElem.load();
        audioElem.play();
        audioElem.addEventListener(
          'ended',
          () => {
            audioElem.src = `${API_URL}/${audioMeaning}`;
            audioElem.load();
            audioElem.play();
          },
          { once: true },
        );
      },
      { once: true },
    );
  };

  const toggleHard = () => {
    setHard(isHard => !isHard);
    setCounter(1);
  };

  const toggleLearnt = () => {
    setLearnt(isLearnt => !isLearnt);
    setCounter(1);
  };

  useEffect(() => {
    if (isAuthorized && counter > 0) {
      const current = words.filter(el => el.wordId === wordId)[0];
      if (isHard && current && 'optional' in current) {
        incDoneCounter();
        updateUserWord(userData.userId, userData.token, wordId, 'hard', { ...current.optional });
      } else if (!isHard && current && 'optional' in current) {
        decDoneCounter();
        updateUserWord(userData.userId, userData.token, wordId, 'weak', { ...current.optional });
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
    if (isAuthorized && counter > 0) {
      const current = words.filter(el => el.wordId === wordId)[0];
      if (isLearnt && current && 'optional' in current) {
        updateUserWord(userData.userId, userData.token, wordId, 'weak', { ...current.optional, done: true });
      } else if (!isLearnt && current && 'optional' in current) {
        updateUserWord(userData.userId, userData.token, wordId, 'weak', { ...current.optional, done: false });
      } else if (isLearnt && current && !('optional' in current)) {
        updateUserWord(userData.userId, userData.token, wordId, 'weak', { done: true });
      } else if (!isLearnt && current && !('optional' in current)) {
        updateUserWord(userData.userId, userData.token, wordId, 'weak', { done: false });
      } else if (isLearnt) {
        addUserWord(userData.userId, userData.token, wordId, 'weak', { done: true });
      } else if (!isLearnt) {
        addUserWord(userData.userId, userData.token, wordId, 'weak', { done: false });
      }
    }
  }, [isLearnt]);

  const getColor = () => {
    switch (group) {
      case 0:
        return '#78ff56';
      case 1:
        return '#d2ff07';
      case 2:
        return '#fdee45';
      case 3:
        return '#ffb64f';
      case 4:
        return '#fd8d42';
      case 5:
        return '#fa2b2b';
      default:
        break;
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
            <div className={styles.label} style={{ backgroundColor: `${getColor()}` }}></div>
            <h2 className={styles.wordName}>{word}</h2>
            <p className={styles.transcription}>{transcription}</p>
            <button className={styles.btnSound} onClick={() => playSound()}></button>
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
