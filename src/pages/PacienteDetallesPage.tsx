import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Paciente } from '../interfaces/Paciente';
import { getPacientesById } from '../services/pacienteService';
import PacienteDetalle from '../components/PacienteDetalle';

function PacienteDetailPage() {
  
  const { id } = useParams<{ id: string }>();
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const data = await getPacientesById(Number(id));
        setPaciente(data);
      } finally {
        setLoading(false);
      }
    };

    fetchPaciente();
  }, [id]);

  if (loading) return <p>Cargando paciente...</p>;
  if (!paciente) return <p>No se encontró el paciente</p>;

  return (
    <div className="container">
      <h2>Detalle del Paciente</h2>
      <PacienteDetalle paciente={paciente} />
    </div>
  );
}

export default PacienteDetailPage;
