import * as ActionTypes from '../actions/BeaconActions';
const IMOJO_BEACON_UUID = '74278BDA-B644-4520-8F0C-720EAF059935';
const initialState = {
  props: {},
  region: {
    identifier: 'DAFLABS',
    uuid: IMOJO_BEACON_UUID,
    major: 4660,
    minor: 64001
  }
};

export function beacon (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.HANDLE_BEACON_UPDATES: {
      const { beacon } = action.payload;
      const beaconProps = beacon.beacons[0];
      //    .uuid
      //    .major - The major version of a beacon
      //    .minor - The minor version of a beacon
      //    .rssi - Signal strength: RSSI value (between -100 and 0)
      //    .proximity - Proximity value, can either be "unknown", "far", "near" or "immediate"
      //    .accuracy - The accuracy of a beacon

      return {
        ...state,
        props: beaconProps
      }
    }

    default: {
      return state;
    }
  }
}
