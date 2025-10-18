// src/layout/Screen.tsx
import React, { ReactNode } from 'react';
import { SafeAreaView, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { BG } from '../theme/tokens';
import { AppHeader } from '../components/AppHeader';

type Props = {
  children: ReactNode;
  withHeader?: boolean; // permite esconder o header se precisar em alguma tela
};

export default function Screen({ children, withHeader = true }: Props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
      <View style={{ flex: 1 }}>
        {withHeader && <AppHeader />}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ padding: 18, gap: 14 }}>
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}
