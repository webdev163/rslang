import { API_URL } from '../constants';
import { AggregatedWordsResponse, RequestPaths, ResponseStatuses } from '../../types/requests';

const getAggregatedWords = async (
  userId: string,
  token: string,
  filter: Record<string, unknown>,
  group?: number,
  page?: number,
  wordsPerPage?: number,
): Promise<AggregatedWordsResponse> => {
  const params = [];
  if (group) params.push(`group=${group}`);
  if (page) params.push(`page=${page}`);
  if (wordsPerPage) params.push(`wordsPerPage=${wordsPerPage}`);
  params.push(`filter=${JSON.stringify(filter)}`);
  const resp = await fetch(
    `${API_URL}${RequestPaths.USERS}/${userId}${RequestPaths.AGGREGATED_WORDS}?${params.join('&')}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );

  if (resp.status === ResponseStatuses.UNAUTHORIZED) {
    throw new Error('Unauthorized');
  }
  if (resp.status === ResponseStatuses.NOT_FOUND) {
    throw new Error('User not found');
  }
  if (resp.status === ResponseStatuses.NO_DATA) {
    throw new Error('No data');
  }
  const data = await resp.json();
  return data;
};

export { getAggregatedWords };
