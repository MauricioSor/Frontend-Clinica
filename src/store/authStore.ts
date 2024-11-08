import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';
import { User } from '../types/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (token: string) => {
        try {
          const decoded = jwtDecode<{ user: User }>(token);
          if (!decoded.user) {
            throw new Error('Token inválido');
          }
          set({
            token,
            user: decoded.user,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error('Error al decodificar el token:', error);
          set({
            token: null,
            user: null,
            isAuthenticated: false,
          });
        }
      },
      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        });
      },
      updateUser: (user: User) => {
        set({ user });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Exportamos el store para usarlo en los interceptores
export const getAuthStore = useAuthStore;