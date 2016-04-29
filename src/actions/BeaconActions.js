
export const HANDLE_BEACON_UPDATES = 'HANDLE_BEACON_UPDATES';
export const HANDLE_MARK_NOTIFIED_PUBLICLY = 'HANDLE_MARK_NOTIFIED_PUBLICLY';
export function handleBeaconUpdates (beacon) {
  return (dispatch, getState) => {
    dispatch({
      type: HANDLE_BEACON_UPDATES,
      payload: {
        beacon
      }
    });

    if (!getState().beacon.isNotifiedPublicly) {
      fetch('https://hooks.slack.com/services/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', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          channel: '#in-da-house',
          text: `${getState().auth.user.name} is in the house 🎉`,
        })
      });

      dispatch({
        type: HANDLE_MARK_NOTIFIED_PUBLICLY
      })
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

export const HANDLE_USER_HAPPY_WITH_SPOT = 'HANDLE_USER_HAPPY_WITH_SPOT';
export function markUserHappyWithSpot () {
  return {
    type: HANDLE_USER_HAPPY_WITH_SPOT
  }
}
