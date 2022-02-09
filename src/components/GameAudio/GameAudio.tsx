import React, { FC, useEffect, useRef, useState } from 'react';
import { useWordsPage } from '../../hooks/useWordsPage';
import { useActions } from './../../hooks/useActions';
import { useTypedSelector } from './../../hooks/useTypedSelector';
import { API_URL } from '../../utils/constants';
import Modal from '../Modal';
import { shuffle } from '../../utils/arrays';

import styles from './GameAudio.module.scss';

const GameAudio: FC = () => {
  const pageWords = useWordsPage();

  const [showModal, setShowModal] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [answerIsReceived, setAnswerIsReceived] = useState(false);

  const { words, currentWord, isGameOn, options, score } = useTypedSelector(state => state.audio);
  const { setAudioWords, setNextAudioWord, removeAudioCallWord, startAudioGame, stopAudioGame, incrementAudioScore } =
    useActions();
  const audio = useRef(new Audio());

  useEffect(() => {
    if (pageWords.length) {
      setAudioWords(pageWords);
    }
  }, [pageWords]);

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
      <div>
        {showModal && (
          <Modal>
            <button
              onClick={() => {
                startAudioGame();
                setShowModal(false);
              }}
            >
              START
            </button>
          </Modal>
        )}
        {showResult && <Modal>Result: {score}</Modal>}
      </div>
    );
  }

  return (
    <div>
      <h1 className={styles.title}>Audio Game</h1>
      <div>Score: {score}</div>
      {answerIsReceived ? (
        <p>{currentWord?.word}</p>
      ) : (
        <p>
          <button onClick={() => audio.current.play()}>Play</button>
        </p>
      )}
      {shuffle(options).map(option => (
        <button
          key={option.translate}
          disabled={answerIsReceived}
          onClick={() => {
            if (option.isTrue) {
              incrementAudioScore();
            }
            setAnswerIsReceived(true);
          }}
        >
          {option.translate}
        </button>
      ))}
      <div>
        {answerIsReceived && (
          <button
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
          </button>
        )}
      </div>
    </div>
  );
};

export default GameAudio;
