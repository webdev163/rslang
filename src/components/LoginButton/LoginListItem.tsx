import * as React from 'react';
import { FC, useCallback } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router';
import LoginDialog from './LoginDialog';
import { LoginListItemProps } from './types';

const LoginListItem: FC<LoginListItemProps> = ({ withText }) => {
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
        {withText && <ListItemText primary={!isAuthorized ? 'Войти' : 'Выйти'} />}
      </ListItem>
      <LoginDialog open={open} onClose={handleClose} />
    </>
  );
};

export default LoginListItem;
