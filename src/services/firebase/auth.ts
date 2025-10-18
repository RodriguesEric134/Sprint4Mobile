import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut as fbSignOut,
  updateProfile,
  sendPasswordResetEmail,
  User,
  getAuth,
} from "firebase/auth";
const auth = getAuth();

export type AuthUser = Pick<User, "uid" | "email" | "displayName" | "photoURL">;

function mapUser(u: User | null): AuthUser | null {
  if (!u) return null;
  return {
    uid: u.uid,
    email: u.email,
    displayName: u.displayName,
    photoURL: u.photoURL,
  };
}

export async function signIn(email: string, password: string): Promise<AuthUser> {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return mapUser(cred.user)!;
  } catch (e: any) {
    throw normalizeAuthError(e);
  }
}

export async function signUp(email: string, password: string, displayName?: string): Promise<AuthUser> {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(cred.user, { displayName });
    }
    return mapUser(cred.user)!;
  } catch (e: any) {
    throw normalizeAuthError(e);
  }
}

export async function signOut(): Promise<void> {
  try {
    await fbSignOut(auth);
  } catch (e: any) {
    throw normalizeAuthError(e);
  }
}

export function onAuthChange(cb: (user: AuthUser | null) => void) {
  // retorna unsubscribe
  return onAuthStateChanged(auth, (u) => cb(mapUser(u)));
}

export async function resetPassword(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (e: any) {
    throw normalizeAuthError(e);
  }
}

export function getCurrentUser(): AuthUser | null {
  return mapUser(auth.currentUser);
}

// Mapeia erros técnicos para mensagens amigáveis
function normalizeAuthError(e: any): Error {
  const code = e?.code ?? "";
  const map: Record<string, string> = {
    "auth/invalid-credential": "Credenciais inválidas.",
    "auth/user-not-found": "Usuário não encontrado.",
    "auth/wrong-password": "Senha incorreta.",
    "auth/too-many-requests": "Muitas tentativas. Tente novamente em alguns minutos.",
    "auth/email-already-in-use": "E-mail já cadastrado.",
    "auth/weak-password": "Senha muito fraca.",
    "auth/network-request-failed": "Falha de rede. Verifique sua conexão.",
  };
  const msg = map[code] || "Erro de autenticação. Tente novamente.";
  return new Error(msg);
}
