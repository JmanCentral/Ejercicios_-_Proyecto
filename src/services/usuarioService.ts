import axios from "axios";
import type { UserDTO } from "../interfaces/User";
import type { LoginResponse} from "../interfaces/Auth";
import type { LoginRequest } from "../interfaces/Auth";


export class UsuarioService {

  private static readonly API_URL = "http://localhost:8080/api/users";

  public static async createUser(user: UserDTO): Promise<UserDTO> {
    const response = await axios.post<UserDTO>(`${this.API_URL}/register`, user);
    return response.data;
  }

  public static async login(login: LoginRequest): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>(`${this.API_URL}/login`, login);
    return response.data;
  }

}