// src/screens/EditUserScreen.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, View } from 'react-native';

import Screen from '../layout/Screen';
import { H1 } from '../components/H1';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

import { getUserById, upsertUser } from '../services/repositories/userRepository';
import { getSessionUserId, setSessionUser } from '../services/sessionService';
import type { User } from '../types/user';

type Props = {
  id: string;
  onBack: () => void;
  onSaved: (u: User) => void;
};

export default function EditUserScreen({ id, onBack, onSaved }: Props) {
  const [loading, setLoading] = useState(true);
  const [initial, setInitial] = useState<User | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    (async () => {
      const u = await getUserById(id);
      if (!u) {
        Alert.alert('Usuário não encontrado', 'Retornando ao perfil.');
        onBack();
        return;
      }
      setInitial(u);
      setName(u.name);
      setEmail(u.email);
      setPassword(u.password ?? '');
      setAvatarUrl(u.avatarUrl ?? '');
      setLoading(false);
    })();
  }, [id]);

  const dirty = useMemo(() => {
    if (!initial) return false;
    return (
      name !== initial.name ||
      email !== initial.email ||
      password !== (initial.password ?? '') ||
      avatarUrl !== (initial.avatarUrl ?? '')
    );
  }, [name, email, password, avatarUrl, initial]);

  async function handleSave() {
    if (!initial) return;

    if (!name.trim()) return Alert.alert('Validação', 'Informe o nome.');
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return Alert.alert('Validação', 'E-mail inválido.');
    if (!password) return Alert.alert('Validação', 'Informe a senha.');

    try {
      setLoading(true);
      const updated = await upsertUser({
        id: initial.id,
        name: name.trim(),
        email: email.trim(),
        password,
        avatarUrl: avatarUrl.trim() || initial.avatarUrl,
      });

      const currentId = await getSessionUserId();
      if (currentId && currentId === updated.id) {
        await setSessionUser(updated.id);
      }

      onSaved(updated);
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar as alterações.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <View style={{ marginBottom: 20 }}>
        <H1>Editar usuário</H1>
      </View>

      <Input value={name} onChangeText={setName} placeholder="Nome" editable={!loading} />
      <Input
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />
      <Input
        value={password}
        onChangeText={setPassword}
        placeholder="Senha"
        secureTextEntry
        autoCapitalize="none"
        editable={!loading}
      />
      <Input
        value={avatarUrl}
        onChangeText={setAvatarUrl}
        placeholder="URL do avatar"
        autoCapitalize="none"
        editable={!loading}
      />

      <View style={{ marginTop: 20 }}>
        <Button
          title={loading ? 'Salvando...' : 'Salvar alterações'}
          onPress={handleSave}
          disabled={loading || !dirty}
        />
        <Button title="Cancelar" onPress={onBack} variant="ghost" />
      </View>
    </Screen>
  );
}
