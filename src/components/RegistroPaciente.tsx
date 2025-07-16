import { useForm } from 'react-hook-form';
import type { Paciente } from '../interfaces/Paciente';
import { useEffect } from 'react';

interface Props {
  onGuardar: (data: Omit<Paciente, 'id'>) => void;
  onVolver: () => void;
  initialValues?: Paciente;
}

function PacienteForm({ onGuardar, onVolver, initialValues }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Paciente>();

  useEffect(() => {
    if (initialValues) {
      Object.entries(initialValues).forEach(([key, value]) => {
        setValue(key as keyof Paciente, value);
      });
    }
  }, [initialValues, setValue]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 py-6 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          {initialValues ? 'Editar Paciente' : 'Registrar Paciente'}
        </h2>

        <form onSubmit={handleSubmit(onGuardar)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
            <input
              type="text"
              {...register("nombre", { required: "Campo obligatorio" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            {errors.nombre && <p className="text-sm text-red-500 mt-1">{errors.nombre.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Documento</label>
            <input
              type="text"
              {...register("documento", { required: "Campo obligatorio" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            {errors.documento && <p className="text-sm text-red-500 mt-1">{errors.documento.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              {...register("correo", {
                required: "Campo obligatorio",
                pattern: {
                  value: /^[^@]+@[^@]+\.[^@]+$/,
                  message: "Correo inválido",
                },
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            {errors.correo && <p className="text-sm text-red-500 mt-1">{errors.correo.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
            <input
              type="tel"
              {...register("telefono", { required: "Campo obligatorio" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            {errors.telefono && <p className="text-sm text-red-500 mt-1">{errors.telefono.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de nacimiento</label>
            <input
              type="date"
              {...register("fechaNacimiento", { required: "Campo obligatorio" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            {errors.fechaNacimiento && <p className="text-sm text-red-500 mt-1">{errors.fechaNacimiento.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dirección completa</label>
            <input
              type="text"
              {...register("direccionCompleta", { required: "Campo obligatorio" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            {errors.direccionCompleta && <p className="text-sm text-red-500 mt-1">{errors.direccionCompleta.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de sangre</label>
            <select
              {...register("tipoSangre", { required: "Campo obligatorio" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              <option value="">Selecciona una opción</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            {errors.tipoSangre && <p className="text-sm text-red-500 mt-1">{errors.tipoSangre.message}</p>}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex justify-center items-center gap-2 transition duration-200 disabled:opacity-50"
            >
              {!isSubmitting ? '💾 Guardar' : (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                  </svg>
                  <span>Guardando...</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onVolver}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg transition duration-200"
            >
              🔙 Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PacienteForm;
