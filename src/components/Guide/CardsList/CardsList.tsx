import React, { FC, useState, useEffect } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { WordResponse } from '../../../types/requests';
import CardItem from '../CardItem';
import Loader from '../../Loader';
import Alert from '@mui/material/Alert';
import { makeStyles } from '@mui/styles';
import { useActions } from '../../../hooks/useActions';
import { useParams } from 'react-router-dom';

import styles from './CardsList.module.scss';

const CardsList: FC = () => {
  const { emptyDoneCounter, getUserWordsAction } = useActions();
  const { wordsArr, isLoading, group, page, doneCounter } = useTypedSelector(state => state.guide);
  const { user, isAuthorized } = useTypedSelector(state => state.auth);
  const { words } = useTypedSelector(state => state.userWords);

  const [counter, setCounter] = useState(0);
  const [hardArr, setHardArr] = useState<string[]>([]);
  const [learntArr, setLearntArr] = useState<string[]>([]);
  const { page: currentPage, group: currentGroup } = useParams();

  useEffect(() => {
    if (isAuthorized) {
      setHardArr(
        words
          .filter(el => el.difficulty)
          .filter(el => el.difficulty === 'hard')
          .map(el => el.wordId),
      );
      setLearntArr(
        words
          .filter(el => el.optional)
          .filter(el => el.optional.done)
          .map(el => el.wordId),
      );
    }
  }, [words]);

  const getAlert = () => {
    const isDone = doneCounter > 19;
    if (isDone) {
      return (
        <Alert severity="success" className={classes.root}>
          Эта страница полностью изучена!
        </Alert>
      );
    } else {
      return <div></div>;
    }
  };

  useEffect(() => {
    getAlert();
  }, [doneCounter]);

  useEffect(() => {
    emptyDoneCounter();
  }, [currentPage, currentGroup]);

  useEffect(() => {
    if (user.userId) {
      getUserWordsAction(user.userId, user.token);
    }
  }, [user]);

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
        hardArr={hardArr}
        learntArr={learntArr}
        doneCounter={counter}
        setDoneCounter={setCounter}
      />
    );
  }) as JSX.Element[];

  const useStyles = makeStyles({
    root: {
      marginTop: 30,
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 30,
      fontSize: 20,
      '& .MuiAlert-icon': {
        fontSize: 30,
      },
      borderRadius: 10,
    },
  });

  const classes = useStyles();

  return (
    <div>
      {getAlert()}
      <ul className={styles.cardsWrapper}>{isLoading ? <Loader /> : renderCards}</ul>
    </div>
  );
};

export default CardsList;
