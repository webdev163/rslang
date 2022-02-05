import React, { FC } from 'react';
import { CardItemProps } from './types';
import { API_URL } from '../../../utils/constants';

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
  const audioElem = new Audio();
  const audioExampleElem = new Audio();
  const audioMeaningElem = new Audio();
  audioElem.src = `${API_URL}/${audio}`;
  audioExampleElem.src = `${API_URL}/${audioExample}`;
  audioMeaningElem.src = `${API_URL}/${audioMeaning}`;

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.imgWrapper}>
        <img className={styles.cardImg} src={`${API_URL}/${image}`} alt={word} />
      </div>
      <button className={styles.btnSound} onClick={() => audioElem.play()}></button>
      <h2>{word}</h2>
      <p>{transcription}</p>
      <p>{wordTranslate}</p>
      <div className={styles.examplesWrapper}>
        <p dangerouslySetInnerHTML={{ __html: textExample }}></p>
        <button className={styles.btnSound} onClick={() => audioExampleElem.play()}></button>
        <p>{textExampleTranslate}</p>
        <p dangerouslySetInnerHTML={{ __html: textMeaning }}></p>
        <button className={styles.btnSound} onClick={() => audioMeaningElem.play()}></button>
        <p>{textMeaningTranslate}</p>
      </div>
    </div>
  );
};

export default CardItem;
