import type { Paciente} from '../interfaces/Paciente';
import { useNavigate } from 'react-router-dom';


interface Props {
  paciente: Paciente;
}


function PacienteList({ paciente }: Props) {


  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pacientes/${paciente.id}`); 
  };

  return (
     <div
      className="card"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <p><strong>Nombre:</strong> {paciente.nombre}</p>
      <p><strong>Email:</strong> {paciente.documento}</p>
      <p><strong>Ciudad:</strong> {paciente.correo}</p>
      <p><strong>Teléfono:</strong> {paciente.telefono}</p>
      <p><strong>Compañía:</strong> {paciente.fechaNacimiento}</p>
      <p><strong>Dirección:</strong> {paciente.direccionCompleta}</p>
        <p><strong>Tipo de Sangre:</strong> {paciente.tipoSangre}</p>

    </div>
  );
}

export default PacienteList;
