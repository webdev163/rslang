import React, { FC, useState, useEffect } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { AggregatedWordResponse } from '../../../types/requests';
import CardHardItem from '../CardHardItem';
import Loader from '../../Loader';
import { useActions } from '../../../hooks/useActions';
import ButtonBack from '../ButtonBack';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Link } from 'react-router-dom';

import styles from './CardsHardList.module.scss';

const CardsHardList: FC = () => {
  const { wordsHardArr, isLoading } = useTypedSelector(state => state.guide);
  const { user } = useTypedSelector(state => state.auth);
  const { fetchHardWords } = useActions();

  const [isDataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    fetchHardWords(user.userId, user.token);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setDataFetched(true);
    }, 1000);
  }, [wordsHardArr]);

  const getCards = () => {
    if (!wordsHardArr.length) {
      return <p style={{ fontSize: 22, marginTop: 50 }}>Ни одно сложное слово пока не добавлено.</p>;
    }
    return wordsHardArr.map((word: AggregatedWordResponse) => {
      return (
        <CardHardItem
          key={word._id}
          wordId={word._id}
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
          userData={user}
          userWordData={word.userWord}
        />
      );
    });
  };

  return (
    <div>
      <div className={styles.buttonsWrapper}>
        <PopupState variant="popover">
          {popupState => (
            <React.Fragment>
              <Button variant="contained" {...bindTrigger(popupState)} sx={{ fontSize: 20 }}>
                Мини-игры
              </Button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={popupState.close} sx={{ fontSize: 20 }}>
                  <Link to="/games/audio/" state={{ from: 'difficult' }} className={styles.link}>
                    Игра &quot;Аудиовызов&quot;
                  </Link>
                </MenuItem>
                <MenuItem onClick={popupState.close} sx={{ fontSize: 20 }}>
                  <Link to="/games/sprint/" state={{ from: 'difficult' }} className={styles.link}>
                    Игра &quot;Спринт&quot;
                  </Link>
                </MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
        <ButtonBack />
      </div>
      <ul className={styles.cardsWrapper}>{isLoading || !isDataFetched ? <Loader /> : getCards()}</ul>
    </div>
  );
};

export default CardsHardList;
