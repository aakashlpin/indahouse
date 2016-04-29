
export const HANDLE_BEACON_UPDATES = 'HANDLE_BEACON_UPDATES';
export function handleBeaconUpdates (beacon) {
  return {
    type: HANDLE_BEACON_UPDATES,
    payload: {
      beacon
    }
  }
}
