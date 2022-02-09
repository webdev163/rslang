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
  group: number;
  score: number;
  pointsForAnswer: number;
}

export enum AudioActionTypes {
  SET_WORDS = 'SET_WORDS',
  SET_CURRENT_WORD = 'SET_CURRENT_WORD',
  REMOVE_WORD = 'REMOVE_WORD',
  START_GAME = 'START_GAME',
  STOP_GAME = 'STOP_GAME',
  INCREMENT_SCORE = 'INCREMENT_SCORE',
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

interface StartGameAction {
  type: AudioActionTypes.START_GAME;
}

interface StopGameAction {
  type: AudioActionTypes.STOP_GAME;
}

interface IncrementScoreAction {
  type: AudioActionTypes.INCREMENT_SCORE;
}

export type AudioAction =
  | SetWordsAction
  | SetCurrentWordAction
  | RemoveWordAction
  | StartGameAction
  | StopGameAction
  | IncrementScoreAction;
