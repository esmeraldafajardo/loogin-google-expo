import React from 'react';
import { StyleSheet, View, Dimensions, SafeAreaView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { VFC } from 'react';

import type { AuthRootStackParamList } from '../types';
import SignInWithGoogle from '../../components/auth/SignInWithGoogle';

type Props = NativeStackScreenProps<AuthRootStackParamList, 'Auth'>;

const AuthScreen: VFC<Props> = () => {

console.log('++++++++++++++++++++++++++++++++-------------', '--------------------');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.socialSignUp}>
        <SignInWithGoogle />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  socialSignUp: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: Dimensions.get('window').width * 0.8,
  },
});

export default AuthScreen;
