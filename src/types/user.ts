// src/types/user.ts

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;       // Apenas para fins didáticos neste exemplo
  avatarUrl?: string;
  createdAt: number;      // timestamp (ms)
  updatedAt: number;      // timestamp (ms)
};
