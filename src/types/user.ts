// Roles dentro del sistema de distribución
export type UserRole = 'client' | 'vendor' | 'admin';

// Datos del negocio del cliente (dueño de mercado/kiosco)
export interface BusinessInfo {
  businessName: string;   // Nombre del local
  address: string;        // Dirección de entrega
  zone: string;           // Zona de reparto asignada
  phone: string;          // Teléfono de contacto
}

// Usuario base del sistema
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
}

// Cliente: dueño de mercado/kiosco que hace pedidos
export interface Client extends User {
  role: 'client';
  business: BusinessInfo;
  assignedVendorId: string;   // Preventista asignado a este cliente
  createdAt: string;          // ISO date string
}

// Vendedor/preventista mayorista (para la próxima etapa)
export interface Vendor extends User {
  role: 'vendor';
  zone: string;
  clientIds: string[];        // Cartera de clientes asignados
}

// Lo que devuelve el servicio de auth al loguear
export interface AuthSession {
  user: Client | Vendor;
  token: string;              // Simulado por ahora, real con Supabase
}

// Credenciales del formulario de login
export interface LoginCredentials {
  email: string;
  password: string;
}
