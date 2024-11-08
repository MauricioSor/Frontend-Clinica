import { useAuthStore } from '../store/authStore';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { services } from '../services';
import { LoginCredentials, RegisterData } from '../types/auth';

export const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, logout: storeLogout, user, isAuthenticated } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => services.auth.login(credentials),
    onSuccess: (data) => {
      login(data.token);
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    },
  });

  const registerMutation = useMutation({
    mutationFn: (userData: RegisterData) => services.auth.register(userData),
    onSuccess: (data) => {
      login(data.token);
      navigate('/', { replace: true });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => services.auth.logout(),
    onSettled: () => {
      storeLogout();
      navigate('/login', { replace: true });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return {
    user,
    isAuthenticated,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: handleLogout,
    isLoading: loginMutation.isPending || registerMutation.isPending || logoutMutation.isPending,
    error: loginMutation.error || registerMutation.error || logoutMutation.error,
  };
};