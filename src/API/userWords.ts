import { API_URL } from '../constants';
import { WordResponse, RequestPaths, ResponseStatuses, UserWordResponse } from '../types/requests';

const getUserWords = async (id: string): Promise<UserWordResponse[]> => {
  const resp = await fetch(`${API_URL}${RequestPaths.WORDS}/${id}${RequestPaths.WORDS}`, {
    headers: { 'Content-Type': 'application/json' },
  });
  if (resp.status === ResponseStatuses.UNAUTHORIZED || resp.status === ResponseStatuses.PAYMENT_REQUIRED) {
    throw new Error('Access token is missing or invalid');
  }
  const words = await resp.json();
  return words;
};

const addUserWord = async (userId: string, wordId: string): Promise<UserWordResponse> => {
  const resp = await fetch(`${API_URL}${RequestPaths.USERS}/${userId}${RequestPaths.WORDS}/${wordId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // TODO what is difficulty??
      difficulty: 'string',
      optional: {},
    }),
  });
  if (resp.status === ResponseStatuses.UNAUTHORIZED) {
    throw new Error('Access token is missing or invalid');
  }

  if (resp.status === ResponseStatuses.BAD_REQUEST) {
    throw new Error('Bad request');
  }
  const data = await resp.json();
  return data;
};

const getUserWord = async (userId: string, wordId: string): Promise<UserWordResponse> => {
  const resp = await fetch(`${API_URL}${RequestPaths.USERS}/${userId}${RequestPaths.WORDS}/${wordId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // TODO what is difficulty??
      difficulty: 'string',
      optional: {},
    }),
  });
  if (resp.status === ResponseStatuses.UNAUTHORIZED) {
    throw new Error('Access token is missing or invalid');
  }

  if (resp.status === ResponseStatuses.NOT_FOUND) {
    throw new Error("User's word not found");
  }

  const data = await resp.json();
  return data;
};

const updateUserWord = async (userId: string, wordId: string): Promise<WordResponse> => {
  const resp = await fetch(`${API_URL}${RequestPaths.USERS}/${userId}${RequestPaths.WORDS}/${wordId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // TODO what is difficulty??
      difficulty: 'string',
      optional: {},
    }),
  });
  if (resp.status === ResponseStatuses.UNAUTHORIZED) {
    throw new Error('Access token is missing or invalid');
  }

  if (resp.status === ResponseStatuses.BAD_REQUEST) {
    throw new Error('Bad request');
  }
  const data = await resp.json();
  return data;
};

const deleteUserWord = async (userId: string, wordId: string): Promise<boolean> => {
  const resp = await fetch(`${API_URL}${RequestPaths.USERS}/${userId}${RequestPaths.WORDS}/${wordId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (resp.status === ResponseStatuses.UNAUTHORIZED) {
    throw new Error('Access token is missing or invalid');
  }

  if (resp.status === ResponseStatuses.NO_CONTENT) {
    return true;
  }

  return false;
};

export { getUserWords, addUserWord, getUserWord, updateUserWord, deleteUserWord };
