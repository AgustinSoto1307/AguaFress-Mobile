import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '../constants/theme';
import { useAuthContext } from '../components/AuthProvider';

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading, error, isAuthenticated, clearError } = useAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Si ya está logueado, redirige directo al catálogo
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/items');
    }
  }, [isAuthenticated]);

  // Muestra errores del servicio como alerta nativa
  useEffect(() => {
    if (error) {
      Alert.alert('Error al ingresar', error, [
        { text: 'Entendido', onPress: clearError },
      ]);
    }
  }, [error]);

  const handleLogin = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      Alert.alert('Campos incompletos', 'Por favor ingresá tu email y contraseña.');
      return;
    }

    const success = await login({ email: trimmedEmail, password });
    if (success) {
      router.replace('/items');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Marca */}
        <View style={styles.brandContainer}>
          <Text style={styles.brandTitle}>aguaFress</Text>
          <Text style={styles.brandSubtitle}>Distribución mayorista</Text>
        </View>

        {/* Tarjeta de formulario */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ingresar</Text>
          <Text style={styles.cardSubtitle}>
            Accedé con los datos que te dio tu preventista
          </Text>

          {/* Campo email */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="tu@email.com"
              placeholderTextColor={theme.colors.gray}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
            />
          </View>

          {/* Campo contraseña */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.passwordRow}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="••••••••"
                placeholderTextColor={theme.colors.gray}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />
              <Pressable
                style={styles.togglePassword}
                onPress={() => setShowPassword((v) => !v)}
              >
                <Text style={styles.togglePasswordText}>
                  {showPassword ? 'Ocultar' : 'Ver'}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Botón principal */}
          <Pressable
            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.loginButtonText}>Entrar al catálogo</Text>
            )}
          </Pressable>
        </View>

        {/* Ayuda para el MVP: credenciales de prueba */}
        <View style={styles.devHint}>
          <Text style={styles.devHintTitle}>Cuentas de prueba</Text>
          <Text style={styles.devHintText}>mercado.sol@gmail.com · 1234</Text>
          <Text style={styles.devHintText}>kiosco.luna@gmail.com · 1234</Text>
          <Text style={styles.devHintText}>almacen.norte@gmail.com · 1234</Text>
        </View>

        {/* Contacto soporte */}
        <Text style={styles.supportText}>
          ¿Problemas para ingresar? Contactá a tu preventista.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  brandTitle: {
    fontSize: 44,
    fontWeight: 'bold',
    color: theme.colors.primary,
    letterSpacing: -1,
  },
  brandSubtitle: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.primaryDark,
    fontWeight: '500',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: theme.typography.sizes.title,
    fontWeight: 'bold',
    color: theme.colors.secondary,
    marginBottom: theme.spacing.xs,
  },
  cardSubtitle: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.gray,
    marginBottom: theme.spacing.lg,
    lineHeight: 20,
  },
  fieldGroup: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.typography.sizes.body,
    fontWeight: '600',
    color: theme.colors.secondary,
    marginBottom: theme.spacing.xs,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.secondary,
    backgroundColor: theme.colors.background,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  passwordInput: {
    flex: 1,
  },
  togglePassword: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
  },
  togglePasswordText: {
    color: theme.colors.primary,
    fontWeight: '600',
    fontSize: theme.typography.sizes.body,
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    height: 50,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.sm,
    elevation: 2,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: 'bold',
  },
  devHint: {
    backgroundColor: '#FFF8E1',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: '#FFE082',
    gap: 4,
  },
  devHintTitle: {
    fontSize: theme.typography.sizes.caption,
    fontWeight: 'bold',
    color: '#F57F17',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  devHintText: {
    fontSize: theme.typography.sizes.caption,
    color: '#795548',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  supportText: {
    textAlign: 'center',
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.gray,
  },
});
