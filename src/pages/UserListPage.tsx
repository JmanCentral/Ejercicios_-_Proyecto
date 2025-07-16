// Importación de hooks de React para manejar estados y efectos
import { useEffect, useState } from 'react'

// Importación del tipo User desde las interfaces (solo para tipado)
import type { User } from '../interfaces/User'

// Importación del servicio que obtiene los usuarios desde la API
import { getUsers } from '../services/userService'

// Importación del componente que representa visualmente a un usuario
import UserList from '../components/UserList'

// Importación de los estilos específicos para esta página
import '../css/UserList.css'

/**
 * Componente principal que representa la página de lista de usuarios.
 * Se encarga de:
 * - Obtener los datos de usuarios desde una API.
 * - Manejar los estados de carga y error.
 * - Renderizar cada usuario usando el componente UserList.
 */
function UserListPage() {
  // Estado para almacenar los usuarios obtenidos
  const [users, setUsers] = useState<User[]>([])

  // Estado que indica si los datos están siendo cargados
  const [loading, setLoading] = useState(true)

  // Estado que almacena errores si ocurre algún problema con la API
  const [error, setError] = useState<string | null>(null)

  // useEffect se ejecuta una vez cuando el componente se monta
  useEffect(() => {
    // Función asíncrona que obtiene los usuarios
    const fetchData = async () => {
      try {
        // Llama al servicio que consulta la API
        const usersFromApi = await getUsers()
        // Almacena los usuarios en el estado
        setUsers(usersFromApi)
      } catch (err) {
        // Captura errores y los almacena en el estado 'error'
        setError((err as Error).message)
      } finally {
        // Finaliza la carga sin importar éxito o error
        setLoading(false)
      }
    }

    // Se ejecuta la función de carga de datos
    fetchData()
  }, [])

  // Si los datos aún están cargando, muestra un mensaje
  if (loading) return <p className="container">Cargando usuarios...</p>

  // Si ocurre un error, muestra el mensaje correspondiente
  if (error) return <p className="container">Error: {error}</p>

  // Si se cargan los datos correctamente, renderiza la lista de usuarios
  return (
    <div className="container">
      <h2>Lista de Usuarios</h2>
      <div className="card-grid">
        {/* Renderiza un componente UserList por cada usuario */}
        {users.map((user) => (
          <UserList key={user.id} user={user} />
        ))}
      </div>
    </div>
  )
}

export default UserListPage
