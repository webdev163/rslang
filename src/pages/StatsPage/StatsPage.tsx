import React, { FC, useEffect, useMemo, useState } from 'react';
import Loader from '../../components/Loader';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { UserStatisticsResponse } from '../../types/requests';
import { getUserStatistic } from '../../utils/API';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import styles from './StatsPage.module.scss';

const StatsPage: FC = () => {
  const [stat, setStat] = useState<UserStatisticsResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useTypedSelector(state => state.auth);
  useEffect(() => {
    // console.log(user);
    if (user.userId) {
      getUserStatistic(user.userId, user.token)
        .then(data => {
          setStat(data);
          setIsLoading(false);
        })
        .catch(err => console.log('error', err));
    }
  }, [user.userId]);

  const testResp: UserStatisticsResponse = {
    learnedWords: 8,
    optional: {
      '2/13/2022': {
        audio: { newWords: 1, learnedWords: 1, chainLength: 1, wrongAnswers: 1, rightAnswers: 1 },
        sprint: { newWords: 4, learnedWords: 4, chainLength: 2, wrongAnswers: 4, rightAnswers: 4 },
      },
      '2/14/2022': {
        sprint: { newWords: 2, learnedWords: 2, chainLength: 2, wrongAnswers: 2, rightAnswers: 2 },
        audio: { newWords: 2, learnedWords: 2, chainLength: 2, wrongAnswers: 2, rightAnswers: 2 },
      },
    },
  };

  const getGameArray = (game: 'sprint' | 'audio'): Record<string, string | number>[] => {
    const statArr = [];
    if (stat?.optional) {
      for (const key in stat.optional) {
        console.log(key);
        if (stat.optional[key][game]) {
          statArr.push({
            id: key,
            date: key,
            learnedWords: stat.optional[key][game].learnedWords,
            newWords: stat.optional[key][game].newWords,
            chainLength: stat.optional[key][game].chainLength,
            wrongAnswers: stat.optional[key][game].wrongAnswers,
            rightAnswers: stat.optional[key][game].rightAnswers,
            percent: Math.ceil(
              (100 * stat.optional[key][game].rightAnswers) /
                (stat.optional[key][game].rightAnswers + stat.optional[key][game].wrongAnswers),
            ),
          });
        }
      }
      console.log(statArr);
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
      {isLoading ? (
        <Loader />
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
