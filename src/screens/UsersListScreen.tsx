import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { H1 } from '../components/H1';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { DEFAULT_AVATAR, TEXT, MUTED, BRAND, OK, WARN } from '../theme/tokens';
import { listUsers } from '../services/repositories/userRepository';
import type { User } from '../types/user';

type Props = {
  onBack: (id: string) => void;
  onOpenProfile: (id: string) => void;
  onEdit: (id: string) => void;
};

export default function UsersListScreen({ onBack, onOpenProfile, onEdit }: Props) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => setUsers(await listUsers()))();
  }, []);

  return (
    <Card>
      <H1>Usuários ({users.length})</H1>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', backgroundColor: '#202024', padding: 12, borderRadius: 14, alignItems: 'center', gap: 12 }}>
            <Image source={{ uri: item.avatarUrl || DEFAULT_AVATAR }} style={{ width: 48, height: 48, borderRadius: 999, borderWidth: 2, borderColor: BRAND }} />
            <View style={{ flex: 1 }}>
              <Text style={{ color: TEXT, fontWeight: '700' }}>{item.name}</Text>
              <Text style={{ color: MUTED, fontSize: 12 }}>{item.email}</Text>
            </View>
            <TouchableOpacity onPress={() => onOpenProfile(item.id)}>
              <Text style={{ color: OK, fontWeight: '700' }}>Abrir</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onEdit(item.id)}>
              <Text style={{ color: WARN, fontWeight: '700' }}>Editar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={{ height: 12 }} />
      <Button title="Voltar" onPress={() => onBack(users[0]?.id || '')} variant="ghost" />
    </Card>
  );
}
