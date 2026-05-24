import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../constants/theme';

export default function RootLayout() {
  return (
    <>
      {/* StatusBar para controlar el estilo de la barra superior del celular (RNF01) */}
      <StatusBar style="light" />
      
      {/* Configuración de las transiciones y títulos de las pantallas */}
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primaryDark, // Azul oscuro corporativo de aguaFress
          },
          headerTintColor: '#fff', // Texto del encabezado en blanco
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: theme.colors.background, // Fondo celeste tenue para todas las pantallas
          },
        }}
      >
        {/* Pantalla Principal / Bienvenida */}
        <Stack.Screen 
          name="index" 
          options={{ title: 'aguaFress' }} 
        />
        
        {/* Pantalla del Listado / Catálogo */}
        <Stack.Screen 
          name="items/index" 
          options={{ title: 'Nuestro Catálogo' }} 
        />
        
        {/* Pantalla de Detalle dinámico del producto */}
        <Stack.Screen 
          name="items/[id]" 
          options={{ title: 'Detalle del Producto' }} 
        />
        
        {/* Pantalla del Formulario de pedido / Carrito */}
        <Stack.Screen 
          name="form" 
          options={{ title: 'Confirmar Pedido' }} 
        />
      </Stack>
    </>
  );
}