import React, { FC, FormEvent, useCallback, useState } from 'react';
import { MAX_USER_NAME_LENGTH } from '../../utils/constants';
import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';
import TextInput from '../inputs/TextInput';

import styles from './RegistrationForm.module.scss';

interface RegistrationData {
  name: string;
  email: string;
  password: string;
}

interface RegistrationChecks {
  name: boolean;
  email: boolean;
  password: boolean;
}
const RegistrationForm: FC = () => {
  const [checks, setChecks] = useState<RegistrationChecks>({ name: false, email: false, password: false });
  const [data, setData] = useState<RegistrationData>({ name: '', email: '', password: '' });

  const handleFulfilled = useCallback(
    (key: string) => (isFulfilled: boolean) => {
      setChecks(prevState => ({ ...prevState, [key]: isFulfilled }));
    },
    [],
  );
  console.log(data, checks);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (checks.name && checks.email && checks.password) console.log('DONE'); // TODO add api function
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
      <TextInput
        label={'Имя'}
        length={MAX_USER_NAME_LENGTH}
        onFulfilled={handleFulfilled('name')}
        onInput={handleInput('name')}
      />
      <EmailInput label={'Почта'} onFulfilled={handleFulfilled('email')} onInput={handleInput('email')} />
      <PasswordInput
        label={'Пароль'}
        onFulfilled={handleFulfilled('password')}
        tips
        onInput={handleInput('password')}
      />
      <button type="submit" className={styles.button__primary}>
        Регистрация
      </button>
      <button type="reset" className={styles.button__secondary}>
        Сброс
      </button>
    </form>
  );
};

export default RegistrationForm;
