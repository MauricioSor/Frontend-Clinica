import { LoginCredentials, RegisterData, AuthResponse } from '../types/auth';
import { mockUsers } from '../mocks/data';

// Simular delay de red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Función para generar un token JWT simulado válido
const generateMockJWT = (payload: any) => {
  // Crear las tres partes del token
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const content = btoa(JSON.stringify(payload));
  const signature = btoa('mock-signature'); // En producción, esto sería una firma real

  // Unir las partes con puntos para crear un token JWT válido
  return `${header}.${content}.${signature}`;
};

export const mockAuthService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await delay(1000); // Simular latencia de red

    const user = mockUsers.find(
      u => u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // Crear un token JWT simulado válido
    const token = generateMockJWT({ 
      user: { 
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        role: user.role
      } 
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        role: user.role
      }
    };
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    await delay(1000);

    if (mockUsers.some(u => u.email === userData.email)) {
      throw new Error('El correo electrónico ya está registrado');
    }

    const newUser = {
      id: mockUsers.length + 1,
      ...userData
    };

    // Crear un token JWT simulado válido
    const token = generateMockJWT({ 
      user: {
        id: newUser.id,
        email: newUser.email,
        nombre: newUser.nombre,
        apellido: newUser.apellido,
        role: newUser.role
      }
    });

    // Agregar el nuevo usuario a la lista de usuarios mock
    mockUsers.push(newUser);

    return {
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        nombre: newUser.nombre,
        apellido: newUser.apellido,
        role: newUser.role
      }
    };
  },

  async getCurrentUser() {
    await delay(500);
    // Implementar si es necesario
    return null;
  },

  async logout() {
    await delay(500);
    // No necesita implementación real
  },
};