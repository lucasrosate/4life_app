import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './app/store/store';
import { createStore, applyMiddleware, Store } from 'redux';
import { Provider } from 'react-redux';


ReactDOM.render(
  <div>
    <Provider store={store}>
      <App />
    </Provider>
  </div>,

  document.getElementById('root')
);
