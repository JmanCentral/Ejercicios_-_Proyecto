import axios from '../interceptors/axiosConfig'
import type { HistoriaClinica } from '../interfaces/Historia'

export class HistoriaClinicaService {

    private static readonly API_URL = '/historia';


     public static async getHistoriaByPaciente(idPaciente: number): Promise<HistoriaClinica> {
        const { data } = await axios.get<HistoriaClinica>(`${this.API_URL}/getIdPaciente/${idPaciente}`);
        return data;
    }

    public static async getById(id: number): Promise<HistoriaClinica> {
        const { data } = await axios.get<HistoriaClinica>(`${this.API_URL}/get/${id}`);
        return data;
    }

    public static async registrar(historiaClinica:HistoriaClinica): Promise<HistoriaClinica> {
        const {data} = await axios.post<HistoriaClinica>(`${this.API_URL}/register`, historiaClinica)
        return data;

    }

    public static async update(id:number , historiaClinica:HistoriaClinica): Promise<HistoriaClinica> {
        const {data} = await axios.put<HistoriaClinica>(`${this.API_URL}/update/${id}`, historiaClinica)
        return data;
    }

    public static async delete(id:number): Promise<HistoriaClinica>{
        const {data} = await axios.delete<HistoriaClinica>(`${this.API_URL}/delete/${id}`);
        return data;
  
  }












}