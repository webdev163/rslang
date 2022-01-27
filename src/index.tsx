import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { store } from './store';

import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

window.addEventListener('message', e => {
  if (e.data && typeof e.data === 'string' && e.data.match(/webpackHotUpdate/)) {
    // eslint-disable-next-line no-console
    console.clear();
  }
});
