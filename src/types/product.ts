// Tipos estrictos para evitar datos inconsistentes en las marcas y categorías
export type CategoryType = 'Agua' | 'Soda' | 'Gaseosa' | 'Dispensers';
export type BrandType = 'aguaFress' | 'Ivess' | 'Coca-Cola' | 'Pritty';

export interface Product {
  id: string;            // Requerido para el keyExtractor de las listas en React Native
  title: string;         // Nombre comercial del producto
  description: string;   // Detalle para la pantalla de descripción ampliada
  price: number;         // Precio unitario
  category: CategoryType;// Agrupación por tipo de producto (Imagen: Categoría)
  brand: BrandType;      // Filtro por marca comercial (Imagen: Marcas)
  vendorId: string;      // Identificador del repartidor/preventista (Imagen: Catálogo por vendedor)
  stock: number;         // Cantidad física disponible (Imagen: Stock)
  isAvailable: boolean;  // Estado de disponibilidad inmediata (Imagen: Disponibilidad)
  sizeLiters?: number;   // Capacidad en litros (opcional, ej: 20, 1.5, etc.)
}

// Estructura para el manejo de los elementos dentro del carrito de compras
export interface CartItem {
  product: Product;
  quantity: number;
}