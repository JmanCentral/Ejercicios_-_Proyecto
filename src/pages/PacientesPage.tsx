import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { PacienteService } from '../services/PacienteService'
import type { Paciente } from '../interfaces/Paciente'
import { useNavigate } from 'react-router-dom';
import ListPacientes from '../components/ListPacientes';


function PacientePage() {
  const { logout } = useAuth()

  const navigate = useNavigate();

  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [busqueda, setBusqueda] = useState('')


  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

  const handleNuevoPaciente = () => {
    navigate(`/registro/Paciente`); 
  }

  const handleEditar = (id: number) => {
    navigate(`/editar/Paciente/${id}`); 
  }
    const handleEliminar = async (id: number) => {
    try {
      await PacienteService.delete(id);
      const data = await PacienteService.getPacientes()
       setPacientes(data);
    } catch (error) {
      console.error("Error eliminando paciente:", error);
    }
  };

  const handleVolverAlMenu = () => {
    
  }

  const handleVerHistoria = (id: number, nombre: string) => {
  navigate(`/list/Historia/${id}?nombre=${encodeURIComponent(nombre)}`);
  };

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersFromApi = await PacienteService.getPacientes()
        setPacientes(usersFromApi)
        setError(null)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const pacientesFiltrados = pacientes.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )


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
  )
}

export default PacientePage
