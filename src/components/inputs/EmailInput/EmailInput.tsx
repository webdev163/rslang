import React, { FC, FormEvent, useCallback, useEffect, useState } from 'react';
import { EmailInputProps } from './types';

import styles from './EmailInput.module.scss';

const EmailInput: FC<EmailInputProps> = ({ label, onFulfilled, onInput, value }) => {
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);

  const onValidEmail = useCallback((email: string): void => {
    const validator = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    if (validator) onInput(email);
    onFulfilled(validator);
    setIsEmailValid(validator);
  }, []);

  const handleInput = useCallback((e: FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    onValidEmail(input);
  }, []);

  useEffect(() => {
    if (value) onValidEmail(value);
  }, []);

  return (
    <>
      <label htmlFor="email-input" className={styles['email__label']}>
        {label}
        <input
          type="text"
          name="email-input"
          id="email-input"
          className={styles['email__input']}
          onInput={handleInput}
          defaultValue={value}
        />
        {!isEmailValid && <span className={styles['email__warning']}>Например user@example.com</span>}
      </label>
    </>
  );
};

export default EmailInput;
