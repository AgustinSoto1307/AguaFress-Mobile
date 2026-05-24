import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../constants/theme';
import { AuthProvider, useAuthContext } from '../components/AuthProvider';

// ─── Guardia de rutas ─────────────────────────────────────────────────────────

/**
 * Redirige al login si el usuario no está autenticado e intenta
 * acceder a rutas protegidas. Redirige al catálogo si ya está logueado
 * e intenta volver al login.
 */
function RouteGuard() {
  const { isAuthenticated, isLoading } = useAuthContext();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // Espera a que se resuelva el estado inicial

    const inAuthScreen = segments[0] === 'login';

    if (!isAuthenticated && !inAuthScreen) {
      // No logueado y quiere entrar a una ruta protegida → login
      router.replace('/login');
    } else if (isAuthenticated && inAuthScreen) {
      // Ya logueado y está en login → catálogo
      router.replace('/items');
    }
  }, [isAuthenticated, isLoading, segments]);

  return null;
}

// ─── Stack con navegación configurada ────────────────────────────────────────

function AppStack() {
  return (
    <>
      <StatusBar style="light" />
      <RouteGuard />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primaryDark,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      >
        {/* Pantalla de bienvenida/splash */}
        <Stack.Screen
          name="index"
          options={{ title: 'aguaFress', headerShown: false }}
        />

        {/* Login — sin header para diseño limpio */}
        <Stack.Screen
          name="login"
          options={{ title: 'Ingresar', headerShown: false }}
        />

        {/* Catálogo de productos */}
        <Stack.Screen
          name="items/index"
          options={{ title: 'Nuestro Catálogo' }}
        />

        {/* Detalle de producto */}
        <Stack.Screen
          name="items/[id]"
          options={{ title: 'Detalle del Producto' }}
        />

        {/* Formulario de pedido */}
        <Stack.Screen
          name="form"
          options={{ title: 'Confirmar Pedido' }}
        />
      </Stack>
    </>
  );
}

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppStack />
    </AuthProvider>
  );
}
