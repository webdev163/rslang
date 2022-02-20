import React, { FC, useEffect, useState } from 'react';
import { batch } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useLocationFrom } from '../../hooks/useLocationFrom';

import GameSprintTimer from '../GameSprintTimer';
import { Button, Container, Dialog } from '@mui/material';
import DifficultyDialog from '../DifficultyDialog';
import ResultsDialog from '../ResultsDialog';

import styles from './GameSprint.module.scss';

const GameSprint: FC = () => {
  const from = useLocationFrom();

  const [showDifficulty, setShowDifficulty] = useState(true);
  const [showResult, setShowResult] = useState(false);

  const { userId } = useTypedSelector(state => state.auth.user);
  const [gameOnPause, setGameOnPause] = useState(false);

  const {
    words,
    currentWord,
    group,
    page,
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
    setNextSprintWord,
    removeSprintWord,
    startGame,
    stopGame,
    receiveRouterStateInSprint,
    incrementScore,
    incrementRightAnswers,
    resetSprintRigthAnswers,
    resetSprintState,
    receiveUserAnswerAction,
    updateSprintRightAnswersArr,
    updateSprintWrongAnswersArr,
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
    if (!words.length && isGameOn) {
      if (page > 0) {
        if (userId) {
          setSprintGroupWithoutLearned(group, page - 1);
        } else {
          setSprintGroup(group, page - 1);
        }
      } else {
        stopGame();
        setShowResult(true);
      }
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
    batch(() => {
      if (isTrue === answer) {
        incrementScore();
        incrementRightAnswers();
        updateSprintRightAnswersArr(currentWord);
        receiveUserAnswerAction(true, currentWord, 'sprint');
      } else {
        updateSprintWrongAnswersArr(currentWord);
        resetSprintRigthAnswers();
        receiveUserAnswerAction(false, currentWord, 'sprint');
      }
      removeSprintWord(currentWord);
      setNextSprintWord();
    });
  };

  const handleTrueButton = () => {
    receiveAnswer(true);
  };

  const handleFalseButton = () => {
    receiveAnswer(false);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameOnPause) {
        const key = e.code;
        if (key === 'ArrowRight') {
          receiveAnswer(true);
        }
        if (key === 'ArrowLeft') {
          receiveAnswer(false);
        }
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentWord]);

  const maxPointsForAnswer = 80;
  const answersCounterTemplate = pointsForAnswer < maxPointsForAnswer ? <p>{rightAnswers} / 3</p> : <p>1</p>;

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
        <ResultsDialog showResult={showResult} />
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
        <ResultsDialog showResult={showResult} />
      </Container>
    );
  }

  return (
    <div>
      <h1 className={styles.title}>Sprint Game</h1>
      <GameSprintTimer
        isPaused={gameOnPause}
        initialTime={60}
        onEnd={() => {
          stopGame();
          setShowResult(true);
        }}
        onClick={() => {
          setGameOnPause(prev => !prev);
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
            <button onClick={handleFalseButton} disabled={gameOnPause}>
              Неверно
            </button>
            <button onClick={handleTrueButton} disabled={gameOnPause}>
              Верно
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameSprint;
