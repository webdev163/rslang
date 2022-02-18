import React, { FC, useEffect, useRef, useState } from 'react';
import { useActions } from './../../hooks/useActions';
import { useTypedSelector } from './../../hooks/useTypedSelector';
import { useLocationFrom } from '../../hooks/useLocationFrom';
import { API_URL } from '../../utils/constants';
import { shuffle } from '../../utils/arrays';
import DifficultyDialog from './../DifficultyDialog/DifficultyDialog';
import { Button, Grid, Container, Dialog } from '@mui/material';

import styles from './GameAudio.module.scss';
import { AudioCallOption } from '../../types/audiocall';
import { changeStatistic } from '../../utils/API/user-statistic';

const GameAudio: FC = () => {
  const from = useLocationFrom();

  const { userId, token } = useTypedSelector(state => state.auth.user);

  const [showDifficulty, setShowDifficulty] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [answerIsReceived, setAnswerIsReceived] = useState(false);
  const [statisticIsSended, setStatisticIsSended] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<AudioCallOption[]>([]);

  const { words, currentWord, isGameOn, isRouterParamsReceived, options, score, statistic } = useTypedSelector(
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
  } = useActions();

  useEffect(() => {
    console.log(from);
    if (from) {
      receiveRouterStateInAudiocall();
      console.log(from);
      if (from === 'difficult') {
        setAudioDifficultWords();
      } else {
        const group = +from.group;
        const page = +from.page;
        setAudioGroupWithoutLearned(group, page);
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
    if (options.length) setShuffledOptions(shuffle(options));
  }, [options]);

  const receiveAnswer = (option: AudioCallOption) => {
    if (!currentWord) return;
    if (option.isTrue) {
      incrementAudioScore();
      receiveUserAnswerAction(true, currentWord, 'audio');
    } else {
      receiveUserAnswerAction(false, currentWord, 'audio');
      resetAudioRigthAnswers();
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
      if (userId && token) {
        changeStatistic(userId, token, 'audio', statistic);
        setStatisticIsSended(true);
      }
    }
    if (currentWord) removeAudioCallWord(currentWord);
    setAnswerIsReceived(false);
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

  useEffect(() => {
    const gameStatistic = statistic;
    return () => {
      resetAudioState();
      if (!statisticIsSended) {
        if (userId && token) {
          changeStatistic(userId, token, 'audio', gameStatistic);
        }
      }
    };
  }, []);

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
        <Dialog open={showResult} onClose={() => resetAudioState()}>
          Result: {score}
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
              startAudioGame();
              setShowDifficulty(false);
            }}
          >
            Начать
          </Button>
        </Dialog>
        <Dialog open={showResult} onClose={() => resetAudioState()}>
          Result: {score}
        </Dialog>
      </Container>
    );
  }

  return (
    <div className={styles.page}>
      <Container>
        <div>Score: {score}</div>
        {answerIsReceived ? (
          <p>{currentWord?.word}</p>
        ) : (
          <p>
            <Button variant="contained" onClick={() => audio.current.play()}>
              Play
            </Button>
          </p>
        )}
        <Grid container spacing={1} justifyContent="center">
          {shuffledOptions.map(option => (
            <Grid item key={option.translate}>
              <Button
                variant="outlined"
                disabled={answerIsReceived}
                onClick={() => {
                  receiveAnswer(option);
                }}
              >
                {option.translate}
              </Button>
            </Grid>
          ))}
        </Grid>
        <div>
          {answerIsReceived && (
            <Button
              onClick={() => {
                showNextQuestion();
              }}
            >
              NEXT
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
};

export default GameAudio;
