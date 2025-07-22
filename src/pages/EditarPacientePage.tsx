import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PacienteForm from '../components/RegistroPaciente';
import type { Paciente } from '../interfaces/Paciente';
import{PacienteService}  from '../services/PacienteService';

function EditarPaciente() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState<Paciente | null>(null);

  useEffect(() => {
    const cargarPaciente = async () => {
      if (!id) return;
      try {
        const data = await PacienteService.getById(Number(id));
        setPaciente(data);
      } catch (error) {
        console.error('Error al cargar el paciente', error);
      }
    };
    cargarPaciente();
  }, [id]);

  const handleActualizar = async (data: Paciente) => {
    try {
      await PacienteService.update(Number(id) , data);
      navigate('/list/Pacientes');
    } catch (error) {
      console.error('Error al actualizar el paciente', error);
    }
  };

  const handleVolver = () => {
    navigate('/list/Pacientes');
  };

  if (!paciente) return <p className="text-center mt-10">Cargando paciente...</p>;

  return (
    <PacienteForm
      initialValues={paciente}
      onGuardar={handleActualizar}
      onVolver={handleVolver}
    />
  );
}

export default EditarPaciente;
