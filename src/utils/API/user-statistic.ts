import { API_URL } from '../constants';
import { RequestPaths, ResponseStatuses, UserStatisticsResponse } from '../../types/requests';

const getUserStatistic = async (userId: string, token: string): Promise<UserStatisticsResponse[]> => {
  const resp = await fetch(`${API_URL}${RequestPaths.USERS}/${userId}${RequestPaths.STATISTICS}`, {
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

const updateUserStatistic = async (
  userId: string,
  token: string,
  learnedWords: number,
  optional = {},
): Promise<boolean> => {
  const resp = await fetch(`${API_URL}${RequestPaths.USERS}/${userId}${RequestPaths.STATISTICS}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      learnedWords,
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

export { getUserStatistic, updateUserStatistic };
