import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '../../constants/theme';
import { Product } from '../../types/product';
import { getProductsByVendor } from '../../services/products.service';
import { ItemCard } from '../../components/ItemCard';

export default function CatalogScreen() {
  const router = useRouter();
  
  // Estados obligatorios de datos e interfaz (Exigidos en el PDF)
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estado simple para simular el contador de ítems en el carrito
  const [cartCount, setCartCount] = useState<number>(0);

  // ID del preventista de ejemplo (Basado en la lógica de tu imagen)
  const CURRENT_VENDOR_ID = 'preventista-zona-centro';

  useEffect(() => {
    async function loadCatalog() {
      try {
        setIsLoading(true);
        setError(null);
        
        // Llamada asíncrona al Productos Service
        const data = await getProductsByVendor(CURRENT_VENDOR_ID);
        setProducts(data);
      } catch (err) {
        setError('No se pudo cargar el catálogo de aguaFress.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadCatalog();
  }, []);

  // Función manejadora para simular la adición al carrito
  const handleAddToCart = (product: Product) => {
    setCartCount(prev => prev + 1);
    alert(`¡Agregaste ${product.title} al carrito!`);
  };

  // 1. Renderizado para el Estado de Carga (Loading)
  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Cargando catálogo de aguaFress...</Text>
      </View>
    );
  }

  // 2. Renderizado para el Estado de Error
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // 3. Renderizado para el Estado Vacío (Empty State)
  if (products.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>El preventista no tiene productos disponibles en este momento.</Text>
      </View>
    );
  }

  // 4. Renderizado de Éxito (Catálogo Completo)
  return (
    <View style={styles.container}>
      {/* Barra de estado del carrito en la parte superior */}
      <View style={styles.cartBar}>
        <Text style={styles.vendorText}>Preventista: Zona Centro</Text>
        <Pressable 
          style={styles.cartButton}
          onPress={() => router.push('/form')} // Navega al formulario controlado
        >
          <Text style={styles.cartButtonText}>🛒 Carrito ({cartCount})</Text>
        </Pressable>
      </View>

      {/* Componente nativo optimizado para renderizar listas */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemCard 
            product={item} 
            onAddToCart={handleAddToCart} 
          />
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
  cartBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  vendorText: {
    fontSize: theme.typography.sizes.body,
    fontWeight: '600',
    color: theme.colors.secondary,
  },
  cartButton: {
    backgroundColor: theme.colors.primaryDark,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: theme.typography.sizes.body,
  },
});