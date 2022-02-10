import React, { FC, useEffect, useRef, useState } from 'react';
import { useActions } from './../../hooks/useActions';
import { useTypedSelector } from './../../hooks/useTypedSelector';
import { API_URL } from '../../utils/constants';
import { shuffle } from '../../utils/arrays';
import { Button, Grid, Container, Dialog } from '@mui/material';

import styles from './GameAudio.module.scss';
import DifficultyDialog from './../DifficultyDialog/DifficultyDialog';

const GameAudio: FC = () => {
  const [showDifficulty, setShowDifficulty] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [answerIsReceived, setAnswerIsReceived] = useState(false);

  const { words, currentWord, isGameOn, options, score } = useTypedSelector(state => state.audio);
  const { setNextAudioWord, removeAudioCallWord, setAudioGroup, startAudioGame, stopAudioGame, incrementAudioScore } =
    useActions();
  const audio = useRef(new Audio());

  useEffect(() => {
    if (words.length && isGameOn) {
      setNextAudioWord();
    }
  }, [words, isGameOn]);

  useEffect(() => {
    if (currentWord) {
      audio.current.src = `${API_URL}/${currentWord.audio}`;
      audio.current.play();
    }
  }, [currentWord]);

  if (!isGameOn) {
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
        <Dialog open={showResult}>Result: {score}</Dialog>
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
          {shuffle(options).map(option => (
            <Grid item key={option.translate}>
              <Button
                variant="outlined"
                disabled={answerIsReceived}
                onClick={() => {
                  if (option.isTrue) {
                    incrementAudioScore();
                  }
                  setAnswerIsReceived(true);
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
                if (words.length === 1) {
                  setShowResult(true);
                  stopAudioGame();
                }
                if (currentWord) removeAudioCallWord(currentWord);
                setAnswerIsReceived(false);
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
