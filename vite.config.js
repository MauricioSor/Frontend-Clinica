import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Todas las solicitudes que empiecen con "/api" serán redirigidas al servidor remoto
      '/api': {
        target: 'https://istp1service.azurewebsites.net', // URL del servidor remoto
        changeOrigin: true, // Cambia el origen de la solicitud al destino (necesario para CORS)
        rewrite: (path) => path.replace(/^\/api/, '') // Reescribe la ruta eliminando "/api" del inicio
      }
    }
  }
});
