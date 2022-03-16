import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { FC, useCallback, useState } from 'react';
import RegistrationForm from '../RegistrationForm';
import LoginForm from '../LoginForm';
import { LoginDialogProps } from './types';
import Button from '@mui/material/Button';

import styles from './LoginButton.module.scss';

const LoginDialog: FC<LoginDialogProps> = ({ onClose, open }) => {
  const [signUp, setSignUp] = useState<boolean>(false);

  const handleSignIn = useCallback(() => {
    setSignUp(false);
  }, []);
  const handleSignUp = useCallback(() => {
    setSignUp(true);
  }, []);

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <div className={styles.login__wrp}>
        <div className={styles['tabs-wrp']}>
          <div className={styles.tabs}>
            <Button variant={signUp ? 'outlined' : 'contained'} type="button" onClick={handleSignIn}>
              Вход
            </Button>
            <Button variant={signUp ? 'contained' : 'outlined'} type="button" onClick={handleSignUp}>
              Регистрация
            </Button>
          </div>
          {signUp ? <RegistrationForm onClose={handleClose} /> : <LoginForm onClose={handleClose} />}
        </div>
      </div>
    </Dialog>
  );
};

export default LoginDialog;
