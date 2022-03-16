import { GuideAction, GuideActionTypes, GuideState } from '../../types/guide';

const initialState: GuideState = {
  wordsArr: [],
  wordsHardArr: [],
  isLoading: false,
  error: null,
  group: 0,
  page: 0,
  doneCounter: 0,
};

export const guideReducer = (state = initialState, action: GuideAction): GuideState => {
  switch (action.type) {
    case GuideActionTypes.FETCH_WORDS:
      return { ...state, isLoading: true };
    case GuideActionTypes.FETCH_WORDS_SUCCESS:
      return { ...state, isLoading: false, wordsArr: action.payload };
    case GuideActionTypes.FETCH_WORDS_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case GuideActionTypes.FETCH_HARD_WORDS:
      return { ...state, isLoading: true };
    case GuideActionTypes.FETCH_HARD_WORDS_SUCCESS:
      return { ...state, isLoading: false, wordsHardArr: action.payload[0].paginatedResults };
    case GuideActionTypes.FETCH_HARD_WORDS_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case GuideActionTypes.SET_WORDS_GROUP:
      return { ...state, group: action.payload };
    case GuideActionTypes.SET_GUIDE_PAGE:
      return { ...state, page: action.payload };
    case GuideActionTypes.INC_DONE_COUNTER:
      return { ...state, doneCounter: state.doneCounter + 1 };
    case GuideActionTypes.DEC_DONE_COUNTER:
      return { ...state, doneCounter: state.doneCounter - 1 };
    case GuideActionTypes.EMPTY_DONE_COUNTER:
      return { ...state, doneCounter: 0 };
    default:
      return state;
  }
};
