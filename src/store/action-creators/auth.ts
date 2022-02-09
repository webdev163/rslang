import { AnyAction, Dispatch } from 'redux';
import { UserResponse, UserWordResponse } from '../../types/requests';
import { AuthAction, RegistrationActionTypes, SignInActionTypes, UsersWordsActionTypes } from '../../types/user';
import { addUser, getUserWords, signIn } from '../../utils/API';
import { LS_AUTH_KEY } from '../../utils/constants';

export const signInAction = (email: string, password: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch({ type: SignInActionTypes.SIGN_IN });
    signIn(email, password)
      .then(data => {
        dispatch({ type: SignInActionTypes.SUCCESS, payload: data });

        dispatch({ type: UsersWordsActionTypes.GET_USERS_WORDS });
        getUserWords(data.userId, data.token)
          .then(data => dispatch({ type: UsersWordsActionTypes.SUCCESS, payload: data as UserWordResponse[] }))
          .catch(e => {
            dispatch({ type: UsersWordsActionTypes.ERROR, payload: e as string });
          });

        window.localStorage.setItem(LS_AUTH_KEY, JSON.stringify(data));
      })
      .catch(e => {
        dispatch({ type: SignInActionTypes.ERROR, payload: e as string });
      });
  };
};

export const RegistrationAction =
  (name: string, email: string, password: string) => async (dispatch: Dispatch<AuthAction>) => {
    dispatch({ type: RegistrationActionTypes.REGISTRATION });
    addUser({ name, email, password })
      .then(data => dispatch({ type: RegistrationActionTypes.SUCCESS, payload: data as UserResponse }))
      .catch(e => {
        dispatch({ type: SignInActionTypes.ERROR, payload: e as string });
      });
  };

export const SignOutAction = () => async (dispatch: Dispatch<AuthAction>) => {
  dispatch({ type: SignInActionTypes.SIGN_OUT });
  window.localStorage.removeItem(LS_AUTH_KEY);
};
