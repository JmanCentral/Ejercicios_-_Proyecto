import { useEffect } from 'react'
import { HistoriaClinicaService } from '../services/HistoriaClinicaService'
import HistoriaClinicaCard from "../components/HistoriaClinicaCard"; 
import type { HistoriaClinica } from '../interfaces/Historia'
import { useNavigate , useParams ,  useSearchParams } from 'react-router-dom';
import { useReducer } from 'react';


type HistoriaState = {
  historia: HistoriaClinica | null;
  loading: boolean;
  error: string | null;
  recargarHistoria: boolean;
};

type HistoriaAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: HistoriaClinica }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "TOGGLE_RECARGAR" };

const historiaReducer = (state: HistoriaState, action: HistoriaAction): HistoriaState => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, historia: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "TOGGLE_RECARGAR":
      return { ...state, recargarHistoria: !state.recargarHistoria };
    default:
      return state;
  }
};

function HistoriaPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const nombre = searchParams.get("nombre");
  const navigate = useNavigate();

   const [state, dispatch] = useReducer(historiaReducer, {
    historia: null,
    loading: true,
    error: null,
    recargarHistoria: false,
  });

  const { historia, loading, error, recargarHistoria } = state;

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const dataHistoria = await HistoriaClinicaService.getHistoriaByPaciente(Number(id));
         if (dataHistoria) {
          dispatch({ type: "FETCH_SUCCESS", payload: dataHistoria });
        } else {
          navigate(`/crear/Historia/${id}?nombre=${encodeURIComponent(nombre ?? "")};`);
        }
      } catch (err) {
          dispatch({ type: "FETCH_ERROR", payload: (err as Error).message });
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
         dispatch({ type: "TOGGLE_RECARGAR" });
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

