import React, { FC, useState, useEffect } from 'react';
import { CardHardItemProps } from './types';
import { API_URL } from '../../../utils/constants';
import { updateUserWord } from '../../../utils/API';
import { playSound } from '../../../utils/utils';
import Button from '@mui/material/Button';

import styles from '../CardItem/CardItem.module.scss';

const CardHardItem: FC<CardHardItemProps> = ({
  wordId,
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
  userWordData,
}) => {
  const [isHard, setHard] = useState(true);
  const [counter, setCounter] = useState(0);

  const toggleHard = () => {
    setHard(isHard => !isHard);
    setCounter(1);
  };

  useEffect(() => {
    if (counter > 0) {
      if (isHard && 'optional' in userWordData) {
        updateUserWord(userData.userId, userData.token, wordId, 'hard', { ...userWordData.optional });
      } else if (!isHard && 'optional' in userWordData) {
        updateUserWord(userData.userId, userData.token, wordId, 'weak', { ...userWordData.optional });
      } else if (isHard && !('optional' in userWordData)) {
        updateUserWord(userData.userId, userData.token, wordId, 'hard');
      } else if (!isHard && !('optional' in userWordData)) {
        updateUserWord(userData.userId, userData.token, wordId, 'weak');
      }
    }
  }, [isHard]);

  return (
    <div className={styles.cardWrapper}>
      <div
        className={`${styles.imgWrapper} ${!isHard ? styles.disabled : ''}`}
        style={{ backgroundImage: `url(${API_URL}/${image})` }}
      ></div>
      <div className={styles.cardBody}>
        <div className={styles.cardHeaderWrapper}>
          <div className={styles.cardNameWrapper}>
            <h2 className={styles.wordName}>{word}</h2>
            <p className={styles.transcription}>{transcription}</p>
            <button className={styles.btnSound} onClick={() => playSound(audio, audioExample, audioMeaning)}></button>
          </div>
        </div>
        <p className={styles.translation}>{wordTranslate}</p>
        <div className={styles.examplesWrapper}>
          <p className={styles.textExample} dangerouslySetInnerHTML={{ __html: textExample }}></p>
          <p className={styles.textExampleTranslation}>{textExampleTranslate}</p>
          <p className={styles.textMeaning} dangerouslySetInnerHTML={{ __html: textMeaning }}></p>
          <p className={styles.textMeaningTranslation}>{textMeaningTranslate}</p>
        </div>
        <div className={styles.cardButtonsWrapper}>
          <Button
            variant="outlined"
            onClick={toggleHard}
            sx={{ flexBasis: '48%', fontSize: 18, border: '1px solid #b9b9b9', marginLeft: 'auto', marginTop: 2 }}
          >
            {isHard ? 'Убрать из сложных' : 'Добавить в сложные'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardHardItem;
