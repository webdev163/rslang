import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

window.addEventListener('message', e => {
  if (e.data && typeof e.data === 'string' && e.data.match(/webpackHotUpdate/)) {
    // eslint-disable-next-line no-console
    console.clear();
  }
});
