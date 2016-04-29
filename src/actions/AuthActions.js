
export const HANDLE_AUTH_SUCCESS = 'HANDLE_AUTH_SUCCESS';
export function handleAuthSuccess (user) {
  return {
    type: HANDLE_AUTH_SUCCESS,
    payload: {
      user
    }
  }
}
