import type {
  Auth,
  AuthProvider,
  User,
  UserCredential,
  AuthCredential,
} from 'firebase/auth';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithCredential,
  sendPasswordResetEmail,
} from 'firebase/auth';

import type { AuthUserData } from './authTypes';
import BaseStorage from './base';

class AuthStorage extends BaseStorage {
  public async authenticate(): Promise<User> {
    if (this.firebaseApp === null) {
      throw new Error('firebase_not_initialized');
    }
    const auth = getAuth(this.firebaseApp);
    const creds = await signInAnonymously(auth);
    return creds.user;
  }

  public async signOut(): Promise<void> {
    return this.getAuth().signOut();
  }

  public onAuthStateChanged(
    callback: (user: AuthUserData | string) => void,
  ): void {
    this.getAuth().onAuthStateChanged(async (user): Promise<void> => {
      if (user) {
        if (user.email === null) {
          throw new Error('Authenticated user has no email.');
        }
        const role = await user.getIdTokenResult().then((IdTokenResult) => {
          return IdTokenResult.claims.role;
        });
        // FIXME: user.toJSON() returns all 4 of the fields, but TS does not recognize it.
        const authUserData: AuthUserData = {
          ...user.toJSON(),
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
          isAnonymous: user.isAnonymous,
          // @ts-expect-error: the user type does not export the token
          stsTokenManager: { accessToken: user.stsTokenManager.accessToken },
          role,
        };
        callback(authUserData);
      } else {
        callback('NO_USER');
      }
    });
  }

  public async signInWithPopup(
    provider: AuthProvider,
  ): Promise<UserCredential> {
    return signInWithPopup(this.getAuth(), provider);
  }

  public async signInWithCredential(
    credential: AuthCredential,
  ): Promise<UserCredential> {
    return signInWithCredential(this.getAuth(), credential);
  }

  public async signInWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.getAuth(), email, password);
  }

  public async createUserWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.getAuth(), email, password);
  }

  public async sendPasswordResetEmail(email: string): Promise<void> {
    return sendPasswordResetEmail(this.getAuth(), email);
  }

  private getAuth(): Auth {
    if (this.firebaseApp === null) {
      throw new Error('firebase_not_initialized');
    }
    return getAuth(this.firebaseApp);
  }
}

export default AuthStorage;
