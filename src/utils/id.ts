// src/utils/id.ts

/**
 * Gera um ID único estável sem depender de crypto.randomUUID()
 * (compatível com React Native).
 */
export function genId(): string {
  return (
    'u_' +
    Math.random().toString(36).slice(2) +
    '-' +
    Date.now().toString(36)
  );
}
