import React, { FC, useEffect } from 'react';
import DifficultyButtons from '../../components/Guide/DifficultyButtons';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import CardsList from '../../components/Guide/CardsList';

import styles from './GuidePage.module.scss';

const GuidePage: FC = () => {
  const { fetchWords, setWordsGroup, setGuidePage } = useActions();
  const { wordsArr, isLoading, error, group, page } = useTypedSelector(state => state.guide);
  useEffect(() => {
    fetchWords(group, page);
  }, [group, page]);

  return (
    <div>
      <h1 className={styles.title}>Guide Page</h1>
      <DifficultyButtons />
      <CardsList />
    </div>
  );
};

export default GuidePage;
