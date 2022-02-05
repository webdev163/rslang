import { WordResponse } from './requests';

export interface SprintState {
  currentWord: WordResponse | null;
}

export enum SprintActionTypes {
  SET_CURRENT_WORD = 'SET_CURRENT_WORD',
}

interface SetCurrentWordAction {
  type: SprintActionTypes.SET_CURRENT_WORD;
  payload: WordResponse;
}

export type SprintAction = SetCurrentWordAction;
