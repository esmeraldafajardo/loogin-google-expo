import type { StackNavigationProp } from '@react-navigation/stack';

export type AuthRootStackParamList = {
  Auth: undefined;
  SignUp: undefined;
  SignUpFinancial: undefined;
  SignInWithEmail: undefined;
  SignUpWithEmail: undefined;
  ForgotPassword: undefined;
};

export type AppRootStackParamList = {
  Welcome: undefined;
};

export type UseNavigationProp = StackNavigationProp<AppRootStackParamList>;
