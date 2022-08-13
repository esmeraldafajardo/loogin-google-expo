import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AppRootStackParamList } from './types';
import WalletScreen from './returns/WalletScreen';



const Stack = createNativeStackNavigator<AppRootStackParamList>();

const MainNavigator = () => {


  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={WalletScreen}
        options={{
          headerStyle: {
            backgroundColor: 'white',
          },
          contentStyle: {
            backgroundColor: 'white',
          },
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
