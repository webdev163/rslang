import { SprintAction, SprintActionTypes, SprintState } from '../../types/sprint';

const initialState: SprintState = {
  words: [],
  group: 0,
  currentWord: null,
  translate: '',
  isTrue: false,
  isGameOn: false,
  score: 0,
  pointsForAnswer: 10,
  rightAnswers: 0,
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
    case SprintActionTypes.SET_GROUP:
      return { ...state, group: action.payload.group, words: action.payload.words };
    case SprintActionTypes.START_GAME:
      return { ...state, isGameOn: true };
    case SprintActionTypes.STOP_GAME:
      return { ...state, isGameOn: false };
    case SprintActionTypes.INCREMENT_SCORE:
      return { ...state, score: state.score + state.pointsForAnswer };
    case SprintActionTypes.INCREMENT_RIGHT_ANSWERS:
      return { ...state, pointsForAnswer: action.payload.points, rightAnswers: action.payload.rightAnswers };
    case SprintActionTypes.RESET_RIGHT_ANSWERS:
      return { ...state, pointsForAnswer: 10, rightAnswers: 0 };
    default:
      return state;
  }
};
