import React, { FC } from 'react';
import { ResultsDialogProps } from './types';
import { WordResponse } from '../../types/requests';
import { playSound } from '../../utils/utils';
import { useTypedSelector } from './../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

import styles from './ResultsDialog.module.scss';

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const ResultsDialog: FC<ResultsDialogProps> = ({ showResult }) => {
  const { score, rightAnswersArr, wrongAnswersArr } = useTypedSelector(state => state.audio);
  const { resetAudioState } = useActions();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    resetAudioState();
    navigate('/games');
  };

  const generateResults = () => {
    const resultsRight = rightAnswersArr.map((word: WordResponse) => {
      return (
        <div key={word.id} className={styles.resultsItem}>
          <button className={styles.btnSound} onClick={() => playSound(word.audio, null, null)}></button>
          <p>
            <b>{word.word}</b> - {word.wordTranslate}
          </p>
        </div>
      );
    });
    const resultsWrong = wrongAnswersArr.map((word: WordResponse) => {
      return (
        <div key={word.id} className={styles.resultsItem}>
          <button className={styles.btnSound} onClick={() => playSound(word.audio, null, null)}></button>
          <p>
            <b>{word.word}</b> - {word.wordTranslate}
          </p>
        </div>
      );
    });

    return (
      <div>
        <p className={styles.resultsSubtitle}>Правильные ответы ({resultsRight.length ? resultsRight.length : 0}):</p>
        <div>{resultsRight}</div>
        <p className={styles.resultsSubtitle}>Неправильные ответы ({resultsWrong.length ? resultsWrong.length : 0}):</p>
        <div>{resultsWrong}</div>
      </div>
    );
  };

  if (!showResult) return <div></div>;

  return (
    <div>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Результаты игры
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className={styles.resultsWrapper}>
            <p style={{ fontSize: 18 }}>
              <b>Результат</b>: {score} баллов
            </p>
            {generateResults()}
          </div>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default ResultsDialog;
