import { GuideAction, GuideActionTypes, GuideState } from '../../types/guide';

const initialState: GuideState = {
  wordsArr: [],
  isLoading: false,
  error: null,
  group: 0,
  page: 0,
  doneArr: new Array(6).fill(new Array(30).fill(0)),
};

export const guideReducer = (state = initialState, action: GuideAction): GuideState => {
  switch (action.type) {
    case GuideActionTypes.FETCH_WORDS:
      return { ...state, isLoading: true };
    case GuideActionTypes.FETCH_WORDS_SUCCESS:
      return { ...state, isLoading: false, wordsArr: action.payload };
    case GuideActionTypes.FETCH_WORDS_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case GuideActionTypes.SET_WORDS_GROUP:
      return { ...state, group: action.payload };
    case GuideActionTypes.SET_GUIDE_PAGE:
      return { ...state, page: action.payload };
    case GuideActionTypes.SET_DONE_ARR:
      return { ...state, doneArr: action.payload };
    default:
      return state;
  }
};
