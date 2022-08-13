import type { AuthUserData } from '../../apis/firebase/authTypes';
import type { LoadError } from '../../apis/firebase/types';
import type { LoadStates } from '../types';
import type { RootState } from '..';

export const getUser = (state: RootState): AuthUserData | null =>
  state.auth.user;

export const getUserId = (state: RootState): string =>
  state.auth.user?.uid ?? '';

export const getAuthIsSigningOut = (state: RootState): boolean =>
  state.auth.isSigningOut;

export const getRemoveAccount = (state: RootState): boolean =>
  state.auth.isRemovingAccount;

export const getremoveAccountState = (state: RootState): LoadStates =>
  state.auth.removeAccountState;

export const getAuthenticationState = (state: RootState): LoadStates =>
  state.auth.authenticationState;

export const getAuthError = (state: RootState): LoadError | null =>
  state.auth.error;

export const getAuthenticationwithEmailState = (state: RootState): LoadStates =>
  state.auth.authenticationwithEmailState;

export const getForgotPasswordState = (state: RootState): LoadStates =>
  state.auth.forgotPasswordState;

export const getForgotPasswordError = (state: RootState): LoadError | null =>
  state.auth.forgotPasswordError;
