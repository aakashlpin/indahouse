import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index';

import {
  AsyncStorage
} from 'react-native';

const asyncStorageMiddleware = (store) => {
  return next => action => {
    AsyncStorage.setItem('appState', JSON.stringify(store.getState()));
    return next(action);
  }
}

const createStoreWithMiddleware = compose(
  applyMiddleware(thunkMiddleware, asyncStorageMiddleware)
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
