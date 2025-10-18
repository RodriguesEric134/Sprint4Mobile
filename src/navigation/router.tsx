// src/navigation/router.tsx
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from 'react';

/** Definição das rotas do app */
export type Route =
  | { name: 'login' }
  | { name: 'register' }
  | { name: 'profile'; params: { id: string } }
  | { name: 'edit'; params: { id: string } }
  | { name: 'users' };

/** API pública do roteador */
export type RouterApi = {
  route: Route;
  goLogin: () => void;
  goRegister: () => void;
  goUsers: () => void;
  goProfile: (id: string) => void;
  goEdit: (id: string) => void;
  setRoute: (r: Route) => void;
};

const RouterContext = createContext<RouterApi | null>(null);

type ProviderProps = {
  children: ReactNode;
  initialRoute?: Route;
};

/**
 * RouterProvider
 * - Mantém estado de rota e expõe ações de navegação por Context.
 * - Use com o hook useRouter() nas telas/containers.
 */
export function RouterProvider({ children, initialRoute }: ProviderProps) {
  const [route, setRoute] = useState<Route>(initialRoute ?? { name: 'login' });

  const api = useMemo<RouterApi>(
    () => ({
      route,
      goLogin: () => setRoute({ name: 'login' }),
      goRegister: () => setRoute({ name: 'register' }),
      goUsers: () => setRoute({ name: 'users' }),
      goProfile: (id: string) => setRoute({ name: 'profile', params: { id } }),
      goEdit: (id: string) => setRoute({ name: 'edit', params: { id } }),
      setRoute,
    }),
    [route]
  );

  return <RouterContext.Provider value={api}>{children}</RouterContext.Provider>;
}

/** Hook para consumir o roteador */
export function useRouter(): RouterApi {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter deve ser usado dentro de <RouterProvider>.');
  return ctx;
}

/** Helpers opcionais de type guard */
export const isProfileRoute = (r: Route): r is Extract<Route, { name: 'profile' }> =>
  r.name === 'profile';

export const isEditRoute = (r: Route): r is Extract<Route, { name: 'edit' }> =>
  r.name === 'edit';
