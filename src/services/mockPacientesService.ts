import { Paciente } from '../types';
import { mockPacientes } from '../mocks/data';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockPacientesService = {
  async getPacientes(): Promise<Paciente[]> {
    await delay(1000);
    return [...mockPacientes];
  },

  async getPacienteById(id: number): Promise<Paciente> {
    await delay(500);
    const paciente = mockPacientes.find(p => p.id === id);
    if (!paciente) {
      throw new Error('Paciente no encontrado');
    }
    return { ...paciente };
  },

  async createPaciente(paciente: Omit<Paciente, 'id'>): Promise<Paciente> {
    await delay(1000);
    const newPaciente = {
      id: mockPacientes.length + 1,
      ...paciente
    };
    mockPacientes.push(newPaciente);
    return newPaciente;
  },

  async updatePaciente(id: number, paciente: Partial<Paciente>): Promise<Paciente> {
    await delay(1000);
    const index = mockPacientes.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Paciente no encontrado');
    }
    mockPacientes[index] = { ...mockPacientes[index], ...paciente };
    return mockPacientes[index];
  },

  async deletePaciente(id: number): Promise<void> {
    await delay(1000);
    const index = mockPacientes.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Paciente no encontrado');
    }
    mockPacientes.splice(index, 1);
  },
};