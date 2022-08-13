import type { FirebaseOptions } from "firebase/app";

export const FIREBASE_CONFIG_DEV: FirebaseOptions = {
  apiKey: "AIzaSyBrl8PgmTt_wMTUVn09p6SKA2PJQcqTKZw",
  authDomain: "lingocards-356204.firebaseapp.com",
  projectId: "lingocards-356204",
  storageBucket: "lingocards-356204.appspot.com",
  messagingSenderId: "554160733577",
  appId: "1:554160733577:web:58eed46b1e3638cdf6b558",
  measurementId: "G-658CNXFBYP",
};

export const getFirebaseConfig = (): FirebaseOptions => {
  // eslint-disable-next-line no-console
  console.warn("Running without ENV. Using development");
  return FIREBASE_CONFIG_DEV;
};
