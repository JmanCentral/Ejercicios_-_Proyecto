import type { Paciente} from '../interfaces/Paciente';

type Props = {
  paciente: Paciente;
};

function PacienteDetalle({ paciente }: Props) {
  return (
    <div>
      <p><strong>Nombre:</strong> {paciente.nombre}</p>
      <p><strong>Documento:</strong> {paciente.documento}</p>
      <p><strong>Email:</strong> {paciente.correo}</p>
      <p><strong>Teléfono:</strong> {paciente.telefono}</p>
      <p><strong>Fecha de Nacimiento:</strong> {paciente.fechaNacimiento}</p>
      <p><strong>Dirección:</strong> {paciente.direccionCompleta}</p>
      <p><strong>Tipo de Sangre:</strong> {paciente.tipoSangre}</p>
    </div>
  );
}

export default PacienteDetalle;
