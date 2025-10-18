import React, { useEffect, useState } from 'react';
import { Alert, View, Text } from 'react-native';
import { H1 } from '../components/H1';
import { Label } from '../components/Label';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { DEFAULT_AVATAR, MUTED } from '../theme/tokens';
import { getUserByEmail, getUserById, upsertUser, listUsers } from '../services/repositories/userRepository';
import { setSessionUser } from '../services/sessionService';
import { genId } from '../utils/id';
import type { User } from '../types/user';


type Props = {
  onDone: (u: User) => void;
  onBack: () => void;
};

export default function RegisterScreen({ onDone, onBack }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(DEFAULT_AVATAR);
  const [saving, setSaving] = useState(false);
  const [debugCount, setDebugCount] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const users = await listUsers();
      setDebugCount(users.length);
    })();
  }, []);

  async function handleCreate() {
    try {
      if (saving) return;
      if (!name.trim() || !email.trim() || !password) {
        Alert.alert('Campos obrigatórios', 'Preencha nome, e-mail e senha.');
        return;
      }
      const exists = await getUserByEmail(email.trim());
      if (exists) {
        Alert.alert('Já existe', 'Este e-mail já está cadastrado.');
        return;
      }
      setSaving(true);
      const user = await upsertUser({ id: genId(), name: name.trim(), email: email.trim(), password, avatarUrl });
      const check = await getUserById(user.id);
      if (!check) {
        Alert.alert('Falha ao salvar', 'Não foi possível persistir o usuário no AsyncStorage.');
        return;
      }
      await setSessionUser(user.id);
      Alert.alert('Conta criada!', 'Bem-vindo(a), ' + user.name + '!');
      onDone(user);
    } catch (e: any) {
      Alert.alert('Erro ao salvar', e?.message || 'Tente novamente.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card>
      <H1>Criar conta</H1>
      <Label>Nome</Label>
      <Input placeholder="Seu nome" value={name} onChangeText={setName} />
      <Label>E-mail</Label>
      <Input placeholder="email@exemplo.com" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <Label>Senha</Label>
      <Input placeholder="••••••••" secureTextEntry value={password} onChangeText={setPassword} />
      <Label>URL do Avatar</Label>
      <Input placeholder="https://..." autoCapitalize="none" value={avatarUrl} onChangeText={setAvatarUrl} />
      <View style={{ alignItems: 'center', marginVertical: 12 }}>
        {/* A imagem do avatar fica no componente de Perfil; aqui mantemos simples */}
      </View>
      <Button title={saving ? 'Salvando...' : 'Salvar e entrar'} onPress={handleCreate} />
      {debugCount !== null && (
        <Text style={{ color: MUTED, fontSize: 12, textAlign: 'center', marginTop: 8 }}>
          Usuários no device: {debugCount}
        </Text>
      )}
      <Button title="Voltar" onPress={onBack} variant="ghost" />
    </Card>
  );
}
