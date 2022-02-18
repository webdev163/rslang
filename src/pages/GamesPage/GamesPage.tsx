import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';

import styles from './GamesPage.module.scss';

const GamesPage: FC = () => {
  return (
    <div>
      <div className={styles.wrapperInner}>
        <h1 className={styles.title}>Мини-игры</h1>
        <div className={styles.gamesWrapper}>
          <div className={styles.gamesItem}>
            <Link className={styles.link} to="/games/audio">
              <h2>Аудиовызов</h2>
              <div className={styles.image}>
                <img src="/assets/img/audiogame.jpg" alt="Игра Аудиовызов" />
              </div>
            </Link>
          </div>
          <div className={styles.gamesItem}>
            <Link className={styles.link} to="/games/sprint">
              <h2>Спринт</h2>
              <div className={styles.image}>
                <img src="/assets/img/sprintgame.jpg" alt="Игра Спринт" />
              </div>
            </Link>
          </div>
        </div>
        {/* <div className={styles.linksWrapper}>
          <Link className={styles.link} to="/games/audio">
            Мини-игра &quot;Аудиовызов&quot;
          </Link>
          <Link className={styles.link} to="/games/sprint">
            Мини-игра &quot;Спринт&quot;
          </Link>
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default GamesPage;
