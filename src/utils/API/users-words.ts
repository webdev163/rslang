import { API_URL } from '../constants';
import { RequestPaths, ResponseStatuses, UserWordResponse } from '../../types/requests';

const getUserWords = async (userId: string, token: string): Promise<UserWordResponse[]> => {
  const resp = await fetch(`${API_URL}${RequestPaths.USERS}/${userId}${RequestPaths.WORDS}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (resp.status === ResponseStatuses.UNAUTHORIZED) {
    throw new Error('Unauthorized');
  }
  if (resp.status === ResponseStatuses.NOT_FOUND) {
    throw new Error('User not found');
  }
  const data = await resp.json();
  return data;
};

const getUserWord = async (userId: string, token: string, wordId: string): Promise<UserWordResponse> => {
  const resp = await fetch(`${API_URL}${RequestPaths.USERS}/${userId}${RequestPaths.WORDS}/${wordId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (resp.status === ResponseStatuses.UNAUTHORIZED) {
    throw new Error('Unauthorized');
  }
  if (resp.status === ResponseStatuses.NOT_FOUND) {
    throw new Error('User not found');
  }
  const data = await resp.json();
  return data;
};

const addUserWord = async (
  userId: string,
  token: string,
  wordId: string,
  difficulty: string,
  optional = {},
): Promise<boolean> => {
  const resp = await fetch(`${API_URL}${RequestPaths.USERS}/${userId}${RequestPaths.WORDS}/${wordId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      difficulty,
      optional,
    }),
  });
  if (resp.status === ResponseStatuses.UNAUTHORIZED) {
    throw new Error('Unauthorized');
  }
  if (resp.status === ResponseStatuses.NOT_FOUND) {
    throw new Error('User not found');
  }

  return true;
};

const updateUserWord = async (
  userId: string,
  token: string,
  wordId: string,
  difficulty: string,
  optional = {},
): Promise<boolean> => {
  const resp = await fetch(`${API_URL}${RequestPaths.USERS}/${userId}${RequestPaths.WORDS}/${wordId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      difficulty,
      optional,
    }),
  });
  if (resp.status === ResponseStatuses.UNAUTHORIZED) {
    throw new Error('Unauthorized');
  }
  if (resp.status === ResponseStatuses.NOT_FOUND) {
    throw new Error('User not found');
  }

  return true;
};

const deleteUserWord = async (userId: string, token: string, wordId: string): Promise<boolean> => {
  const resp = await fetch(`${API_URL}${RequestPaths.USERS}/${userId}${RequestPaths.WORDS}/${wordId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (resp.status === ResponseStatuses.UNAUTHORIZED) {
    throw new Error('Unauthorized');
  }
  if (resp.status === ResponseStatuses.NOT_FOUND) {
    throw new Error('User not found');
  }

  return true;
};

export { getUserWords, getUserWord, addUserWord, updateUserWord, deleteUserWord };
