
import type { Paciente } from '../interfaces/Paciente'

interface Props {
  pacientes: Paciente[]
  busqueda: string
  setBusqueda: (valor: string) => void
  onNuevo: () => void
  onEditar: (id: number) => void
  onEliminar: (id: number) => void
  onVerHistoria: (id: number, nombre: string) => void
  onLogout: () => void
  onVolver: () => void
  loading: boolean
}

function ListPacientes({
  pacientes,
  busqueda,
  setBusqueda,
  onNuevo,
  onEditar,
  onEliminar,
  onVerHistoria,
  onLogout,
  onVolver,
  loading,
}: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-green-600 py-4 shadow">
        <div className="container mx-auto">
          <span className="text-white text-xl font-bold text-center block">
            🩺 Pacientes Registrados
          </span>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex gap-3 flex-wrap">
            <button onClick={onNuevo} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              ➕ Nuevo Paciente
            </button>
            <button onClick={onVolver} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              🏠 Volver al Menú
            </button>
          </div>

          <div>
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar paciente..."
              className="border rounded px-4 py-2 w-full md:w-64"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600 border-solid"></div>
            <span className="ml-4 text-green-700 font-semibold">Cargando...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300 text-center">
              <thead className="bg-green-200">
                <tr>
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Nombre</th>
                  <th className="border p-2">Documento</th>
                  <th className="border p-2">Correo</th>
                  <th className="border p-2">Teléfono</th>
                  <th className="border p-2">Fecha Nac.</th>
                  <th className="border p-2">Dirección</th>
                  <th className="border p-2">Tipo Sangre</th>
                  <th className="border p-2">Acciones</th>
                  <th className="border p-2">Historia Clínica</th>
                </tr>
              </thead>
              <tbody>
                {pacientes.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="p-4">
                      Sin pacientes para mostrar.
                    </td>
                  </tr>
                ) : (
                  pacientes.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-100">
                      <td className="border p-2">{p.id}</td>
                      <td className="border p-2">{p.nombre}</td>
                      <td className="border p-2">{p.documento}</td>
                      <td className="border p-2">{p.correo}</td>
                      <td className="border p-2">{p.telefono}</td>
                      <td className="border p-2">{p.fechaNacimiento}</td>
                      <td className="border p-2">{p.direccionCompleta}</td>
                      <td className="border p-2">{p.tipoSangre}</td>
                      <td className="border p-2">
                        <button onClick={() => onEliminar(p.id!)} className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600">
                          ❌ Eliminar
                        </button>
                        <button onClick={() => onEditar(p.id!)} className="bg-green-600 text-white px-2 py-1 rounded text-sm ml-2 hover:bg-green-700">
                          ✏️ Editar
                        </button>
                      </td>
                      <td className="border p-2">
                        <button
                          onClick={() => onVerHistoria(p.id!, p.nombre)}
                          className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
                        >
                          📄 Ver Historia
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 text-center">
          <button onClick={onLogout} className="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800">
            🔒 Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  )
}

export default ListPacientes
