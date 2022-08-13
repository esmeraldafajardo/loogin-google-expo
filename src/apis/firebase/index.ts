import type { FirebaseApp } from 'firebase/app';
import { initializeApp } from 'firebase/app';
import AuthStorage from './auth';
import { getFirebaseConfig } from '../../config/firebase';
class FirebaseApi {
  private static firebaseApp: FirebaseApp | null = null;

  public static auth: AuthStorage;

  static init(): void {
    if (!FirebaseApi.firebaseApp) {
      FirebaseApi.firebaseApp = initializeApp(getFirebaseConfig());
    }
    FirebaseApi.auth = new AuthStorage(FirebaseApi.firebaseApp);
  }
}

export default FirebaseApi;
