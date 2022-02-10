import { Dispatch } from 'redux';
import { UserWordResponse } from '../../types/requests';
import { UsersWordsActionTypes, UserWordsActions } from '../../types/user';
import { getUserWords } from '../../utils/API';

export const getUserWordsAction = (userId: string, token: string) => async (dispatch: Dispatch<UserWordsActions>) => {
  dispatch({ type: UsersWordsActionTypes.GET_USERS_WORDS });
  getUserWords(userId, token)
    .then(data => dispatch({ type: UsersWordsActionTypes.SUCCESS, payload: data as UserWordResponse[] }))
    .catch(e => {
      dispatch({ type: UsersWordsActionTypes.ERROR, payload: e as string });
    });
};
