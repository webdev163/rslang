import React, { FC, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useActions } from '../../../hooks/useActions';

import styles from './SelectDifficulty.module.scss';

const SelectDifficulty: FC = () => {
  const { setWordsGroup } = useActions();
  const [selectValue, setSelectValue] = useState('0');

  const handleChange = (event: SelectChangeEvent) => {
    const selected = event.target.value;
    setSelectValue(selected);
    setWordsGroup(+selected);
  };

  return (
    <div>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel sx={{ fontSize: 18 }}>Сложность</InputLabel>
        <Select value={selectValue} onChange={handleChange} sx={{ fontSize: 20 }}>
          <MenuItem value={0} sx={{ fontSize: 20 }}>
            Уровень 1 (A1)
          </MenuItem>
          <MenuItem value={1} sx={{ fontSize: 20 }}>
            Уровень 2 (A2)
          </MenuItem>
          <MenuItem value={2} sx={{ fontSize: 20 }}>
            Уровень 3 (B1)
          </MenuItem>
          <MenuItem value={3} sx={{ fontSize: 20 }}>
            Уровень 4 (B2)
          </MenuItem>
          <MenuItem value={4} sx={{ fontSize: 20 }}>
            Уровень 5 (C1)
          </MenuItem>
          <MenuItem value={5} sx={{ fontSize: 20 }}>
            Уровень 6 (C2)
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectDifficulty;
