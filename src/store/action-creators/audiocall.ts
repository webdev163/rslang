import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import { AggregatedWordsResponse, WordResponse } from '../../types/requests';
import { AudioAction, AudioActionTypes, AudioCallOption } from '../../types/audiocall';
import { getAggregatedWords, getWord, getWords } from '../../utils/API';
import { getRandomItem } from '../../utils/arrays';
import { Dispatch } from 'redux';

export const setAudioWords = (words: WordResponse[]): AudioAction => ({
  type: AudioActionTypes.SET_WORDS,
  payload: words,
});

export const resetAudioState = (): AudioAction => ({
  type: AudioActionTypes.RESET_STATE,
});

export const setNextAudioWord =
  (): ThunkAction<void, RootState, unknown, AudioAction> => async (dispatch, getState) => {
    const state = getState();
    const { words, group } = state.audio;
    const word = getRandomItem(words);
    const options: AudioCallOption[] = [];
    options.push({
      translate: word.wordTranslate,
      isTrue: true,
    });

    const randomPage = Math.floor(Math.random() * 30);
    const optionsPage = await getWords(group, randomPage);
    const optionSet = new Set<string>();
    optionSet.add(word.wordTranslate);
    do {
      const w = getRandomItem(optionsPage);
      optionSet.add(w.wordTranslate);
    } while (optionSet.size < 5);
    optionSet.delete(word.wordTranslate);
    optionSet.forEach(item => {
      options.push({
        translate: item,
        isTrue: false,
      });
    });
    dispatch({
      type: AudioActionTypes.SET_CURRENT_WORD,
      payload: { word, options },
    });
  };

export const setAudioGroup =
  (group: number, page = Math.floor(Math.random() * 30)) =>
  async (dispatch: Dispatch<AudioAction>) => {
    const words = await getWords(group, page);
    dispatch({
      type: AudioActionTypes.SET_GROUP,
      payload: {
        words,
        group,
      },
    });
  };

export const setAudioGroupWithoutLearned =
  (group: number, page = Math.floor(Math.random() * 30)): ThunkAction<void, RootState, unknown, AudioAction> =>
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
    dispatch({
      type: AudioActionTypes.SET_GROUP,
      payload: {
        words,
        group,
      },
    });
  };

export const setAudioDifficultWords =
  (): ThunkAction<void, RootState, unknown, AudioAction> => async (dispatch, getState) => {
    const state = getState();
    const { userId, token } = state.auth.user;
    const aggregatedWordsResponse = (
      await getAggregatedWords(userId, token, { 'userWord.difficulty': 'hard' }, 20)
    )[0] as AggregatedWordsResponse;
    const aggregatedWords = aggregatedWordsResponse.paginatedResults;
    const promises = aggregatedWords.map(word => getWord(word._id));
    const words = await Promise.all(promises);
    dispatch({
      type: AudioActionTypes.SET_GROUP,
      payload: {
        words,
        group: 0,
      },
    });
  };

export const removeAudioCallWord = (word: WordResponse): AudioAction => ({
  type: AudioActionTypes.REMOVE_WORD,
  payload: word,
});

export const startAudioGame = (): AudioAction => ({
  type: AudioActionTypes.START_GAME,
});

export const stopAudioGame = (): AudioAction => ({
  type: AudioActionTypes.STOP_GAME,
});

export const receiveRouterStateInAudiocall = (): AudioAction => ({
  type: AudioActionTypes.RECEIVE_ROUTER_STATE,
});

export const incrementAudioScore = (): AudioAction => ({
  type: AudioActionTypes.INCREMENT_SCORE,
});

export const resetAudioRigthAnswers = (): AudioAction => ({
  type: AudioActionTypes.RESET_RIGHT_ANSWERS,
});

export const updateRightAnswersArr = (word: WordResponse): AudioAction => ({
  type: AudioActionTypes.UPDATE_RIGHT_ANSWERS_ARR,
  payload: word,
});

export const updateWrongAnswersArr = (word: WordResponse): AudioAction => ({
  type: AudioActionTypes.UPDATE_WRONG_ANSWERS_ARR,
  payload: word,
});
