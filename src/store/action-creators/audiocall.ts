import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import { WordResponse } from '../../types/requests';
import { AudioAction, AudioActionTypes, AudioCallOption } from '../../types/audiocall';
import { getWords } from '../../utils/API';

const getRandomItem = <T>(arr: T[]): T => {
  const randomNum = Math.floor(Math.random() * arr.length);
  return arr[randomNum];
};

export const setAudioWords = (words: WordResponse[]): AudioAction => ({
  type: AudioActionTypes.SET_WORDS,
  payload: words,
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

export const incrementAudioScore = (): AudioAction => ({
  type: AudioActionTypes.INCREMENT_SCORE,
});
