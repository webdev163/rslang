import React, { FC } from 'react';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { DifficultyDialogProps } from './types';

const DifficultyDialog: FC<DifficultyDialogProps> = ({ open, onSelect }) => (
  <Dialog open={open}>
    <DialogTitle>Выберите сложность</DialogTitle>
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
  </Dialog>
);
export default DifficultyDialog;
