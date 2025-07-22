import { useEffect, useState } from 'react';
import { useNavigate, useParams , useSearchParams } from 'react-router-dom';
import {HistoriaClinicaService } from '../services/HistoriaClinicaService';
import HistoriaForm from '../components/CrearHistoria';
import type { HistoriaClinica } from '../interfaces/Historia';

function EditarHistoriaPage() {
  const { id } = useParams<{ id: string }>(); // id de la historia

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const nombre = searchParams.get("nombre");
  const [historia, setHistoria] = useState<HistoriaClinica | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarHistoria = async () => {
      try {
        const data = await HistoriaClinicaService.getById(Number(id));
        setHistoria(data);
      } catch (error) {
        console.error("Error cargando historia:", error);
        alert("❌ No se pudo cargar la historia.");
        navigate("/list/Pacientes");
      } finally {
        setLoading(false);
      }
    };

    cargarHistoria();
  }, [id, navigate]);

  const handleVolver = () => {
    if (historia) {
      navigate(`/list/Historia/${historia.idPaciente}?nombre=${encodeURIComponent(nombre ?? "")}`);
    } else {
      navigate(`/list/Pacientes`);
    }
  };

  const handleActualizarHistoria = async (data: HistoriaClinica) => {
    try {
      await HistoriaClinicaService.update(Number(id), data);
      alert("✅ Historia clínica actualizada.");
      navigate(`/list/Historia/${data.idPaciente}?nombre=${encodeURIComponent(nombre ?? "")}`);
    } catch (error) {
      console.error("Error actualizando historia:", error);
      alert("❌ Ocurrió un error al actualizar la historia clínica.");
    }
  };

  if (loading) return <p className="p-6 text-gray-600">Cargando historia...</p>;

  if (!historia) return <p className="p-6 text-red-600">No se encontró la historia.</p>;

  return (
    <HistoriaForm
      onGuardar={handleActualizarHistoria}
      onVolver={handleVolver}
      idPaciente={historia.idPaciente}
      historiaExistente={historia}
    />
  );
}

export default EditarHistoriaPage;
