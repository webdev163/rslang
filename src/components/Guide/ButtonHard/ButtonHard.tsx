import React, { FC, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const ButtonHard: FC = () => {
  return (
    <Button component={Link} to="/guide/hard/" variant="contained" sx={{ fontSize: 20, marginLeft: 1 }}>
      Сложные слова
    </Button>
  );
};

export default ButtonHard;
