import React, { FC, useEffect, useState } from 'react';
import { batch } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useLocationFrom } from '../../hooks/useLocationFrom';

import GameSprintTimer from '../GameSprintTimer';
import { Button, Container, Dialog } from '@mui/material';
import DifficultyDialog from '../DifficultyDialog';

import styles from './GameSprint.module.scss';

const GameSprint: FC = () => {
  const from = useLocationFrom();

  const [showDifficulty, setShowDifficulty] = useState(true);
  const [showResult, setShowResult] = useState(false);

  const { userId } = useTypedSelector(state => state.auth.user);

  const {
    words,
    currentWord,
    isGameOn,
    isRouterParamsReceived,
    score,
    pointsForAnswer,
    rightAnswers,
    translate,
    isTrue,
  } = useTypedSelector(state => state.sprint);

  const {
    setSprintGroup,
    setSprintGroupWithoutLearned,
    setSprintDifficultWords,
    setCurrentWord,
    setRandowWord,
    startGame,
    stopGame,
    receiveRouterStateInSprint,
    incrementScore,
    incrementRightAnswers,
    resetSprintRigthAnswers,
    resetSprintState,
    receiveUserAnswerAction,
  } = useActions();

  useEffect(() => {
    if (from) {
      receiveRouterStateInSprint();
      if (from === 'difficult') {
        setSprintDifficultWords();
      } else {
        const group = +from.group;
        const page = +from.page;
        if (userId) {
          setSprintGroupWithoutLearned(group, page);
        } else {
          setSprintGroup(group, page);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (words.length) {
      setCurrentWord(words[0], words);
    }
  }, [words]);

  useEffect(
    () => () => {
      resetSprintState();
    },
    [],
  );

  const receiveAnswer = (answer: boolean) => {
    if (!isGameOn || !currentWord) return;
    if (isTrue === answer) {
      batch(() => {
        incrementScore();
        incrementRightAnswers();
        setRandowWord(words);
        receiveUserAnswerAction(true, currentWord, 'sprint');
      });
    } else {
      batch(() => {
        resetSprintRigthAnswers();
        setRandowWord(words);
        receiveUserAnswerAction(false, currentWord, 'sprint');
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

  if (!isGameOn && !isRouterParamsReceived) {
    return (
      <Container>
        <DifficultyDialog
          open={showDifficulty}
          onSelect={index => {
            setSprintGroup(index);
            startGame();
            setShowDifficulty(false);
          }}
        />
        <Dialog
          open={showResult}
          onClose={() => {
            setShowResult(false);
            setShowDifficulty(true);
            resetSprintState();
          }}
        >
          STOP. Result - {score}
        </Dialog>
      </Container>
    );
  }

  if (!isGameOn && isRouterParamsReceived) {
    return (
      <Container>
        <Dialog open={showDifficulty}>
          <Button
            onClick={() => {
              startGame();
              setShowDifficulty(false);
            }}
          >
            Начать
          </Button>
        </Dialog>
        <Dialog
          open={showResult}
          onClose={() => {
            setShowResult(false);
            setShowDifficulty(true);
            resetSprintState();
          }}
        >
          STOP. Result - {score}
        </Dialog>
      </Container>
    );
  }

  return (
    <div>
      <h1 className={styles.title}>Sprint Game</h1>
      <GameSprintTimer
        initialTime={60}
        onEnd={() => {
          stopGame();
          setShowResult(true);
        }}
      />
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
    </div>
  );
};

export default GameSprint;
