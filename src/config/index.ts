export const config = {
  // Bandera para determinar si usar servicios mock o reales
  useMockServices: true,
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
};