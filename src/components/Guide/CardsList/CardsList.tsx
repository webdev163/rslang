import React, { FC } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { WordResponse } from '../../../types/requests';
import CardItem from '../CardItem';
import Loader from '../../Loader';

import styles from './CardsList.module.scss';

const CardsList: FC = () => {
  const { wordsArr, isLoading } = useTypedSelector(state => state.guide);
  const { user, isAuthorized } = useTypedSelector(state => state.auth);

  const renderCards = wordsArr.map((word: WordResponse) => {
    return (
      <CardItem
        key={word.id}
        wordId={word.id}
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
        isAuthorized={isAuthorized}
        userData={user}
      />
    );
  }) as JSX.Element[];

  return (
    <div>
      <ul className={styles.cardsWrapper}>{isLoading ? <Loader /> : renderCards}</ul>
    </div>
  );
};

export default CardsList;
