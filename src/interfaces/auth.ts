
export interface LoginRequest {
  username: string;
  password: string;
}

export interface UserDTO {
  name: string;
  username: string;
  email: string;
  password: string;
  rol: Set<string>; 
}

export interface LoginResponse {
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
  message: string;
}
