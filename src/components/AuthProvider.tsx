import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import { LoginCredentials, Client, Vendor } from '../types/user';

// ─── Tipo del contexto ────────────────────────────────────────────────────────

interface AuthContextValue {
  user: Client | Vendor | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isClient: boolean;
  isVendor: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

// ─── Contexto ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

/**
 * Envuelve la app para que cualquier pantalla pueda acceder a la sesión
 * mediante useAuthContext() sin prop drilling.
 *
 * Colocarlo en app/_layout.tsx:
 *   <AuthProvider>
 *     <Stack ... />
 *   </AuthProvider>
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// ─── Hook de consumo ──────────────────────────────────────────────────────────

/**
 * Accede al contexto de autenticación desde cualquier pantalla o componente.
 *
 * Uso:
 *   const { user, login, logout, isAuthenticated } = useAuthContext();
 */
export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext debe usarse dentro de <AuthProvider>.');
  }
  return context;
}
