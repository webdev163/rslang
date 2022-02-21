import React, { FC, useEffect, useState, useRef } from 'react';
import { batch } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useLocationFrom } from '../../hooks/useLocationFrom';

import GameSprintTimer from '../GameSprintTimer';
import { Button, Container, Dialog } from '@mui/material';
import DifficultyDialog from '../DifficultyDialog';
import ResultsDialog from '../ResultsDialog';
import { API_URL } from '../../utils/constants';

import styles from './GameSprint.module.scss';

const GameSprint: FC = () => {
  const from = useLocationFrom();

  const audio = useRef(new Audio());

  const [showDifficulty, setShowDifficulty] = useState(true);
  const [showResult, setShowResult] = useState(false);

  const { userId } = useTypedSelector(state => state.auth.user);
  const [gameOnPause, setGameOnPause] = useState(false);
  const [isSoundOn, setSoundOn] = useState(true);
  const [isFullscreenOn, setFullscreenOn] = useState(false);

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
    isFullscreenOn ? document.querySelector(`.${styles.pageWrapper}`)?.requestFullscreen() : document.exitFullscreen();
  }, [isFullscreenOn]);

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

  useEffect(() => {
    if (currentWord && isSoundOn) {
      audio.current.src = `${API_URL}/${currentWord.audio}`;
      audio.current.play();
    }
  }, [currentWord]);

  useEffect(() => {
    if (pointsForAnswer > 10 && isSoundOn) {
      const audio = new Audio();
      audio.src = '/assets/sound/next.mp3';
      audio.play();
    }
  }, [pointsForAnswer]);

  useEffect(
    () => () => {
      resetSprintState();
    },
    [],
  );

  const toggleFullscreen = () => {
    setFullscreenOn(isFullscreenOn => !isFullscreenOn);
  };

  const receiveAnswer = (answer: boolean) => {
    if (!isGameOn || !currentWord) return;
    batch(() => {
      if (isTrue === answer) {
        incrementScore();
        incrementRightAnswers();
        updateSprintRightAnswersArr(currentWord);
        receiveUserAnswerAction(true, currentWord, 'sprint');
        if (isSoundOn) {
          const audio = new Audio();
          audio.src = '/assets/sound/correct.mp3';
          audio.play();
        }
      } else {
        updateSprintWrongAnswersArr(currentWord);
        resetSprintRigthAnswers();
        receiveUserAnswerAction(false, currentWord, 'sprint');
        if (isSoundOn) {
          const audio = new Audio();
          audio.src = '/assets/sound/wrong.mp3';
          audio.play();
        }
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
      const key = e.code;
      if (!gameOnPause) {
        if (key === 'ArrowRight') {
          receiveAnswer(true);
        }
        if (key === 'ArrowLeft') {
          receiveAnswer(false);
        }
      }
      if (key === 'Space') {
        setGameOnPause(gameOnPause => !gameOnPause);
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentWord, gameOnPause, isGameOn]);

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
            sx={{ padding: 3 }}
          >
            Начать игру
          </Button>
        </Dialog>
        <ResultsDialog showResult={showResult} />
      </Container>
    );
  }

  return (
    <div className={styles.pageWrapper}>
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
      <div className={styles.fullscreenWrapper} onClick={() => toggleFullscreen()}>
        <img src={'/assets/img/fullscreen.svg'} alt="" />
      </div>
      <div className={styles.points}>{score}</div>
      <div className={styles.cardWrapper}>
        <div className={styles.soundToggleIcon} onClick={() => setSoundOn(isSoundOn => !isSoundOn)}>
          <img src={`/assets/img/sound-${isSoundOn ? 'on' : 'off'}.svg`} alt="" />
        </div>
        <button className={styles.soundIcon} onClick={() => audio.current.play()}></button>
        <div className={styles.circleWrapper}>
          <div
            className={`${styles.circleItem} ${rightAnswers > 0 || pointsForAnswer === 80 ? styles.done : ''}`}
          ></div>
          <div
            className={`${styles.circleItem} ${rightAnswers > 1 ? styles.done : ''} ${
              pointsForAnswer === 80 ? styles.hidden : ''
            }`}
          ></div>
          <div
            className={`${styles.circleItem} ${rightAnswers > 2 ? styles.done : ''} ${
              pointsForAnswer === 80 ? styles.hidden : ''
            }`}
          ></div>
        </div>
        {pointsForAnswer > 10 && (
          <div>
            <p className={styles.extra}>+ {pointsForAnswer} очков за слово</p>
          </div>
        )}
        {pointsForAnswer === 10 && <div className={styles.empty}></div>}
        <div className={styles.parrotsWrapper}>
          <div className={styles.parrot1}></div>
          <div className={`${styles.parrot2} ${pointsForAnswer < 20 ? styles.hidden : ''}`}></div>
          <div className={`${styles.parrot3} ${pointsForAnswer < 40 ? styles.hidden : ''}`}></div>
          <div className={`${styles.parrot4} ${pointsForAnswer < 80 ? styles.hidden : ''}`}></div>
          <div className={styles.branch}></div>
        </div>
        {currentWord && (
          <div>
            <p className={styles.word}>{currentWord.word}</p>
            <p className={styles.translation}>{translate}</p>
            <div className={styles.btnWrapper}>
              <button className={`${styles.btn} ${styles.red}`} onClick={handleFalseButton} disabled={gameOnPause}>
                Неверно
              </button>
              <button className={`${styles.btn} ${styles.green}`} onClick={handleTrueButton} disabled={gameOnPause}>
                Верно
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameSprint;
