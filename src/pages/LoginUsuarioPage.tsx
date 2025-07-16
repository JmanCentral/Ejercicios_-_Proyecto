// pages/LoginPage.tsx
import LoginForm from '../components/LoginUsuario';
import { UsuarioService } from '../services/usuarioService';
import type { LoginRequest, LoginResponse } from '../interfaces/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación

function LoginPage() {
  const navigate = useNavigate();
  const { setToken } = useAuth(); // aquí usamos el setToken del contexto


  const handleLogin = async (credentials: LoginRequest) => {
    try {
      const response: LoginResponse = await UsuarioService.login(credentials);
      setToken(response.accessToken); // Guardamos el token en el contexto
      alert(`Bienvenido, ${response.name} 👋`);
      navigate('/list/Pacientes'); // Redirigir a la página de pacientes
    } catch (error) {
      alert("❌ Credenciales inválidas o error de red.");
      console.error(error);
    }
  };

  return <LoginForm onLogin={handleLogin} />;
}

export default LoginPage;
