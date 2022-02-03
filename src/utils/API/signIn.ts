import { API_URL } from '../constants';
import { RequestPaths, ResponseStatuses, TokenResponse } from '../../types/requests';

const signIn = async (email: string, password: string): Promise<TokenResponse> => {
  const resp = await fetch(`${API_URL}${RequestPaths.SIGNIN}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  if (resp.status === ResponseStatuses.FORBIDDEN) {
    throw new Error('Incorrect e-mail or password');
  }
  const data = await resp.json();
  window.localStorage.setItem('rs-lang-user', JSON.stringify(data)); //TODO move to redux
  return data;
};

const getUserToken = async (id: string, refreshToken: string): Promise<TokenResponse> => {
  const resp = await fetch(`${API_URL}${RequestPaths.USERS}/${id}${RequestPaths.TOKENS}`, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (resp.status === ResponseStatuses.UNAUTHORIZED) {
    throw new Error('Unauthorized');
  }
  if (resp.status === ResponseStatuses.FORBIDDEN) {
    throw new Error('Access token is missing, expired or invalid');
  }
  const data = resp.json();
  return data;
};

export { signIn, getUserToken };
