import { WordResponse } from './requests';

export interface SprintState {
  words: WordResponse[];
  group: number;
  page: number;
  currentWord: WordResponse | null;
  translate: string;
  isTrue: boolean;
  isGameOn: boolean;
  isRouterParamsReceived: boolean;
  score: number;
  pointsForAnswer: number;
  rightAnswers: number;
  chainLength: number;
  rightAnswersArr: WordResponse[];
  wrongAnswersArr: WordResponse[];
}

export enum SprintActionTypes {
  RESET_STATE = 'RESET_STATE',
  SET_WORDS = 'SET_WORDS',
  SET_CURRENT_WORD = 'SET_CURRENT_WORD',
  REMOVE_WORD = 'REMOVE_WORD',
  SET_GROUP = 'SET_GROUP',
  START_GAME = 'START_GAME',
  STOP_GAME = 'STOP_GAME',
  RECEIVE_ROUTER_STATE = 'RECEIVE_ROUTER_STATE',
  INCREMENT_SCORE = 'INCREMENT_SCORE',
  INCREMENT_RIGHT_ANSWERS = 'INCREMENT_RIGHT_ANSWERS',
  RESET_RIGHT_ANSWERS = 'RESET_RIGHT_ANSWERS',
  UPDATE_RIGHT_ANSWERS_ARR = 'UPDATE_RIGHT_ANSWERS_ARR',
  UPDATE_WRONG_ANSWERS_ARR = 'UPDATE_WRONG_ANSWERS_ARR',
}

interface ResetStateAction {
  type: SprintActionTypes.RESET_STATE;
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

interface RemoveWordAction {
  type: SprintActionTypes.REMOVE_WORD;
  payload: WordResponse;
}

interface SetWordsGroupAction {
  type: SprintActionTypes.SET_GROUP;
  payload: {
    group: number;
    page: number;
    words: WordResponse[];
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

interface ReceiveRouterStateAction {
  type: SprintActionTypes.RECEIVE_ROUTER_STATE;
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

interface UpdateRightAnswersArr {
  type: SprintActionTypes.UPDATE_RIGHT_ANSWERS_ARR;
  payload: WordResponse;
}

interface UpdateWrongAnswersArr {
  type: SprintActionTypes.UPDATE_WRONG_ANSWERS_ARR;
  payload: WordResponse;
}

export type SprintAction =
  | ResetStateAction
  | SetWordsAction
  | SetCurrentWordAction
  | RemoveWordAction
  | SetWordsGroupAction
  | StartGameAction
  | StopGameAction
  | ReceiveRouterStateAction
  | IncrementScoreAction
  | IncrementRightAnswersAction
  | ResetRightAnswersAction
  | UpdateRightAnswersArr
  | UpdateWrongAnswersArr;
