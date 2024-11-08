export interface User {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  role: 'ADMIN' | 'MEDICO' | 'SECRETARIA';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  nombre: string;
  apellido: string;
  role: User['role'];
}

export interface AuthResponse {
  token: string;
  user: User;
}