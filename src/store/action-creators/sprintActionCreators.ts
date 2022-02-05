import { WordResponse } from '../../types/requests';
import { SprintAction, SprintActionTypes } from '../../types/sprint';

export const setCurrentWord = (words: WordResponse): SprintAction => {
  return { type: SprintActionTypes.SET_CURRENT_WORD, payload: words };
};
