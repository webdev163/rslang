import { AudioAction, AudioActionTypes, AudioState } from '../../types/audiocall';

const initialState: AudioState = {
  words: [],
  currentWord: null,
  options: [],
  isGameOn: false,
  isRouterParamsReceived: false,
  group: 0,
  score: 0,
  pointsForAnswer: 10,
  chainLength: 0,
  statistic: {
    newWords: 0,
    learnedWords: 0,
    chainLength: 0,
    wrongAnswers: 0,
    rightAnswers: 0,
  },
  rightAnswersArr: [],
  wrongAnswersArr: [],
};

export const audioReducer = (state = initialState, action: AudioAction): AudioState => {
  switch (action.type) {
    case AudioActionTypes.SET_WORDS:
      return { ...state, words: action.payload };
    case AudioActionTypes.SET_CURRENT_WORD:
      return { ...state, currentWord: action.payload.word, options: action.payload.options };
    case AudioActionTypes.REMOVE_WORD:
      return { ...state, words: state.words.filter(word => word.word !== action.payload.word) };
    case AudioActionTypes.SET_GROUP:
      return { ...state, group: action.payload.group, words: action.payload.words };
    case AudioActionTypes.START_GAME:
      return { ...state, isGameOn: true };
    case AudioActionTypes.STOP_GAME:
      return { ...state, isGameOn: false };
    case AudioActionTypes.RECEIVE_ROUTER_STATE:
      return { ...state, isRouterParamsReceived: true };
    case AudioActionTypes.INCREMENT_SCORE:
      return { ...state, score: state.score + state.pointsForAnswer, chainLength: state.chainLength + 1 };
    case AudioActionTypes.RESET_RIGHT_ANSWERS:
      return { ...state, chainLength: 0 };
    case AudioActionTypes.UPDATE_STATISTIC:
      return { ...state, statistic: action.payload };
    case AudioActionTypes.UPDATE_RIGHT_ANSWERS_ARR:
      return { ...state, rightAnswersArr: [...state.rightAnswersArr, action.payload] };
    case AudioActionTypes.UPDATE_WRONG_ANSWERS_ARR:
      return { ...state, wrongAnswersArr: [...state.wrongAnswersArr, action.payload] };
    case AudioActionTypes.RESET_STATE:
      return initialState;
    default:
      return state;
  }
};
