import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '../constants/theme';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Encabezado e Identidad de la Marca */}
      <View style={styles.headerContainer}>
        <Text style={styles.brandTitle}>aguaFress</Text>
        <Text style={styles.tagline}>Agua pura y bebidas en la puerta de tu casa</Text>
      </View>

      {/* Propósito / Información resumida */}
      <View style={styles.infoContainer}>
        <Text style={styles.description}>
          Pedí tus bidones retornables, sodas y bebidas favoritas de forma rápida,
          controlando el stock de tus preventistas en tiempo real.
        </Text>
      </View>

      {/* Acción Principal de la App (Acceso al Catálogo) */}
      <Pressable 
        style={styles.button}
        onPress={() => router.push('/items')}
      >
        <Text style={styles.buttonText}>Ver Catálogo Disponible</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.xl,
  },
  brandTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  tagline: {
    fontSize: theme.typography.sizes.subtitle,
    color: theme.colors.primaryDark,
    textAlign: 'center',
    fontWeight: '500',
  },
  infoContainer: {
    paddingHorizontal: theme.spacing.md,
  },
  description: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.gray,
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Sombra para Android
  },
  buttonText: {
    color: '#fff',
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: 'bold',
  },
});