export const theme = {
  colors: {
    primary: '#00A8E8',       // Azul aguaFress principal (botones, títulos)
    primaryDark: '#007EA7',   // Azul oscuro para el header de la navegación
    secondary: '#00171F',     // Casi negro para el texto principal de lectura
    background: '#F4FAFC',    // Fondo limpio celeste/blanco muy tenue para las pantallas
    surface: '#FFFFFF',       // Fondo blanco para las tarjetas de productos (ItemCard)
    error: '#D90429',         // Rojo para validaciones de formularios
    success: '#38B000',       // Verde para el feedback de éxito
    gray: '#6C757D',          // Gris para textos secundarios y descripciones
    border: '#E2E8F0',        // Gris claro para líneas divisorias
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    round: 50,
  },
  typography: {
    fontFamily: 'System',     // Usamos el del sistema operativo para evitar problemas de carga
    sizes: {
      title: 24,
      subtitle: 18,
      body: 14,
      caption: 12,
    }
  }
};

export type ThemeType = typeof theme;