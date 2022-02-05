import React, { FC } from 'react';
import LoginForm from '../../components/LoginForm';
import RegistrationForm from '../../components/RegistrationForm ';

import styles from './LoginPage.module.scss';

const LoginPage: FC = () => {
  return (
    <div>
      <h1 className={styles.title}>Login Page</h1>
      <LoginForm />
      <RegistrationForm />
    </div>
  );
};

export default LoginPage;
