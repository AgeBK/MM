import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './js/store/index';
import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss';
import './sass/global.scss';
import App from './components/App/App.jsx';
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
