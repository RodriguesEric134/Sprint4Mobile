import React from 'react';
import { TouchableOpacity, Text, GestureResponderEvent } from 'react-native';
import { BRAND, TEXT } from '../theme/tokens';

type Variant = 'primary' | 'ghost' | 'danger';

type Props = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: Variant;
  disabled?: boolean;
};

export function Button({ title, onPress, variant = 'primary', disabled }: Props) {
  const bg = variant === 'primary' ? BRAND : variant === 'danger' ? '#e74c3c' : 'transparent';
  const border = variant === 'ghost' ? BRAND : 'transparent';
  const color = variant === 'ghost' ? BRAND : TEXT;
  const opacity = disabled ? 0.6 : 1;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: bg,
        borderColor: border,
        borderWidth: 1,
        paddingVertical: 12,
        borderRadius: 14,
        alignItems: 'center',
        marginVertical: 6,
        opacity,
      }}
      activeOpacity={0.8}
    >
      <Text style={{ color, fontWeight: '700', fontSize: 16 }}>{title}</Text>
    </TouchableOpacity>
  );
}
