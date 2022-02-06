import React, { FC, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../../components/LoginForm';
import RegistrationForm from '../../components/RegistrationForm ';

import styles from './LoginPage.module.scss';

const LoginPage: FC = () => {

  const [signUp, setSignUp] = useState<boolean>(false);
  const handleSignIn = useCallback(() => {
    setSignUp(false);
  }, []);
  const handleSignUp = useCallback(() => {
    setSignUp(true);
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
    </div>
  );
};

export default LoginPage;
