import { config } from '../config';
import { authService } from './auth';
import { mockAuthService } from './mockAuthService';
import { pacientesService } from './pacientes';
import { mockPacientesService } from './mockPacientesService';

// Exportar los servicios según la configuración
export const services = {
  auth: config.useMockServices ? mockAuthService : authService,
  pacientes: config.useMockServices ? mockPacientesService : pacientesService,
};