import React, { FC, useState, useEffect } from 'react';

import styles from './GameSprintTimer.module.scss';

interface ITimer {
  initialTime?: number;
  onEnd: () => void;
  onClick: () => void;
  isPaused: boolean;
}

const GameSprintTimer: FC<ITimer> = ({ initialTime = 60, onEnd, onClick, isPaused }) => {
  const [count, setCount] = useState(initialTime);

  useEffect(() => {
    if (!isPaused) {
      let timer: ReturnType<typeof setTimeout>;
      if (count > 0) {
        timer = setTimeout(() => setCount(prev => prev - 1), 1000);
      } else {
        onEnd();
      }
      return () => {
        clearTimeout(timer);
      };
    }
  }, [count, isPaused]);

  return (
    <button className={styles.btn} onClick={onClick}>
      <span>{isPaused ? '||' : count}</span>
    </button>
  );
};

export default GameSprintTimer;
