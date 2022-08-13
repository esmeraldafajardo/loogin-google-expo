import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import * as expoSplashScreen from 'expo-splash-screen';
import { getAuthenticationState, getUser } from '../store/selectors/auth';
import Navigator from './Navigator';

expoSplashScreen.preventAutoHideAsync();
const MainNavigator = () => {
  const user = useSelector(getUser);
  const authState = useSelector(getAuthenticationState);

  return (
    <NavigationContainer>
        <View style={{ flex: 1, backgroundColor: 'red' }}>
          <Navigator user={user} />
        </View>
    </NavigationContainer>
  );
};
export default MainNavigator;
