import React, { FC, useEffect, useMemo, useState } from 'react';
import Loader from '../../components/Loader';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { UserStatisticsResponse } from '../../types/requests';
import { getUserStatistic } from '../../utils/API';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import styles from './StatsPage.module.scss';
import { spacing } from '@mui/system';

const StatsPage: FC = () => {
  const [stat, setStat] = useState<UserStatisticsResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useTypedSelector(state => state.auth);
  useEffect(() => {
    if (user.userId) {
      getUserStatistic(user.userId, user.token)
        .then(data => {
          setStat(data);
          setIsLoading(false);
        })
        .catch(err => setIsLoading(false));
    }
  }, [user.userId]);

  const getGameArray = (game: 'sprint' | 'audio'): Record<string, string | number>[] => {
    const statArr = [];
    if (stat?.optional) {
      for (const key in stat.optional) {
        if (stat.optional[key][game]) {
          const dayGameStat = stat.optional[key][game];
          statArr.push({
            id: key,
            date: key,
            learnedWords: dayGameStat.learnedWords,
            newWords: dayGameStat.newWords,
            chainLength: dayGameStat.chainLength,
            wrongAnswers: dayGameStat.wrongAnswers,
            rightAnswers: dayGameStat.rightAnswers,
            percent: Math.ceil(
              (100 * dayGameStat.rightAnswers) / (dayGameStat.rightAnswers + dayGameStat.wrongAnswers),
            ),
          });
        }
      }
    }
    return statArr;
  };

  const audioStats = useMemo(() => getGameArray('audio'), [stat]);

  const sprintStats = useMemo(() => getGameArray('sprint'), [stat]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Дата', type: 'number', width: 100 },
    { field: 'newWords', headerName: 'Новые', type: 'number', width: 130 },
    { field: 'learnedWords', headerName: 'Изучено', type: 'number', width: 130 },
    { field: 'percent', headerName: 'Процент правильных ответов', type: 'number', width: 130 },
    {
      field: 'chainLength',
      headerName: 'Цепь',
      type: 'number',
      width: 90,
    },
  ];

  return (
    <div>
      <h1 className={styles.title}>Stats Page</h1>
      {!user.token && <span>Для доступа к статистике необходимо авторизоваться</span>}
      {isLoading ? (
        user.token && <Loader />
      ) : (
        <>
          <h2>Аудиовызов</h2>
          <div style={{ height: '400px' }}>
            <DataGrid rows={audioStats} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
          </div>

          <h2>Спринт</h2>
          <div style={{ height: '400px' }}>
            <DataGrid rows={sprintStats} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
          </div>
        </>
      )}
    </div>
  );
};

export default StatsPage;
