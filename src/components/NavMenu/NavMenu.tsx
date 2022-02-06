import React, { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { SignOutAction } from '../../store/action-creators/auth';

import styles from './NavMenu.module.scss';

const NavMenu: FC = () => {
  const dispatch = useDispatch();
  const auth = useTypedSelector(state => state.auth);
  const isAuthorized = auth.isAuthorized;

  const handleSignOut = useCallback(() => {
    dispatch(SignOutAction());
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
