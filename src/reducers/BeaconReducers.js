import * as ActionTypes from '../actions/BeaconActions';
const IMOJO_BEACON_UUID = '74278BDA-B644-4520-8F0C-720EAF059935';
const initialState = {
  props: {},
  region: {
    identifier: 'DAFLABS',
    uuid: IMOJO_BEACON_UUID,
    major: 4660,
    minor: 64001
  },
  isSpotMarked: false,
  isMarkingRegion: false,
  timePending: 30,
  accuracies: [],
  spotAccuracy: null,
  isUserHappyWithSpot: false,
  isNotifiedPublicly: false
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

      let reduceTo = {
        ...state,
        props: beaconProps
      };

      if (state.isMarkingRegion) {
        // consider all these updates for marking the position of user
        console.log(beaconProps.accuracy);
        reduceTo = {
          ...reduceTo,
          accuracies: [...state.accuracies, beaconProps.accuracy]
        }
      }

      return reduceTo;
    }

    case ActionTypes.HANDLE_IS_MARKING_SPOT: {
      return {
        ...state,
        isMarkingRegion: true
      }
    }

    case ActionTypes.HANDLE_STOP_MARKING_SPOT: {
      const { accuracies } = state;

      const legitAccuracies = accuracies.filter(accuracy => accuracy > 0);
      let sum = 0;
      for (let i = 0; i < legitAccuracies.length; i++) {
        sum += legitAccuracies[i];
      }

      const spotAccuracy = Math.floor(sum / legitAccuracies.length);

      return {
        ...state,
        isMarkingRegion: false,
        isSpotMarked: true,
        timePending: 30,
        spotAccuracy,
      };
    }

    case ActionTypes.HANDLE_UPDATE_TIME_PENDING: {
      return {
        ...state,
        timePending: state.timePending - 1
      }
    }

    case ActionTypes.HANDLE_USER_HAPPY_WITH_SPOT: {
      return {
        ...state,
        isUserHappyWithSpot: true
      }
    }

    case ActionTypes.HANDLE_MARK_NOTIFIED_PUBLICLY: {
      return {
        ...state,
        isNotifiedPublicly: true
      }
    }

    default: {
      // TODO mark the isSpotMarked by checking in the db
      return state;
    }
  }
}
