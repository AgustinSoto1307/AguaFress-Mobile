import { AuthSession, Client, LoginCredentials } from '../types/user';

// ─── Mock de clientes ─────────────────────────────────────────────────────────
// Reemplazar con llamada a Supabase/API cuando salgas del MVP

const MOCK_CLIENTS: (Client & { password: string })[] = [
  {
    id: 'client-001',
    email: 'mercado.sol@gmail.com',
    password: '1234',
    name: 'Carlos Méndez',
    role: 'client',
    isActive: true,
    assignedVendorId: 'preventista-zona-centro',
    createdAt: '2024-01-15T10:00:00Z',
    business: {
      businessName: 'Mercado El Sol',
      address: 'Av. San Martín 1240, Cipolletti',
      zone: 'Centro',
      phone: '299-4521890',
    },
  },
  {
    id: 'client-002',
    email: 'kiosco.luna@gmail.com',
    password: '1234',
    name: 'Ana Romero',
    role: 'client',
    isActive: true,
    assignedVendorId: 'preventista-zona-centro',
    createdAt: '2024-02-20T09:30:00Z',
    business: {
      businessName: 'Kiosco La Luna',
      address: 'Calle Belgrano 780, Cipolletti',
      zone: 'Centro',
      phone: '299-4678234',
    },
  },
  {
    id: 'client-003',
    email: 'almacen.norte@gmail.com',
    password: '1234',
    name: 'Roberto Silva',
    role: 'client',
    isActive: true,
    assignedVendorId: 'preventista-zona-norte',
    createdAt: '2024-03-05T14:00:00Z',
    business: {
      businessName: 'Almacén Don Roberto',
      address: 'Ruta 22 km 1190, Cipolletti',
      zone: 'Norte',
      phone: '299-4901123',
    },
  },
];

// ─── Funciones del servicio ───────────────────────────────────────────────────

/**
 * Intenta loguear a un usuario con email y password.
 * Simula 800ms de latencia de red.
 * Lanza un error con mensaje legible si las credenciales son inválidas.
 */
export async function login(credentials: LoginCredentials): Promise<AuthSession> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { email, password } = credentials;
      const found = MOCK_CLIENTS.find(
        (c) => c.email.toLowerCase() === email.toLowerCase() && c.password === password
      );

      if (!found) {
        reject(new Error('Email o contraseña incorrectos.'));
        return;
      }

      if (!found.isActive) {
        reject(new Error('Tu cuenta está desactivada. Contactá a tu preventista.'));
        return;
      }

      // Separamos el password antes de devolver el objeto
      const { password: _pw, ...client } = found;

      resolve({
        user: client,
        token: `mock-token-${client.id}-${Date.now()}`,
      });
    }, 800);
  });
}

/**
 * Cierra la sesión del usuario actual.
 * Con Supabase esto llamaría a supabase.auth.signOut().
 */
export async function logout(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 200));
}

/**
 * Devuelve todos los clientes activos.
 * Útil para el panel de vendedor (próxima etapa).
 */
export async function getAllClients(): Promise<Client[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const clients = MOCK_CLIENTS.map(({ password: _pw, ...c }) => c);
      resolve(clients);
    }, 600);
  });
}

/**
 * Obtiene los clientes asignados a un preventista específico.
 */
export async function getClientsByVendor(vendorId: string): Promise<Client[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = MOCK_CLIENTS
        .filter((c) => c.assignedVendorId === vendorId)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(({ password: _pw, ...c }) => c);
      resolve(filtered);
    }, 600);
  });
}
