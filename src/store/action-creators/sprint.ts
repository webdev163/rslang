import { Dispatch } from 'redux';
import { WordResponse } from '../../types/requests';
import { SprintAction, SprintActionTypes } from '../../types/sprint';
import { getWords } from '../../utils/API';
import { getRandomItem } from '../../utils/arrays';

export const setSprintWords = (words: WordResponse[]): SprintAction => ({
  type: SprintActionTypes.SET_WORDS,
  payload: words,
});

export const resetSprintState = (): SprintAction => ({
  type: SprintActionTypes.RESET_STATE,
});

export const setCurrentWord = (word: WordResponse, words: WordResponse[]): SprintAction => {
  const randomNum = Math.random() - 0.5;
  let isTrue: boolean;
  let translate: string;
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

export const setSprintGroup =
  (group: number, page = Math.floor(Math.random() * 30)) =>
  async (dispatch: Dispatch<SprintAction>) => {
    const words = await getWords(group, page);
    dispatch({
      type: SprintActionTypes.SET_GROUP,
      payload: {
        words,
        group,
      },
    });
  };

export const startGame = (): SprintAction => ({
  type: SprintActionTypes.START_GAME,
});

export const stopGame = (): SprintAction => ({
  type: SprintActionTypes.STOP_GAME,
});

export const receiveRouterStateInSprint = (): SprintAction => ({
  type: SprintActionTypes.RECEIVE_ROUTER_STATE,
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
