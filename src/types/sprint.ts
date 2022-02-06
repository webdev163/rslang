import { WordResponse } from './requests';

export interface SprintState {
  currentWord: WordResponse | null;
  translate: string;
  isTrue: boolean;
  isGameOn: boolean;
  score: number;
  pointsForAnswer: number;
  rightAnswers: number;
}

export enum SprintActionTypes {
  SET_CURRENT_WORD = 'SET_CURRENT_WORD',
  START_GAME = 'START_GAME',
  STOP_GAME = 'STOP_GAME',
  INCREMENT_SCORE = 'INCREMENT_SCORE',
  INCREMENT_RIGHT_ANSWERS = 'INCREMENT_RIGHT_ANSWERS',
  RESET_RIGHT_ANSWERS = 'RESET_RIGHT_ANSWERS',
}

interface SetCurrentWordAction {
  type: SprintActionTypes.SET_CURRENT_WORD;
  payload: {
    word: WordResponse;
    isTrue: boolean;
    translate: string;
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
  | SetCurrentWordAction
  | StartGameAction
  | StopGameAction
  | IncrementScoreAction
  | IncrementRightAnswersAction
  | ResetRightAnswersAction;
