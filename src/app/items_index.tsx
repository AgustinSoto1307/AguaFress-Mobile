import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Pressable,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '../../constants/theme';
import { Product } from '../../types/product';
import { getProductsByVendor } from '../../services/products.service';
import { ItemCard } from '../../components/ItemCard';
import { useAuthContext } from '../../components/AuthProvider';
import { Client } from '../../types/user';

export default function CatalogScreen() {
  const router = useRouter();
  const { user, logout } = useAuthContext();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);

  // El vendorId ahora viene del usuario logueado, no está hardcodeado
  const vendorId = user?.role === 'client'
    ? (user as Client).assignedVendorId
    : null;

  const businessName = user?.role === 'client'
    ? (user as Client).business.businessName
    : user?.name ?? 'Usuario';

  useEffect(() => {
    if (!vendorId) return;

    async function loadCatalog() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getProductsByVendor(vendorId!);
        setProducts(data);
      } catch (err) {
        setError('No se pudo cargar el catálogo. Intentá de nuevo.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadCatalog();
  }, [vendorId]);

  const handleAddToCart = (product: Product) => {
    setCartCount((prev) => prev + 1);
    Alert.alert(
      'Agregado',
      `${product.title} fue agregado al carrito.`,
      [{ text: 'OK' }]
    );
  };

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Querés salir de tu cuenta?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Salir',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/login');
        },
      },
    ]);
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Cargando catálogo de aguaFress...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (products.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>
          No hay productos disponibles en tu zona por el momento.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Barra superior con info del cliente logueado */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.greetingText}>Hola,</Text>
          <Text style={styles.businessText}>{businessName}</Text>
        </View>
        <View style={styles.topBarActions}>
          <Pressable
            style={styles.cartButton}
            onPress={() => router.push('/form')}
          >
            <Text style={styles.cartButtonText}>🛒 {cartCount}</Text>
          </Pressable>
          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Salir</Text>
          </Pressable>
        </View>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemCard product={item} onAddToCart={handleAddToCart} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    padding: theme.spacing.md,
  },
  loadingText: {
    marginTop: theme.spacing.sm,
    color: theme.colors.primaryDark,
    fontSize: theme.typography.sizes.body,
    fontWeight: '500',
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.typography.sizes.subtitle,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  emptyText: {
    color: theme.colors.gray,
    fontSize: theme.typography.sizes.body,
    textAlign: 'center',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  greetingText: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.gray,
  },
  businessText: {
    fontSize: theme.typography.sizes.body,
    fontWeight: '700',
    color: theme.colors.secondary,
  },
  topBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  cartButton: {
    backgroundColor: theme.colors.primaryDark,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: theme.typography.sizes.body,
  },
  logoutButton: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  logoutButtonText: {
    color: theme.colors.gray,
    fontSize: theme.typography.sizes.caption,
    fontWeight: '600',
  },
});
