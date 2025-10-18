import React from 'react';
import { View, Text } from 'react-native';
import { BRAND } from '../theme/tokens';

export function AppHeader() {
  return (
    <View style={{ backgroundColor: 'transparent', paddingHorizontal: 18, paddingTop: 6, paddingBottom: 12 }}>
      <Text style={{ color: BRAND, fontWeight: '900', fontSize: 18, letterSpacing: 1 }}>
        Sprint 4 - Mobile
      </Text>
    </View>
  );
}
