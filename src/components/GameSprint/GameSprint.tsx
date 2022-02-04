import React, { FC, useEffect, useRef, useState } from 'react';
import { useWordsPage } from '../../hooks/useWordsPage';
import { WordResponse } from '../../types/requests';

import styles from './GameSprint.module.scss';

const GameSprint: FC = () => {
  const words = useWordsPage();
  console.log('render');

  const [currentWord, setCurrentWord] = useState<WordResponse | null>(null);

  useEffect(() => {
    if (words.length) {
      setCurrentWord(words[0]);
    }
  }, [words]);

  const [score, setScore] = useState(0);

  const [translate, setTranslate] = useState('');

  const [points, setPoints] = useState(10);

  const isTrue = useRef(false);
  const [rightAnswers, setRightAnswers] = useState(0);
  useEffect(() => {
    if (rightAnswers === 3) {
      setPoints(points => (points < 80 ? points * 2 : points));
      setRightAnswers(0);
    }
  }, [rightAnswers]);

  useEffect(() => {
    const randomNum = Math.random() - 0.5;
    console.log(randomNum);
    if (randomNum >= 0) {
      isTrue.current = true;
    } else {
      isTrue.current = false;
    }
    if (currentWord) {
      if (isTrue.current) {
        setTranslate(currentWord.wordTranslate);
      } else {
        const word = getRandomWord();
        setTranslate(word.wordTranslate);
      }
    }
  }, [currentWord]);

  const getRandomWord = () => {
    const randomNum = Math.floor(Math.random() * words.length);
    return words[randomNum];
  };

  const handleTrueButton = () => {
    if (isTrue.current) {
      setScore(score => score + points);
      setRightAnswers(prev => prev + 1);
    } else {
      setRightAnswers(0);
      setPoints(10);
    }
    setCurrentWord(getRandomWord());
  };

  const handleFalseButton = () => {
    if (!isTrue.current) {
      setScore(score => score + points);
      setRightAnswers(prev => prev + 1);
    } else {
      setRightAnswers(0);
      setPoints(10);
    }
    setCurrentWord(getRandomWord());
  };

  const answersCounterTemplate = points < 80 ? <p>{rightAnswers} / 3</p> : <p>1</p>;

  return (
    <div>
      <h1 className={styles.title}>Sprint Game</h1>
      <div className={styles.points}>{score}</div>
      <div className={styles.game}>
        {(rightAnswers > 0 || points > 10) && answersCounterTemplate}
        {points > 10 && (
          <div>
            <p>+{points} за слово</p>
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
