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
    updateUserStatistic(userId, token, prevStat.learnedWords + statistic.learnedWords, {
      ...prevStat.optional,
      [dateKey]: {
        ...prevStat.optional[dateKey],
        [game]: {
          newWords:
            prevStat.optional[dateKey][game] && prevStat.optional[dateKey][game].newWords
              ? prevStat.optional[dateKey][game].newWords + statistic.newWords
              : statistic.newWords,
          learnedWords:
            prevStat.optional[dateKey][game] && prevStat.optional[dateKey][game].learnedWords
              ? prevStat.optional[dateKey][game].learnedWords + statistic.learnedWords
              : statistic.learnedWords,
          chainLength:
            prevStat.optional[dateKey][game] &&
            prevStat.optional[dateKey][game].chainLength &&
            prevStat.optional[dateKey][game].chainLength > statistic.chainLength
              ? prevStat.optional[dateKey][game].chainLength
              : statistic.learnedWords,
          wrongAnswers:
            prevStat.optional[dateKey][game] && prevStat.optional[dateKey][game].wrongAnswers
              ? prevStat.optional[dateKey][game].wrongAnswers + statistic.wrongAnswers
              : statistic.wrongAnswers,
          rightAnswers:
            prevStat.optional[dateKey][game] && prevStat.optional[dateKey][game].rightAnswers
              ? prevStat.optional[dateKey][game].rightAnswers + statistic.rightAnswers
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
