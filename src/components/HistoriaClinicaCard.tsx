import type { HistoriaClinica } from "../interfaces/Historia";

interface Props {
  historia: HistoriaClinica;
  onEditar: (id: number) => void;
  onEliminar: (id: number ) => void;
}

function HistoriaClinicaCard({ historia, onEditar, onEliminar }: Props) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-purple-200 w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-purple-700">Ficha Médica</h3>
        <span className="text-sm text-gray-500">{historia.fechaCreacion}</span>
      </div>

      <div className="space-y-2 text-sm text-gray-800">
        <p><strong>Alergias:</strong> {historia.alergias}</p>
        <p><strong>Enfermedades Previas:</strong> {historia.enfermedadesPrevias}</p>
        <p><strong>Observaciones:</strong> {historia.observacionesGenerales}</p>
        <p><strong>Antecedentes:</strong> {historia.antecedentes}</p>
      </div>
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => onEditar(historia.id)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition"
        >
          ✏️ Editar
        </button>
        <button
          onClick={() => onEliminar(historia.id)}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition"
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
}

export default HistoriaClinicaCard;
