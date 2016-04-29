import * as ActionTypes from '../actions/AuthActions';

const initialState = {
  user: null
};

export function auth (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.HANDLE_AUTH_SUCCESS: {
      const { user } = action.payload;
      return {
        ...state,
        user
      }
    }

    default: {
      return initialState;
    }
  }
}
