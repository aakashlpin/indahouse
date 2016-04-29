import { combineReducers } from 'redux';
import { auth } from './AuthReducers';

const rootReducer = combineReducers({
  auth
});

export default rootReducer;
