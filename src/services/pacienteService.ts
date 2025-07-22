import axios from '../interceptors/axiosConfig'

import type { Paciente } from '../interfaces/Paciente';

export class PacienteService {
  private static readonly API_URL = '/pacientes';

  public static async getPacientes(): Promise<Paciente[]> {
    const { data } = await axios.get<Paciente[]>(`${this.API_URL}/all`);
    return data;
  }

  public static async getById(id: number): Promise<Paciente> {
    const { data } = await axios.get<Paciente>(`${this.API_URL}/getId/${id}`);
    return data;
  }

  public static async registrar(paciente:Paciente): Promise<Paciente> {
    const {data} = await axios.post<Paciente>(`${this.API_URL}/register`,paciente)
    return data;

  }

  public static async update(id:number , paciente:Paciente): Promise<Paciente> {
    const {data} = await axios.put<Paciente>(`${this.API_URL}/update/${id}`, paciente)
    return data;
  }

  public static async delete(id:number): Promise<Paciente>{
    const {data} = await axios.delete<Paciente>(`${this.API_URL}/delete/${id}`);
    return data;
  
  }

}


