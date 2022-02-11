import { WordResponse } from './requests';

export interface AudioCallOption {
  translate: string;
  isTrue: boolean;
}

export interface AudioState {
  words: WordResponse[];
  currentWord: WordResponse | null;
  options: AudioCallOption[];
  isGameOn: boolean;
  isRouterParamsReceived: boolean;
  group: number;
  score: number;
  pointsForAnswer: number;
}

export enum AudioActionTypes {
  SET_WORDS = 'SET_WORDS',
  RESET_STATE = 'RESET_STATE',
  SET_CURRENT_WORD = 'SET_CURRENT_WORD',
  REMOVE_WORD = 'REMOVE_WORD',
  SET_GROUP = 'SET_GROUP',
  START_GAME = 'START_GAME',
  STOP_GAME = 'STOP_GAME',
  RECEIVE_ROUTER_STATE = 'RECEIVE_ROUTER_STATE',
  INCREMENT_SCORE = 'INCREMENT_SCORE',
}

interface ResetStateAction {
  type: AudioActionTypes.RESET_STATE;
}

interface SetWordsAction {
  type: AudioActionTypes.SET_WORDS;
  payload: WordResponse[];
}

interface SetCurrentWordAction {
  type: AudioActionTypes.SET_CURRENT_WORD;
  payload: {
    word: WordResponse;
    options: AudioCallOption[];
  };
}

interface RemoveWordAction {
  type: AudioActionTypes.REMOVE_WORD;
  payload: WordResponse;
}

interface SetWordsGroupAction {
  type: AudioActionTypes.SET_GROUP;
  payload: {
    group: number;
    words: WordResponse[];
  };
}

interface StartGameAction {
  type: AudioActionTypes.START_GAME;
}

interface StopGameAction {
  type: AudioActionTypes.STOP_GAME;
}

interface ReceiveRouterStateAction {
  type: AudioActionTypes.RECEIVE_ROUTER_STATE;
}

interface IncrementScoreAction {
  type: AudioActionTypes.INCREMENT_SCORE;
}

export type AudioAction =
  | ResetStateAction
  | SetWordsAction
  | SetCurrentWordAction
  | RemoveWordAction
  | SetWordsGroupAction
  | StartGameAction
  | StopGameAction
  | ReceiveRouterStateAction
  | IncrementScoreAction;
