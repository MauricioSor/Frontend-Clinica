// Datos de ejemplo para desarrollo
export const mockUsers = [
  {
    id: 1,
    email: 'medico@example.com',
    password: 'medico123', // En producción nunca almacenar contraseñas en texto plano
    nombre: 'Juan',
    apellido: 'Pérez',
    role: 'MEDICO',
  },
  {
    id: 2,
    email: 'secretaria@example.com',
    password: 'secretaria123',
    nombre: 'María',
    apellido: 'González',
    role: 'SECRETARIA',
  },
  {
    id: 3,
    email: 'admin@example.com',
    password: 'admin123',
    nombre: 'Carlos',
    apellido: 'Rodríguez',
    role: 'ADMIN',
  },
] as const;

export const mockPacientes = [
  {
    id: 1,
    nombre: 'Ana',
    apellido: 'Martínez',
    cuil: '27-35999888-4',
    pasaporte: 'AB123456',
    fechaNacimiento: '1990-05-15',
    obraSocial: 'OSDE',
    nroAfiliado: '12345678',
    foto: 'https://randomuser.me/api/portraits/women/1.jpg',
    historiaClinica: {
      nroHistoriaClinica: 'HC-001',
      fechaCreacion: '2024-01-15',
      horaCreacion: '09:30',
      diagnosticos: [
        {
          id: '1',
          codigo: 'E11',
          nombre: 'Diabetes tipo 2',
          evoluciones: [
            {
              id: '1',
              texto: 'Paciente presenta niveles elevados de glucosa en sangre.',
              fechaEC: '2024-01-15',
              horaEC: '09:45',
              recetaDigital: {
                id: '1',
                fechaHoraReceta: '2024-01-15T09:45:00',
                codigoBarras: 'RD-001',
                qr: 'QR-001',
                firma: 'Dr. Juan Pérez',
                estado: 'ACTIVA',
                medicamentos: [
                  {
                    codigo: 'MED001',
                    marca: 'Laboratorio A',
                    nombre: 'Metformina',
                    vencimiento: '2025-01-15',
                    dosis: '850mg cada 12 horas',
                    medicamentoGenerico: {
                      nombre: 'Metformina'
                    }
                  }
                ]
              },
              pedidoLaboratorio: null,
              plantilla: null,
              estadoEvolucion: 'EDITABLE',
              medico: {
                id: 1,
                nombre: 'Juan',
                apellido: 'Pérez',
                matricula: 'MP-12345',
                especialidad: 'Clínica Médica'
              }
            }
          ]
        }
      ]
    }
  },
  {
    id: 2,
    nombre: 'Luis',
    apellido: 'García',
    cuil: '20-28777666-1',
    pasaporte: 'CD789012',
    fechaNacimiento: '1985-08-22',
    obraSocial: 'Swiss Medical',
    nroAfiliado: '87654321',
    foto: 'https://randomuser.me/api/portraits/men/2.jpg',
    historiaClinica: {
      nroHistoriaClinica: 'HC-002',
      fechaCreacion: '2024-02-01',
      horaCreacion: '14:15',
      diagnosticos: []
    }
  }
];