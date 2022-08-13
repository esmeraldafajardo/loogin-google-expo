import type { Firestore } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import type { FirebaseStorage } from 'firebase/storage';
import type { FirebaseApp } from 'firebase/app';
class BaseStorage {
  protected firebaseApp: FirebaseApp;

  protected db: Firestore;

  protected storage: FirebaseStorage;

  public constructor(app: FirebaseApp) {
    this.firebaseApp = app;

    this.db = getFirestore(app);
    this.storage = getStorage(app);
  }
}

export default BaseStorage;
