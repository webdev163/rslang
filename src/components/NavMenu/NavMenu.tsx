import React, { FC, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import styles from './NavMenu.module.scss';

const NavMenu: FC = () => {
  const auth = useTypedSelector(state => state.auth);
  const isAuthorized = auth.isAuthorized;
  const { SignOutAction, getUserWordsAction } = useActions();
  const handleSignOut = useCallback(() => {
    SignOutAction();
  }, []);

  return (
    <nav className={styles.wrapper}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link className={styles.link} to="/">
            Главная
          </Link>
        </li>
        <li className={styles.item}>
          {!isAuthorized ? (
            <Link className={styles.link} to="/login">
              Войти
            </Link>
          ) : (
            <Link onClick={handleSignOut} className={styles.link} to="#">
              Выйти
            </Link>
          )}
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
