import React, { FC } from 'react';
import Button from '@mui/material/Button';

import styles from './ButtonHard.module.scss';

const ButtonHard: FC = () => {
  return (
    <Button variant="contained" sx={{ fontSize: 20, marginLeft: 1 }}>
      Сложные слова
    </Button>
  );
};

export default ButtonHard;
