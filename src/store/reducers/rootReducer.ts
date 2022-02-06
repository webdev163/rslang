import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { sprintReducer } from './sprintReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  sprint: sprintReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
