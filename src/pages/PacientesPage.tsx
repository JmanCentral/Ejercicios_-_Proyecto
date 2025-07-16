
import { useEffect, useState } from 'react'
import type { Paciente } from '../interfaces/Paciente'
import { getPacientes } from '../services/pacienteService'
import PacienteList from '../components/Pacientes'
import '../css/PacientesList.css'

function PacientePage() {

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };
  
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  
  useEffect(() => {
   
    const fetchData = async () => {
      try {
       
        const usersFromApi = await getPacientes()
       
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


  if (loading) return <p className="container">Cargando pacientes..</p>
  if (error) return <p className="container">Error: {error}</p>


  return (
    <div className="container">
      <h2>Lista de Pacientes</h2>
      <div className="card-grid">
        {pacientes.map((paciente) => (
          <PacienteList key={paciente.id} paciente={paciente} />
        ))}
         <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  )
}

export default PacientePage
