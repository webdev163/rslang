import React, { FC, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { Link, useParams } from 'react-router-dom';
import { RouterParams } from '../../../types/types';

import styles from './SelectGame.module.scss';

const SelectGame: FC = () => {
  const { group, page } = useParams<keyof RouterParams>();
  const { doneCounter } = useTypedSelector(state => state.guide);
  const { isAuthorized } = useTypedSelector(state => state.auth);
  const [isDisabled, setDisabled] = useState(false);

  useEffect(() => {
    if (isAuthorized && doneCounter > 19) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [doneCounter]);

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {popupState => (
        <React.Fragment>
          <Button
            variant="contained"
            {...bindTrigger(popupState)}
            sx={{ fontSize: 20, marginLeft: 'auto' }}
            disabled={isDisabled}
          >
            Мини-игры
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close} sx={{ fontSize: 20 }}>
              <Link
                to="/games/audio/"
                state={{
                  from: {
                    group: group || '0',
                    page: page || '0',
                  },
                }}
                className={styles.link}
              >
                Игра &quot;Аудиовызов&quot;
              </Link>
            </MenuItem>
            <MenuItem onClick={popupState.close} sx={{ fontSize: 20 }}>
              <Link
                to="/games/sprint/"
                state={{
                  from: {
                    group: group || '0',
                    page: page || '0',
                  },
                }}
                className={styles.link}
              >
                Игра &quot;Спринт&quot;
              </Link>
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
};

export default SelectGame;
