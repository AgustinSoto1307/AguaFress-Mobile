import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Product } from '../types/product';
import { theme } from '../constants/theme';
import { useRouter } from 'expo-router';

interface ItemCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ product, onAddToCart }) => {
  const router = useRouter();
  
  // Determinamos si el producto se puede comprar basándonos en tu lógica de negocio
  const hasStock = product.stock > 0;
  const isAvailable = product.isAvailable && hasStock;

  return (
    <View style={[styles.card, !isAvailable && styles.cardUnavailable]}>
      {/* Información del Producto */}
      <View style={styles.infoContainer}>
        <View style={styles.tagRow}>
          <Text style={styles.brandText}>{product.brand.toUpperCase()}</Text>
          {product.sizeLiters ? (
            <Text style={styles.sizeText}>{product.sizeLiters} LTS</Text>
          ) : null}
        </View>
        
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
        
        <Text style={styles.price}>${product.price.toLocaleString('es-AR')}</Text>
      </View>

      {/* Indicadores de Stock / Disponibilidad (Requerimiento de tu imagen) */}
      <View style={styles.statusContainer}>
        {isAvailable ? (
          <Text style={[styles.statusBadge, styles.badgeSuccess]}>
            Disponible • {product.stock} u.
          </Text>
        ) : (
          <Text style={[styles.statusBadge, styles.badgeError]}>
            {!hasStock ? 'Sin Stock' : 'No Disponible'}
          </Text>
        )}
      </View>

      {/* Botones de Acción */}
      <View style={styles.actionRow}>
        {/* Botón Ver Detalle: Funciona siempre */}
        <Pressable 
          style={[styles.button, styles.buttonSecondary]} 
          onPress={() => router.push(`/items/${product.id}`)}
        >
          <Text style={styles.buttonTextSecondary}>Detalle</Text>
        </Pressable>

        {/* Botón Agregar al Carrito: Se deshabilita si no hay stock o disponibilidad */}
        <Pressable 
          style={[
            styles.button, 
            styles.buttonPrimary, 
            !isAvailable && styles.buttonDisabled
          ]} 
          disabled={!isAvailable}
          onPress={() => onAddToCart(product)}
        >
          <Text style={styles.buttonTextPrimary}>Agregar</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    // Sombras para iOS y Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardUnavailable: {
    opacity: 0.65, // Opaca visualmente la tarjeta si no se puede vender
  },
  infoContainer: {
    marginBottom: theme.spacing.sm,
  },
  tagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },
  brandText: {
    fontSize: theme.typography.sizes.caption,
    fontWeight: 'bold',
    color: theme.colors.primaryDark,
    letterSpacing: 0.5,
  },
  sizeText: {
    fontSize: theme.typography.sizes.caption,
    color: theme.colors.gray,
    fontWeight: '600',
  },
  title: {
    fontSize: theme.typography.sizes.subtitle,
    fontWeight: 'bold',
    color: theme.colors.secondary,
    marginBottom: theme.spacing.xs,
  },
  description: {
    fontSize: theme.typography.sizes.body,
    color: theme.colors.gray,
    lineHeight: 18,
    marginBottom: theme.spacing.sm,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.secondary,
  },
  statusContainer: {
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  statusBadge: {
    fontSize: 11,
    fontWeight: 'bold',
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
  actionRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  button: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  buttonPrimary: {
    backgroundColor: theme.colors.primary,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.border,
  },
  buttonTextPrimary: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: theme.typography.sizes.body,
  },
  buttonTextSecondary: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: theme.typography.sizes.body,
  },
});