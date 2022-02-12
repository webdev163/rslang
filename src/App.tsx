import React, { FC } from 'react';
import AppFrame from './components/AppFrame';

import './style/style.scss';

const App: FC = () => {
  return (
    <div className="app">
      <AppFrame />
    </div>
  );
};

export default App;
