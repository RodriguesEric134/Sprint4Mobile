import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { CARD } from '../theme/tokens';

type Props = {
  children: ReactNode;
  style?: object;
};

export function Card({ children, style }: Props) {
  return (
    <View
      style={[
        {
          backgroundColor: CARD,
          borderRadius: 18,
          padding: 16,
          borderWidth: 1,
          borderColor: '#2a2a2f',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
