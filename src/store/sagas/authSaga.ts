import type { CallEffect, PutEffect, TakeEffect } from 'redux-saga/effects';
import { all, call, fork, put, take, takeEvery } from 'redux-saga/effects';
import { GoogleAuthProvider, updateProfile } from 'firebase/auth';
import type { EventChannel } from 'redux-saga';
import type { UserCredential, AuthCredential } from 'firebase/auth';
import { eventChannel } from 'redux-saga';

import type { PayloadAction } from '@reduxjs/toolkit';
import {
  authenticate,
  authenticateError,
  authenticateSignOut,
  authenticateSuccess,
  authenticateWithEmailError,
  authenticateWithEmailSuccess,
  createUser,
  forgotPassword,
  forgotPasswordError,
  forgotPasswordSuccess,
  setAuthUser,
  triggerAuthtenticatedWatchers,
} from '../slices/auth';

import type { AuthUserData } from '../../apis/firebase/authTypes';
import { ERROR_CODE_NO_CREDENTIALS } from '../../apis/firebase/constants';
import FirebaseApi from '../../apis/firebase';

function* createUserSaga(
  action: ReturnType<typeof createUser>,
): Generator<CallEffect | PutEffect, void, unknown> {
  FirebaseApi.init();
  const { fullName, email, password } = action.payload;

  try {
    const result = (yield call(() =>
      FirebaseApi.auth.createUserWithEmailAndPassword(email, password),
    )) as UserCredential;
    yield call(updateProfile, result.user, { displayName: fullName });

    // The displayName updateProfile call does not re-call onAuthStateChanged and causes displayName to be undefined.
    if (result.user.email === null) {
      throw new Error('Authenticated user has no email.');
    }
    const authUserData: AuthUserData = {
      ...result.user.toJSON(),
      displayName: result.user.displayName,
      uid: result.user.uid,
      email: result.user.email,
      isAnonymous: result.user.isAnonymous,
      // @ts-expect-error: the user type does not export the token
      stsTokenManager: { accessToken: result.user.stsTokenManager.accessToken },
    };
    yield put(setAuthUser(authUserData));
    if (fullName)
      yield call(() =>
        FirebaseApi.profile.updateDisplayName(fullName, result.user.uid),
      );
    yield put(authenticateWithEmailSuccess());
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    yield put(authenticateWithEmailError({ errorCode, errorMessage }));
  }
}

function* authenticateWithEmailSaga(
  email: string,
  password: string, // TODO: Fix this the next time the file is edited.
): // eslint-disable-next-line @typescript-eslint/no-explicit-any
Generator<CallEffect | PutEffect, void, any> {
  FirebaseApi.init();

  try {
    yield call(() =>
      FirebaseApi.auth.signInWithEmailAndPassword(email, password),
    );

    yield put(authenticateWithEmailSuccess());
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    yield put(authenticateWithEmailError({ errorCode, errorMessage }));
  }
}

function* authenticateWithGoogleSaga(idToken?: string): Generator<
  CallEffect | PutEffect,
  void,
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
> {
  FirebaseApi.init();
  const credential = GoogleAuthProvider.credential(idToken);
  try {
    yield call(() => FirebaseApi.auth.signInWithCredential(credential));

    if (!credential) {
      yield put(
        authenticateError({
          errorCode: ERROR_CODE_NO_CREDENTIALS,
          errorMessage: 'no_credentials',
        }),
      );
    } else {
      yield put(authenticateSuccess());
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    yield put(authenticateError({ errorCode, errorMessage }));
  }
}

function* authenticateWithAppleSaga(credential?: AuthCredential): Generator<
  CallEffect | PutEffect,
  void,
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
> {
  FirebaseApi.init();

  try {
    if (credential) {
      yield call(() => FirebaseApi.auth.signInWithCredential(credential));
    }

    if (!credential) {
      yield put(
        authenticateError({
          errorCode: ERROR_CODE_NO_CREDENTIALS,
          errorMessage: 'no_credentials',
        }),
      );
    } else {
      yield put(authenticateSuccess());
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    yield put(authenticateError({ errorCode, errorMessage }));
  }
}

function* authenticateSaga(
  action: ReturnType<typeof authenticate>,
): Generator<CallEffect<void>, void, void> {
  if (action.payload.provider === 'EMAIL') {
    const { email, password } = action.payload;
    yield call(authenticateWithEmailSaga, email, password);
  } else if (action.payload.provider === 'GOOGLE') {
    yield call(authenticateWithGoogleSaga, action.payload.id_token);
  } else if (action.payload.provider === 'APPLE') {
    yield call(authenticateWithAppleSaga, action.payload.credential);
  } else {
    throw new Error(
      `Invalid state. This code should be unreachable. Provider was '${action.payload.provider}'`,
    );
  }
}

function* signOutSaga(): Generator {
  FirebaseApi.init();
  yield call(() => FirebaseApi.auth.signOut());
}

function authWatcherChannel(): EventChannel<AuthUserData | string> {
  return eventChannel((emitter) => {
    FirebaseApi.init();
    FirebaseApi.auth.onAuthStateChanged(emitter);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return (): void => {};
  });
}

function* forgotPasswordSaga({
  payload: email,
}: PayloadAction<string>): Generator<
  CallEffect | TakeEffect | PutEffect,
  void,
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
> {
  try {
    yield call(() => FirebaseApi.auth.sendPasswordResetEmail(email));
    yield put(forgotPasswordSuccess());
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    yield put(forgotPasswordError({ errorCode, errorMessage }));
  }
}

function* watchAuthSaga(): Generator<
  CallEffect | TakeEffect | PutEffect,
  void,
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
> {
  const chan = yield call(authWatcherChannel);
  try {
    while (true) {
      const user: AuthUserData | string = yield take(chan);
      if (typeof user === 'string') {
        yield put(setAuthUser(null));
      } else {
        yield put(setAuthUser(user));
        yield put(triggerAuthtenticatedWatchers());
        if (user.displayName) {
          yield call(() =>
            FirebaseApi.profile.updateDisplayName(user.displayName, user.uid),
          );
        }
      }
    }
  } finally {
    // eslint-disable-next-line no-console
    console.log('watcher terminated');
  }
}

function* authSaga(): Generator {
  yield all([
    takeEvery(createUser, createUserSaga),
    takeEvery(authenticate, authenticateSaga),
    takeEvery(authenticateSignOut, signOutSaga),
    takeEvery(forgotPassword, forgotPasswordSaga),
    fork(watchAuthSaga),
  ]);
}

export default authSaga;
