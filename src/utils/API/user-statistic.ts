import { API_URL } from '../constants';
import { GameStatistic, RequestPaths, ResponseStatuses, UserStatisticsResponse } from '../../types/requests';

const getUserStatistic = async (userId: string, token: string): Promise<UserStatisticsResponse> => {
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

const changeStatistic = async (
  userId: string,
  token: string,
  game: 'sprint' | 'audio',
  statistic: GameStatistic,
  date = new Date(),
) => {
  const prevStat = await getUserStatistic(userId, token);
  const dateKey = date.toLocaleDateString('ru-RU');
  if (prevStat.optional && prevStat.optional[dateKey]) {
    const dayPrevStat = prevStat.optional[dateKey];
    updateUserStatistic(userId, token, prevStat.learnedWords + statistic.learnedWords, {
      ...prevStat.optional,
      [dateKey]: {
        ...dayPrevStat,
        [game]: {
          newWords:
            dayPrevStat[game] && dayPrevStat[game].newWords
              ? dayPrevStat[game].newWords + statistic.newWords
              : statistic.newWords,
          learnedWords:
            dayPrevStat[game] && dayPrevStat[game].learnedWords
              ? dayPrevStat[game].learnedWords + statistic.learnedWords
              : statistic.learnedWords,
          chainLength:
            dayPrevStat[game] && dayPrevStat[game].chainLength && dayPrevStat[game].chainLength > statistic.chainLength
              ? dayPrevStat[game].chainLength
              : statistic.learnedWords,
          wrongAnswers:
            dayPrevStat[game] && dayPrevStat[game].wrongAnswers
              ? dayPrevStat[game].wrongAnswers + statistic.wrongAnswers
              : statistic.wrongAnswers,
          rightAnswers:
            dayPrevStat[game] && dayPrevStat[game].rightAnswers
              ? dayPrevStat[game].rightAnswers + statistic.rightAnswers
              : statistic.rightAnswers,
        },
      },
    });
  } else {
    updateUserStatistic(userId, token, prevStat.learnedWords + statistic.learnedWords, {
      ...prevStat.optional,
      [dateKey]: { [game]: statistic },
    });
  }
};

export { getUserStatistic, updateUserStatistic, changeStatistic };
