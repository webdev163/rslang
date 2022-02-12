import * as React from 'react';
import Button from '@mui/material/Button';
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

import styles from './LoginButton.module.scss';

interface LoginDialogProps {
  onClose: CallableFunction;
  open: boolean;
}

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
            <button type="button" onClick={handleSignIn} className={signUp ? styles.tab : styles.tab__selected}>
              Вход
            </button>
            <button type="button" onClick={handleSignUp} className={!signUp ? styles.tab : styles.tab__selected}>
              Регистрация
            </button>
          </div>
          {signUp ? <RegistrationForm onDone={handleClose} /> : <LoginForm onDone={handleClose} />}
        </div>
      </div>
    </Dialog>
  );
};

const LoginButton = () => {
  const auth = useTypedSelector(state => state.auth);
  const isAuthorized = auth.isAuthorized;
  const { SignOutAction } = useActions();
  const handleSignOut = useCallback(() => {
    SignOutAction();
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {isAuthorized ? (
        <Button variant="outlined" onClick={handleSignOut}>
          <LogoutIcon /> Выйти
        </Button>
      ) : (
        <Button variant="outlined" onClick={handleClickOpen}>
          <LoginIcon /> Войти
        </Button>
      )}
      <LoginDialog open={open} onClose={handleClose} />
    </div>
  );
};

const LoginListItem = () => {
  const auth = useTypedSelector(state => state.auth);
  const isAuthorized = auth.isAuthorized;
  const { SignOutAction } = useActions();
  const handleSignOut = useCallback(() => {
    SignOutAction();
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

export { LoginButton, LoginListItem };
