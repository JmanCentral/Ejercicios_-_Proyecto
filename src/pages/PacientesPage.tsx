import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { PacienteService } from '../services/PacienteService'
import type { Paciente } from '../interfaces/Paciente'
import { useNavigate } from 'react-router-dom';
import ListPacientes from '../components/ListPacientes';


function PacientePage() {
  // ✅ Hook personalizado para consumir el contexto de autenticación
  // Se obtiene la función logout desde el contexto global usando useAuth
  const { logout } = useAuth();

  // ✅ Hook de React Router para redirigir a otras rutas
  const navigate = useNavigate();

  // ✅ Hooks de estado para manejar:
  // - la lista de pacientes
  // - estado de carga
  // - posibles errores
  // - el término de búsqueda
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState('');

  // ✅ Lógica para cerrar sesión (invoca logout del contexto y redirige manualmente)
  const handleLogout = () => {
    logout();
    window.location.href = '/'; // recarga y redirige a la página de inicio
  };

  // ✅ Navegación al formulario de nuevo paciente
  const handleNuevoPaciente = () => {
    navigate(`/registro/Paciente`);
  };

  // ✅ Navegación a la vista de edición de un paciente específico
  const handleEditar = (id: number) => {
    navigate(`/editar/Paciente/${id}`);
  };

  // ✅ Elimina un paciente y vuelve a cargar la lista
  const handleEliminar = async (id: number) => {
    try {
      await PacienteService.delete(id); // llamada al servicio para eliminar
      const data = await PacienteService.getPacientes(); // recarga datos
      setPacientes(data);
    } catch (error) {
      console.error("Error eliminando paciente:", error);
    }
  };

  // ⚠️ Placeholder para volver al menú principal (sin implementar)
  const handleVolverAlMenu = () => {
    // Aquí podríamos navegar al dashboard, por ejemplo
  };

  // ✅ Navegación a la lista de historias clínicas, pasando parámetros por la URL
  const handleVerHistoria = (id: number, nombre: string) => {
    navigate(`/list/Historia/${id}?nombre=${encodeURIComponent(nombre)}`);
  };

  // ✅ Hook useEffect para cargar los datos la primera vez que se renderiza la página
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersFromApi = await PacienteService.getPacientes();
        setPacientes(usersFromApi);
        setError(null); // limpia errores si la carga fue exitosa
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false); // se oculta el loader una vez terminada la carga
      }
    };

    fetchData();
  }, []); // ← solo se ejecuta una vez al montar el componente

  // ✅ Filtrado en tiempo real según el término de búsqueda
  const pacientesFiltrados = pacientes.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // ✅ Se renderiza un componente reutilizable para listar pacientes
  // Le pasamos props con los datos y funciones necesarias
  return (
    <ListPacientes
      pacientes={pacientesFiltrados}
      busqueda={busqueda}
      setBusqueda={setBusqueda}
      onNuevo={handleNuevoPaciente}
      onEditar={handleEditar}
      onEliminar={handleEliminar}
      onVerHistoria={handleVerHistoria}
      onLogout={handleLogout}
      onVolver={handleVolverAlMenu}
      loading={loading}
    />
  );
}

export default PacientePage;
