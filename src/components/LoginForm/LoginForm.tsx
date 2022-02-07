import React, { FC, FormEvent, useCallback, useState } from 'react';
import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';
import { LoginChecks, LoginData } from './types';

import styles from './LoginForm.module.scss';
import { useActions } from '../../hooks/useActions';

const LoginForm: FC = () => {
  const [checks, setChecks] = useState<LoginChecks>({ email: false, password: false });
  const [data, setData] = useState<LoginData>({ email: '', password: '' });

  const { signInAction } = useActions();

  const handleFulfilled = useCallback(
    (key: string) => (isFulfilled: boolean) => {
      setChecks(prevState => ({ ...prevState, [key]: isFulfilled }));
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (checks.email && checks.password) signInAction(data.email, data.password);
    },
    [checks],
  );

  const handleInput = useCallback(
    (key: string) => (value: string) => {
      setData(prevState => ({ ...prevState, [key]: value }));
    },
    [],
  );
  return (
    <form className={styles['login-form']} onSubmit={handleSubmit}>
      <EmailInput label={'Почта'} onFulfilled={handleFulfilled('email')} onInput={handleInput('email')} />
      <PasswordInput label={'Пароль'} onFulfilled={handleFulfilled('password')} onInput={handleInput('password')} />
      <button type="submit" className={styles.button__primary}>
        Войти
      </button>
      <button type="reset" className={styles.button__secondary}>
        Сброс
      </button>
    </form>
  );
};

export default LoginForm;
