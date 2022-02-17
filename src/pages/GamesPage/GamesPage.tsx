import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';

import styles from './GamesPage.module.scss';

const GamesPage: FC = () => {
  return (
    <div>
      <div className={styles.wrapperInner}>
        <h1 className={styles.title}>Games Page</h1>
        <div className={styles.linksWrapper}>
          <Link className={styles.link} to="/games/audio">
            Мини-игра &quot;Аудиовызов&quot;
          </Link>
          <Link className={styles.link} to="/games/sprint">
            Мини-игра &quot;Спринт&quot;
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GamesPage;
