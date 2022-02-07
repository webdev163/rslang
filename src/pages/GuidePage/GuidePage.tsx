import React, { FC, useEffect } from 'react';
import GuideHeader from '../../components/Guide/GuideHeader';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import CardsList from '../../components/Guide/CardsList';

import styles from './GuidePage.module.scss';

const GuidePage: FC = () => {
  const { fetchWords } = useActions();
  const { group, page } = useTypedSelector(state => state.guide);
  useEffect(() => {
    fetchWords(group, page);
  }, [group, page]);

  return (
    <div className={styles.guideWrapper}>
      <h1 className={styles.title}>Учебник</h1>
      <GuideHeader />
      <CardsList />
    </div>
  );
};

export default GuidePage;
