// src/services/repositories/userRepository.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../../types/user';
import { DEFAULT_AVATAR, USERS_KEY } from '../../theme/tokens';
import { genId } from '../../utils/id';

// === Leitura/Escrita bruta ===
async function readUsers(): Promise<User[]> {
  const raw = await AsyncStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

async function writeUsers(users: User[]) {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// === CRUD ===
export async function upsertUser(
  u: Omit<User, 'createdAt' | 'updatedAt'> & Partial<User>
): Promise<User> {
  const users = await readUsers();
  const now = Date.now();
  const idx = users.findIndex((x) => x.id === u.id);

  if (idx >= 0) {
    const updated: User = { ...users[idx], ...u, updatedAt: now } as User;
    users[idx] = updated;
    await writeUsers(users);
    return updated;
  } else {
    const created: User = {
      id: u.id || genId(),
      name: u.name || '',
      email: (u as User).email || '',
      password: (u as User).password || '',
      avatarUrl: u.avatarUrl || DEFAULT_AVATAR,
      createdAt: now,
      updatedAt: now,
    };
    users.push(created);
    await writeUsers(users);
    return created;
  }
}

export async function deleteUser(id: string) {
  const users = await readUsers();
  const filtered = users.filter((u) => u.id !== id);
  await writeUsers(filtered);
}

export async function getUserByEmail(email: string) {
  const users = await readUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export async function getUserById(id?: string | null) {
  if (!id) return undefined;
  const users = await readUsers();
  return users.find((u) => u.id === id);
}

export async function listUsers() {
  const users = await readUsers();
  return users.sort((a, b) => b.updatedAt - a.updatedAt);
}
