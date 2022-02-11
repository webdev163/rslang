import { TokenResponse, UserResponse, UserWordResponse } from './requests';

// Auth
enum SignInActionTypes {
  SIGN_IN = 'SIGN_IN',
  SUCCESS = 'SIGN_IN_SUCCESS',
  ERROR = 'SIGN_IN_ERROR',
  SIGN_OUT = 'SIGN_OUT',
  REFRESH_AUTH = 'REFRESH_AUTH',
}

enum RegistrationActionTypes {
  REGISTRATION = 'REGISTRATION',
  SUCCESS = 'REGISTRATION_SUCCESS',
  ERROR = 'REGISTRATION_ERROR',
}

interface AuthState {
  user: TokenResponse;
  isAuthorized: boolean;
  loading: boolean;
  error: null | string;
  email: string;
}

interface SignInAction {
  type: SignInActionTypes.SIGN_IN;
  payload: string;
}

interface SignInSuccessAction {
  type: SignInActionTypes.SUCCESS;
  payload: TokenResponse;
}

interface SignInErrorAction {
  type: SignInActionTypes.ERROR;
  payload: string;
}

interface SignOutAction {
  type: SignInActionTypes.SIGN_OUT;
}

interface RefreshedUser{
  token: TokenResponse;
  user: UserResponse;
}

interface RefreshAuthAction {
  type: SignInActionTypes.REFRESH_AUTH;
  payload: RefreshedUser;
}

interface RegistrationAction {
  type: RegistrationActionTypes.REGISTRATION;
  payload: string;
}

interface RegistrationSuccessAction {
  type: RegistrationActionTypes.SUCCESS;
  payload: UserResponse;
}

interface RegistrationErrorAction {
  type: RegistrationActionTypes.ERROR;
  payload: string;
}

type AuthAction =
  | SignInAction
  | SignInSuccessAction
  | SignInErrorAction
  | SignOutAction
  | RefreshAuthAction
  | RegistrationAction
  | RegistrationErrorAction
  | RegistrationSuccessAction;

// Words

enum UsersWordsActionTypes {
  GET_USERS_WORDS = 'GET_USERS_WORDS',
  SUCCESS = 'GET_USERS_WORDS_SUCCESS',
  ERROR = 'GET_USERS_WORDS_ERROR',
}

interface UserWordsState {
  words: UserWordResponse[];
  loading: boolean;
  error: null | string;
}

interface GetUserWordsAction {
  type: UsersWordsActionTypes.GET_USERS_WORDS;
}

interface GetUserWordsSuccessAction {
  type: UsersWordsActionTypes.SUCCESS;
  payload: UserWordResponse[];
}

interface GetUserWordsErrorAction {
  type: UsersWordsActionTypes.ERROR;
  payload: string;
}

type UserWordsActions = GetUserWordsAction | GetUserWordsErrorAction | GetUserWordsSuccessAction;

export { SignInActionTypes, RegistrationActionTypes, UsersWordsActionTypes };
export type {
  SignInAction,
  SignInSuccessAction,
  SignInErrorAction,
  AuthAction,
  AuthState,
  UserWordsState,
  UserWordsActions,
  RefreshAuthAction,
};
