import React, { FC, useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useActions } from '../../../hooks/useActions';
import { useNavigate, useParams } from 'react-router-dom';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

import styles from './SelectPage.module.scss';

const SelectPage: FC = () => {
  const { setGuidePage } = useActions();
  const [selectValue, setSelectValue] = useState('0');
  const { group } = useTypedSelector(state => state.guide);
  const { page } = useParams();

  useEffect(() => {
    if (page) {
      setSelectValue(page);
    }
  }, [page]);

  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent) => {
    const selected = event.target.value;
    setSelectValue(selected);
    setGuidePage(+selected);
    navigate(`/guide/group${group}/page${selected}`);
  };

  const menuItemsArr = [...Array(30).keys()];
  const renderMenuItems = menuItemsArr.map(el => (
    <MenuItem key={el} value={el} sx={{ fontSize: 20 }}>
      Страница {el + 1}
    </MenuItem>
  ));

  return (
    <div>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 185 }}>
        <InputLabel sx={{ fontSize: 18 }}>Страница</InputLabel>
        <Select
          value={selectValue}
          onChange={handleChange}
          sx={{ fontSize: 20 }}
          MenuProps={{
            style: {
              maxHeight: 500,
            },
          }}
        >
          {renderMenuItems}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectPage;
