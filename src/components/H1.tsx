import React, { ReactNode } from 'react';
import { Text } from 'react-native';
import { TEXT } from '../theme/tokens';

type Props = { children: ReactNode };

export function H1({ children }: Props) {
  return <Text style={{ color: TEXT, fontSize: 28, fontWeight: '800', marginBottom: 16 }}>{children}</Text>;
}
