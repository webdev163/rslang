import { TokenResponse, UserResponse } from './requests';

enum SignInActionTypes {
  SIGN_IN = 'SIGN_IN',
  SUCCESS = 'SIGN_IN_SUCCESS',
  ERROR = 'SIGN_IN_ERROR',
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
}

interface SignInAction {
  type: SignInActionTypes.SIGN_IN;
}

interface SignInSuccessAction {
  type: SignInActionTypes.SUCCESS;
  payload: TokenResponse;
}

interface SignInErrorAction {
  type: SignInActionTypes.ERROR;
  payload: string;
}
interface RegistrationAction {
  type: RegistrationActionTypes.REGISTRATION;
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
  | RegistrationAction
  | RegistrationErrorAction
  | RegistrationSuccessAction;

export { SignInActionTypes, RegistrationActionTypes };
export type { SignInAction, SignInSuccessAction, SignInErrorAction, AuthAction, AuthState };
