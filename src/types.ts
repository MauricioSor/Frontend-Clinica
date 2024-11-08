export interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
  cuil: string;
  pasaporte: string;
  fechaNacimiento: string;
  obraSocial: string;
  nroAfiliado: string;
  foto: string;
  historiaClinica: HistoriaClinica;
}

export interface HistoriaClinica {
  nroHistoriaClinica: string;
  fechaCreacion: string;
  horaCreacion: string;
  diagnosticos: Diagnostico[];
}

export interface Diagnostico {
  id: string;
  codigo: string;
  nombre: string;
  evoluciones: Evolucion[];
}

export interface Evolucion {
  id: string;
  texto: string;
  fechaEC: string;
  horaEC: string;
  recetaDigital: RecetaDigital | null;
  pedidoLaboratorio: PedidoLaboratorio | null;
  plantilla: Plantilla | null;
  estadoEvolucion: EstadoEvolucion;
  medico: Medico;
  diagnostico?: string; // Añadido para facilitar la visualización
}

export interface Medico {
  id: number;
  nombre: string;
  apellido: string;
  matricula: string;
  especialidad: string;
}

export interface RecetaDigital {
  id: string;
  fechaHoraReceta: string;
  codigoBarras: string;
  qr: string;
  firma: string;
  estado: EstadoRecetaDigital;
  medicamentos: Medicamento[];
}

export interface Medicamento {
  codigo: string;
  marca: string;
  nombre: string;
  vencimiento: string;
  medicamentoGenerico: MedicamentoGenerico;
  dosis?: string;
}

export interface MedicamentoGenerico {
  nombre: string;
}

export interface PedidoLaboratorio {
  id: string;
  fecha: string;
  textoDescripcion: string;
}

export interface Plantilla {
  nombre: string;
  textoPlantilla: string;
}

export enum EstadoEvolucion {
  EDITABLE = 'editable',
  EDITADA = 'editada',
  NO_EDITABLE = 'noEditable',
}

export enum EstadoRecetaDigital {
  ACTIVA = 'activa',
  INACTIVA = 'inactiva',
  ANULADA = 'anulada',
  VENCIDA = 'vencida',
}