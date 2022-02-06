import React, { FC, useEffect } from 'react';
import { CardItemProps } from './types';
import { API_URL } from '../../../utils/constants';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

import styles from './CardItem.module.scss';

const CardItem: FC<CardItemProps> = ({
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
  let audioElem: HTMLAudioElement | null = null;
  let audioExampleElem: HTMLAudioElement | null = null;
  let audioMeaningElem: HTMLAudioElement | null = null;
  useEffect(() => {
    audioElem = new Audio();
    audioExampleElem = new Audio();
    audioMeaningElem = new Audio();
    audioElem.src = `${API_URL}/${audio}`;
    audioExampleElem.src = `${API_URL}/${audioExample}`;
    audioMeaningElem.src = `${API_URL}/${audioMeaning}`;
    return () => {
      audioElem = null;
      audioExampleElem = null;
      audioMeaningElem = null;
    };
  }, []);

  const { group } = useTypedSelector(state => state.guide);

  const getBgColor = () => {
    switch (group) {
      case 0:
        return '#d6ffcc';
      case 1:
        return '#f7ffd2';
      case 2:
        return '#fff9b7';
      case 3:
        return '#fde7c9';
      case 4:
        return '#faceb0';
      case 5:
        return '#fdb4b4';
      default:
        break;
    }
  };

  return (
    <div className={styles.cardWrapper} style={{ backgroundColor: `${getBgColor()}` }}>
      <div className={styles.imgWrapper} style={{ backgroundImage: `url(${API_URL}/${image})` }}></div>
      <div className={styles.cardBody}>
        <div className={styles.cardNameWrapper}>
          <h2 className={styles.wordName}>{word}</h2>
          <p className={styles.transcription}>{transcription}</p>
          <button className={styles.btnSound} onClick={() => audioElem?.play()}></button>
        </div>
        <p className={styles.translation}>{wordTranslate}</p>
        <div className={styles.examplesWrapper}>
          <div className={styles.textExampleWrapper}>
            <p className={styles.textExample} dangerouslySetInnerHTML={{ __html: textExample }}></p>
            <button className={styles.btnSound} onClick={() => audioExampleElem?.play()}></button>
          </div>
          <p className={styles.textExampleTranslation}>{textExampleTranslate}</p>
          <div className={styles.textMeaningWrapper}>
            <p className={styles.textMeaning} dangerouslySetInnerHTML={{ __html: textMeaning }}></p>
            <button className={styles.btnSound} onClick={() => audioMeaningElem?.play()}></button>
          </div>
          <p className={styles.textMeaningTranslation}>{textMeaningTranslate}</p>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
