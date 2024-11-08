import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Paciente,
  Diagnostico,
  Evolucion,
  RecetaDigital,
  PedidoLaboratorio,
} from '../types';

interface EvolutionStore {
  pacientes: Paciente[];
  selectedPaciente: Paciente | null;
  addPaciente: (paciente: Paciente) => void;
  setPaciente: (paciente: Paciente | null) => void;
  addDiagnostico: (pacienteId: number, diagnostico: Diagnostico) => void;
  addEvolucion: (pacienteId: number, diagnosticoId: string, evolucion: Evolucion) => void;
  getDiagnosticosByPacienteId: (pacienteId: number) => Diagnostico[];
  getEvolucionesByDiagnosticoId: (pacienteId: number, diagnosticoId: string) => Evolucion[];
  addRecetaDigital: (pacienteId: number, diagnosticoId: string, evolucionId: string, receta: RecetaDigital) => void;
  addPedidoLaboratorio: (pacienteId: number, diagnosticoId: string, evolucionId: string, pedido: PedidoLaboratorio) => void;
  resetSelectedPaciente: () => void;
}

export const useEvolutionStore = create<EvolutionStore>()(
  persist(
    (set, get) => ({
      pacientes: [],
      selectedPaciente: null,
      addPaciente: (paciente) => set((state) => ({ 
        pacientes: [...state.pacientes, paciente] 
      })),
      setPaciente: (paciente) => set({ selectedPaciente: paciente }),
      addDiagnostico: (pacienteId, diagnostico) => set((state) => ({
        pacientes: state.pacientes.map((paciente) =>
          paciente.id === pacienteId
            ? { 
                ...paciente, 
                historiaClinica: { 
                  ...paciente.historiaClinica, 
                  diagnosticos: [
                    ...paciente.historiaClinica.diagnosticos, 
                    { ...diagnostico, evoluciones: [] }
                  ] 
                } 
              }
            : paciente
        ),
        selectedPaciente: state.selectedPaciente && state.selectedPaciente.id === pacienteId
          ? { 
              ...state.selectedPaciente, 
              historiaClinica: { 
                ...state.selectedPaciente.historiaClinica, 
                diagnosticos: [
                  ...state.selectedPaciente.historiaClinica.diagnosticos, 
                  { ...diagnostico, evoluciones: [] }
                ] 
              } 
            }
          : state.selectedPaciente
      })),
      addEvolucion: (pacienteId, diagnosticoId, evolucion) => set((state) => ({
        pacientes: state.pacientes.map((paciente) =>
          paciente.id === pacienteId
            ? {
                ...paciente,
                historiaClinica: {
                  ...paciente.historiaClinica,
                  diagnosticos: paciente.historiaClinica.diagnosticos.map((diagnostico) =>
                    diagnostico.id === diagnosticoId
                      ? { 
                          ...diagnostico, 
                          evoluciones: [...(diagnostico.evoluciones || []), evolucion] 
                        }
                      : diagnostico
                  )
                }
              }
            : paciente
        ),
        selectedPaciente: state.selectedPaciente && state.selectedPaciente.id === pacienteId
          ? {
              ...state.selectedPaciente,
              historiaClinica: {
                ...state.selectedPaciente.historiaClinica,
                diagnosticos: state.selectedPaciente.historiaClinica.diagnosticos.map((diagnostico) =>
                  diagnostico.id === diagnosticoId
                    ? { 
                        ...diagnostico, 
                        evoluciones: [...(diagnostico.evoluciones || []), evolucion] 
                      }
                    : diagnostico
                )
              }
            }
          : state.selectedPaciente
      })),
      getDiagnosticosByPacienteId: (pacienteId) => {
        const paciente = get().pacientes.find((p) => p.id === pacienteId);
        return paciente ? paciente.historiaClinica.diagnosticos : [];
      },
      getEvolucionesByDiagnosticoId: (pacienteId, diagnosticoId) => {
        const paciente = get().pacientes.find((p) => p.id === pacienteId);
        if (!paciente) return [];
        const diagnostico = paciente.historiaClinica.diagnosticos.find((d) => d.id === diagnosticoId);
        return diagnostico ? diagnostico.evoluciones || [] : [];
      },
      addRecetaDigital: (pacienteId, diagnosticoId, evolucionId, receta) => set((state) => ({
        pacientes: state.pacientes.map((paciente) =>
          paciente.id === pacienteId
            ? {
                ...paciente,
                historiaClinica: {
                  ...paciente.historiaClinica,
                  diagnosticos: paciente.historiaClinica.diagnosticos.map((diagnostico) =>
                    diagnostico.id === diagnosticoId
                      ? {
                          ...diagnostico,
                          evoluciones: (diagnostico.evoluciones || []).map((evolucion) =>
                            evolucion.id === evolucionId
                              ? { ...evolucion, recetaDigital: receta }
                              : evolucion
                          )
                        }
                      : diagnostico
                  )
                }
              }
            : paciente
        ),
        selectedPaciente: state.selectedPaciente && state.selectedPaciente.id === pacienteId
          ? {
              ...state.selectedPaciente,
              historiaClinica: {
                ...state.selectedPaciente.historiaClinica,
                diagnosticos: state.selectedPaciente.historiaClinica.diagnosticos.map((diagnostico) =>
                  diagnostico.id === diagnosticoId
                    ? {
                        ...diagnostico,
                        evoluciones: (diagnostico.evoluciones || []).map((evolucion) =>
                          evolucion.id === evolucionId
                            ? { ...evolucion, recetaDigital: receta }
                            : evolucion
                        )
                      }
                    : diagnostico
                )
              }
            }
          : state.selectedPaciente
      })),
      addPedidoLaboratorio: (pacienteId, diagnosticoId, evolucionId, pedido) => set((state) => ({
        pacientes: state.pacientes.map((paciente) =>
          paciente.id === pacienteId
            ? {
                ...paciente,
                historiaClinica: {
                  ...paciente.historiaClinica,
                  diagnosticos: paciente.historiaClinica.diagnosticos.map((diagnostico) =>
                    diagnostico.id === diagnosticoId
                      ? {
                          ...diagnostico,
                          evoluciones: (diagnostico.evoluciones || []).map((evolucion) =>
                            evolucion.id === evolucionId
                              ? { ...evolucion, pedidoLaboratorio: pedido }
                              : evolucion
                          )
                        }
                      : diagnostico
                  )
                }
              }
            : paciente
        ),
        selectedPaciente: state.selectedPaciente && state.selectedPaciente.id === pacienteId
          ? {
              ...state.selectedPaciente,
              historiaClinica: {
                ...state.selectedPaciente.historiaClinica,
                diagnosticos: state.selectedPaciente.historiaClinica.diagnosticos.map((diagnostico) =>
                  diagnostico.id === diagnosticoId
                    ? {
                        ...diagnostico,
                        evoluciones: (diagnostico.evoluciones || []).map((evolucion) =>
                          evolucion.id === evolucionId
                            ? { ...evolucion, pedidoLaboratorio: pedido }
                            : evolucion
                        )
                      }
                    : diagnostico
                )
              }
            }
          : state.selectedPaciente
      })),
      resetSelectedPaciente: () => set({ selectedPaciente: null }),
    }),
    {
      name: 'evolution-storage',
      getStorage: () => localStorage,
    }
  )
);