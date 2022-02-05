import React, { FC } from 'react';
import { useActions } from '../../../hooks/useActions';

import styles from './DifficultyButtons.module.scss';

const DifficultyButtons: FC = () => {
  const { setWordsGroup } = useActions();
  return (
    <div>
      <button onClick={() => setWordsGroup(0)}>A1</button>
      <button onClick={() => setWordsGroup(1)}>A2</button>
      <button onClick={() => setWordsGroup(2)}>B1</button>
      <button onClick={() => setWordsGroup(3)}>B2</button>
      <button onClick={() => setWordsGroup(4)}>C1</button>
      <button onClick={() => setWordsGroup(5)}>C2</button>
    </div>
  );
};

export default DifficultyButtons;
