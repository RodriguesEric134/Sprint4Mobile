import React, { ReactNode } from 'react';
import { Text } from 'react-native';
import { MUTED } from '../theme/tokens';

type Props = { children: ReactNode };

export function Label({ children }: Props) {
  return <Text style={{ color: MUTED, fontSize: 12, marginBottom: 6 }}>{children}</Text>;
}
