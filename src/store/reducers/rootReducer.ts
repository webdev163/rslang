import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { sprintReducer } from './sprintReducer';
import { guideReducer } from './guideReducer';
import { UserWordsReducer } from './userWordsReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  userWords: UserWordsReducer,
  sprint: sprintReducer,
  guide: guideReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
