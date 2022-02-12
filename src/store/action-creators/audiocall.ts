import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import { WordResponse } from '../../types/requests';
import { AudioAction, AudioActionTypes, AudioCallOption } from '../../types/audiocall';
import { getWords } from '../../utils/API';
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
