import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { theme } from '../../constants/theme';
import { Product } from '../../types/product';
import { getProductById } from '../../services/products.service';

export default function ItemDetailScreen() {
  const router = useRouter();
  
  // Capturamos el id que viene en la ruta dinámica /items/[id]
  const { id } = useLocalSearchParams<{ id: string }>();

  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;
      try {
        setIsLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error('Error al cargar el detalle del producto:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  // 1. Estado de Carga
  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Cargando especificaciones...</Text>
      </View>
    );
  }

  // 2. Si el producto no se encuentra
  if (!product) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>El producto solicitado no existe o no está disponible.</Text>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Volver al catálogo</Text>
        </Pressable>
      </View>
    );
  }

  // Lógica de disponibilidad (De tu imagen de negocio)
  const isAvailable = product.isAvailable && product.stock > 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentCard}>
        {/* Encabezado con Marca y Litros */}
        <View style={styles.headerRow}>
          <Text style={styles.brandBadge}>{product.brand.toUpperCase()}</Text>
          {product.sizeLiters ? (
            <Text style={styles.sizeText}>{product.sizeLiters} Litros</Text>
          ) : null}
        </View>

        {/* Título Principal */}
        <Text style={styles.title}>{product.title}</Text>

        {/* Badge de Disponibilidad / Stock */}
        <View style={styles.statusRow}>
          {isAvailable ? (
            <Text style={[styles.statusBadge, styles.badgeSuccess]}>
              ✓ Stock Disponible ({product.stock} unidades)
            </Text>
          ) : (
            <Text style={[styles.statusBadge, styles.badgeError]}>
              ✕ Sin disponibilidad inmediata
            </Text>
          )}
        </View>

        {/* Separador */}
        <View style={styles.separator} />

        {/* Sección de Descripción Técnica */}
        <Text style={styles.sectionTitle}>Descripción del Producto</Text>
        <Text style={styles.descriptionText}>{product.description}</Text>

        {/* Datos Logísticos / Operativos (Muy valorados en el rubro) */}
        <Text style={styles.sectionTitle}>Información de distribución</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Categoría:</Text>
          <Text style={styles.infoValue}>{product.category}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Zona de Preventa:</Text>
          <Text style={styles.infoValue}>Centro / Planificado</Text>
        </View>

        {/* Precio Destacado */}
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Precio Unitario:</Text>
          <Text style={styles.priceValue}>${product.price.toLocaleString('es-AR')}</Text>
        </View>

        {/* Botón de Retorno Directo */}
        <Pressable 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Volver al Catálogo</Text>
        </Pressable>
      </View>
    </ScrollView>
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
  contentCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    margin: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  brandBadge: {
    fontSize: theme.typography.sizes.caption,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: theme.colors.primaryDark,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
    overflow: 'hidden',
  },
  sizeText: {
    fontSize: theme.typography.sizes.body,
    fontWeight: '600',
    color: theme.colors.gray,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: theme.colors.secondary,
    marginBottom: theme.spacing.sm,
  },
  statusRow: {
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  statusBadge: {
    fontSize: theme.typography.sizes.caption,
    fontWeight: '600',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    overflow: 'hidden',
  },
  badgeSuccess: {
    backgroundColor: '#E8F5E9',
    color: theme.colors.success,
  },
  badgeError: {
    backgroundColor: '#FFEBEE',
    color: theme.colors.error,
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginTop: theme.spacing.md,    // <--- Corregido de 'verticalMargin' a 'marginTop'
    marginBottom: theme.spacing.md, // Mantiene el espacio hacia abajo
  },
  sectionTitle: {
    fontSize: theme.typography.sizes.body,
    fontWeight: 'bold',
    color: theme.colors.primaryDark,
    marginBottom: theme.spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  descriptionText: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.secondary,
    lineHeight: 22,
    marginBottom: theme.spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.xs,
  },
  infoLabel: {
    width: 130,
    fontSize: theme.typography.sizes.body,
    color: theme.colors.gray,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.secondary,
    fontWeight: '600',
  },
  priceContainer: {
    backgroundColor: '#FAFDFE',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: '600',
    color: theme.colors.gray,
  },
  priceValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.secondary,
  },
  backButton: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  backButtonText: {
    color: theme.colors.primary,
    fontSize: theme.typography.sizes.body,
    fontWeight: 'bold',
  },
  loadingText: {
    marginTop: theme.spacing.sm,
    color: theme.colors.primaryDark,
    fontSize: theme.typography.sizes.body,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.typography.sizes.body,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
});