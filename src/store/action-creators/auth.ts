import { Dispatch } from 'redux';
import { UserResponse } from '../../types/requests';
import { AuthAction, RegistrationActionTypes, SignInActionTypes } from '../../types/user';
import { addUser, signIn } from '../../utils/API';
import { LS_AUTH_KEY } from '../../utils/constants';

export const signInAction = (email: string, password: string) => async (dispatch: Dispatch<AuthAction>) => {
  dispatch({ type: SignInActionTypes.SIGN_IN });
  signIn(email, password)
    .then(data => {
      dispatch({ type: SignInActionTypes.SUCCESS, payload: data });
      window.localStorage.setItem(LS_AUTH_KEY, JSON.stringify(data));
    })
    .catch(e => {
      dispatch({ type: SignInActionTypes.ERROR, payload: e as string });
    });
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
