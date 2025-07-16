import { useEffect, useState } from 'react'
import { HistoriaClinicaService } from '../services/HistoriaClinicaService'
import HistoriaClinicaCard from "../components/HistoriaClinicaCard"; 
import type { HistoriaClinica } from '../interfaces/Historia'
import { useNavigate , useParams ,  useSearchParams } from 'react-router-dom';


function HistoriaPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const nombre = searchParams.get("nombre");
  const navigate = useNavigate();

  const [historia, setHistoria] = useState<HistoriaClinica | null>(null);
  const [recargarHistoria, setRecargarHistoria] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataHistoria = await HistoriaClinicaService.getHistoriaByPaciente(Number(id));
        console.log("dataaa",dataHistoria)
        console.log("data recibida",dataHistoria)
         if (dataHistoria) {
          setHistoria(dataHistoria);
        } else {
          navigate(`/crear/Historia/${id}?nombre=${encodeURIComponent(nombre ?? "")};`);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id,recargarHistoria]);

  const handleEditar = (idHistoria: number) => {
    navigate(`/editar/Historia/${idHistoria}?nombre=${encodeURIComponent(nombre ?? "")};`);
  };

  const handleEliminar = async (idHistoria:number) =>{

    try {
        await HistoriaClinicaService.delete(idHistoria)
         setRecargarHistoria(prev => !prev);
    } catch (error) {
        console.error("Error eliminando historia:", error);
    }
    };

  return (
  <div className="p-6 space-y-4">
    <h1 className="text-2xl font-bold text-purple-700">
      Historia Clínica de {nombre}
    </h1>

    {loading && <p className="text-gray-500">Cargando historia clínica...</p>}
    {error && <p className="text-red-500">Error: {error}</p>}

    {!loading && !historia && (
      <p className="text-gray-600">No hay historia clínica registrada.</p>
    )}

    {!loading && historia && (
      <HistoriaClinicaCard
        historia={historia}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
      />
    )}
  </div>
);

}

export default HistoriaPage;

