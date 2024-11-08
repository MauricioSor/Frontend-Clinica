import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Unauthorized } from './pages/Unauthorized';
import { Citas } from './components/citas/Citas';
import { ListaPacientes } from './components/pacientes/ListaPacientes';
import { NuevoPaciente } from './pages/NuevoPaciente';
import { Configuracion } from './pages/Configuracion';
import { NuevaEvolucion } from './pages/NuevaEvolucion';
import { ThemeProvider } from './context/ThemeContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Navigate to="/pacientes/lista" replace />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/citas"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'MEDICO', 'SECRETARIA']}>
                  <Layout>
                    <Citas />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/pacientes/lista"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'MEDICO', 'SECRETARIA']}>
                  <Layout>
                    <ListaPacientes />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/pacientes/nuevo"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'SECRETARIA']}>
                  <Layout>
                    <NuevoPaciente />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/configuracion"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <Layout>
                    <Configuracion />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/pacientes/:id/nueva-evolucion"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'MEDICO']}>
                  <Layout>
                    <NuevaEvolucion />
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;