import { TextField } from '@mui/material';
import React, { FC, FormEvent, useCallback, useState } from 'react';

import styles from './TextInput.module.scss';
import { TextInputProps } from './types';

const TextInput: FC<TextInputProps> = ({ label, length, onFulfilled, onInput }) => {
  const [isTextLengthValid, setIsTextLengthValid] = useState<boolean>(false);

  const handleInput = useCallback((e: FormEvent<HTMLInputElement>) => {
    const inputTarget = e.nativeEvent.target as HTMLInputElement;
    const input = inputTarget.value;

    const validator = input.length <= length;
    if (validator) onInput(input);
    onFulfilled(validator);
    setIsTextLengthValid(validator);
  }, []);

  return (
    <>
      <label htmlFor="text-input" className={styles['text__label']}>
        <TextField
          label={label}
          variant="standard"
          type="text"
          name="text-input"
          id="text-input"
          className={styles['text__input']}
          inputProps={{
            onInput: handleInput,
          }}
          helperText={`Не более ${length} символов`}
        />
        {/* {!isTextLengthValid && <span className={styles['text__warning']}>Не более {length} символов</span>} */}
      </label>
    </>
  );
};

export default TextInput;
