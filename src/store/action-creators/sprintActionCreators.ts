import { WordResponse } from '../../types/requests';
import { SprintAction, SprintActionTypes } from '../../types/sprint';

const getRandomItem = <T>(arr: T[]): T => {
  const randomNum = Math.floor(Math.random() * arr.length);
  return arr[randomNum];
};

export const setCurrentWord = (word: WordResponse, words: WordResponse[]): SprintAction => {
  const randomNum = Math.random() - 0.5;
  let isTrue: boolean;
  let translate: string;
  console.log(randomNum);
  if (randomNum >= 0) {
    isTrue = true;
    translate = word.wordTranslate;
  } else {
    isTrue = false;
    const randomWord = getRandomItem(words);
    translate = randomWord.wordTranslate;
  }
  return {
    type: SprintActionTypes.SET_CURRENT_WORD,
    payload: { word, isTrue, translate },
  };
};

export const setRandowWord = (words: WordResponse[]): SprintAction => {
  const word = getRandomItem(words);
  return setCurrentWord(word, words);
};

export const startGame = (): SprintAction => ({
  type: SprintActionTypes.START_GAME,
});

export const stopGame = (): SprintAction => ({
  type: SprintActionTypes.STOP_GAME,
});

export const incrementScore = (): SprintAction => ({
  type: SprintActionTypes.INCREMENT_SCORE,
});

export const incrementRightAnswers = (prevPoints: number, prevRightAnswers: number): SprintAction => {
  let rightAnswers = prevRightAnswers + 1;
  let points = prevPoints;
  if (rightAnswers === 3) {
    points = points < 80 ? points * 2 : points;
    rightAnswers = 0;
  }
  return {
    type: SprintActionTypes.INCREMENT_RIGHT_ANSWERS,
    payload: { points, rightAnswers },
  };
};

export const resetRigthAnswers = (): SprintAction => ({
  type: SprintActionTypes.RESET_RIGHT_ANSWERS,
});
