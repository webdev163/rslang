import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { LoginButton } from '../LoginButton/index';

import styles from './NavMenu.module.scss';

const NavMenu: FC = () => {
  return (
    <nav className={styles.wrapper}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link className={styles.link} to="/">
            Главная
          </Link>
        </li>
        <li className={styles.item}>
          <LoginButton />
        </li>
        <li className={styles.item}>
          <Link className={styles.link} to="/guide">
            Учебник
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.link} to="/games">
            Мини-игры
          </Link>
        </li>
        <li className={styles.item}>
          <Link className={styles.link} to="/stats">
            Статистика
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
