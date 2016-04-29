
export const HANDLE_BEACON_UPDATES = 'HANDLE_BEACON_UPDATES';
export function handleBeaconUpdates (beacon) {
  return {
    type: HANDLE_BEACON_UPDATES,
    payload: {
      beacon
    }
  }
}

export const HANDLE_IS_MARKING_SPOT = 'HANDLE_IS_MARKING_SPOT';
export const HANDLE_STOP_MARKING_SPOT = 'HANDLE_STOP_MARKING_SPOT';
export const HANDLE_UPDATE_TIME_PENDING = 'HANDLE_UPDATE_TIME_PENDING';
export function initializeNormalizingSpot () {
  return (dispatch, getState) => {
    dispatch({
      type: HANDLE_IS_MARKING_SPOT
    });

    const c = setInterval(() => {
      console.log(getState().beacon);
      if (!getState().beacon.timePending) {
        clearInterval(c);
        return dispatch({
          type: HANDLE_STOP_MARKING_SPOT
        });
      }

      return dispatch({
        type: HANDLE_UPDATE_TIME_PENDING
      })
    }, 1000);
  }
}
