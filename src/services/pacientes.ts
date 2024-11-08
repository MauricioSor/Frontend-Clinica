import { api } from './api';
import { Paciente } from '../types';

export const pacientesService = {
  async getPacientes() {
    const { data } = await api.get<Paciente[]>('/pacientes');
    return data;
  },

  async getPacienteById(id: number) {
    const { data } = await api.get<Paciente>(`/pacientes/${id}`);
    return data;
  },

  async createPaciente(paciente: Omit<Paciente, 'id'>) {
    const { data } = await api.post<Paciente>('/pacientes', paciente);
    return data;
  },

  async updatePaciente(id: number, paciente: Partial<Paciente>) {
    const { data } = await api.put<Paciente>(`/pacientes/${id}`, paciente);
    return data;
  },

  async deletePaciente(id: number) {
    await api.delete(`/pacientes/${id}`);
  },
};