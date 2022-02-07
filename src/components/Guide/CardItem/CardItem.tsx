import React, { FC, useState } from 'react';
import { CardItemProps } from './types';
import { API_URL } from '../../../utils/constants';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { addUserWord } from '../../../utils/API';

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
}) => {
  const { group } = useTypedSelector(state => state.guide);
  const [isHard, setHard] = useState(false);
  const [isLearnt, setLearnt] = useState(false);

  const playSound = () => {
    const audioElem = new Audio();
    audioElem.src = `${API_URL}/${audio}`;
    audioElem.play();
    audioElem.addEventListener(
      'ended',
      () => {
        audioElem.src = `${API_URL}/${audioExample}`;
        audioElem.pause();
        audioElem.load();
        audioElem.play();
        audioElem.addEventListener(
          'ended',
          () => {
            audioElem.src = `${API_URL}/${audioMeaning}`;
            audioElem.pause();
            audioElem.load();
            audioElem.play();
          },
          { once: true },
        );
      },
      { once: true },
    );
  };

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
          <button
            className={styles.cardButton}
            onClick={() => {
              // addUserWord(userData.userId, userData.token, wordId, 'hard');
              setHard(!isHard);
            }}
          >
            {isHard ? 'Убрасть из сложных' : 'Добавить в сложные'}
          </button>
          <button
            className={styles.cardButton}
            onClick={() => {
              if (!isLearnt) setHard(false);
              setLearnt(!isLearnt);
            }}
          >
            {isLearnt ? 'Убрасть из изученных' : 'Добавить в изученные'}
          </button>
        </div>
      );
    }
    return false;
  };

  return (
    <div className={`${styles.cardWrapper} ${isHard ? styles.cardHard : ''} ${isLearnt ? styles.cardLearnt : ''}`}>
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
