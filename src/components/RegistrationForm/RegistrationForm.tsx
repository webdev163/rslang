import React, { FC, FormEvent, useCallback, useState } from 'react';
import { MAX_USER_NAME_LENGTH } from '../../utils/constants';
import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';
import TextInput from '../inputs/TextInput';
import { RegistrationChecks, RegistrationData } from './types';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import styles from './RegistrationForm.module.scss';

const RegistrationForm: FC = () => {
  const { auth } = useTypedSelector(state => state);
  const [checks, setChecks] = useState<RegistrationChecks>({ name: false, email: false, password: false });
  const [data, setData] = useState<RegistrationData>({ name: '', email: auth.email, password: '' });
  const { RegistrationAction } = useActions();

  const handleFulfilled = useCallback(
    (key: string) => (isFulfilled: boolean) => {
      setChecks(prevState => ({ ...prevState, [key]: isFulfilled }));
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (checks.name && checks.email && checks.password) RegistrationAction(data.name, data.email, data.password);
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
      <div className={`${styles['login-form-message']} ${(auth.loading || !auth.error) && styles.hidden}`}>{`${
        auth.error && auth.error.includes('user with this e-mail exists') ? 'Адрес занят' : 'Ошибка регистрации'
      }`}</div>
      <TextInput
        label={'Имя'}
        length={MAX_USER_NAME_LENGTH}
        onFulfilled={handleFulfilled('name')}
        onInput={handleInput('name')}
      />
      <EmailInput
        label={'Почта'}
        onFulfilled={handleFulfilled('email')}
        onInput={handleInput('email')}
        value={auth.email}
      />
      <PasswordInput
        label={'Пароль'}
        onFulfilled={handleFulfilled('password')}
        tips
        onInput={handleInput('password')}
      />
      <div className={styles.buttons}>
        <button
          type="submit"
          className={styles.button__primary}
          disabled={!(checks.name && checks.email && checks.password)}
        >
          Регистрация
        </button>
        <button type="reset" className={styles.button__secondary}>
          Сброс
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
