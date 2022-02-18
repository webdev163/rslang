import React, { FC, FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { MAX_USER_NAME_LENGTH } from '../../utils/constants';
import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';
import TextInput from '../inputs/TextInput';
import { RegistrationChecks, RegistrationData, RegistrationFormProps } from './types';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import styles from './RegistrationForm.module.scss';
import { Button } from '@mui/material';

const RegistrationForm: FC<RegistrationFormProps> = ({ onClose }) => {
  const { auth } = useTypedSelector(state => state);
  const [checks, setChecks] = useState<RegistrationChecks>({ name: false, email: false, password: false });
  const [data, setData] = useState<RegistrationData>({ name: '', email: auth.email, password: '' });
  const { RegistrationAction } = useActions();

  useEffect(() => {
    if (auth.isAuthorized && onClose) onClose();
  }, [auth.isAuthorized]);

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

  const isDisabledRegistration = useMemo(() => !(checks.name && checks.email && checks.password), [checks]);
  const errorMsg = useMemo(() => {
    return auth.error && auth.error.includes('user with this e-mail exists') ? 'Адрес занят' : 'Ошибка регистрации';
  }, [auth]);

  return (
    <form className={styles['login-form']} onSubmit={handleSubmit}>
      <div className={`${styles['login-form-message']} ${(auth.loading || !auth.error) && styles.hidden}`}>
        {errorMsg}
      </div>
      <TextInput
        label="Имя"
        length={MAX_USER_NAME_LENGTH}
        onFulfilled={handleFulfilled('name')}
        onInput={handleInput('name')}
      />
      <EmailInput
        label="Почта"
        onFulfilled={handleFulfilled('email')}
        onInput={handleInput('email')}
        value={auth.email}
      />
      <PasswordInput label="Пароль" onFulfilled={handleFulfilled('password')} tips onInput={handleInput('password')} />
      <div className={styles.buttons}>
        <Button variant="contained" type="submit" className={styles.button__primary} disabled={isDisabledRegistration}>
          Регистрация
        </Button>
        <Button variant="outlined" type="reset" className={styles.button__secondary}>
          Сброс
        </Button>
      </div>
    </form>
  );
};

export default RegistrationForm;
