import React from 'react';
import type { AuthUserData } from '../apis/firebase/authTypes';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

interface Props {
  user: AuthUserData | null;
}

const Navigator = ({ user }: Props) => {

  // return user ? <AppNavigator /> : <AuthNavigator />;
  return user ? <AppNavigator /> : <AuthNavigator />;

};

export default Navigator;
