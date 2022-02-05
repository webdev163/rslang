import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { sprintReducer } from './sprintReducer';
import { guideReducer } from './guideReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  sprint: sprintReducer,
  guide: guideReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
