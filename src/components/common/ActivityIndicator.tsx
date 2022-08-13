import React from 'react';
import type { ActivityIndicatorProps } from 'react-native';
import { ActivityIndicator as OriginalActivityIndicator } from 'react-native';

type Props = Omit<ActivityIndicatorProps, 'color'> & {
  color?: '#483A99';
};

const ActivityIndicator: React.VFC<Props> = ({
  size,
  color = '#483A99',
  style,
  animating,
  hidesWhenStopped,
}) => {
  return (
    <OriginalActivityIndicator
      style={style}
      size={size}
      color={color}
      animating={animating}
      hidesWhenStopped={hidesWhenStopped}
    />
  );
};

export default ActivityIndicator;
