import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Title } from 'react-native-paper';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { VFC } from 'react';
import type { AppRootStackParamList } from '../types';
import FONTS from '../../styles/fonts';

type Props = NativeStackScreenProps<AppRootStackParamList, 'Welcome'>;

const WalletScreen: VFC<Props> = ({ navigation, route: { params } }) => {
  return (
    <>
      <View style={[styles.container]}>
        <View style={styles.title}>
          <Title style={styles.fontTitle}>Welcome --------------------------</Title>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 6,
  },
  title: {
    marginVertical: 14,
    alignItems: 'center',
  },

  fontTitle: {
    fontSize: 24,
    fontFamily: FONTS.MontserratBold,
  },
});

export default WalletScreen;
