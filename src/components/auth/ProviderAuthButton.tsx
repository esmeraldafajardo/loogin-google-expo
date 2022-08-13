import React from 'react';
import type { VFC } from 'react';
import { Text, Pressable, StyleSheet, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

import FONTS from '../../styles/fonts';

interface Props {
  onPress: () => void;
  text: string;
  disabled?: boolean;
  icon?: JSX.Element;
  style?: StyleProp<ViewStyle>;
}

const ProviderAuthButton: VFC<Props> = ({
  text,
  onPress,
  disabled = false,
  icon = null,
  style,
}) => {
  return (
    <Pressable
      style={[styles.container, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <View
        style={{
          justifyContent: 'space-around',
        }}
      >
        {icon}
      </View>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 46,
    shadowOffset: { width: 3, height: 9 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    borderRadius: 15,
    flexDirection: 'row',
    alignContent: 'center',
    paddingRight: 8,
    width: '80%',
    paddingVertical: 1,
    justifyContent: 'center',
  },
  text: {
    fontFamily: FONTS.RobotoMedium,
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 14,
    marginLeft: 8,
  },
});

export default ProviderAuthButton;
