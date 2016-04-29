import { combineReducers } from 'redux';
import { auth } from './AuthReducers';
import { beacon } from './BeaconReducers';
import { dashboard } from './DashboardReducers';

const rootReducer = combineReducers({
  auth,
  beacon,
  dashboard
});

export default rootReducer;
