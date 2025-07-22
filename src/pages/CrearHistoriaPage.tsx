
import  HistoriaForm from '../components/CrearHistoria'
import { HistoriaClinicaService } from '../services/HistoriaClinicaService'
import { useNavigate , useParams ,  useSearchParams } from 'react-router-dom';
import type { HistoriaClinica } from '../interfaces/Historia'

function CrearHistoriaPage() {


  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const nombre = searchParams.get("nombre");
  const navigate = useNavigate();

    const handleVolver = () => {
        navigate(`/list/Pacientes`); 
    }

    const handleCrearHistoria = async (data: HistoriaClinica) => {
        
        console.log("data", data)
        try {
        await HistoriaClinicaService.registrar(data);
        alert("Usuario registrado exitosamente ✅");
        navigate(`/list/Historia/${id}?nombre=${encodeURIComponent(nombre ?? "")}`);
        } catch (error) {
        console.error("Error al registrar usuario:", error);
        alert("❌ Ocurrió un error al registrar el usuario.");
        }
    };

    return (
    <HistoriaForm
      onGuardar={handleCrearHistoria}
      onVolver={handleVolver}
      idPaciente={Number(id)}
    />
  );

}

export default CrearHistoriaPage
