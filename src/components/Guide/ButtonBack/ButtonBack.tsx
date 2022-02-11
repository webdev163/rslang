import React, { FC } from 'react';
import Button from '@mui/material/Button';
import styles from './ButtonBack.module.scss';
import { Link } from 'react-router-dom';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

const ButtonBack: FC = () => {
  const { getUserWordsAction } = useActions();
  const { user } = useTypedSelector(state => state.auth);
  return (
    <div className={styles.wrapper}>
      <Button
        component={Link}
        to="/guide/"
        onClick={() => getUserWordsAction(user.userId, user.token)}
        variant="contained"
        sx={{ fontSize: 20 }}
      >
        Назад
      </Button>
    </div>
  );
};

export default ButtonBack;
