import { Product, BrandType } from '../types/product';

// Base de datos simulada en memoria (Mock) adaptada al negocio de aguaFress
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Bidón 20L aguaFress',
    description: 'Agua purificada retornable de máxima pureza. Ideal para dispensers hogareños o de oficina.',
    price: 1500,
    category: 'Agua',
    brand: 'aguaFress',
    vendorId: 'preventista-zona-centro', 
    stock: 45,
    isAvailable: true,
    sizeLiters: 20
  },
  {
    id: '2',
    title: 'Sifón de Soda Ivess 1.5L',
    description: 'Soda retornable con el gas perfecto para tus comidas.',
    price: 600,
    category: 'Soda',
    brand: 'Ivess',
    vendorId: 'preventista-zona-centro',
    stock: 12,
    isAvailable: true,
    sizeLiters: 1.5
  },
  {
    id: '3',
    title: 'Bidón 12L aguaFress (Descartable)',
    description: 'Agua purificada en envase liviano sin necesidad de retornar vacío.',
    price: 1100,
    category: 'Agua',
    brand: 'aguaFress',
    vendorId: 'preventista-zona-sur', // Otro vendedor
    stock: 0,                         // Sin stock físico
    isAvailable: false,               // No disponible en la hoja de ruta
    sizeLiters: 12
  },
  {
    id: '4',
    title: 'Coca-Cola Sabor Original 2.25L',
    description: 'Gaseosa refrescante ideal para acompañar tus pedidos.',
    price: 2800,
    category: 'Gaseosa',
    brand: 'Coca-Cola',
    vendorId: 'preventista-zona-centro',
    stock: 120,
    isAvailable: true,
    sizeLiters: 2.25
  }
];

/**
 * Obtiene el catálogo de productos asignado a un preventista/vendedor específico.
 * Simula una demora de red de 1 segundo para disparar el estado de 'loading'.
 */
export async function getProductsByVendor(vendorId: string): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = MOCK_PRODUCTS.filter(product => product.vendorId === vendorId);
      resolve(filtered);
    }, 1000);
  });
}

/**
 * Obtiene los productos filtrados por una Marca comercial específica.
 */
export async function getProductsByBrand(brand: BrandType): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = MOCK_PRODUCTS.filter(product => product.brand === brand);
      resolve(filtered);
    }, 600);
  });
}

/**
 * Busca un producto específico por su ID.
 * Simula una respuesta rápida de red.
 */
export async function getProductById(id: string): Promise<Product | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = MOCK_PRODUCTS.find(p => p.id === id);
      resolve(product);
    }, 400); // Demora simulada de 400ms
  });
}