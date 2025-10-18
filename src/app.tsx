import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

import Screen from './layout/Screen';
import { RouterProvider, useRouter } from './navigation/router';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import UsersListScreen from './screens/UsersListScreen';
import EditUserScreen from './screens/EditUserScreen';

import { getSessionUserId, setSessionUser } from './services/sessionService';
import { getUserById } from './services/repositories/userRepository';
import type { User } from './types/user';
import { TEXT } from './theme/tokens';

function AppShell() {
  const { route, goLogin, goRegister, goUsers, goProfile, goEdit } = useRouter();
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    (async () => {
      const id = await getSessionUserId();
      const u = await getUserById(id);
      if (u) {
        goProfile(u.id);
      }
      setBooted(true);
    })();
  }, []);

  if (!booted) {
    return (
      <Screen>
        <Text style={{ color: TEXT }}>Carregando...</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      {route.name === 'login' && (
        <LoginScreen
          onRegister={goRegister}
          onLoggedIn={(u: User) => goProfile(u.id)}
        />
      )}

      {route.name === 'register' && (
        <RegisterScreen
          onDone={(u: User) => goProfile(u.id)}
          onBack={goLogin}
        />
      )}

      {route.name === 'users' && (
        <UsersListScreen
          onBack={(id) => (id ? goProfile(id) : goLogin())}
          onOpenProfile={goProfile}
          onEdit={goEdit}
        />
      )}

      {route.name === 'profile' && (
        <ProfileScreen
          id={route.params.id}
          onLogout={async () => {
            await setSessionUser(null);
            goLogin();
          }}
          onEdit={() => goEdit(route.params.id)}
          onOpenUsers={goUsers}
        />
      )}

      {route.name === 'edit' && (
        <EditUserScreen
          id={route.params.id}
          onBack={() => goProfile(route.params.id)}
          onSaved={(u) => goProfile(u.id)}
        />
      )}
    </Screen>
  );
}

export default function App() {
  return (
    <RouterProvider initialRoute={{ name: 'login' }}>
      <AppShell />
    </RouterProvider>
  );
}
