import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ConfigStore from '../store/ConfigStore';
import App from './App';
const store = ConfigStore();

export default class Container extends Component {
  render () {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
