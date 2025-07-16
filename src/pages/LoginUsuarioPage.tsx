// pages/LoginPage.tsx
import LoginForm from '../components/LoginUsuario';
import { UsuarioService } from '../services/UsuarioService';
import type { LoginRequest, LoginResponse } from '../interfaces/Auth';
import { useNavigate , useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { useEffect } from 'react'


function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setToken, isAuthenticated } = useAuth();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/list/Pacientes';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleLogin = async (credentials: LoginRequest) => {
    try {
      const response: LoginResponse = await UsuarioService.login(credentials);
      setToken(response.accessToken);
      
      const from = location.state?.from?.pathname || '/list/Pacientes';
      
      alert(`Bienvenido, ${response.name} 👋`);
      navigate(from, { replace: true });
    } catch (error) {
      alert("❌ Credenciales inválidas o error de red.");
      console.error(error);
    }
  };

  // Si ya está autenticado, mostrar loading
  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <LoginForm onLogin={handleLogin} />;
}

export default LoginPage;
