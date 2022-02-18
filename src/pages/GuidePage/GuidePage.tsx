import React, { FC, useEffect } from 'react';
import GuideHeader from '../../components/Guide/GuideHeader';
import { useActions } from '../../hooks/useActions';
import CardsList from '../../components/Guide/CardsList';
import { useParams, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import styles from './GuidePage.module.scss';

const GuidePage: FC = () => {
  const { fetchWords, setGuidePage, setWordsGroup, emptyDoneCounter } = useActions();
  const { group, page } = useTypedSelector(state => state.guide);
  const { page: currentPage, group: currentGroup } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    emptyDoneCounter();
  }, []);

  useEffect(() => {
    currentGroup && currentPage
      ? fetchWords(+currentGroup, +currentPage)
      : navigate(`/guide/group${group}/page${page}`, { replace: true });
  }, [currentGroup, currentPage]);

  useEffect(() => {
    if (currentPage) {
      const targetPage = +currentPage;
      setGuidePage(targetPage);
    }
    if (currentGroup) {
      const targetGroup = +currentGroup;
      setWordsGroup(targetGroup);
    }
  }, [currentPage, currentGroup]);

  return (
    <div className={styles.guideWrapper}>
      <h1 className={styles.title}>Учебник</h1>
      <GuideHeader />
      <CardsList />
    </div>
  );
};

export default GuidePage;
