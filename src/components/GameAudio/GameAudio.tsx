import React, { FC, useEffect, useRef, useState } from 'react';
import { batch } from 'react-redux';
import { useActions } from './../../hooks/useActions';
import { useTypedSelector } from './../../hooks/useTypedSelector';
import { useLocationFrom } from '../../hooks/useLocationFrom';
import { API_URL } from '../../utils/constants';
import { shuffle } from '../../utils/arrays';
import DifficultyDialog from './../DifficultyDialog/DifficultyDialog';
import { Button, Container, Dialog } from '@mui/material';

import styles from './GameAudio.module.scss';
import { AudioCallOption } from '../../types/audiocall';
import ResultsDialog from '../ResultsDialog';

const GameAudio: FC = () => {
  const from = useLocationFrom();

  const { userId } = useTypedSelector(state => state.auth.user);

  const [showDifficulty, setShowDifficulty] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [answerIsReceived, setAnswerIsReceived] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<AudioCallOption[]>([]);
  const [totalWords, setTotalWords] = useState(0);
  const [isTotalWordsCounted, setIsTotalWordsCounted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);
  const [isSoundOn, setSoundOn] = useState(true);
  const [isFullscreenOn, setFullscreenOn] = useState(false);

  const [lastAnswerIsRight, setLastAnswerIsRight] = useState(false);

  const { words, currentWord, isGameOn, isRouterParamsReceived, options, score } = useTypedSelector(
    state => state.audio,
  );
  const {
    setNextAudioWord,
    removeAudioCallWord,
    setAudioGroup,
    setAudioGroupWithoutLearned,
    setAudioDifficultWords,
    startAudioGame,
    stopAudioGame,
    receiveRouterStateInAudiocall,
    incrementAudioScore,
    resetAudioState,
    receiveUserAnswerAction,
    resetAudioRigthAnswers,
    updateRightAnswersArr,
    updateWrongAnswersArr,
  } = useActions();

  useEffect(() => {
    if (words.length && !isTotalWordsCounted) {
      setTotalWords(words.length);
      setIsTotalWordsCounted(true);
    }
  }, [words]);

  useEffect(() => {
    if (isGameOn) {
      isFullscreenOn ? document.querySelector(`.${styles.page}`)?.requestFullscreen() : document.exitFullscreen();
    }
  }, [isFullscreenOn]);

  useEffect(() => {
    if (from) {
      receiveRouterStateInAudiocall();
      if (from === 'difficult') {
        setAudioDifficultWords();
      } else {
        const group = +from.group;
        const page = +from.page;
        if (userId) {
          setAudioGroupWithoutLearned(group, page);
        } else {
          setAudioGroup(group, page);
        }
      }
    }
  }, []);

  const audio = useRef(new Audio());

  useEffect(() => {
    if (words.length && isGameOn) {
      setNextAudioWord();
    }
  }, [words, isGameOn]);

  useEffect(() => {
    if (lastAnswerIsRight && answerIsReceived && isSoundOn) {
      const audio = new Audio();
      audio.src = '/assets/sound/correct.mp3';
      audio.play();
    } else if (!lastAnswerIsRight && answerIsReceived && isSoundOn) {
      const audio = new Audio();
      audio.src = '/assets/sound/wrong.mp3';
      audio.play();
    }
  }, [answerIsReceived]);

  useEffect(() => {
    if (options.length) {
      const arr = [...shuffle(options), { translate: 'Не знаю', isTrue: false }];
      const i = arr.findIndex(option => option.isTrue);
      setShuffledOptions(arr);
      setRightIndex(i);
    }
  }, [options]);

  const receiveAnswer = (option: AudioCallOption) => {
    if (!currentWord) return;
    if (option.isTrue) {
      batch(() => {
        incrementAudioScore();
        receiveUserAnswerAction(true, currentWord, 'audio');
        updateRightAnswersArr(currentWord);
      });
      setLastAnswerIsRight(true);
    } else {
      batch(() => {
        resetAudioRigthAnswers();
        receiveUserAnswerAction(false, currentWord, 'audio');
        updateWrongAnswersArr(currentWord);
      });
      setLastAnswerIsRight(false);
    }
    setAnswerIsReceived(true);
  };

  useEffect(() => {
    const funcs = shuffledOptions.map((option, i) => (e: KeyboardEvent) => {
      if (e.code === `Digit${i + 1}` || e.code === `Numpad${i + 1}`) {
        receiveAnswer(option);
      }
    });
    funcs.forEach(func => {
      document.addEventListener('keydown', func);
    });
    return () => {
      funcs.forEach(func => {
        document.removeEventListener('keydown', func);
      });
    };
  }, [shuffledOptions]);

  const showNextQuestion = () => {
    if (words.length === 1) {
      setShowResult(true);
      stopAudioGame();
    }
    if (currentWord) removeAudioCallWord(currentWord);
    setAnswerIsReceived(false);
    setCurrentQuestion(prevQuestion => prevQuestion + 1);
  };

  useEffect(() => {
    if (answerIsReceived) {
      const func = (e: KeyboardEvent) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
          e.preventDefault();
          showNextQuestion();
        }
      };
      document.addEventListener('keydown', func);
      return () => {
        document.removeEventListener('keydown', func);
      };
    }
  }, [answerIsReceived]);

  useEffect(() => {
    if (currentWord) {
      audio.current.src = `${API_URL}/${currentWord.audio}`;
      audio.current.play();
    }
  }, [currentWord]);

  useEffect(
    () => () => {
      resetAudioState();
    },
    [],
  );

  if (!isGameOn && !isRouterParamsReceived) {
    return (
      <Container>
        <DifficultyDialog
          open={showDifficulty}
          onSelect={index => {
            setAudioGroup(index);
            startAudioGame();
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
              startAudioGame();
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

  const toggleFullscreen = () => {
    setFullscreenOn(isFullscreenOn => !isFullscreenOn);
  };

  return (
    <div className={styles.page}>
      <div className={styles.soundBtnWrapper} onClick={() => setSoundOn(isSoundOn => !isSoundOn)}>
        <img src={`/assets/img/sound-${isSoundOn ? 'on' : 'off'}.svg`} alt="" />
      </div>
      <div className={styles.fullscreenWrapper} onClick={() => toggleFullscreen()}>
        <img src={'/assets/img/fullscreen.svg'} alt="" />
      </div>
      <div className={styles.container}>
        <div className={styles.text}>
          Вопрос: {currentQuestion} / {totalWords}
        </div>
        <div className={styles.text}>Счет: {score}</div>
        {answerIsReceived ? (
          <div className={styles.wordInfoWrapper}>
            <div className={styles.imageWrapper}>
              <img className={styles.image} src={`${API_URL}/${currentWord?.image}`} alt="" />
            </div>
            <div className={styles.wordInfo}>
              <div className={`${styles.audioBtnWrapper} ${styles.small}`} onClick={() => audio.current.play()}>
                <button className={styles.audioBtn}>
                  <img src="/assets/img/game-sound.svg" alt="" />
                </button>
              </div>
              <span className={styles.wordTitle}>{currentWord?.word}</span>
            </div>
          </div>
        ) : (
          <div className={styles.audioBtnWrapper} onClick={() => audio.current.play()}>
            <button className={styles.audioBtn}>
              <img src="/assets/img/game-sound.svg" alt="" />
            </button>
          </div>
        )}
        <div className={styles.answersWrapper}>
          {shuffledOptions.map((option, i) => {
            if (answerIsReceived && i === 5) return <div key={option.translate}></div>;
            return (
              <div
                className={`${styles.answerBtnWrapper} ${i === 5 ? styles.skipBtn : ''} ${
                  answerIsReceived && i === rightIndex ? styles.rightAnswer : ''
                }  ${answerIsReceived && i !== rightIndex ? styles.wrongAnswer : ''}`}
                key={option.translate}
              >
                <div
                  className={styles.answerBtn}
                  onClick={() => {
                    if (!answerIsReceived) {
                      receiveAnswer(option);
                    }
                  }}
                >
                  {lastAnswerIsRight && answerIsReceived && i === rightIndex ? (
                    <img width="22" height="22" src="/assets/img/answer-right.svg" alt="" />
                  ) : (
                    <div className={styles.empty}></div>
                  )}
                  <span className={styles.counter}>{i + 1}</span>
                  {option.translate}
                </div>
              </div>
            );
          })}
        </div>
        <div>
          {answerIsReceived && (
            <button
              onClick={() => {
                showNextQuestion();
              }}
              className={styles.nextBtn}
            >
              <img width="42" height="20" src="/assets/img/arrow.svg" alt="" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameAudio;
