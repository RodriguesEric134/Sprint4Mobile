# 📱 Sprint 4 - Mobile

[![React Native](https://img.shields.io/badge/React%20Native-0.74-blue?logo=react)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Expo](https://img.shields.io/badge/Expo-managed%20workflow-black?logo=expo)](https://expo.dev/)
[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)](#)

Aplicativo mobile desenvolvido como parte da **Sprint 4**.  
O projeto foi feito com **React Native + TypeScript** e possui fluxo completo de autenticação, registro, listagem e edição de usuários, utilizando `AsyncStorage` como persistência local.

---
## Integrantes
- Eric de Carvalho Rodrigues - RM550249
- Victoria Franceschini Pizza - RM5550609
---
## 🚀 Funcionalidades

- **Login de usuário** com validação de e-mail e senha.
- **Cadastro de usuário** (nome, e-mail, senha e avatar).
- **Perfil do usuário** com informações e opção de logout.
- **Lista de usuários** com navegação para perfis individuais.
- **Edição de usuário** (nome, e-mail, senha e avatar).
- **Persistência de dados** usando `AsyncStorage`.
- **Navegação customizada** (`RouterProvider`) sem dependência de bibliotecas externas.
- **Componentes reutilizáveis** (`Button`, `Input`, `Card`, `H1`, `AppHeader`).
- **Tema centralizado** com tokens de cor e estilo.

---

## 📂 Estrutura do Projeto

```bash
AppNome/
├── app.tsx                       # Ponto de entrada (reexporta src/app.tsx)
├── src/
│   ├── app.tsx                   # Estrutura principal do app
│   ├── screens/                  # Telas principais
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── UsersListScreen.tsx
│   │   └── EditUserScreen.tsx
│   ├── components/               # Componentes reutilizáveis
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── H1.tsx
│   │   ├── AppHeader.tsx
│   │   ├── LoadingState.tsx
│   │   ├── ErrorState.tsx
│   │   └── EmptyState.tsx
│   ├── providers/                # Contextos globais
│   │   └── ToastProvider.tsx
│   ├── services/                 # Regras de negócio e integração
│   │   ├── firebase/             # Integração com Firebase
│   │   │   ├── app.ts
│   │   │   ├── auth.ts
│   │   │   └── users.ts
│   │   ├── sessionService.ts
│   │   └── storage/
│   │       └── asyncStorage.ts
│   ├── navigation/               # Roteamento customizado
│   │   └── router.tsx
│   ├── layout/                   # Estrutura base de tela
│   │   └── Screen.tsx
│   ├── theme/                    # Tokens e estilos globais
│   │   └── tokens.ts
│   ├── utils/                    # Funções auxiliares
│   │   ├── id.ts
│   │   └── validation.ts
│   └── types/                    # Tipagens globais
│       └── user.ts
└── package.json
```
🛠️ Tecnologias

- React Native
- TypeScript
- AsyncStorage
- Context API (roteador customizado)
- Expo (facilita rodar no emulador ou device físico)

▶️ Como rodar o projeto
1. Clonar o repositório
git clone https://github.com/RodriguesEric134/Sprint4Mobile.git
2. Entrar no diretório do projeto com
```bash
cd AppNome
```
4. Instalar dependências
```bash
npm install
```
# ou
```bash
yarn install
```
4. Rodar no Expo
```bash
npx expo start
```
👤 Usuários e Sessão

Os usuários são salvos em AsyncStorage (JSON).

A sessão atual também é persistida.

Estrutura de usuário (User):
```bash
type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
  createdAt: number;
  updatedAt: number;
};
```
📌 Próximos Passos

 - Implementar upload de avatar (imagem local).
 - Melhorar design (inputs com labels e feedback de erro).
 - Adicionar testes unitários.
 - Migrar para expo-router.

📄 Licença

Este projeto é de uso acadêmico.
Sinta-se à vontade para adaptar e evoluir.

