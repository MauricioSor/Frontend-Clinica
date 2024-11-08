import { api } from './api';
import { LoginCredentials, RegisterData, AuthResponse } from '../types/auth';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);
    return data;
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/register', userData);
    return data;
  },

  async getCurrentUser() {
    const { data } = await api.get('/auth/me');
    return data;
  },

  async logout() {
    await api.post('/auth/logout');
  },
};