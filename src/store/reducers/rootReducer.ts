import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { sprintReducer } from './sprintReducer';
import { guideReducer } from './guideReducer';
import { UserWordsReducer } from './userWordsReducer';
import { audioReducer } from './audiocallReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  userWords: UserWordsReducer,
  sprint: sprintReducer,
  guide: guideReducer,
  audio: audioReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
