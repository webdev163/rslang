import React, { FC, useEffect } from 'react';
import { batch } from 'react-redux';
import { useWordsPage } from '../../hooks/useWordsPage';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Modal from '../Modal';

import Timer from '../Timer';

import styles from './GameSprint.module.scss';

const GameSprint: FC = () => {
  const words = useWordsPage();
  console.log('render');

  const { currentWord, isGameOn, score, pointsForAnswer, rightAnswers, translate, isTrue } = useTypedSelector(
    state => state.sprint,
  );
  const { setCurrentWord, setRandowWord, stopGame, incrementScore, incrementRightAnswers, resetRigthAnswers } =
    useActions();

  useEffect(() => {
    if (words.length) {
      setCurrentWord(words[0], words);
    }
  }, [words]);

  const receiveAnswer = (answer: boolean) => {
    if (!isGameOn) return;
    if (isTrue === answer) {
      batch(() => {
        incrementScore();
        incrementRightAnswers(pointsForAnswer, rightAnswers);
        setRandowWord(words);
      });
    } else {
      batch(() => {
        resetRigthAnswers();
        setRandowWord(words);
      });
    }
  };

  const handleTrueButton = () => {
    receiveAnswer(true);
  };

  const handleFalseButton = () => {
    receiveAnswer(false);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.code;
      if (key === 'ArrowRight') {
        receiveAnswer(true);
      }
      if (key === 'ArrowLeft') {
        receiveAnswer(false);
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentWord]);

  const answersCounterTemplate = pointsForAnswer < 80 ? <p>{rightAnswers} / 3</p> : <p>1</p>;

  return (
    <div>
      <h1 className={styles.title}>Sprint Game</h1>
      <Timer initialTime={30} onEnd={() => stopGame()} />
      <div className={styles.points}>{score}</div>
      <div className={styles.game}>
        {(rightAnswers > 0 || pointsForAnswer > 10) && answersCounterTemplate}
        {pointsForAnswer > 10 && (
          <div>
            <p>+{pointsForAnswer} за слово</p>
          </div>
        )}
        {currentWord && (
          <div>
            <p>
              <b>{currentWord.word}</b>
            </p>
            <p>{translate}</p>
            <button onClick={handleFalseButton}>Неверно</button>
            <button onClick={handleTrueButton}>Верно</button>
          </div>
        )}
      </div>
      {!isGameOn && <Modal>STOP. Result - {score}</Modal>}
    </div>
  );
};

export default GameSprint;
