import { WordResponse } from './requests';

export interface GuideState {
  wordsArr: WordResponse[];
  isLoading: boolean;
  error: null | string;
  group: number;
  page: number;
  doneCounter: number;
}

export enum GuideActionTypes {
  FETCH_WORDS = 'FETCH_WORDS',
  FETCH_WORDS_SUCCESS = 'FETCH_WORDS_SUCCESS',
  FETCH_WORDS_ERROR = 'FETCH_WORDS_ERROR',
  SET_WORDS_GROUP = 'SET_WORDS_GROUP',
  SET_GUIDE_PAGE = 'SET_GUIDE_PAGE',
  INC_DONE_COUNTER = 'INC_DONE_COUNTER',
  DEC_DONE_COUNTER = 'DEC_DONE_COUNTER',
  EMPTY_DONE_COUNTER = 'EMPTY_DONE_COUNTER',
}

interface FetchWordsAction {
  type: GuideActionTypes.FETCH_WORDS;
}

interface FetchWordsSuccessAction {
  type: GuideActionTypes.FETCH_WORDS_SUCCESS;
  payload: WordResponse[];
}

interface FetchWordsErrorAction {
  type: GuideActionTypes.FETCH_WORDS_ERROR;
  payload: string;
}

interface SetWordsGroup {
  type: GuideActionTypes.SET_WORDS_GROUP;
  payload: number;
}

interface SetGuidePage {
  type: GuideActionTypes.SET_GUIDE_PAGE;
  payload: number;
}

interface IncDoneCounter {
  type: GuideActionTypes.INC_DONE_COUNTER;
}

interface DecDoneCounter {
  type: GuideActionTypes.DEC_DONE_COUNTER;
}

interface EmptyDoneCounter {
  type: GuideActionTypes.EMPTY_DONE_COUNTER;
}

export type GuideAction =
  | FetchWordsAction
  | FetchWordsErrorAction
  | FetchWordsSuccessAction
  | SetWordsGroup
  | SetGuidePage
  | IncDoneCounter
  | DecDoneCounter
  | EmptyDoneCounter;
