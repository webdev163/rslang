import { WordResponse } from './requests';

export interface GuideState {
  wordsArr: WordResponse[];
  isLoading: boolean;
  error: null | string;
  group: number;
  page: number;
}

export enum GuideActionTypes {
  FETCH_WORDS = 'FETCH_WORDS',
  FETCH_WORDS_SUCCESS = 'FETCH_WORDS_SUCCESS',
  FETCH_WORDS_ERROR = 'FETCH_WORDS_ERROR',
  SET_WORDS_GROUP = 'SET_WORDS_GROUP',
  SET_GUIDE_PAGE = 'SET_GUIDE_PAGE',
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

export type GuideAction =
  | FetchWordsAction
  | FetchWordsErrorAction
  | FetchWordsSuccessAction
  | SetWordsGroup
  | SetGuidePage;
