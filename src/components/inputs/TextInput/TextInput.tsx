import React, { FC, FormEvent, useCallback, useState } from 'react';

import styles from './TextInput.module.scss';

interface TextInputProps {
  label: string;
  length: number;
  onFulfilled: CallableFunction;
  onInput: CallableFunction;
}

const TextInput: FC<TextInputProps> = ({ label, length, onFulfilled, onInput }) => {
  const [isTextLengthValid, setIsTextLengthValid] = useState<boolean>(false);

  const handleInput = useCallback((e: FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;

    const validator = input.length <= length;
    if (validator) onInput(input);
    onFulfilled(validator);
    setIsTextLengthValid(validator);
  }, []);

  return (
    <>
      <label htmlFor="text-input" className={styles['text__label']}>
        {label}
        <input type="text" name="text-input" id="text-input" className={styles['text__input']} onInput={handleInput} />
        {!isTextLengthValid && <span className={styles['text__warning']}>Не более {length} символов</span>}
      </label>
    </>
  );
};

export default TextInput;
