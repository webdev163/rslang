import AppFrame from './components/AppFrame';
import React, { FC, useEffect } from 'react';
import { useActions } from './hooks/useActions';

import './style/style.scss';

const App: FC = () => {
  const { TryAuthAction } = useActions();
  useEffect(() => {
    TryAuthAction();
  }, []);

  return (
    <div className="app">
      <AppFrame />
    </div>
  );
};

export default App;
