import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AggregatedWordsResponse, WordResponse } from '../../types/requests';
import { SprintAction, SprintActionTypes } from '../../types/sprint';
import { getAggregatedWords, getWord, getWords } from '../../utils/API';
import { getRandomItem } from '../../utils/arrays';
import { RootState } from '../reducers';

const getWordTranslate = async (word: WordResponse, group: number) => {
  const randomNum = Math.random() - 0.5;
  let isTrue: boolean;
  let translate: string;
  if (randomNum >= 0) {
    isTrue = true;
    translate = word.wordTranslate;
  } else {
    isTrue = false;
    const randomPageNumber = Math.floor(Math.random() * 30);
    const randomPage = await getWords(group, randomPageNumber);
    const randomWord = getRandomItem(randomPage);
    translate = randomWord.wordTranslate;
  }
  return { isTrue, translate };
};

export const setSprintWords = (words: WordResponse[]): SprintAction => ({
  type: SprintActionTypes.SET_WORDS,
  payload: words,
});

export const resetSprintState = (): SprintAction => ({
  type: SprintActionTypes.RESET_STATE,
});

export const setNextSprintWord =
  (): ThunkAction<void, RootState, unknown, SprintAction> => async (dispatch, getState) => {
    const state = getState();
    const { words, group } = state.audio;
    const word = getRandomItem(words);
    if (word) {
      const { isTrue, translate } = await getWordTranslate(word, group);
      dispatch({
        type: SprintActionTypes.SET_CURRENT_WORD,
        payload: { word, isTrue, translate },
      });
    }
  };

export const removeSprintWord = (word: WordResponse): SprintAction => ({
  type: SprintActionTypes.REMOVE_WORD,
  payload: word,
});

export const setSprintGroup =
  (group: number, page = Math.floor(Math.random() * 30)) =>
  async (dispatch: Dispatch<SprintAction>) => {
    const words = await getWords(group, page);
    const word = getRandomItem(words);
    const { isTrue, translate } = await getWordTranslate(word, group);
    dispatch({
      type: SprintActionTypes.SET_GROUP,
      payload: {
        words,
        group,
        page,
        word,
        isTrue,
        translate,
      },
    });
  };

export const setSprintGroupWithoutLearned =
  (group: number, page = Math.floor(Math.random() * 30)): ThunkAction<void, RootState, unknown, SprintAction> =>
  async (dispatch, getState) => {
    const state = getState();
    const { userId, token } = state.auth.user;
    const aggregatedWordsResponse = (
      await getAggregatedWords(
        userId,
        token,
        {
          $and: [
            { page, group },
            {
              $or: [{ userWord: null }, { 'userWord.optional': null }, { 'userWord.optional.done': { $ne: true } }],
            },
          ],
        },
        999,
      )
    )[0] as AggregatedWordsResponse;
    const aggregatedWords = aggregatedWordsResponse.paginatedResults;
    const promises = aggregatedWords.map(word => getWord(word._id));
    const words = await Promise.all(promises);
    const word = getRandomItem(words);
    const { isTrue, translate } = await getWordTranslate(word, group);
    dispatch({
      type: SprintActionTypes.SET_GROUP,
      payload: {
        words,
        group,
        page,
        word,
        isTrue,
        translate,
      },
    });
  };

export const setSprintDifficultWords =
  (): ThunkAction<void, RootState, unknown, SprintAction> => async (dispatch, getState) => {
    const state = getState();
    const { userId, token } = state.auth.user;
    const aggregatedWordsResponse = (
      await getAggregatedWords(userId, token, { 'userWord.difficulty': 'hard' }, 999)
    )[0] as AggregatedWordsResponse;
    const aggregatedWords = aggregatedWordsResponse.paginatedResults;
    const promises = aggregatedWords.map(word => getWord(word._id));
    const words = await Promise.all(promises);
    const word = getRandomItem(words);
    const groupNumber = 6;
    const { isTrue, translate } = await getWordTranslate(word, Math.floor(Math.random() * groupNumber));
    dispatch({
      type: SprintActionTypes.SET_GROUP,
      payload: {
        words,
        group: 0,
        page: 0,
        word,
        isTrue,
        translate,
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

export const incrementRightAnswers =
  (): ThunkAction<void, RootState, unknown, SprintAction> => (dispatch, getState) => {
    const state = getState();
    const { rightAnswers, pointsForAnswer } = state.sprint;
    let newRightAnswers = rightAnswers + 1;
    let points = pointsForAnswer;
    if (rightAnswers === 3) {
      points = points < 80 ? points * 2 : points;
      newRightAnswers = 0;
    }
    dispatch({
      type: SprintActionTypes.INCREMENT_RIGHT_ANSWERS,
      payload: { points, rightAnswers: newRightAnswers },
    });
  };

export const resetSprintRigthAnswers = (): SprintAction => ({
  type: SprintActionTypes.RESET_RIGHT_ANSWERS,
});

export const updateSprintRightAnswersArr = (word: WordResponse): SprintAction => ({
  type: SprintActionTypes.UPDATE_RIGHT_ANSWERS_ARR,
  payload: word,
});

export const updateSprintWrongAnswersArr = (word: WordResponse): SprintAction => ({
  type: SprintActionTypes.UPDATE_WRONG_ANSWERS_ARR,
  payload: word,
});
