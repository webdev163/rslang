import React, { FC } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import Footer from '../../Footer';
import CardsHardList from '../CardsHardList';
import styles from './HardWordsPage.module.scss';

const HardWordsPage: FC = () => {
  const { isAuthorized } = useTypedSelector(state => state.auth);

  return (
    <div className={styles.guideWrapper}>
      <div className={styles.wrapperInner}>
        <h1 className={styles.title}>Сложные слова</h1>
        {isAuthorized ? (
          <CardsHardList />
        ) : (
          <p style={{ fontSize: 22, marginTop: 50 }}>
            Пожалуйста, авторизуйтесь. Эта страница доступна только авторизованным пользователям.
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HardWordsPage;
