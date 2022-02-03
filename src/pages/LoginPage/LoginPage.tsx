import React, { FC } from 'react';
import PasswordInput from '../../components/PasswordInput';

import styles from './LoginPage.module.scss';

const LoginPage: FC = () => {
  return (
    <div>
      <h1 className={styles.title}>Login Page</h1>
      <PasswordInput label="Пароль" onFulfilled={(ff: boolean) => console.log(ff)} />
    </div>
  );
};

export default LoginPage;
