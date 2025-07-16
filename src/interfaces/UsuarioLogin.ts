
export interface UsuarioLogin {
  email: string;
  password: string;
  rol?: 'admin' | 'usuario';
}
