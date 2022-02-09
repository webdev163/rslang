import React, { FC, useState, useEffect } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { WordResponse } from '../../../types/requests';
import CardItem from '../CardItem';
import Loader from '../../Loader';

import styles from './CardsList.module.scss';

const CardsList: FC = () => {
  const { wordsArr, isLoading, group, page, doneArr } = useTypedSelector(state => state.guide);
  const { user, isAuthorized } = useTypedSelector(state => state.auth);

  const [pageStatus, setPageStatus] = useState<number[]>(new Array(20).fill(0));

  const renderCards = wordsArr.map((word: WordResponse, ndx: number) => {
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
        cardItemNumber={ndx}
        pageStatus={pageStatus}
        setPageStatus={setPageStatus}
      />
    );
  }) as JSX.Element[];

  return (
    <div>
      {doneArr[group][page] === 1 ? <h2>Страница {page + 1} изучена!</h2> : ''}
      <ul className={styles.cardsWrapper}>{isLoading ? <Loader /> : renderCards}</ul>
    </div>
  );
};

export default CardsList;
