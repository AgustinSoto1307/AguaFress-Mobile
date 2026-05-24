import { useState, useCallback } from 'react';
import { Client, Vendor, LoginCredentials } from '../types/user';
import { login as authLogin, logout as authLogout } from '../services/auth.service';

interface AuthState {
  user: Client | Vendor | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

interface UseAuthReturn extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isClient: boolean;
  isVendor: boolean;
  clearError: () => void;
}

/**
 * Hook central de autenticación.
 * Maneja sesión, estado de carga y errores del proceso de login.
 *
 * Uso:
 *   const { login, logout, user, isAuthenticated, isLoading, error } = useAuth();
 *
 * Nota: en producción con Supabase, el estado de sesión se persistiría
 * automáticamente. En el mock, la sesión vive solo mientras la app está abierta.
 */
export function useAuth(): UseAuthReturn {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: false,
    error: null,
  });

  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const session = await authLogin(credentials);
      setState({
        user: session.user,
        token: session.token,
        isLoading: false,
        error: null,
      });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error inesperado al iniciar sesión.';
      setState((prev) => ({ ...prev, isLoading: false, error: message }));
      return false;
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    setState((prev) => ({ ...prev, isLoading: true }));
    await authLogout();
    setState({ user: null, token: null, isLoading: false, error: null });
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    login,
    logout,
    isAuthenticated: state.user !== null,
    isClient: state.user?.role === 'client',
    isVendor: state.user?.role === 'vendor',
    clearError,
  };
}
