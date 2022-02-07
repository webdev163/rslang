import React, { FC, FormEvent, useCallback, useState } from 'react';
import { EmailInputProps } from './types';

import styles from './EmailInput.module.scss';

const EmailInput: FC<EmailInputProps> = ({ label, onFulfilled, onInput }) => {
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);

  const handleInput = useCallback((e: FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;

    const validator = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input);
    if (validator) onInput(input);
    onFulfilled(validator);
    setIsEmailValid(validator);
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
        />
        {!isEmailValid && <span className={styles['email__warning']}>Например user@example.com</span>}
      </label>
    </>
  );
};

export default EmailInput;
