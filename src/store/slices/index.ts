import type { AnyAction } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import auth from './auth';

const rootReducer = combineReducers({
  auth,
});

const createRootReducer = (
  state: ReturnType<typeof rootReducer> | undefined,
  action: AnyAction,
) => {
  if (action.type === 'auth/authenticateSignOut') {
    // Reducers return the initial state when they are called with undefined as the first argument, no matter the action.
    // This is a workaround to the reducer from returning the initial state when the user signs out.
    // https://redux.js.org/usage/structuring-reducers/initializing-state
    return rootReducer(undefined, { type: undefined });
  }

  return rootReducer(state, action);
};

export default createRootReducer;
