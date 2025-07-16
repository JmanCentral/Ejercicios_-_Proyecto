import axios from 'axios';
import type { Paciente } from '../interfaces/Paciente';

export const getPacientes = async (): Promise<Paciente[]> => {
  const response = await axios.get('http://localhost:8862/api/pacientes/all');
  return response.data;
};

export const getPacientesById = async (id: number): Promise<Paciente> => {
  const response = await axios.get<Paciente>(`http://localhost:8862/api/pacientes/getId/${id}`);
  return response.data;
};


