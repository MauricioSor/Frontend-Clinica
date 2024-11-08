import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { services } from '../services';
import { Paciente } from '../types';

export const usePacientes = () => {
  const queryClient = useQueryClient();

  const pacientesQuery = useQuery({
    queryKey: ['pacientes'],
    queryFn: services.pacientes.getPacientes,
  });

  const createPacienteMutation = useMutation({
    mutationFn: services.pacientes.createPaciente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pacientes'] });
    },
  });

  const updatePacienteMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Paciente> }) =>
      services.pacientes.updatePaciente(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pacientes'] });
    },
  });

  const deletePacienteMutation = useMutation({
    mutationFn: services.pacientes.deletePaciente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pacientes'] });
    },
  });

  return {
    pacientes: pacientesQuery.data,
    isLoading: pacientesQuery.isLoading,
    error: pacientesQuery.error,
    createPaciente: createPacienteMutation.mutate,
    updatePaciente: updatePacienteMutation.mutate,
    deletePaciente: deletePacienteMutation.mutate,
  };
};