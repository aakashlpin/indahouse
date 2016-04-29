import { combineReducers } from 'redux';
import { auth } from './AuthReducers';
import { beacon } from './BeaconReducers';

const rootReducer = combineReducers({
  auth,
  beacon
});

export default rootReducer;
