// src/utils/validations.ts

/**
 * Verifica se um e-mail é válido (regex simples).
 */
export function isValidEmail(email: string): boolean {
  const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
  return re.test(email.trim().toLowerCase());
}

/**
 * Verifica se a senha atende critérios mínimos.
 * Ex: mínimo 6 caracteres.
 */
export function isStrongPassword(password: string): boolean {
  return password.length >= 6;
}

/**
 * Verifica se um campo de texto não está vazio.
 */
export function isNotEmpty(value: string | null | undefined): boolean {
  return !!value && value.trim().length > 0;
}
