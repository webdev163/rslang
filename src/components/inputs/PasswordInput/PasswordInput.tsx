import React, { FC, FormEvent, useCallback, useState } from 'react';
import { PasswordChecks } from '../../../types/types';
import { PASSWORD_RULES } from '../../../utils/constants';
import { PasswordInputProps } from './types';

import styles from './PasswordInput.module.scss';

const PasswordInput: FC<PasswordInputProps> = ({ label, onFulfilled, tips, onInput }) => {
  const [passwordChecks, setPasswordChecks] = useState<PasswordChecks>({
    length: false,
    differentCase: false,
    numbers: false,
  });
  const [isShown, setIsShown] = useState<boolean>(false);

  const handleInput = useCallback((e: FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    const curPasswordChecks = {
      numbers: /\d/.test(input),
      differentCase: /[a-z]/.test(input) && /[A-Z]/.test(input), // TODO why input === input.toUpperCase => true
      length: input.length < PASSWORD_RULES.length ? false : true,
    };
    const validator =
      curPasswordChecks.length &&
      ((PASSWORD_RULES.differentCase && curPasswordChecks.differentCase) || !PASSWORD_RULES.differentCase) &&
      ((PASSWORD_RULES.numbers && curPasswordChecks.numbers) || !PASSWORD_RULES.numbers);

    if (validator) onInput(input);
    onFulfilled(validator);
    setPasswordChecks({ ...curPasswordChecks });
  }, []);

  const toggleShown = useCallback((e: FormEvent<HTMLInputElement>) => setIsShown(e.currentTarget.checked), []);

  return (
    <>
      <label htmlFor="auth-password" className={styles['password__label']}>
        {label}
        <input
          type={`${isShown ? 'text' : 'password'}`}
          name="auth-password"
          id="auth-password"
          className={styles['password__input']}
          onInput={handleInput}
        />
        <label htmlFor="show-password" className={styles['password__show-btn-wrp']}>
          <span className={isShown ? styles['password__show-btn'] : styles['password__hide-btn']} />
          <input
            type="checkbox"
            name="show-password"
            id="show-password"
            onChange={toggleShown}
            defaultChecked={isShown}
            className={styles['password__show-checkbox']}
          />
        </label>
      </label>

      {tips && (
        <ul className={styles['password__rules']}>
          <li
            className={`${
              PASSWORD_RULES.length > 0 ? styles['password__rule-required'] : styles['password__rule-hidden']
            } ${passwordChecks.length && styles['password__rule-fulfilled']}`}
          >
            Минимум {PASSWORD_RULES.length} символов
          </li>
          <li
            className={`${
              PASSWORD_RULES.differentCase ? styles['password__rule-required'] : styles['password__rule-recommended']
            } ${passwordChecks.differentCase && styles['password__rule-fulfilled']}`}
          >
            Символы в верхнем и нижнем регистре
          </li>
          <li
            className={`${
              PASSWORD_RULES.numbers ? styles['password__rule-required'] : styles['password__rule-recommended']
            } ${passwordChecks.numbers && styles['password__rule-fulfilled']}`}
          >
            Цифры
          </li>
        </ul>
      )}
    </>
  );
};

export default PasswordInput;
