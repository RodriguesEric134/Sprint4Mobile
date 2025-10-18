// src/services/sessionService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SESSION_KEY } from '../theme/tokens';
import { getUserById } from './repositories/userRepository';
import type { User } from '../types/user';

/**
 * Salva/limpa o ID do usuário logado.
 */
export async function setSessionUser(id: string | null): Promise<void> {
  if (id) {
    await AsyncStorage.setItem(SESSION_KEY, id);
  } else {
    await AsyncStorage.removeItem(SESSION_KEY);
  }
}

/**
 * Retorna o ID do usuário logado (ou null).
 */
export async function getSessionUserId(): Promise<string | null> {
  return AsyncStorage.getItem(SESSION_KEY);
}

/**
 * (Opcional) Retorna o usuário logado já resolvido do repositório.
 */
export async function getSessionUser(): Promise<User | undefined> {
  const id = await getSessionUserId();
  return getUserById(id);
}

/**
 * (Opcional) Indica se há sessão ativa.
 */
export async function isLoggedIn(): Promise<boolean> {
  const id = await getSessionUserId();
  return !!id;
}

/**
 * (Opcional) Encerra a sessão.
 */
export async function clearSession(): Promise<void> {
  await setSessionUser(null);
}
