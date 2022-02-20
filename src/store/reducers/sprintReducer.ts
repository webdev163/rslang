import { SprintAction, SprintActionTypes, SprintState } from '../../types/sprint';

const initialState: SprintState = {
  words: [],
  group: 0,
  page: 0,
  currentWord: null,
  translate: '',
  isTrue: false,
  isGameOn: false,
  isRouterParamsReceived: false,
  score: 0,
  pointsForAnswer: 10,
  rightAnswers: 0,
  chainLength: 0,
  rightAnswersArr: [],
  wrongAnswersArr: [],
};

export const sprintReducer = (state = initialState, action: SprintAction): SprintState => {
  switch (action.type) {
    case SprintActionTypes.SET_WORDS:
      return { ...state, words: action.payload };
    case SprintActionTypes.SET_CURRENT_WORD:
      return {
        ...state,
        currentWord: action.payload.word,
        isTrue: action.payload.isTrue,
        translate: action.payload.translate,
      };
    case SprintActionTypes.REMOVE_WORD:
      return { ...state, words: state.words.filter(word => word.word !== action.payload.word) };
    case SprintActionTypes.SET_GROUP:
      return {
        ...state,
        group: action.payload.group,
        page: action.payload.page,
        words: action.payload.words,
        currentWord: action.payload.word,
        isTrue: action.payload.isTrue,
        translate: action.payload.translate,
      };
    case SprintActionTypes.START_GAME:
      return { ...state, isGameOn: true };
    case SprintActionTypes.STOP_GAME:
      return { ...state, isGameOn: false };
    case SprintActionTypes.RECEIVE_ROUTER_STATE:
      return { ...state, isRouterParamsReceived: true };
    case SprintActionTypes.INCREMENT_SCORE:
      return { ...state, score: state.score + state.pointsForAnswer };
    case SprintActionTypes.INCREMENT_RIGHT_ANSWERS:
      return {
        ...state,
        pointsForAnswer: action.payload.points,
        rightAnswers: action.payload.rightAnswers,
        chainLength: state.chainLength + 1,
      };
    case SprintActionTypes.RESET_RIGHT_ANSWERS:
      return { ...state, pointsForAnswer: 10, rightAnswers: 0, chainLength: 0 };
    case SprintActionTypes.UPDATE_RIGHT_ANSWERS_ARR:
      return { ...state, rightAnswersArr: [...state.rightAnswersArr, action.payload] };
    case SprintActionTypes.UPDATE_WRONG_ANSWERS_ARR:
      return { ...state, wrongAnswersArr: [...state.wrongAnswersArr, action.payload] };
    case SprintActionTypes.RESET_STATE:
      return initialState;
    default:
      return state;
  }
};
