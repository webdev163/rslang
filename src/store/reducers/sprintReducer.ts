import { SprintAction, SprintActionTypes, SprintState } from '../../types/sprint';

const initialState: SprintState = {
  currentWord: null,
};

export const sprintReducer = (state = initialState, action: SprintAction): SprintState => {
  switch (action.type) {
    case SprintActionTypes.SET_CURRENT_WORD:
      return { ...state, currentWord: action.payload };
    default:
      return state;
  }
};
