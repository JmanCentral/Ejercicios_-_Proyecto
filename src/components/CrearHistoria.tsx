import { useForm } from 'react-hook-form';
import type { HistoriaClinica } from '../interfaces/Historia';

interface Props {
  onGuardar: (data: HistoriaClinica) => void;
  onVolver: () => void;
  idPaciente: number;
  historiaExistente?: HistoriaClinica; 
}

function HistoriaForm({ onGuardar, onVolver, idPaciente, historiaExistente }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<HistoriaClinica>({
    defaultValues: historiaExistente ? historiaExistente : {
      fechaCreacion: new Date().toISOString().split("T")[0],
      idPaciente,
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-6 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
       <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          {historiaExistente ? 'Editar Historia Clínica' : 'Editar Historia Clínica'}
        </h2>

        <form onSubmit={handleSubmit(onGuardar)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alergias</label>
            <textarea
              {...register("alergias", { required: "Campo obligatorio" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            {errors.alergias && <p className="text-sm text-red-500">{errors.alergias.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Enfermedades Previas</label>
            <textarea
              {...register("enfermedadesPrevias", { required: "Campo obligatorio" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            {errors.enfermedadesPrevias && <p className="text-sm text-red-500">{errors.enfermedadesPrevias.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Antecedentes</label>
            <textarea
              {...register("antecedentes", { required: "Campo obligatorio" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            {errors.antecedentes && <p className="text-sm text-red-500">{errors.antecedentes.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Observaciones Generales</label>
            <textarea
              {...register("observacionesGenerales", { required: "Campo obligatorio" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            {errors.observacionesGenerales && <p className="text-sm text-red-500">{errors.observacionesGenerales.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Creación</label>
              <input
                type="date"
                {...register("fechaCreacion", { required: "Campo obligatorio" })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
              {errors.fechaCreacion && <p className="text-sm text-red-500">{errors.fechaCreacion.message}</p>}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6 center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex justify-center items-center gap-2 disabled:opacity-50"
            >
              {!isSubmitting ? '💾 Guardar' : (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                  </svg>
                  Guardando...
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onVolver}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg"
            >
              🔙 Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HistoriaForm;
