
import PacienteForm from '../components/RegistroPaciente';
import { PacienteService } from '../services/PacienteService';
import { useNavigate } from 'react-router-dom';
import type { Paciente } from '../interfaces/Paciente';

function RegistroPage() {

  const navigate = useNavigate();

  const handleVolver = () => {
    navigate(`/list/Pacientes`); 
  }

  const handleRegistro = async (data: Paciente) => {
    
    console.log("data", data)
    try {
      await PacienteService.registrar(data);
      alert("Usuario registrado exitosamente ✅");
      navigate('/list/Pacientes');
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("❌ Ocurrió un error al registrar el usuario.");
    }
  };

  return (
    <PacienteForm onGuardar={handleRegistro}
    onVolver={handleVolver} />
  );
}

export default RegistroPage;