import React, { FC, useState, useEffect } from 'react';

interface ITimer {
  initialTime?: number;
  onEnd: () => void;
}

const GameSprintTimer: FC<ITimer> = ({ initialTime = 60, onEnd }) => {
  const [count, setCount] = useState(initialTime);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (count > 0) {
      timer = setTimeout(() => setCount(prev => prev - 1), 1000);
    } else {
      onEnd();
    }
    return () => {
      clearTimeout(timer);
    };
  }, [count]);

  return <div>{count}</div>;
};

export default GameSprintTimer;
