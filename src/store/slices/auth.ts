import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAction } from '@reduxjs/toolkit';
import type {
  AuthStart,
  AuthUserData,
  CreateUserData,
} from '../../apis/firebase/authTypes';

import type { LoadError } from '../../apis/firebase/types';
import { LoadStates } from '../types';

interface AuthState {
  readonly user: AuthUserData | null;
  readonly error: LoadError | null;
  readonly authenticationState: LoadStates;
  readonly isSigningOut: boolean;
  readonly isRemovingAccount: boolean;
  readonly authenticationwithEmailState: LoadStates;
  readonly forgotPasswordState: LoadStates;
  readonly forgotPasswordError: LoadError | null;
  readonly removeAccountState: LoadStates;
}

const initialState: AuthState = {
  user: null,
  error: null,
  authenticationState: LoadStates.NOT_LOADED,
  authenticationwithEmailState: LoadStates.NOT_LOADED,
  isSigningOut: false,
  isRemovingAccount: false,
  forgotPasswordState: LoadStates.NOT_LOADED,
  removeAccountState: LoadStates.NOT_LOADED,
  forgotPasswordError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser(state, action: PayloadAction<AuthUserData | null>) {
      state.user = action.payload;
      state.authenticationState = action.payload
        ? LoadStates.LOADED_SUCCESS
        : LoadStates.LOADED_FAIL;
    },
    createUser(state, _action: PayloadAction<CreateUserData>) {
      state.isSigningOut = false;
      state.user = null;
      state.error = null;
      state.authenticationwithEmailState = LoadStates.LOADING;
    },
    createUserSuccess(state) {
      // success does not set the user because there is a saga watching auth
      // state changes
      state.error = null;
      state.authenticationState = LoadStates.LOADED_SUCCESS;
    },
    createUserError(state, action: PayloadAction<LoadError>) {
      state.user = null;
      state.error = action.payload;
      state.authenticationState = LoadStates.LOADED_FAIL;
    },
    authenticate(state, action: PayloadAction<AuthStart>) {
      state.isSigningOut = false;
      state.user = null;
      state.error = null;
      if (action.payload.provider === 'EMAIL')
        state.authenticationwithEmailState = LoadStates.LOADING;
      else state.authenticationState = LoadStates.LOADING;
    },
    authenticateSuccess(state) {
      // success does not set the user because there is a saga watching auth
      // state changes
      state.error = null;
      state.authenticationState = LoadStates.LOADED_SUCCESS;
    },
    authenticateError(state, action: PayloadAction<LoadError>) {
      state.user = null;
      state.error = action.payload;
      state.authenticationState = LoadStates.LOADED_FAIL;
    },
    authenticateSignOut(state) {
      state.isSigningOut = true;
      state.user = null;
      state.error = null;
      state.authenticationState = LoadStates.NOT_LOADED;
    },
    authenticateWithEmailError(state, action: PayloadAction<LoadError>) {
      state.user = null;
      state.error = action.payload;
      state.authenticationwithEmailState = LoadStates.LOADED_FAIL;
    },
    authenticateWithEmailSuccess(state) {
      state.error = null;
      state.authenticationwithEmailState = LoadStates.LOADED_SUCCESS;
    },
    forgotPassword(state, _action: PayloadAction<string>) {
      state.forgotPasswordState = LoadStates.LOADING;
      state.forgotPasswordError = null;
    },
    forgotPasswordSuccess(state) {
      state.forgotPasswordError = null;
      state.forgotPasswordState = LoadStates.LOADED_SUCCESS;
    },
    forgotPasswordError(state, action: PayloadAction<LoadError>) {
      state.forgotPasswordError = action.payload;
      state.forgotPasswordState = LoadStates.LOADED_FAIL;
    },
    resetForgotPasswordState(state) {
      state.forgotPasswordState = LoadStates.NOT_LOADED;
    },
    authenticateDeleteAccount(state) {
      state.isRemovingAccount = true;
      state.removeAccountState = LoadStates.LOADED_SUCCESS;
    },
    authenticateDeleteAccountError(state) {
      state.removeAccountState = LoadStates.LOADED_FAIL;
      state.isRemovingAccount = false;
    },
    authenticateDeleteAccountLoading(state) {
      state.removeAccountState = LoadStates.LOADING;
      state.isRemovingAccount = false;
    },
    authenticateDeactivateAccount(state) {
      state.isRemovingAccount = true;
      state.removeAccountState = LoadStates.LOADED_SUCCESS;
    },
    authenticateDeactivateAccountError(state) {
      state.removeAccountState = LoadStates.LOADED_FAIL;
      state.isRemovingAccount = false;
    },
    authenticateDeactivateAccountLoading(state) {
      state.removeAccountState = LoadStates.LOADING;
      state.isRemovingAccount = false;
    },
  },
});

export const triggerAuthtenticatedWatchers = createAction(
  'auth/triggerAuthtenticatedWatchers',
);

export const {
  setAuthUser,
  createUser,
  createUserSuccess,
  createUserError,
  authenticate,
  authenticateSuccess,
  authenticateError,
  authenticateSignOut,
  authenticateWithEmailError,
  authenticateWithEmailSuccess,
  forgotPassword,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetForgotPasswordState,
  authenticateDeleteAccount,
  authenticateDeleteAccountError,
  authenticateDeleteAccountLoading,
  authenticateDeactivateAccount,
  authenticateDeactivateAccountError,
  authenticateDeactivateAccountLoading,
} = authSlice.actions;

export default authSlice.reducer;
