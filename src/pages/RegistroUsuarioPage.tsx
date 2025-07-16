
import RegistroForm from '../components/RegistroUsuario';
import { UsuarioService } from '../services/usuarioService';
import { useNavigate } from 'react-router-dom';
import type { UserDTO } from '../interfaces/auth';

function RegistroPage() {
  const navigate = useNavigate();

  const handleRegistro = async (data: UserDTO) => {
    try {
      await UsuarioService.createUser(data);
      alert("Usuario registrado exitosamente ✅");
      navigate('/login');
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("❌ Ocurrió un error al registrar el usuario.");
    }
  };

  return (
    <RegistroForm onRegistro={handleRegistro} />
  );
}

export default RegistroPage;