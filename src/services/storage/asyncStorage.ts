// src/services/storage/asyncStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Lê e converte um item do AsyncStorage em JSON.
 */
export async function getItem<T = any>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch (e) {
    console.warn(`Erro ao ler chave ${key}:`, e);
    return null;
  }
}

/**
 * Salva um valor JSON no AsyncStorage.
 */
export async function setItem<T = any>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Erro ao salvar chave ${key}:`, e);
  }
}

/**
 * Remove uma chave do AsyncStorage.
 */
export async function removeItem(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.warn(`Erro ao remover chave ${key}:`, e);
  }
}

/**
 * Limpa completamente o AsyncStorage (use com cuidado!).
 */
export async function clearAll(): Promise<void> {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.warn('Erro ao limpar AsyncStorage:', e);
  }
}
    