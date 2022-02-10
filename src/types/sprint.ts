import { WordResponse } from './requests';

export interface SprintState {
  words: WordResponse[];
  group: number;
  currentWord: WordResponse | null;
  translate: string;
  isTrue: boolean;
  isGameOn: boolean;
  score: number;
  pointsForAnswer: number;
  rightAnswers: number;
}

export enum SprintActionTypes {
  SET_WORDS = 'SET_WORDS',
  SET_CURRENT_WORD = 'SET_CURRENT_WORD',
  SET_GROUP = 'SET_GROUP',
  START_GAME = 'START_GAME',
  STOP_GAME = 'STOP_GAME',
  INCREMENT_SCORE = 'INCREMENT_SCORE',
  INCREMENT_RIGHT_ANSWERS = 'INCREMENT_RIGHT_ANSWERS',
  RESET_RIGHT_ANSWERS = 'RESET_RIGHT_ANSWERS',
}

interface SetWordsAction {
  type: SprintActionTypes.SET_WORDS;
  payload: WordResponse[];
}

interface SetCurrentWordAction {
  type: SprintActionTypes.SET_CURRENT_WORD;
  payload: {
    word: WordResponse;
    isTrue: boolean;
    translate: string;
  };
}

interface SetWordsGroupAction {
  type: SprintActionTypes.SET_GROUP;
  payload: {
    group: number;
    words: WordResponse[];
  };
}

interface StartGameAction {
  type: SprintActionTypes.START_GAME;
}

interface StopGameAction {
  type: SprintActionTypes.STOP_GAME;
}

interface IncrementScoreAction {
  type: SprintActionTypes.INCREMENT_SCORE;
}

interface IncrementRightAnswersAction {
  type: SprintActionTypes.INCREMENT_RIGHT_ANSWERS;
  payload: {
    points: number;
    rightAnswers: number;
  };
}

interface ResetRightAnswersAction {
  type: SprintActionTypes.RESET_RIGHT_ANSWERS;
}

export type SprintAction =
  | SetWordsAction
  | SetCurrentWordAction
  | SetWordsGroupAction
  | StartGameAction
  | StopGameAction
  | IncrementScoreAction
  | IncrementRightAnswersAction
  | ResetRightAnswersAction;
