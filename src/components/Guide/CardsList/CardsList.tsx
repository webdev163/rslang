import React, { FC } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { WordResponse } from '../../../types/requests';
import CardItem from '../CardItem';

import styles from './CardsList.module.scss';

const CardsList: FC = () => {
  const { wordsArr } = useTypedSelector(state => state.guide);

  const renderCards = wordsArr.map((word: WordResponse) => {
    return (
      <CardItem
        key={word.id}
        audio={word.audio}
        audioExample={word.audioExample}
        audioMeaning={word.audioMeaning}
        image={word.image}
        textExample={word.textExample}
        textExampleTranslate={word.textExampleTranslate}
        textMeaning={word.textMeaning}
        textMeaningTranslate={word.textMeaningTranslate}
        transcription={word.transcription}
        word={word.word}
        wordTranslate={word.wordTranslate}
      />
    );
  }) as JSX.Element[];

  return <ul className={styles.cardsWrapper}>{renderCards}</ul>;
};

export default CardsList;
