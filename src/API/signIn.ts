import { API_URL } from '../constants';
import { RequestPaths, ResponseStatuses, TokenResponse } from '../types/requests';

const signIn = async (email: string, password: string): Promise<TokenResponse> => {
  const resp = await fetch(`${API_URL}${RequestPaths.USERS}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  if (resp.status === ResponseStatuses.FORBIDDEN) {
    throw new Error('Incorrect e-mail or password');
  }
  const data = await resp.json();
  return data;
};

export { signIn };
