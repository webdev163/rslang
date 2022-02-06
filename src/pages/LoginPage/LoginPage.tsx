import React, { FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../../components/LoginForm';
import RegistrationForm from '../../components/RegistrationForm ';
import { SignOutAction } from '../../store/action-creators/auth';

import styles from './LoginPage.module.scss';

const LoginPage: FC = () => {
  const dispatch = useDispatch();

  const [signUp, setSignUp] = useState<boolean>(false);
  const handleSignIn = useCallback(() => {
    setSignUp(false);
  }, []);
  const handleSignUp = useCallback(() => {
    setSignUp(true);
  }, []);

  const handleSignOut = useCallback(() => {
    dispatch(SignOutAction());
  }, []);

  return (
    <div className={styles.login__wrp}>
      <h1 className={styles.title}>Login Page</h1>
      <div className={styles.tabs}>
        <button type="button" onClick={handleSignIn} className={signUp ? styles.tab : styles.tab__selected}>
          Вход
        </button>
        <button type="button" onClick={handleSignUp} className={!signUp ? styles.tab : styles.tab__selected}>
          Регистрация
        </button>
      </div>
      {signUp ? <RegistrationForm /> : <LoginForm />}

      {/* TODO remove it */}
      <button onClick={handleSignOut}>logout</button>
    </div>
  );
};

export default LoginPage;
