import { API_URL } from '../constants';
import { RequestPaths, ResponseStatuses, TokenResponse, UserRequest, UserResponse } from '../types/requests';
import { User } from '../types/types';

const addUser = async (user: UserRequest): Promise<UserResponse | string> => {
  const resp = await fetch(`${API_URL}${RequestPaths.USERS}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (resp.status === ResponseStatuses.UNPROCESSABLE) {
    const data = await resp.json();
    throw new Error(data.error.errors[0].message);
  }
  const data = await resp.json();
  return data;
};

const getUser = async (id: string): Promise<UserResponse> => {
  const resp = await fetch(`${API_URL}${RequestPaths.USERS}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (resp.status === ResponseStatuses.UNAUTHORIZED) {
    throw new Error('Access token is missing or invalid');
  }
  if (resp.status === ResponseStatuses.NOT_FOUND) {
    throw new Error('User not found');
  }
  const word = await resp.json();
  return word;
};

const updateUser = async (id: string, user: Pick<User, 'email' | 'password'>) => {
  const resp = await fetch(`${API_URL}${RequestPaths.USERS}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (resp.status === ResponseStatuses.BAD_REQUEST) {
    throw new Error('Bad request');
  }
  if (resp.status === ResponseStatuses.UNAUTHORIZED) {
    throw new Error('Access token is missing or invalid');
  }
  const data = await resp.json();
  return data;
};

const deleteUser = async (id: string): Promise<boolean> => {
  const resp = await fetch(`${API_URL}${RequestPaths.USERS}/${id}`, {
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

const getUserToken = async (id: string): Promise<TokenResponse> => {
  const resp = await fetch(`${API_URL}${RequestPaths.USERS}/${id}/tokens`, {
    headers: {
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

export { addUser, getUser, updateUser, deleteUser, getUserToken };
