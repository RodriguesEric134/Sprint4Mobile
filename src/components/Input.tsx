import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { TEXT, MUTED } from '../theme/tokens';

export function Input(props: TextInputProps) {
  return (
    <TextInput
      placeholderTextColor={MUTED}
      {...props}
      style={[
        {
          backgroundColor: '#202024',
          color: TEXT,
          borderRadius: 14,
          paddingHorizontal: 14,
          paddingVertical: 12,
          borderWidth: 1,
          borderColor: '#2a2a2f',
          marginBottom: 12,
        },
        props.style as any,
      ]}
    />
  );
}
