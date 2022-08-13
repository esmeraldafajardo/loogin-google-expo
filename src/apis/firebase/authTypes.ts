import type { AuthCredential } from 'firebase/auth';

export type AuthStart =
  | {
      provider: 'GOOGLE' | 'FACEBOOK';
      id_token?: string;
    }

export interface CreateUserData {
  fullName: string;
  email: string;
  password: string;
}

interface ProviderData {
  providerId: string;
}

export interface AuthUserData {
  uid: string;
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any;
  token?: string;
  displayName: string | null;
  photoURL?: string;
  email: string;
  isAnonymous: boolean;
  lastLoginAt?: string;
  providerData?: ProviderData[];
  stsTokenManager: {
    accessToken: string;
  };
  role?: string | object;
}
