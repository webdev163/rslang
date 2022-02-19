import React, { FC } from 'react';
import { DifficultyDialogProps } from './types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import styles from './DifficultyDialog.module.scss';

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

const DifficultyDialog: FC<DifficultyDialogProps> = ({ open, onSelect }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/games');
  };

  return (
    <div>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Выберите сложность
        </BootstrapDialogTitle>
        <DialogContent>
          {[...Array(6).keys()].map(item => (
            <Button
              key={item}
              onClick={() => {
                onSelect(item);
              }}
            >
              {item + 1}
            </Button>
          ))}
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default DifficultyDialog;
