import React, { useState } from 'react';
import { Alert } from 'react-native';
import { H1 } from '../components/H1';
import { Label } from '../components/Label';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { getUserByEmail } from '../services/repositories/userRepository';
import { setSessionUser } from '../services/sessionService';
import type { User } from '../types/user';

type Props = {
  onRegister: () => void;
  onLoggedIn: (u: User) => void;
};

export default function LoginScreen({ onRegister, onLoggedIn }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    const user = await getUserByEmail(email.trim());
    if (!user || user.password !== password) {
      Alert.alert('Falha no login', 'E-mail ou senha inválidos.');
      return;
    }
    await setSessionUser(user.id);
    onLoggedIn(user);
  }

  return (
    <Card>
      <H1>Login</H1>
      <Label>E-mail</Label>
      <Input placeholder="email@exemplo.com" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <Label>Senha</Label>
      <Input placeholder="••••••••" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Entrar" onPress={handleLogin} />
      <Button title="Criar conta" onPress={onRegister} variant="ghost" />
    </Card>
  );

  
}