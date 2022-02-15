import React, { FC, FormEvent, useCallback, useMemo, useState } from 'react';
import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';
import { LoginChecks, LoginData } from './types';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import styles from './LoginForm.module.scss';
import Button from '@mui/material/Button';

const LoginForm: FC = () => {
  const { auth } = useTypedSelector(state => state);

  const [checks, setChecks] = useState<LoginChecks>({ email: false, password: false });
  const [data, setData] = useState<LoginData>({ email: auth.email, password: '' });

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
      if (checks.email && checks.password) {
        signInAction(data.email, data.password);
      }
    },
    [checks],
  );

  const handleInput = useCallback(
    (key: string) => (value: string) => {
      setData(prevState => ({ ...prevState, [key]: value }));
    },
    [],
  );

  const isDisabledLogin = useMemo(() => !(checks.email && checks.password), [checks]);

  const errorMsg = useMemo(() => {
    return auth.error && auth.error.includes('Incorrect e-mail or password')
      ? 'Неверный адрес или пароль'
      : 'Адрес не найден';
  }, [auth]);

  return (
    <form className={styles['login-form']} onSubmit={handleSubmit}>
      <div className={`${styles['login-form-message']} ${(auth.loading || !auth.error) && styles.hidden}`}>
        {errorMsg}
      </div>
      <EmailInput
        label="Почта"
        onFulfilled={handleFulfilled('email')}
        onInput={handleInput('email')}
        value={auth.email}
      />
      <PasswordInput label="Пароль" onFulfilled={handleFulfilled('password')} onInput={handleInput('password')} />
      <div className={styles.buttons}>
        <Button variant="contained" type="submit" className={styles.button__primary} disabled={isDisabledLogin}>
          Войти
        </Button>
        <Button variant="outlined" type="reset" className={styles.button__secondary}>
          Сброс
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
