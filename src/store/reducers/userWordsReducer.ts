import { UserWordsState, UserWordsActions, UsersWordsActionTypes } from '../../types/user';

const initialState: UserWordsState = {
  words: [],
  loading: false,
  error: null,
};

const UserWordsReducer = (state = initialState, action: UserWordsActions): UserWordsState => {
  switch (action.type) {
    case UsersWordsActionTypes.GET_USERS_WORDS:
      return {
        ...state,
        words: [],
        loading: true,
        error: null,
      };

    case UsersWordsActionTypes.SUCCESS:
      return {
        ...state,
        words: action.payload,
        loading: false,
        error: null,
      };

    case UsersWordsActionTypes.ERROR:
      return {
        ...state,
        words: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export { UserWordsReducer };
