import React, { FC, useEffect, useMemo, useState } from 'react';
import Loader from '../../components/Loader';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { UserStatisticsResponse } from '../../types/requests';
import { getUserStatistic } from '../../utils/API';
import NewWordsChart from '../../components/Charts/NewWordsChart';
import LearntWordsChart from '../../components/Charts/LearntWordsChart';
import { DataGrid, GridColDef, GridComparatorFn } from '@mui/x-data-grid';

import styles from './StatsPage.module.scss';
import { gameStatistics } from './types';

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
        .catch(() => setIsLoading(false));
    }
  }, [user.userId]);

  const getGameArray = (game: 'sprint' | 'audio'): gameStatistics[] => {
    const statArr: gameStatistics[] = [];
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
            percent:
              dayGameStat.rightAnswers + dayGameStat.wrongAnswers > 0
                ? Math.ceil((100 * dayGameStat.rightAnswers) / (dayGameStat.rightAnswers + dayGameStat.wrongAnswers))
                : 0,
          });
        }
      }
    }
    return statArr;
  };

  const audioStats = useMemo(() => getGameArray('audio'), [stat]);

  const sprintStats = useMemo(() => getGameArray('sprint'), [stat]);

  const guideStats = useMemo((): gameStatistics[] => {
    const statArr: gameStatistics[] = [];
    if (stat?.optional) {
      for (const key in stat.optional) {
        if (stat.optional[key]) {
          const dayGuideStat = stat.optional[key].guide;
          const dayAudioStat = stat.optional[key].audio;
          const daySprintStat = stat.optional[key].sprint;
          if (dayAudioStat && daySprintStat) {
            statArr.push({
              id: key,
              date: key,
              learnedWords: dayGuideStat
                ? dayGuideStat.learnedWords + daySprintStat.learnedWords + dayAudioStat.learnedWords
                : daySprintStat.learnedWords + dayAudioStat.learnedWords,
              chainLength:
                dayAudioStat.chainLength > daySprintStat.chainLength
                  ? dayAudioStat.chainLength
                  : daySprintStat.chainLength,
              newWords: daySprintStat.newWords + dayAudioStat.newWords,
              wrongAnswers: daySprintStat.wrongAnswers + dayAudioStat.wrongAnswers,
              rightAnswers: daySprintStat.rightAnswers + dayAudioStat.rightAnswers,
              percent:
                dayAudioStat.rightAnswers +
                  daySprintStat.rightAnswers +
                  dayAudioStat.wrongAnswers +
                  daySprintStat.wrongAnswers >
                0
                  ? Math.ceil(
                      (100 * dayAudioStat.rightAnswers + daySprintStat.rightAnswers) /
                        (dayAudioStat.rightAnswers +
                          daySprintStat.rightAnswers +
                          dayAudioStat.wrongAnswers +
                          daySprintStat.wrongAnswers),
                    )
                  : 0,
            });
          } else if (dayAudioStat) {
            statArr.push({
              id: key,
              date: key,
              learnedWords: dayGuideStat
                ? dayGuideStat.learnedWords + dayAudioStat.learnedWords
                : dayAudioStat.learnedWords,
              chainLength: dayAudioStat.chainLength,
              newWords: dayAudioStat.newWords,
              wrongAnswers: dayAudioStat.wrongAnswers,
              rightAnswers: dayAudioStat.rightAnswers,
              percent:
                dayAudioStat.rightAnswers + dayAudioStat.wrongAnswers > 0
                  ? Math.ceil(
                      (100 * dayAudioStat.rightAnswers) / (dayAudioStat.rightAnswers + dayAudioStat.wrongAnswers),
                    )
                  : 0,
            });
          } else if (daySprintStat) {
            statArr.push({
              id: key,
              date: key,
              learnedWords: dayGuideStat
                ? dayGuideStat.learnedWords + daySprintStat.learnedWords
                : daySprintStat.learnedWords,
              chainLength: daySprintStat.chainLength,
              newWords: daySprintStat.newWords,
              wrongAnswers: daySprintStat.wrongAnswers,
              rightAnswers: daySprintStat.rightAnswers,
              percent:
                daySprintStat.rightAnswers + daySprintStat.wrongAnswers > 0
                  ? Math.ceil(
                      (100 * daySprintStat.rightAnswers) / (daySprintStat.rightAnswers + daySprintStat.wrongAnswers),
                    )
                  : 0,
            });
          } else {
            statArr.push({
              id: key,
              date: key,
              learnedWords: dayGuideStat ? dayGuideStat.learnedWords : 0,
              chainLength: 0,
              newWords: 0,
              wrongAnswers: 0,
              rightAnswers: 0,
              percent: 0,
            });
          }
        }
      }
    }
    return statArr;
  }, [audioStats, sprintStats, stat]);

  const dateComparator: GridComparatorFn = (date1, date2) => {
    return (date1 as string) > (date2 as string) ? -1 : 1;
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Дата',
      type: 'string',
      minWidth: 70,
      flex: 1,
      hideable: false,
      sortComparator: dateComparator,
    },
    { field: 'newWords', headerName: 'Новые слова', type: 'number', minWidth: 70, flex: 1 },
    { field: 'learnedWords', headerName: 'Изучено', type: 'number', minWidth: 70, flex: 1 },
    { field: 'percent', headerName: 'Процент правильных ответов', type: 'number', minWidth: 70, flex: 1 },
    {
      field: 'chainLength',
      headerName: 'Цепь',
      type: 'number',
      minWidth: 70,
      flex: 1,
    },
  ];

  return (
    <div>
      <h1 className={styles.title}>Статистика</h1>
      {!user.token && <span>Для доступа к статистике необходимо авторизоваться</span>}
      {isLoading ? (
        user.token && (
          <div className={styles.loader}>
            <Loader />
          </div>
        )
      ) : (
        <>
          <h2>Общая статистика</h2>
          <div className={styles.table}>
            <DataGrid rows={guideStats} columns={columns} pageSize={5} rowsPerPageOptions={[5]} disableColumnMenu />
          </div>
          <h2>Аудиовызов</h2>
          <div className={styles.table}>
            <DataGrid rows={audioStats} columns={columns} pageSize={5} rowsPerPageOptions={[5]} disableColumnMenu />
          </div>

          <h2>Спринт</h2>
          <div className={styles.table}>
            <DataGrid rows={sprintStats} columns={columns} pageSize={5} rowsPerPageOptions={[5]} disableColumnMenu />
          </div>
          <h2 className={styles.subtitle}>Количество новых слов за каждый день изучения</h2>
          <div style={{ height: '400px' }}>
            <NewWordsChart stat={stat} />
          </div>
          <h2 className={styles.subtitle}>
            Увеличение общего количества изученных слов за весь период обучения по дням
          </h2>
          <div style={{ height: '400px' }}>
            <LearntWordsChart stat={stat} />
          </div>
        </>
      )}
    </div>
  );
};

export default StatsPage;
