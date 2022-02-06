import { SprintAction, SprintActionTypes, SprintState } from '../../types/sprint';

const initialState: SprintState = {
  currentWord: null,
  translate: '',
  isTrue: false,
  isGameOn: true,
  score: 0,
  pointsForAnswer: 10,
  rightAnswers: 0,
};

export const sprintReducer = (state = initialState, action: SprintAction): SprintState => {
  switch (action.type) {
    case SprintActionTypes.SET_CURRENT_WORD:
      return {
        ...state,
        currentWord: action.payload.word,
        isTrue: action.payload.isTrue,
        translate: action.payload.translate,
      };
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
