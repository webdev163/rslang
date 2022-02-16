import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { FC, useCallback, useState } from 'react';
import RegistrationForm from '../RegistrationForm';
import LoginForm from '../LoginForm';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { LoginDialogProps } from './types';

import styles from './LoginButton.module.scss';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';

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
          {signUp ? <RegistrationForm /> : <LoginForm onClose={handleClose} />}
        </div>
      </div>
    </Dialog>
  );
};

const LoginListItem = () => {
  const navigate = useNavigate();
  const auth = useTypedSelector(state => state.auth);
  const isAuthorized = auth.isAuthorized;
  const { SignOutAction, emptyDoneCounter } = useActions();
  const handleSignOut = useCallback(() => {
    SignOutAction();
    emptyDoneCounter();
    navigate(`/`);
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ListItem
        button
        key="Логин"
        style={{ textDecoration: 'none', color: 'inherit' }}
        onClick={() => (isAuthorized ? handleSignOut() : handleClickOpen())}
      >
        <ListItemIcon>{isAuthorized ? <LogoutIcon /> : <LoginIcon />}</ListItemIcon>
        <ListItemText primary={!isAuthorized ? 'Войти' : 'Выйти'} />
      </ListItem>
      <LoginDialog open={open} onClose={handleClose} />
    </>
  );
};

export default LoginListItem;
