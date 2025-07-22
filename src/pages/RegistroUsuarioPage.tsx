
import RegistroForm from '../components/RegistroUsuario';
import { UsuarioService } from '../services/usuarioService';
import { useNavigate } from 'react-router-dom';
import type { UserDTO } from '../interfaces/User';

function RegistroPage() {

  const navigate = useNavigate();

  const handleVolver = () => {
    navigate(`/`); 
  }

  const handleRegistro = async (data: { name: string; username: string; email: string; password: string; rol: ("ADMIN" | "USER")[] }) => {
    
    console.log("data", data)
    try {
      const userDTO: UserDTO = {
        ...data,
        rol: new Set(data.rol)
      };
      await UsuarioService.createUser(userDTO);
      console.log("data", userDTO)
      alert("Usuario registrado exitosamente ✅");
      navigate('/');
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("❌ Ocurrió un error al registrar el usuario.");
    }
  };

  return (
    <RegistroForm onRegistro={handleRegistro} 
     onVolver={handleVolver}/>
  );
}

export default RegistroPage;