import React, { FC, useEffect, useRef, useState } from 'react';
import { useWordsPage } from '../../hooks/useWordsPage';
import { useActions } from './../../hooks/useActions';

import styles from './GameAudio.module.scss';
import { useTypedSelector } from './../../hooks/useTypedSelector';
import { API_URL } from '../../utils/constants';
import Modal from '../Modal';

const GameAudio: FC = () => {
  const pageWords = useWordsPage();

  const [showModal, setShowModal] = useState(true);
  const [showResult, setShowResult] = useState(false);

  const { words, currentWord, isGameOn, options, score } = useTypedSelector(state => state.audio);
  const { setAudioWords, setNextAudioWord, removeAudioCallWord, startAudioGame, incrementAudioScore } = useActions();
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

  return (
    <div>
      <h1 className={styles.title}>Audio Game</h1>
      <div>Score: {score}</div>
      <p>
        <button onClick={() => audio.current.play()}>Play</button>
      </p>
      {options.map(option => (
        <button
          key={option.translate}
          onClick={() => {
            if (option.isTrue) {
              incrementAudioScore();
            }
            if (words.length === 1) setShowResult(true);
            if (currentWord) removeAudioCallWord(currentWord);
          }}
        >
          {option.translate}
        </button>
      ))}
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
};

export default GameAudio;
